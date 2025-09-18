import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function Login() {
  const [error, setError] = useState("");
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/login",
        data
      );
      console.log(response);
      if (response.status == "200") {
        Navigate("/");
      } else {
        setError(response.error);
      }
    } catch (error) {
      console.log("error is:", error);
      setError(error?.response?.data?.error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="username"
            value={data.username}
            onChange={handleChange}
            placeholder="Username"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}

export default Login;
