import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import InputBox from "../components/inputBox";
import Button from "../components/button";
import axios from "axios";
import { userAtom } from "../store/userAtom";

export default function Applay() {
    const [grade, setGrade] = useState("");
    const [qualifications, setQualifications] = useState("");
    const [subject, setSubject] = useState("");
    const [experience, setExperience] = useState(""); // Changed from number to string
    const [languages, setLanguages] = useState(""); // Added for languages known
    const navigate = useNavigate();
    const user = useRecoilValue(userAtom);

    useEffect(() => {
        console.log("Current user state:", user);
    }, [user]);

    return (
        <div className="md:p-1">
            <h2 className="font-bold text-2xl mb-4 col-span-1 md:col-span-2 lg:col-span-3">
                Apply For Classes
            </h2>
            <div className="bg-slate-300 p-4 md:p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputBox
                    label="Preferred Grade Level"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    placeholder="Grade (e.g., High School, College)"
                />
                <InputBox
                    label="Qualifications"
                    value={qualifications}
                    onChange={(e) => setQualifications(e.target.value)}
                    placeholder="Enter your qualifications"
                />
                <InputBox
                    label="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter your subject"
                />
                <InputBox
                    label="Experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="Enter your experience (in years)"
                />
                <InputBox
                    label="Languages Known"
                    value={languages}
                    onChange={(e) => setLanguages(e.target.value)}
                    placeholder="Enter languages you know (comma-separated)"
                />
            </div>
            <div className="mt-4 flex justify-center">
                <Button
                    label="Apply"
                    onClick={async () => {
                        console.log("Attempting to apply with user ID:", user.userId);
                        if (!user.userId) {
                            console.error("User ID is not set. Aborting API call.");
                            alert("Please log in before applying.");
                            return;
                        }
                        try {
                            const token = localStorage.getItem("token");
                            console.log("Token being sent:", token);
                            const response = await axios.post(
                                `${import.meta.env.VITE_BACKEND_URL}/user/applay`,
                                { grade, qualifications, subject, 
                                    experience: parseInt(experience), languages },
                                {
                                    headers: {
                                        userId: user.userId,
                                        Authorization: `Bearer ${token}`,
                                        "Content-Type": "application/json",
                                    },
                                }
                            );
                            toast.success("Applied for teaching successfully");
                            navigate("/courses");
                        } catch (error) {
                            console.error(
                                "Apply error:",
                                error.response ? error.response.data : error
                            );
                            toast.error("Failed to apply for teaching");
                        }
                    }}
                />
            </div>
        </div>
    );
}
