import React, { useState } from "react";
import Button from "./button";
import axios from "axios";

const ApplicationCard = (props) => {
    const handleApprove = async () => {
        try {
            await axios.put(`/api/applications/${props.id}`, { status: 'approved' });
            // You might want to add some feedback to the user here, like:
            alert('Application approved successfully!');
            // Or update the UI in some way
        } catch (error) {
            console.error("Error approving application:", error);
            alert('Failed to approve application. Please try again.');
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 h-60 w-80">
            <h2 className="text-lg font-bold mb-2">Bio - {props.bio}</h2>
            <p className="text-gray-600 mb-2 pt-1">Qualification - {props.qualification}</p>
            <p className="text-gray-600 mb-2 pt-1">Subject - {props.subject}</p>
            <Button 
                label="Approve Application"
                onClick={handleApprove}
            /> 
        </div>
    );
};

export default ApplicationCard;