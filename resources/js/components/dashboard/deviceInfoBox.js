import React from "react";
import Geocode from "react-geocode";

import InfoBox from "./map/infoBox";
import Spinner from "./spinner";

import {executeAuthorizedAPICall} from "../../api";

class DeviceInfoBox extends React.Component {
    static defaultProps = {
        "data": {
            "id": 0,
            "name": "BMW X5",
            "imei": "527771798195722",
            "latitude": 0,
            "longitude": 0,
            "address": "Unknown",
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            closestIMEI: null
        };
    }

    componentDidMount() {
        this.updateClosestComponent();
    };

    updateClosestComponent = () => {
        executeAuthorizedAPICall(
            `device/info/${this.props.data.id}`
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

    render() {
        return this.state.closestIMEI === null ? (
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
                        <td>{this.props.data.address}</td>
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