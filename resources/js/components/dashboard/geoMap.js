import React from "react";
import {geolocated} from "react-geolocated";

import Map from "./map"

let GeoMap = (props) => {

    return !this.props.isGeolocationAvailable || !this.props.isGeolocationEnabled ? (
        <Map>
            {props.children}
        </Map>
    ) : this.props.coords ? (
        <Map
            center={
                {
                    lat: this.props.coords.latitude,
                    lon: this.props.coords.longitude
                }
            }
        >
            {props.children}
        </Map>
    );
};

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(GeoMap);