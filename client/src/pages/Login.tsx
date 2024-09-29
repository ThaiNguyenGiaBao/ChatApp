import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { MdError } from "react-icons/md";
import { useUserStore } from "../zustand/userStore";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const nav = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios
      .post("http://localhost:8000/auth/signin", formData)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          console.log(res.data);
          setUser(res.data);
          nav("/");
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        setError(err.response.data.message);
      });

    console.log(formData);
  };

  return (
    <div className=" max-w-96 w-3/4 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center text-white gap-3 p-4 px-8"
      >
        <h1 className="text-2xl font-bold mb-2">
          Login <span className="text-blue-500">Chat App</span>
        </h1>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            value={formData.email}
            onChange={handleChange}
            type="email"
            className="grow "
            placeholder="Email"
            name="email"
          />
        </label>

        <label className="input w-full input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            value={formData.password}
            onChange={handleChange}
            type="password"
            className="grow"
            placeholder="Password"
            name="password"
          />
        </label>
        <p className="w-full">
          Don't have an account?{" "}
          <Link to="/signup">
            <span className="text-blue-400 font-semibold">sign up</span>
          </Link>
        </p>
        <button
          type="submit"
          className="btn bg-blue-500 border-none text-white w-full text-lg"
        >
          Log in
        </button>
        {error && (
          <div
            role="alert"
            className="alert alert-error bg-red-600 rounded-md py-3"
          >
            <MdError className="text-gray-200 text-2xl" />
            <span className="text-gray-200 font-semibold">{error}</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
