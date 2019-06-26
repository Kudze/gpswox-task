import React from "react";
import GoogleMapReact from 'google-map-react';

class Map extends React.Component {
    static defaultProps = {
        center: {
            lat: 54.687157,
            lng: 25.279652
        },
        zoom: 10
    };

    render() {
        return (
            <div className={"w-100 vh-75"}>
                <GoogleMapReact
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    {this.props.children}
                </GoogleMapReact>
            </div>
        );
    }
}

export default Map;