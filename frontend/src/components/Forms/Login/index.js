import React from "react";
import { useNavigate } from "react-router-dom";

function Login({ login }) {
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    const log = await login(
      event.target.email.value,
      event.target.password.value
    );
    if (log) {
      navigate("/dashboard");
    }
  };

  return (
    <React.Fragment>
      <div>
        <form onSubmit={onSubmit}>
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
    </React.Fragment>
  );
}

export { Login };
