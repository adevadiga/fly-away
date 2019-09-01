import {CONFIG, API_CREDENTIALS, POLL_SESSION_STATUS, PAGE_SIZE} from "../config/RapidApiConfig";
import {format} from 'date-fns';

export async function getSessionKeyForFlightQuery(date, routeDetails) {
    const headers = await createRapidApiSessionKey(date, routeDetails);
    if (headers.has(CONFIG.SESSION_KEY_LOCATION_HEADER)) {
        return headers.get(CONFIG.SESSION_KEY_LOCATION_HEADER).split(/[/]+/).pop();
    } else {
        throw new Error("Session key not found in the response");
    }
}

async function createRapidApiSessionKey(date, routeDetails) {
    const response = await fetch(CONFIG.SESSION_KEY_URL, {
        method: 'POST', 
        headers: {
            [API_CREDENTIALS.API_HOST_HEADER]: API_CREDENTIALS.API_HOST_VALUE,
	        [API_CREDENTIALS.API_KEY_HEADER]: API_CREDENTIALS.API_KEY_VALUE,
            'content-type': 'application/x-www-form-urlencoded'
        },
        body: getSessionKeyPayload(date, routeDetails)
    });
    return await response.headers;
}

export const getSessionKeyPayload = (date, routeDetails) => {
    let request = {
        "inboundDate": "",
        "cabinClass": "",
        "children": "",
        "infants": "",
        "country": "US",
        "currency": "USD",
        "locale": "en-US",
        "originPlace": routeDetails.from,//"SIN-sky",
        "destinationPlace": routeDetails.to,//"KUL-sky",
        "outboundDate": format(date, 'yyyy-MM-dd'),
        "adults": 1
    };

    const payload = Object.keys(request)
        .filter(key => !!request[key])
        .map((key) => key + '=' + encodeURIComponent(request[key]))
        .join('&');

    return payload;
}

export async function pollSessionResults(sessionKey) {
    const iterator = pollSession(sessionKey);
    const allFlights = [];
    let total = 0;
    for await (const flights of iterator) {
        total += flights.Itineraries.length;
        allFlights.push(...flights.Itineraries);
    }
    console.log("Total records... " + total);
    console.log(allFlights);
    return allFlights;
}

async function pollApi(sessionKey, pageIndex) {
    let url = CONFIG.POLL_SESSION_URL + encodeURIComponent(sessionKey);
    url += `?pageIndex=${pageIndex}&pageSize=${PAGE_SIZE}&sortType=price`;

    const response = await fetch(url, {
        method: 'GET', 
        headers: {
            [API_CREDENTIALS.API_HOST_HEADER]: API_CREDENTIALS.API_HOST_VALUE,
	        [API_CREDENTIALS.API_KEY_HEADER]: API_CREDENTIALS.API_KEY_VALUE
        }
    });
    return await response;
}

async function* pollSession(sessionKey) {
    let hasMore = true;
    let pageIndex = 0;
    while (hasMore) {
        const response = await pollApi(sessionKey, pageIndex);
        const json = await response.json();
        hasMore = json.Status !== POLL_SESSION_STATUS.UpdatesComplete;
        yield json;

        pageIndex++;
    }
}
