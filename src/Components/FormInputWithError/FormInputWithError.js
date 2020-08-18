import React from 'react';
import './FormInputWithError.css';

const formInputWithError = () => (
    <div>
        <span className="Email">Email*</span>
        <input className="Reactangle-6" type="text" autoFocus></input>
        <span className="EmailCantBeEmpty">Email can not be empty</span>
    </div>
);

export default formInputWithError