import React from "react";

import {GeoMap} from "./map";
import SideMenu from "./sideMenu";
import Spinner from "./spinner";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        };
    }

    render() {
        return this.state.loading ? (
            <Spinner/>
        ) : (
            <div className={"row"}>
                <div className={"col-3"}>
                    <SideMenu>

                    </SideMenu>
                </div>
                <div className={"col-9"}>
                    <GeoMap>

                    </GeoMap>
                </div>
            </div>
        );
    }
}

export default Dashboard;