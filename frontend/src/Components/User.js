import React from 'react';


export default function(props) {
    return (
        <div className={`user ${props.id}`}>{props.user}</div>
    );
}