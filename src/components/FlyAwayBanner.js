import React from 'react';
import Logo from "../assets/FlyAway.png";
const FlyAwayHeader = () => {
    return (
        <div className="header">
            <img src={Logo} alt="fly-away" className="logo"/>;
        </div>
    );
    
};

export default FlyAwayHeader;