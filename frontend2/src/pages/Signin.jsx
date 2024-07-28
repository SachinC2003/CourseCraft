/*import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../store/userAtom";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);

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
                const response = await axios.post("http://localhost:3000/user/signin", { // or /signup
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
                  navigate("/courses");
                } else {
                  console.error("Authentication successful but token is missing in the response");
                  alert("Authentication successful, but there was an issue. Please try again.");
                }
              } catch (error) {
                console.error('Authentication error:', error.response ? error.response.data : error);
                alert(error.response?.data?.msg || "An error occurred. Please try again.");
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
}*/
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../store/userAtom";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);

  const handleSignin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/user/signin", {
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
        navigate("/courses");
      } else {
        console.error("Authentication successful but token is missing in the response");
        alert("Authentication successful, but there was an issue. Please try again.");
      }
    } catch (error) {
      console.error('Authentication error:', error.response ? error.response.data : error);
      alert(error.response?.data?.msg || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-cover bg-center h-screen flex items-center justify-center" style={{ backgroundImage: 'url("https://source.unsplash.com/random/1600x900")' }}>
      <div className="flex flex-col justify-center items-center bg-white bg-opacity-75 p-10 rounded-lg shadow-lg">
        <h1 className="font-bold text-4xl text-gray-800">Sign In</h1>
        <p className="pt-2 text-gray-600">Enter Your Information To Login into Account</p>
        <div className="border-t border-gray-300 my-4 w-full"></div>
        <div className="pt-1 w-full">
          <div className="flex justify-left font-bold text-gray-700">Email</div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="abc@gmail.com"
            className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="pt-3 pb-4 w-full">
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
          className="w-full rounded-lg bg-blue-600 text-white font-bold py-2 hover:bg-blue-700 transition-colors"
          onClick={handleSignin}
        >
          Sign In
        </button>
        <p className="pt-4 text-gray-600">
          Do not have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
