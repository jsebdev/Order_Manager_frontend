import React from "react";
import "../Forms.scss";

function Signup() {
  const onSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch("http://localhost:5000/api/v1/login", opts)
      .then((res) => {
        if (res.status === 200) return res.json();
        alert("there has been an error, status code: ", res.status);
      })
      .then()
      .catch((error) => {
        console.log("There was a tragic error", error);
      });
  };

  return (
    <form className="container-sm mt-5" onSubmit={onSubmit}>
      <div className="row justify-content-center">
        <div className="col-10 col-md-6 col-lg-5 align-items-center d-flex flex-column px-5 py-3 form-decorate">
          <div className="d-flex flex-column w-100 my-4">
            <label htmlFor="name">Name:</label>
            <input type="Text" placeholder="Juano" name="name" required />
          </div>
          <div className="d-flex flex-column w-100 my-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="juano@carrancho.com"
              name="email"
              required
            />
          </div>
          <div className="d-flex flex-column w-100 my-4">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" required />
          </div>
          <button type="submit">Log In</button>
        </div>
      </div>
    </form>
  );
}

export { Signup };
