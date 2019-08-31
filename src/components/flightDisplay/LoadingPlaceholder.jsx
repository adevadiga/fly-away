import React from "react";
import "./loading.css";

const LoadingPlaceholder = () => {
    return (
        <div className="lds-ellipsis">
            <div/>
            <div/>
            <div/>
            <div/>
        </div>
    );
};

export default LoadingPlaceholder;