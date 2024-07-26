import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../store/userAtom"; // Adjust the path if necessary

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);

  const handleSignup = async () => {
    try {
      console.log("Attempting signup with:", { username, password });
      const response = await axios.post("http://localhost:3000/user/signup", {
        username,
        password,
      });
      console.log("Signup response:", response.data);
      
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        console.log("Token saved to localStorage:", response.data.token);
        
        // If userId is not in the response, we'll extract it from the token
        let userId = response.data.userId;
        if (!userId) {
          // Decode the token to get the userId
          const decodedToken = JSON.parse(atob(response.data.token.split('.')[1]));
          userId = decodedToken.userId;
        }
        
        setUser({ userId: userId });
        console.log("User state set:", { userId: userId });
        
        navigate("/courses");
      } else {
        console.error("Signup successful but token is missing in the response");
        alert("Signup successful, but there was an issue logging you in. Please try signing in.");
      }
    } catch (error) {
      console.error('Signup error:', error.response ? error.response.data : error);
      alert(error.response?.data?.msg || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <h1 className="font-bold text-3xl pt-5">SignUp</h1>
          <p className="pt-2">Enter Your Information To Create Account</p>
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
            onClick={handleSignup}
          >
            Signup
          </button>
          <p className="pt-2">
            Already have an account? <Link to="/signin" className="text-blue-500">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
