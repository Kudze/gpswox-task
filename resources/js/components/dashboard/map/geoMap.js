import React from "react";
import {geolocated} from "react-geolocated";

import Map from "./map"
import Spinner from "./../spinner";

let GeoMap = (props) => {

    return !props.isGeolocationAvailable || !props.isGeolocationEnabled ? (
        <Map>
            {props.children}
        </Map>
    ) : props.coords === null ? (
        <Spinner/>
    ) : (
        <Map
            center={
                {
                    lat: props.coords.latitude,
                    lng: props.coords.longitude
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