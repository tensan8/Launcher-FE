import backArrow from "../../images/back_arrow.svg";
import { To, useNavigate } from 'react-router-dom';
import * as React from 'react';

function BackButton(props: { backPath: To; }) {
    let navigate = useNavigate();

    return(
        <div className="my-auto">
            <img src={backArrow} alt="Back Arrow" className="h-7 cursor-pointer" onClick={(e) => {navigate(props.backPath)}}/>
        </div>
    )
}

export default BackButton;