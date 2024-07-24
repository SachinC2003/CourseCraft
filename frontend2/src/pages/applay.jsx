import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import toast from 'react-hot-toast';
import InputBox from "../components/inputBox";
import Button from "../components/button";
import axios from "axios";
export default function Applay() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div className="p-10">
            <h2 className="font-bold text-3xl mb-6">Apply For Classes</h2>
            <div className="m-10 bg-slate-300 p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputBox
                    label="Name"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Enter your name"
                />
                <InputBox
                    label="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your email"
                />
            </div>
            <div className="mt-4 flex justify-center">
                <Button
                    label="Apply"
                    onClick={async () => {
                        try {
                            const response = await axios.post("http://localhost:3000/user/applay", {
                                username,
                                password,
                            });
                            
                          navigate("/courses");
                        } catch (error) {
                          console.error('applay error:', error); 
                        }
                      }}
                />
            </div>
        </div>
    );
}
