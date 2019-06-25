import React from 'react';
import ReactDOM from 'react-dom';
import Map from "./map";

let Dashboard = () => {
    return (
        <Map>

        </Map>
    )
};

if (document.getElementById('dashboard')) {
    ReactDOM.render(<Dashboard/>, document.getElementById('dashboard'));
}
