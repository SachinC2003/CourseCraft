/*import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import InputBox from "../components/inputBox";
import Button from "../components/button";
import axios from "axios";
import { userAtom } from "../store/userAtom";

export default function Applay() {
    const [bio, setBio] = useState("");
    const [qualifications, setQualifications] = useState("");
    const [subject, setSubject] = useState("");
    const navigate = useNavigate();
    const user = useRecoilValue(userAtom);

    useEffect(() => {
        console.log("Current user state:", user);
    }, [user]);
    return (
        <div className="p-10">
            <h2 className="font-bold text-3xl mb-6">Apply For Classes</h2>
            <div className="m-10 bg-slate-300 p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputBox
                    label="Bio"
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    placeholder="Enter your bio"
                />
                <InputBox
                    label="Qualifications"
                    value={qualifications}
                    onChange={e => setQualifications(e.target.value)}
                    placeholder="Enter your qualifications"
                />
                <InputBox
                    label="Subject"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    placeholder="Enter your subject"
                />
            </div>
            <div className="mt-4 flex justify-center">
                <Button
                    label="Apply"
                    onClick={async () => {
                        console.log('Attempting to apply with user ID:', user.userId);
                        if (!user.userId) {
                            console.error('User ID is not set. Aborting API call.');
                            alert('Please log in before applying.');
                            return;
                        }
                        try {
                            const token = localStorage.getItem('token');
                            console.log("Token being sent:", token);
                            const response = await axios.post(
                            "http://localhost:3000/user/applay",
                            { bio, qualifications, subject },
                            { 
                                headers: { 
                                userId : user.userId,
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/json'
                                } 
                            }
                            );
                            console.log('Apply response:', response.data);
                            navigate("/courses");
                        } catch (error) {
                            console.error('Apply error:', error.response ? error.response.data : error);
                            alert(error.response?.data?.msg || "An error occurred while applying. Please try again.");
                        }
                    }}
                />
            </div>
        </div>
    );
}*/
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import InputBox from "../components/inputBox";
import Button from "../components/button";
import axios from "axios";
import { userAtom } from "../store/userAtom";

export default function Applay() {
    const [bio, setBio] = useState("");
    const [qualifications, setQualifications] = useState("");
    const [subject, setSubject] = useState("");
    const navigate = useNavigate();
    const user = useRecoilValue(userAtom);

    useEffect(() => {
        console.log("Current user state:", user);
    }, [user]);

    return (
        <div className="p-4 md:p-10">
            <h2 className="font-bold text-2xl md:text-3xl mb-6">Apply For Classes</h2>
            <div className="bg-slate-300 p-4 md:p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputBox
                    label="Bio"
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    placeholder="Enter your bio"
                />
                <InputBox
                    label="Qualifications"
                    value={qualifications}
                    onChange={e => setQualifications(e.target.value)}
                    placeholder="Enter your qualifications"
                />
                <InputBox
                    label="Subject"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    placeholder="Enter your subject"
                />
            </div>
            <div className="mt-4 flex justify-center">
                <Button
                    label="Apply"
                    onClick={async () => {
                        console.log('Attempting to apply with user ID:', user.userId);
                        if (!user.userId) {
                            console.error('User ID is not set. Aborting API call.');
                            alert('Please log in before applying.');
                            return;
                        }
                        try {
                            const token = localStorage.getItem('token');
                            console.log("Token being sent:", token);
                            const response = await axios.post(
                                "http://localhost:3000/user/applay",
                                { bio, qualifications, subject },
                                { 
                                    headers: { 
                                        userId: user.userId,
                                        Authorization: `Bearer ${token}`,
                                        'Content-Type': 'application/json'
                                    } 
                                }
                            );
                            console.log('Apply response:', response.data);
                            navigate("/courses");
                        } catch (error) {
                            console.error('Apply error:', error.response ? error.response.data : error);
                            alert(error.response?.data?.msg || "An error occurred while applying. Please try again.");
                        }
                    }}
                />
            </div>
        </div>
    );
}

