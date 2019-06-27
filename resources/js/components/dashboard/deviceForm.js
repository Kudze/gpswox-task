import React from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

import {executeAuthorizedAPICall} from "../../api";

class DeviceFrom extends React.Component {
    static defaultProps = {
        addDeviceFun: () => {}
    };

    constructor(props) {
        super(props);

        this.state = {
            renderModal: false,
            deviceName: "",
            deviceIMEI: "",
            deviceLatitude: "",
            deviceLongitude: "",
            err: null
        };
    }

    toggleModal = (value) => {
        this.setState(
            {
                renderModal: value,
                deviceName: "",
                deviceIMEI: "",
                deviceLatitude: "",
                deviceLongitude: "",
                err: null
            }
        );
    };

    showModal = () => {
        this.toggleModal(true);
    };

    hideModal = () => {
        this.toggleModal(false);
    };

    showError = (err) => {
        this.setState(
            {
                err: err
            }
        )
    };

    createOrUpdateDevice = () => {
        executeAuthorizedAPICall(
            'device/add',
            {
                name: this.state.deviceName,
                imei: this.state.deviceIMEI,
                lat: this.state.deviceLatitude,
                lng: this.state.deviceLongitude
            }
        ).then(
            (json) => {
                if(json.err !== undefined) {
                    this.showError(json.err);

                    return null;
                }

                return json.device;
            }
        ).then(
            (device) => {
                if(device !== null) {
                    this.hideModal();

                    //Idk if editing device is smart here.
                    //The problem is that it doesn't come here with pivot info.
                    //But i don't want to add one more query to serverside.
                    //So faking data here which will always be true should be *smartish...*
                    //Unless we will want to edit this functionality later.
                    //But theoretically should be fine.
                    console.log(device);
                    this.props.addDeviceFun(
                        {
                            ...device,
                            latitude: parseFloat(device.latitude),
                            longitude: parseFloat(device.longitude),
                            pivot: {
                                active: true
                            }
                        }
                    );
                }
            }
        )
    };

    renderModalError = () => {
        if(this.state.err === null)
            return null;

        return <Alert variant={"danger"}>
            {this.state.err}
        </Alert>
    };

    renderModal = () => {
        return (
            <Modal show={this.state.renderModal} onHide={this.hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Device factory</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.renderModalError()}
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name..."
                                value={this.state.deviceName}
                                onChange={
                                    (event) => {
                                        this.setState(
                                            {
                                                deviceName: event.target.value
                                            }
                                        )
                                    }
                                }
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>IMEI</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter IMEI..."
                                value={this.state.deviceIMEI}
                                onChange={
                                    (event) => {
                                        this.setState(
                                            {
                                                deviceIMEI: event.target.value
                                            }
                                        )
                                    }
                                }
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>GPS Latitude</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Latitude..."
                                value={this.state.deviceLatitude}
                                onChange={
                                    (event) => {
                                        this.setState(
                                            {
                                                deviceLatitude: event.target.value
                                            }
                                        )
                                    }
                                }
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>GPS Longitude</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Longitude..."
                                value={this.state.deviceLongitude}
                                onChange={
                                    (event) => {
                                        this.setState(
                                            {
                                                deviceLongitude: event.target.value
                                            }
                                        )
                                    }
                                }
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.createOrUpdateDevice}>
                        Create
                    </Button>
                    <Button variant="danger" onClick={this.hideModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };

    render() {
        return (
            <>
                {this.renderModal()}
                <div className={"w-100 p-3 text-center"}>
                    <Button
                        variant={"success"}
                        size={"lg"}
                        onClick={this.showModal}
                    >Create Device
                    </Button>
                </div>
            </>
        )
    }
}

export default DeviceFrom;