import Geocode from "react-geocode";

let _apiKey = null;

export function setGoogleAPIKey(api) {
    _apiKey = api;

    Geocode.setApiKey(api);
}

export function getGoogleAPIKey() {
    return _apiKey;
}