import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { MdError } from "react-icons/md";

type FormData = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
};

const SignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });
  const [error, setError] = useState<string | null>(null);
  const nav = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //console.log(formData);
    await axios
      .post("http://localhost:8000/auth/signup", formData)
      .then((res) => {
        //console.log(res.data);
        nav("/signin");
      })
      .catch((err) => {
        console.log(err.response.data);
        setError(err.response.data.message);
      });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className=" max-w-96 w-3/4 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center text-white gap-3 p-4 px-8"
      >
        <h1 className="text-2xl font-bold mb-2">
          SignUp <span className="text-blue-500">Chat App</span>
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
            type="email"
            className="grow "
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label className="input w-full input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>

        <div className="flex w-full items-center justify-start gap-4">
          <p className="bg-gray-800 rounded-lg px-4 py-2 text-gray-300">
            Gender
          </p>
          <label className="label cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className=" bg-gray-300 checkbox  mr-2"
              value={"male"}
              checked={formData.gender == "male"}
              name="gender"
              onChange={handleChange}
            />
            <span className="label-text text-white">Male</span>
          </label>
          <label className="label cursor-pointer ">
            <input
              type="checkbox"
              defaultChecked
              className="checkbox mr-2 bg-gray-300"
              value="female"
              checked={formData.gender == "female"}
              name="gender"
              onChange={handleChange}
            />
            <span className="label-text text-white">Female</span>
          </label>
        </div>

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
            type="password"
            className="grow"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
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
            type="password"
            className="grow"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </label>
        <p className="w-full">
          Already have an account,{" "}
          <Link to="/login">
            <span className="text-blue-400 font-semibold">log in</span>
          </Link>
        </p>
        <button
          type="submit"
          className="btn bg-blue-500 border-none text-white text-lg w-full"
        >
          Sign Up
        </button>
        {error && (
          <div
            role="alert"
            className="alert alert-error bg-red-600 rounded-md py-3"
          >
            <MdError className="text-gray-200 text-2xl" />
            <span className="text-gray-200">{error}</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default SignUp;
