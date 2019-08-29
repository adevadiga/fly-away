export async function createRapidApiSessionKey(day) {
    //day = "2019-09-01",
    const url = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0';
    const data = {
        // "inboundDate": "",
        // "cabinClass": "",
        // "children": "",
        // "infants": "",
        "country": "US",
        "currency": "USD",
        "locale": "en-US",
        "originPlace": "SFO-sky",
        "destinationPlace": "LHR-sky",
        "outboundDate": day,
        "adults": 1
    };

    const payload = "country=US&currency=USD&locale=en-US&originPlace=SFO-sky&destinationPlace=LHR-sky&outboundDate=2019-09-01&adults=1";
    const response = await fetch(url, {
        method: 'POST', 
        headers: {
            'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
	        'x-rapidapi-key': '9a6fa35695msh80554c9f71bc855p18d1e8jsn491cca04f4aa',
            'content-type': 'application/x-www-form-urlencoded'
        },
        body: payload
    });
    return await response.headers;
}

export async function getSessionKeyForFlightQuery() {
    const createSessionHeaders = await createRapidApiSessionKey();
    if (createSessionHeaders.has("location")) {
        const location = createSessionHeaders.get("location");
        return location.split(/[/]+/).pop();
    } else {
        throw new Error("Session key not found in the response");
    }

    // return createRapidApiSessionKey()
    //     .then(headers => {
    //         if (headers.has("location")) {
    //             let location = headers.get("location");
    //             return location.split(/[/]+/).pop();
    //         } else {
    //             throw new Error("Session key not found in the response");
    //         }
    //     })
    //     .catch(err => console.log(err));
}

export async function pollResult(key) {
    let url = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/'+encodeURIComponent(key);
    url += "?pageIndex=0&pageSize=10&sortType=price";
    const response = await fetch(url, {
        method: 'GET', 
        headers: {
            'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
	        'x-rapidapi-key': '9a6fa35695msh80554c9f71bc855p18d1e8jsn491cca04f4aa'
        }
    });
    return await response;
}

// export function* pollResult2(key, pageIndex) {

//     const result = pollResult(key, pageIndex);
//     result.then(response => {
//         const foo =  result.json();
//         yield foo;
//         const isCompleted = foo.Status === "UpdatesComplete";
//         yield pollResult2(key, ++pageIndex);
//     })
//     .catch(err => {
//         console.log(err);
//     });
//     // let url = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/'+encodeURIComponent(key);
//     // url += "?pageIndex=0&pageSize=10";
//     // const response = await fetch(url, {
//     //     method: 'GET', 
//     //     headers: {
//     //         'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
// 	//         'x-rapidapi-key': '9a6fa35695msh80554c9f71bc855p18d1e8jsn491cca04f4aa'
//     //     }
//     // });
//     // const json = await response.json();
//     // console.log(json);
//     // return json;
// }

async function* fetchFlights(key) {
    let hasMore = true;

    while (hasMore) {
        const response = await pollResult(key);
        const json = await response.json();
        hasMore = json.Status !== "UpdatesComplete";
        yield json;
    }
}

export async function fetchAllFlights(key) {
    const iterator = fetchFlights(key);
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