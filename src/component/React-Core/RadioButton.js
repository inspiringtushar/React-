import { Link, NavLink } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import statusAndRadio from './Data/statusAndRadio.json'

export default function RadioButton({onSelectValue}) {
    const StatusValue = statusAndRadio.map((data) => {
        let { id, Value, StatusName } = data;
        return (
            <>
                <input
                    type="radio"
                    id={id}
                    name="status"
                    key={id}
                    value={Value}
                    onClick={(e) => onSelectValue(e)}
                />
                <label>{StatusName}</label>
            </>
        );
    });
    return StatusValue
};