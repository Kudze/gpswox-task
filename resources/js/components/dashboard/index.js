import React from 'react';
import ReactDOM from 'react-dom';

import Dashboard from "./dashboard";

import {setJWTToken} from "./../../api";

if (document.getElementById('dashboard')) {
    let el = document.getElementById('dashboard');
    let token = el.getAttribute("jwt_token");

    setJWTToken(token);

    ReactDOM.render(<Dashboard/>, el);
}
