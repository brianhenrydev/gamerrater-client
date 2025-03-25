import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const [loginCred, setLoginCred] = useState({
    username: "",
    password: "",
  });
  const existDialog = useRef();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/login`, {
      method: "POST",
      body: JSON.stringify(loginCred),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((authInfo) => {
        if (authInfo.valid) {
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
        <form className="form--login" onSubmit={handleLogin}>
          <h1 className="text-4xl mt-7 mb-3">Rock of Ages</h1>
          <h2 className="text-xl mb-10">Please sign in</h2>
          <fieldset className="mb-4">
            <label htmlFor="inputEmail"> Username</label>
            <input
              type="username"
              id="inputUsername"
              value={loginCred.username}
              onChange={(evt) =>
                setLoginCred({
                  ...loginCred,
                  username: evt.target.value,
                })
              }
              className="form-control"
              placeholder="Username"
              required
              autoFocus
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="inputPassword"> Password </label>
            <input
              type="password"
              id="inputPassword"
              value={loginCred.password}
              onChange={(evt) =>
                setLoginCred({
                  ...loginCred,
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
              Sign in
            </button>
          </fieldset>
        </form>
      </section>
      <div className="loginLinks">
        <section className="link--register">
          <Link
            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
            to="/register"
          >
            Not a member yet?
          </Link>
        </section>
      </div>
    </main>
  );
};
