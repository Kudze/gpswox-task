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
        "onActiveChange": () => {
        }
    };

    render() {
        return (
            <div className={"d-block"}>
                <div className="d-flex w-100 align-items-center justify-content-start">
                    <div style={{height: "50px", width: "50px"}}>
                        <input className="d-block" type="checkbox"
                               style={{height: "50px", width: "50px"}}
                               checked={this.props.data.pivot.active}
                               onChange={this.props.onActiveChange}
                        />
                    </div>
                    <div className={"ml-4"}>
                        <h3>{this.props.data.name}</h3>
                        <p>{this.props.data.imei}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default DeviceItem;