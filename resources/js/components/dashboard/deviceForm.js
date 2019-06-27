import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

import {executeAuthorizedAPICall} from "../../api";

class DeviceFrom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            renderModal: false,
            deviceName: null,
            deviceIMEI: null,
            deviceLatitude: null,
            deviceLongitude: null
        };
    }

    toggleModal = (value) => {
        this.setState(
            {
                renderModal: value
            }
        );
    };

    showModal = () => {
        this.toggleModal(true);
    };

    hideModal = () => {
        this.toggleModal(false);
    };

    createOrUpdateDevice = () => {

    };

    renderModal = () => {
        return (
            <Modal show={this.state.renderModal} onHide={this.hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Device factory</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name..."
                                value={this.state.deviceName}
                                onChange={
                                    (value) => {
                                        this.setState(
                                            {
                                                deviceName: value
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
                                    (value) => {
                                        this.setState(
                                            {
                                                deviceIMEI: value
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
                                    (value) => {
                                        this.setState(
                                            {
                                                deviceLatitude: value
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
                                    (value) => {
                                        this.setState(
                                            {
                                                deviceLongitude: value
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