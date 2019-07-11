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
                );
            }
        );
    };

    addDeviceToExistingInfo = (device) => {
        let data = [...this.state.data];

        let indexToUpdate = data.length;

        data.forEach(
            (_device, index) => {
                if(_device.imei === device.imei) indexToUpdate = index;
            }
        );

        data[indexToUpdate] = device;

        this.setState(
            {
                data: data
            }
        );

        this.updateLongestDevicesMarks()
    };

    componentDidMount = () => {
        this.updateInfo();
    };

    toggleDeviceActive = (index) => {
        let data = [...this.state.data];
        let id = this.state.data[index].id;
        let active = !this.state.data[index].pivot.active;

        data[index] = {
            ...this.state.data[index],
            pivot: {
                ...this.state.data[index].pivot,
                active: active
            }
        };

        this.setState(
            {
                data: data
            }
        );

        //We dont need to send user data. Since user will be fetched from JWT token.
        executeAuthorizedAPICall(
            `device/toggle/${id}/${active ? 1 : 0}`
        );
    };

    renderItems = () => {
        let markers = [];

        this.state.data.forEach(
            (device, index) => {
                markers.push(
                    <DeviceItem
                        key={index}
                        data={{...device}}
                        onActiveChange={
                            () => {
                                this.toggleDeviceActive(index)
                            }
                        }
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
                if (device.pivot.active)
                    markers.push(
                        <Marker
                            key={index}
                            localIndex={index}
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
                    <SideMenu onDeviceAdded={this.updateInfo}>
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