import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '../../React-Core/SubmitButtons';
import { InputFields } from '../../React-Core/InputField/inputField';



export default function Register(props) {

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://algo-blog-api.herokuapp.com/api/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTf-8",
        "Access-Control-Allow-Origin": "*",
      },

      body: JSON.stringify({
        user: {
          username: user.username,
          email: user.email,
          password: user.password,
        },
      }),
    })
      .then((response) => {
        console.log(response.status);
        if (response.status == 200) {
          props.history.push("/login");
        } else alert("Failed to Register");
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        //e.preventDefault();
        setUser({
          username: user.username,
          email: user.email,
          password: user.password,
        });
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
    <div className="container">
      <h1>Register</h1>
      <div className="mt-5">

      </div>

      <form
        onSubmit={handleSubmit}
      >
       <InputFields labelValue={"Username"} type={"char"} name={"username"} onSelectedChange={handleChange} value={user.username} />
        <InputFields labelValue={"Email"} type={"email"} name={"email"} onSelectedChange={handleChange} value={user.email} />
        <InputFields labelValue={"Password"} type={"password"} name={"password"} onSelectedChange={handleChange} value={user.password} />
        <Button buttonValue={"Sign up"}>
        </Button>
      </form>

      <div align="center">

      </div>
    </div>
  )
}