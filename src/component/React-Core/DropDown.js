
import { Link, NavLink } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import { Redirect } from 'react-router';
import statusAndRadio from './Data/statusAndRadio.json'
export default function DropDown() {


    const StatusValue = statusAndRadio.map((data) => {


        if (data.Value != "All") {
            return (
                <option key={data.id} value={data.Value}>{data.StatusName}</option>
            )
        }
    })
    return (
        StatusValue
    )

}