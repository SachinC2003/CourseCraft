import React, { useState, useEffect } from "react";
import axios from "axios";
import ApplicationCard from "./applicationCard";

export default function ApplicationGrid() {
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('http://localhost:3000/admin/applications');
            
            if (Array.isArray(response.data)) {
                setApplications(response.data);
            } else {
                console.error("Unexpected data format:", response.data);
                setError("Received unexpected data format from the server.");
            }
        } catch (error) {
            console.error("Error fetching applications:", error);
            setError("Failed to fetch applications. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="grid grid-cols-3 gap-4">
            {applications.length > 0 ? (
                applications.map((application) => (
                    <ApplicationCard 
                        key={application._id} 
                        id={application._id}
                        bio={application.bio}
                        qualification={application.qualification}
                        subject={application.subject}
                    />
                ))
            ) : (
                <div>No pending applications found.</div>
            )}
        </div>
    );
}