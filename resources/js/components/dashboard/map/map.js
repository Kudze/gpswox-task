import React from "react";
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"
import {MarkerClusterer} from "react-google-maps/lib/components/addons/MarkerClusterer";

class _Map extends React.Component {
    static defaultProps = {
        center: {
            lat: 54.687157,
            lng: 25.279652
        },
        zoom: 10
    };

    renderMarkers = () => {
        let markers = [];

        this.props.children.forEach(
            (marker, index) => {
                markers.push(
                    <Marker
                        key={index}
                        position={
                            {...marker.props.pos}
                        }
                    />
                )
            }
        );

        return markers;
    };

    render() {
        return (
            <GoogleMap
                defaultZoom={this.props.zoom}
                defaultCenter={{...this.props.center}}
            >
                <MarkerClusterer
                    averageCenter
                    enableRetinaIcons
                    gridSize={60}
                >
                    {this.renderMarkers()}
                </MarkerClusterer>
            </GoogleMap>
        );
    }
}

export default withScriptjs(withGoogleMap(_Map));