import React from "react";

export default (props) => {
    return <div
        className={'bg-light d-flex align-items-center justify-content-center'}
        style={
            {
                width: '10vh',
                minWidth: '200px',
                height: '10vh',
                minHeight:'200px',
                border: 'solid 1px black',
                borderRadius: "15px",
                borderTopLeftRadius: "0"
            }
        }
    >
        {props.children}
    </div>
}