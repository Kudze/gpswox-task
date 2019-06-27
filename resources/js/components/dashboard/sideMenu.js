import React from 'react';

import DeviceForm from "./deviceForm";

export default (props) => {
    return (
        <div
            className={"w-100 vh-75 d-flex flex-column justify-content-between align-items-center"}
            style={
                {
                    backgroundColor: "rgba(0,0,0,0.05)"
                }
            }
        >
            <div className={"w-100 overflow-auto justify-conent-center"} style={{height: "calc(75vh - 80px)"}}>
                {props.children}
            </div>
            <DeviceForm/>
        </div>
    )
}