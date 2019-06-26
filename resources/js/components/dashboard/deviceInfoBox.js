import React from "react";
import Geocode from "react-geocode";

import InfoBox from "./map/infoBox";
import Spinner from "./spinner";

import {executeAuthorizedAPICall} from "../../api";

class DeviceInfoBox extends React.Component {
    static defaultProps = {
        "id": 0,
        "name": "BMW X5",
        "imei": "527771798195722",
        "latitude": 0,
        "longitude": 0,
        "created_at": "2019-06-26 00:37:46",
        "updated_at": "2019-06-26 00:37:46",
        "pivot": {
            "user_id": 1, "device_id": 21254, "active": 1
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            closestIMEI: null,
            address: null
        };
    }

    componentDidMount() {
        this.updateAddress();
        this.updateClosestComponent();
    };

    updateClosestComponent = () => {
        executeAuthorizedAPICall(
            `device/${this.props.data.id}`
        ).then(
            ({imei}) => {
                this.setState(
                    {
                        closestIMEI: imei
                    }
                );
            }
        )
    };

    updateAddress = () => {
        let setAddress = (address) => {
            this.setState(
                {
                    address: address
                }
            );
        };

        Geocode.fromLatLng(this.props.data.latitude, this.props.data.longitude).then(
            response => {
                setAddress(
                    response.results[0].formatted_address
                );
            },
            () => {
                setAddress(
                    "Unknown"
                );
            }
        );
    };

    render() {
        return this.state.closestIMEI === null || this.state.address === null ? (
            <InfoBox>
                <Spinner/>
            </InfoBox>
        ) : (
            <InfoBox>
                <table className="table table-bordered w-100">
                    <tbody>
                    <tr>
                        <td>Pavadinimas:</td>
                        <td>{this.props.data.name}</td>
                    </tr>
                    <tr>
                        <td>IMEI:</td>
                        <td>{this.props.data.imei}</td>
                    </tr>
                    <tr>
                        <td>Adresas:</td>
                        <td>{this.state.address}</td>
                    </tr>
                    <tr>
                        <td>Artimiausias kitas IMEI:</td>
                        <td>{this.state.closestIMEI}</td>
                    </tr>
                    </tbody>
                </table>
            </InfoBox>
        )
    }
}

export default DeviceInfoBox;