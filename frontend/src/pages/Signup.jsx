import { useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify';
import { useNavigate, Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../store/userAtom"; // Adjust the path if necessary
import {z} from "zod";

const zodSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
})

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission

     // Validate inputs with Zod schema
  const validation = zodSchema.safeParse({ email: username, password });

  if (!validation.success) {
    const errorMessages = validation.error.errors.reduce((acc, curr) => {
      if (curr.path[0] === "email") acc.email = curr.message;
      if (curr.path[0] === "password") acc.password = curr.message;
      return acc;
    }, {});

    if (errorMessages.email) toast.error(`Email Error: ${errorMessages.email}`);
    if (errorMessages.password) toast.error(`Password Error: ${errorMessages.password}`);
    return;
  }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, {
        username,
        password,
      });
      console.log("Response:", response.data);
      
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setUser({ 
          userId: response.data.userId, 
          role: response.data.role 
        });
        console.log("User state set:", { userId: response.data.userId, role: response.data.role });
        toast.success("Signup Successfully");
        navigate("/courses");
      } else {
        console.error("Authentication successful but token is missing in the response");
        toast.error("Authentication successful, but there was an issue. Please try again.");
      }
    } catch (error) {
      console.error('Authentication error:', error.response ? error.response.data : error);
      toast.error("Failed to Signup");
    }
  };

  return (
    <div className="bg-cover bg-center h-screen flex items-center justify-center" style={{ backgroundImage: 'url("https://source.unsplash.com/random/1600x900")' }}>
      <div className="flex flex-col justify-center items-center bg-white bg-opacity-75 p-10 rounded-lg shadow-lg">
        <h1 className="font-bold text-4xl text-gray-800">Sign Up</h1>
        <p className="pt-2 text-gray-600">Enter Your Information To Create Account</p>
        <div className="border-t border-gray-300 my-4 w-full"></div>
        <form onSubmit={handleSignup} className="w-full">
          <div className="pt-1">
            <div className="flex justify-left font-bold text-gray-700">Email</div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="abc@gmail.com"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="pt-3 pb-4">
            <div className="flex justify-left font-bold text-gray-700">Password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 text-white font-bold py-2 hover:bg-blue-700 transition-colors"
          >
            Sign Up
          </button>
        </form>
        <p className="pt-4 text-gray-600">
          Already have an account? <Link to="/signin" className="text-blue-500 hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}