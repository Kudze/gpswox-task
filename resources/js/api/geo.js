import Geocode from "react-geocode";

let _apiKey = null;

export function setGoogleAPIKey(api) {
    _apiKey = api;
    console.log(api);

    Geocode.setApiKey(api);
}

export function getGoogleAPIKey() {
    console.log(_apiKey + "  aaa");
    return _apiKey;
}