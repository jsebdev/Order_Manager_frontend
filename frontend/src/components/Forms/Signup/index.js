import React from "react";

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
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="username">Name</label>
          <input type="text" name="username" placeholder="Juano" required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="juano@carrancho.com"
            name="email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" required />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export { Signup };
