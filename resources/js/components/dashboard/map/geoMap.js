import React from "react";
import {geolocated} from "react-geolocated";

import Map from "./map"
import Spinner from "./../spinner";

let GeoMap = (props) => {

    return !props.isGeolocationAvailable || !props.isGeolocationEnabled ? (
        <Map
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{height: `100%`}}/>}
            containerElement={<div className={"w-100 vh-75"}/>}
            mapElement={<div style={{height: `100%`}}/>}
        >
            {props.children}
        </Map>
    ) : props.coords === null ? (
        <Spinner/>
    ) : (
        <Map
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{height: `100%`}}/>}
            containerElement={<div className={"w-100 vh-75"}/>}
            mapElement={<div style={{height: `100%`}}/>}
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