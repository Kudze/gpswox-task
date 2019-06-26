import React from "react";

import InfoBox from "./map/infoBox";
import Spinner from "./spinner";

/**
 * {"id":21254,
 * "name":"Bart Vandervort",
 * "imei":"527771798195722",
 * "latitude":60.57,
 * "longitude":20.1,
 * "created_at":"2019-06-26 00:37:46",
 * "updated_at":"2019-06-26 00:37:46",
 * "pivot":{"user_id":1,"device_id":21254,"active":1}}
 */
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
            data: null
        };
    }

    componentDidMount = () => {

    };

    render() {
        return this.state.data === null ? (
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
                        <td>@</td>
                    </tr>
                    <tr>
                        <td>Artimiausias kitas IMEI:</td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </InfoBox>
        )
    }
}

export default DeviceInfoBox;