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
            <div className={"d-block px-2 py-2"} style={this.props.marked ? {backgroundColor: "rgba(0,0,0,0.25)"} : {}}>
                <div className="d-flex w-100 align-items-center justify-content-start">
                    <div style={{height: "50px", width: "50px"}}>
                        <input className="d-block" type="checkbox"
                               style={{height: "50px", width: "50px"}}
                               checked={this.props.data.pivot.active}
                               onChange={this.props.onActiveChange}
                        />
                    </div>
                    <div className={"ml-4"}>
                        <h3>{this.props.data.name} {this.props.marked ? "(Marked)" : ""}</h3>
                        <p className={"mb-0"}>{this.props.data.imei}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default DeviceItem;