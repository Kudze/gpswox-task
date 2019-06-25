import React from 'react';
import ReactDOM from 'react-dom';

import Map from "./map";
import SideMenu from "./sideMenu";

let Dashboard = () => {
    return (
        <div className={"row"}>
            <div className={"col-3"}>
                <SideMenu>

                </SideMenu>
            </div>
            <div className={"col-9"}>
                <Map>

                </Map>
            </div>
        </div>
    )
};

if (document.getElementById('dashboard')) {
    ReactDOM.render(<Dashboard/>, document.getElementById('dashboard'));
}
