import React from 'react';
import ReactDOM from 'react-dom';

import Dashboard from "./dashboard";

import {setJWTToken} from "./../../api";
import {setGoogleAPIKey} from "../../api/geo";

if (document.getElementById('dashboard')) {
    let el = document.getElementById('dashboard');
    let token = el.getAttribute("jwt_token");
    let googleKey = el.getAttribute("google_key");

    setJWTToken(token);
    setGoogleAPIKey(googleKey);

    ReactDOM.render(<Dashboard/>, el);
}
