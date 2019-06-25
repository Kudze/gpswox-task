import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends React.Component {
    static defaultProps = {
        center: {
            lat: 54.687157,
            lng: 25.279652
        },
        zoom: 8
    };

    render() {
        let mapContainerStyle = {
            height: "calc(100vh - 110px)"
        };

        return (
            <div className={"w-100"} style={{...mapContainerStyle}}>
                <GoogleMapReact
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <AnyReactComponent
                        lat={59.955413}
                        lng={30.337844}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

export default Map;