import React from "react";

class DeviceFrom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            renderModal: false
        };
    }

    renderModal = () => {

    };

    render() {
        return (
            <>
                {this.state.renderModal ? this.renderModal() : null}
                <div className={"w-100 p-3 text-center"}>
                    <button className={"btn btn-lg btn-success"}>Create Device</button>
                </div>
            </>
        )
    }
}

export default DeviceFrom;