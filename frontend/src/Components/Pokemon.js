import React from 'react';
import "./Pokemon.css"

export default function(props) {
    return (
        <div className={`pokemon ${props.type}`}>{props.type}{props.children}</div>
    );
}