let _token = null;

/**
 * Saves JWT token for API calls.
 *
 * @param jwt
 */
export function setJWTToken(jwt) {
    _token = jwt;
}

/**
 * Executes unauthorized API call to local server.
 *
 * @param method
 * @param url
 * @param body
 * @returns {Promise<Response>}
 */
export function executeAPICall(url, body) {
    return fetch(`${location.protocol}//${location.host}/api/${url}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            body
        )
    }).then(
        response => response.json()
    )
}

/**
 * Executes authorized API call to local server.
 *
 * @param method
 * @param url
 * @param body
 * @returns {Promise<Response>}
 */
export function executeAuthorizedAPICall(url, body) {
    if(_token === null) console.error("Authorized API call was executed without JWT token!");

    return fetch(`${location.protocol}//${location.host}/api/${url}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {...body, token: _token}
        )
    }).then(
        response => response.json()
    )
}