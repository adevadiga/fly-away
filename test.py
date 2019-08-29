import requests

# url = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0"

# payload = "country=US&currency=USD&locale=en-US&originPlace=SFO-sky&destinationPlace=LHR-sky&outboundDate=2019-09-01&adults=1";
# headers = {
#     'x-rapidapi-host': "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
#     'x-rapidapi-key': "9a6fa35695msh80554c9f71bc855p18d1e8jsn491cca04f4aa",
#     'content-type': "application/x-www-form-urlencoded"
#     }

# response = requests.request("POST", url, data=payload, headers=headers)

# print(response.status_code)
# print(response.headers)
# print(response.text)

# location = response.headers.location
url = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/http%3A%2F%2Fpartners.api.skyscanner.net%2Fapiservices%2Fpricing%2Fhk1%2Fv1.0%2Fec18d445-5087-43e0-bea3-3d0cf7994503"

querystring = {"pageIndex":"0","pageSize":"10"}

headers = {
    'x-rapidapi-host': "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
    'x-rapidapi-key': "9a6fa35695msh80554c9f71bc855p18d1e8jsn491cca04f4aa"
    }

response = requests.request("GET", url, headers=headers, params=querystring)

print(response)