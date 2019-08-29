import React from "react";
import "./styles.css";

const LoadingPlaceholder = () => {
    return (
        <div class="lds-ellipsis">
            <div/>
            <div/>
            <div/>
            <div/>
        </div>
    );
};

export default LoadingPlaceholder;