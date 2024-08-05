import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import { useRecoilValue } from "recoil";
import InputBox from "../components/inputBox";
import Button from "../components/button";
import axios from "axios";
import { userAtom } from "../store/userAtom";

export default function UploadCourse() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const navigate = useNavigate();
    const user = useRecoilValue(userAtom);

    useEffect(() => {
        console.log("Current user state:", user);
    }, [user]);

    return (
        <div className="p-10">
            <h2 className="font-bold text-3xl mb-6">Upload Course</h2>
            <div className="m-10 bg-slate-300 p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputBox
                    label="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Enter the course title"
                />
                <InputBox
                    label="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Enter the course description"
                />
                <InputBox
                    label="Price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="Enter the course price"
                />
            </div>
            <div className="mt-4 flex justify-center">
                <Button
                    label="Upload"
                    onClick={async () => {
                        console.log('Attempting to upload with user ID:', user.userId);
                        if (!user.userId) {
                            console.error('User ID is not set. Aborting API call.');
                            alert('Please log in before uploading a course.');
                            return;
                        }
                        try {
                            const token = localStorage.getItem('token');
                            console.log("Token being sent:", token);
                            const response = await axios.post(
                                "http://localhost:3000/teacher/aplodcourse",
                                { title, description, price },
                                { 
                                    headers: { 
                                        userId: user.userId,
                                        Authorization: `Bearer ${token}`,
                                        'Content-Type': 'application/json'
                                    } 
                                }
                            );
                            console.log('Upload response:', response.data);
                            toast.success("Course Uplode Successfully")
                            navigate("/courses");
                        } catch (error) {
                            console.error('Upload error:', error.response ? error.response.data : error);
                            //alert(error.response?.data?.msg || "An error occurred while uploading the course. Please try again.");
                            toast.error("Failed to Uplode Course")
                        }
                    }}
                />
            </div>
        </div>
    );
}
