import React from "react";

import SideMenu from "./sideMenu";
import Spinner from "./spinnerLarge";
import InfoBox from "./deviceInfoBox";

import {executeAuthorizedAPICall} from "../../api";
import Map from "./map/geoMap";
import Marker from "./map/marker";
import DeviceItem from "./deviceItem";

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

    renderItems = () => {
        let markers = [];

        this.state.data.forEach(
            (device, index) => {
                markers.push(
                    <DeviceItem
                        key={index}
                        data={{...device}}
                        marked={false}
                    />
                )
            }
        );

        return markers;
    };

    renderMarkers = () => {
        let markers = [];

        this.state.data.forEach(
            (device, index) => {
                markers.push(
                    <Marker
                        key={index}
                        pos={
                            {
                                lat: device.latitude,
                                lng: device.longitude
                            }
                        }
                    >
                        <InfoBox data={{...device}}/>
                    </Marker>
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
                        {this.renderItems()}
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