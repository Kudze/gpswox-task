import React from "react";

import SideMenu from "./sideMenu";
import Spinner from "./spinnerLarge";
import InfoBox from "./deviceInfoBox";

import {executeAuthorizedAPICall} from "../../api";
import Map from "./map/geoMap";
import Marker from "./map/marker";
import DeviceItem from "./deviceItem";

//Precalculated utility to help speed up things.
const radToDeg = (Math.PI / 180);

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            markedIndexes: []
        };
    }

    updateLongestDevicesMarks = () => {
        let calculateLatLongDistance = (lat1, lng1, lat2, lng2) => {
            const R = 6371e3; // metres
            const f1 = lat1 * radToDeg;
            const f2 = lat2 * radToDeg;
            const dF = (lat2-lat1) * radToDeg;
            const dL = (lng2-lng1) * radToDeg;

            const a = Math.sin(dF/2) * Math.sin(dF/2) +
                Math.cos(f1) * Math.cos(f2) *
                Math.sin(dL/2) * Math.sin(dL/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

            return  R * c;
        };

        let data = this.state.data;

        let longestDist = null;
        let markIndexes = [];

        data.forEach(
            (device1, index1) => {
                data.forEach(
                    (device2, index2) => {
                        if(device1 !== device2) {
                            let d = calculateLatLongDistance(
                                device1.latitude,
                                device1.longitude,
                                device2.latitude,
                                device2.longitude
                            );

                            if(longestDist === null || longestDist < d) {
                                longestDist = d;
                                markIndexes = [index1, index2];
                            }
                        }
                    }
                )
            }
        );

        this.setState(
            {
                markedIndexes: markIndexes
            }
        );
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
                );

                this.updateLongestDevicesMarks();
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
                        marked={this.state.markedIndexes.includes(index)}
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
                    <SideMenu addDeviceFun={this.addDeviceToExistingInfo}>
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