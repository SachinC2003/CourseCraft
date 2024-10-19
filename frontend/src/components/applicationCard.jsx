import React, { useState } from "react";
import Button from "./button";
import axios from "axios";
import {toast} from "react-toastify"

const ApplicationCard = (props) => {
    const handleApprove = async () => {
        try {
            console.log(props)
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/admin/approve/${props.id}`, {}, {
                headers: { Authorization: `Bearer ${props.token}` }
            });
            toast.success("Application approved successfully!")
        } catch (error) {
            console.error("Error approving application:", error);
            toast.error('Failed to approve application. Please try again.')
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 h-60 w-80">
            <h2 className="text-lg font-bold mb-2">Bio - {props.bio}</h2>
            <p className="text-gray-600 mb-2 pt-1">Qualification - {props.qualifications}</p>
            <p className="text-gray-600 mb-2 pt-1">Subject - {props.subjects.join(', ')}</p>
            <Button 
                label="Approve Application"
                onClick={handleApprove}
            /> 
        </div>
    );
};

export default ApplicationCard;