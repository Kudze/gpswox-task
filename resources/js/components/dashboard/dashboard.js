import React from "react";

import SideMenu from "./sideMenu";
import Spinner from "./spinner";

import {executeAuthorizedAPICall} from "../../api";
import Map from "./map/geoMap";
import Marker from "./map/marker";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        };
    }

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

    componentDidMount = () => {
        this.updateInfo();
    };

    renderMarkers = () => {
        let markers = [];

        this.state.data.forEach(
            (marker, index) => {
                markers.push(
                    <Marker
                        key={index}
                        pos={
                            {
                                lat: marker.latitude,
                                lng: marker.longitude
                            }
                        }
                    />
                )
            }
        );

        return markers;
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
                    <Map>
                        {this.renderMarkers()}
                    </Map>
                </div>
            </div>
        );
    }
}

export default Dashboard;