import React, { useEffect, useState } from "react";
import axios from 'axios'
import ClassCard from "./classCard";

export default function ClassGrid() {
  const [courses, setCourses] = useState([]);
  const [token, setToken] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
        setToken(storedToken);
    }
    fetchCourses(storedToken);
}, []);

const fetchCourses = async (token) => {
    try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:3000/user/courses', {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (Array.isArray(response.data.courses)) {
            setCourses(response.data.courses);
        } else {
            console.error("Unexpected data format:", response.data);
            setError("Received unexpected data format from the server.");
        }
    } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to fetch courses. Please try again later.");
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {courses.length > 0 ? (
                courses.map((course) => (
                    <ClassCard 
                        key={course._id} 
                        id={course._id}
                        title={course.bio}
                        description={course.qualifications}
                        price={course.subjects}
                        userId={course.user?._id}
                        token={token}
                    />
                ))
            ) : (
                <div>No pending courses found.</div>
            )}
    </div>
  );
}
