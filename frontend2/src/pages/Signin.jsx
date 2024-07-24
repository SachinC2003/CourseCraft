import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <h1 className="font-bold text-3xl pt-5">SignIn</h1>
          <p className="pt-2">Enter Your Information To Login into Account</p>
          <div className="border-t border-gray-500 my-4"></div>
          <div className="pt-1">
            <div className="flex justify-left font-bold">Email</div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="abc@gmail.com"
              className="w-full pt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="pt-3 pb-4">
            <div className="flex justify-left font-bold">Password</div>
            <input
              type="password" // Change to password for security
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="w-full pt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            className="w-full rounded-lg bg-slate-900 text-white font-bold h-10"
            onClick={async () => {
              try {
                const response = await axios.post("http://localhost:3000/user/signin", {
                  username,
                  password,
                });
                localStorage.setItem("token", response.data.token);
                navigate("/courses");
              } catch (error) {
                console.error('Signup error:', error); // Log the error for debugging
                if (error.response && error.response.status === 409) {
                  alert("User already exists. Please use a different email.");
                } else {
                  alert("An error occurred. Please try again.");
                }
              }
            }}
          >
            Signin
          </button>
          <p className="pt-2">
            Do not have an account? <Link to="/signup" className="text-blue-500">Sign UP</Link>
          </p>
        </div>
      </div>
    </div>
  );
}