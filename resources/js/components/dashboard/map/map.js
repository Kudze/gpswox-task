import React from "react";
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"
import {MarkerClusterer} from "react-google-maps/lib/components/addons/MarkerClusterer";
import {InfoBox} from "react-google-maps/lib/components/addons/InfoBox";

import {getGoogleAPIKey} from "../../../api/geo";

class _Map extends React.Component {
    static defaultProps = {
        center: {
            lat: 54.687157,
            lng: 25.279652
        },
        zoom: 5
    };

    constructor(props) {
        super(props);

        this.state = {
            activeMarkerIndex: null
        };
    }

    openInfo = (id) => {
        this.setState(
            {
                activeMarkerIndex: id
            }
        )
    };

    closeInfo = () => {
        this.setState(
            {
                activeMarkerIndex: null
            }
        );
    };

    renderMarkers = () => {
        let markers = [];

        this.props.children.forEach(
            (marker, index) => {
                let inner = null;

                if(index === this.state.activeMarkerIndex)
                    inner = <InfoBox onCloseClick={this.closeInfo}>{marker.props.children}</InfoBox>;

                markers.push(
                    <Marker
                        key={index}
                        position={
                            {...marker.props.pos}
                        }
                        onClick={() => {this.openInfo(index)}}
                        label={marker.props.localIndex.toString()}
                    >
                        {inner}
                    </Marker>
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
                    gridSize={120}
                >
                    {this.renderMarkers()}
                </MarkerClusterer>
            </GoogleMap>
        );
    }
}

export default withScriptjs(withGoogleMap(_Map));