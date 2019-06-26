import React from "react";

export default () => {
    return (
        <div className="w-100 vh-75 d-flex justify-content-center align-items-center">
            <div className="spinner-border spinner-border-xl" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}