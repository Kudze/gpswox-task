import React from 'react';

import DeviceForm from "./deviceForm";

export default (props) => {
    let renderEmpty = () => {
        return (
            <div
                className={"w-100 d-flex align-items-center justify-content-center text-center"}
                style={{height: "calc(75vh - 80px)"}}
            >
                <h3>Click "Create Device" in order to add some devices!</h3>
            </div>
        )
    };

    let renderList = () => {
        return (
            <div
                className={"w-100 overflow-auto"}
                style={{height: "calc(75vh - 80px)"}}
            >
                {props.children}
            </div>
        )
    };

    return (
        <div
            className={"w-100 vh-75 d-flex flex-column justify-content-between align-items-center"}
            style={
                {
                    backgroundColor: "rgba(0,0,0,0.05)"
                }
            }
        >
            {props.children.length === 0 ? renderEmpty() : renderList()}
            <DeviceForm/>
        </div>
    )
}