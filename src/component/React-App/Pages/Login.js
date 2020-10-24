import { Link, NavLink } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import { Redirect } from 'react-router';

import { Button } from '../../React-Core/SubmitButtons';
import { InputFields } from '../../React-Core/InputField/inputField';




export default function Login(props) {

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const [isLogin, setIsLogin] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("https://algo-blog-api.herokuapp.com/api/users/login", {
            method: "POST",
            mode: "cors",
            "Access-Control-Allow-Origin": "*",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                user: {
                    email: user.email,
                    password: user.password,
                },
            }),
        })
            .then((response) => {
                console.log(response.status);
                if (response.status == 200) {
                    setUser(user);
                    props.history.push("/home");
                } else alert("user is not registered");
            })

            .then((json) => {
                //alert(json.user)
            });
    };



    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        }
        )
    }

    return (
        <>
            <div className="container">
                <h1>Login</h1><br />
                <div>
                    <Link to="/register">
                        Need an Account?
                </Link>
                </div><br />

                <form onSubmit={handleSubmit}>
                    <InputFields labelValue={"Email"} type={"email"} name={"email"} onSelectedChange={handleChange} value={user.email} />
                    <InputFields labelValue={"Password"} type={"password"} name={"password"} onSelectedChange={handleChange} value={user.password} />
                    <Button buttonValue={"Login"}></Button>
                </form>
            </div>

        </>
    )
}