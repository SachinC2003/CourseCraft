import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import InputBox from "../components/inputBox";
import Button from "../components/button";
export default function Applay() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleApplyClick = () => {
        if (!name || !email) {
            //toast.error('Please fill out all fields');
            return;
        }

        //toast.success('Form submitted successfully');
        navigate('/home');
    };
    return (
        <div className="p-10">
            <h2 className="font-bold text-3xl mb-6">Apply For Classes</h2>
            <div className="m-10 bg-slate-300 p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputBox
                    label="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter your name"
                />
                <InputBox
                    label="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                />
                <InputBox
                    label="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter your name"
                />
                <InputBox
                    label="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                />
            </div>
            <div className="mt-4 flex justify-center">
                <Button
                    label="Apply"
                    onClick={handleApplyClick()}
                />
            </div>
        </div>
    );
}
