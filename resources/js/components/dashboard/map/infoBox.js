import React from "react";

export default (props) => {
    return <div
        className={'bg-light d-flex align-items-center justify-content-center p-3'}
        style={
            {
                minWidth: '300px',
                minHeight: '10vh',
                border: 'solid 1px black',
                borderRadius: "15px",
                borderTopLeftRadius: "0"
            }
        }
    >
        {props.children}
    </div>
}