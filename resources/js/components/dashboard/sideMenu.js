import React from 'react';

export default (props) => {
    return <div className={"w-100 vh-75 overflow-auto justify-conent-center"}>
        {props.children}
    </div>
}