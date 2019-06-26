import React from "react";
import {geolocated} from "react-geolocated";

import Map from "./map"

let GeoMap = (props) => {

    return !props.isGeolocationAvailable || !props.isGeolocationEnabled ? (
        <Map>
            {props.children}
        </Map>
    ) : props.coords === null ? (
        <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
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