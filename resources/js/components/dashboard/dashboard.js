import React from "react";

import {GeoMap} from "./map";
import SideMenu from "./sideMenu";
import Spinner from "./spinner";

import {executeAuthorizedAPICall} from "../../api";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        };
    }

    componentDidMount () {
        this.updateInfo();
    };

    updateInfo = () => {
        executeAuthorizedAPICall(
            'user/devices'
        ).then(
            (json) => {
                this.setState(
                    {
                        data: json
                    }
                )
            }
        );
    };

    renderMarkers = () => {

    };

    render() {
        return this.state.data === null ? (
            <Spinner/>
        ) : (
            <div className={"row"}>
                <div className={"col-3"}>
                    <SideMenu>

                    </SideMenu>
                </div>
                <div className={"col-9"}>
                    <GeoMap>
                        {this.renderMarkers()}
                    </GeoMap>
                </div>
            </div>
        );
    }
}

export default Dashboard;