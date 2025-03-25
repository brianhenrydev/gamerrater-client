import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export const Register = () => {
  const existDialog = useRef();
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    username: "",
  });

  const handleRegister = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/register`, {
      method: "POST",
      body: JSON.stringify({
        ...newUser,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((authInfo) => {
        if (authInfo && authInfo.token) {
          localStorage.setItem("gamer_token", JSON.stringify(authInfo));
          navigate("/");
        } else {
          existDialog.current.showModal();
        }
      });
  };

  return (
    <main className="container--login">
      <dialog className="dialog dialog--auth" ref={existDialog}>
        <div>User does not exist</div>
        <button
          className="button--close"
          onClick={(e) => existDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <section>
        <form className="form--login" onSubmit={handleRegister}>
          <h1 className="text-4xl mt-7 mb-3">Rock of Ages</h1>
          <h2 className="text-xl mb-10">Register new account</h2>
          <fieldset className="mb-4">
            <label htmlFor="firstName"> First name </label>
            <input
              type="text"
              id="firstName"
              value={newUser.first_name}
              onChange={(evt) =>
                setNewUser({
                  ...newUser,
                  first_name: evt.target.value,
                })
              }
              className="form-control"
              placeholder=""
              required
              autoFocus
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="lastName"> Last name </label>
            <input
              type="text"
              id="lastName"
              value={newUser.last_name}
              onChange={(evt) =>
                setNewUser({ ...newUser, last_name: evt.target.value })
              }
              className="form-control"
              placeholder=""
              required
              autoFocus
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="username"> Username </label>
            <input
              type="text"
              id="username"
              value={newUser.username}
              onChange={(evt) =>
                setNewUser({ ...newUser, username: evt.target.value })
              }
              className="form-control"
              placeholder=""
              required
              autoFocus
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="inputEmail"> Email address </label>
            <input
              type="email"
              id="inputEmail"
              value={newUser.email}
              onChange={(evt) =>
                setNewUser({
                  ...newUser,
                  email: evt.target.value,
                })
              }
              className="form-control"
              placeholder="Email address"
              required
              autoFocus
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="inputPassword"> Password </label>
            <input
              type="password"
              id="inputPassword"
              value={newUser.password}
              onChange={(evt) =>
                setNewUser({
                  ...newUser,
                  password: evt.target.value,
                })
              }
              className="form-control"
              placeholder="Password"
            />
          </fieldset>
          <fieldset>
            <button
              type="submit"
              className="button p-3 rounded-md bg-blue-800 text-blue-100"
            >
              Register
            </button>
          </fieldset>
        </form>
      </section>
      <div className="loginLinks">
        <section className="link--register">
          <Link
            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
            to="/login"
          >
            Already have an account?
          </Link>
        </section>
      </div>
    </main>
  );
};
