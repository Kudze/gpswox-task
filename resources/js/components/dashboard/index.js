import React from 'react';
import ReactDOM from 'react-dom';

import Dashboard from "./dashboard";

if (document.getElementById('dashboard')) {
    ReactDOM.render(<Dashboard/>, document.getElementById('dashboard'));
}
