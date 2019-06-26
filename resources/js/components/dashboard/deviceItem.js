import React from "react";

class DeviceItem extends React.Component {
    static defaultProps = {
        "data": {
            "id": 0,
            "name": "BMW X5",
            "imei": "527771798195722",
            "pivot": {
                "active": true
            }
        },
        "marked": false,
        "onActiveChange": (value) => {
        }
    };

    render() {
        return (
            <div className={"d-block"}>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
                    <div class={"mr-4"}>
                        <h3>{this.props.data.name}</h3>
                        <p>{this.props.data.imei}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default DeviceItem;