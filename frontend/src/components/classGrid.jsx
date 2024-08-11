import React, { useEffect, useState } from "react";
import axios from 'axios';
import ClassCard from "./classCard";
import { useRecoilValue } from "recoil";
import { userAtom } from "../store/userAtom";

export default function ClassGrid() {
  const [courses, setCourses] = useState([]);
  const [token, setToken] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const user = useRecoilValue(userAtom);

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
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="font-bold text-2xl mb-4">Courses</h1>
      {courses.length === 0 ? (
        <div className="flex items-center justify-center h-[calc(100vh-200px)] text-xl">
          Failed to fetch courses. Please try again later.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div key={course._id} className="flex justify-center">
              <ClassCard 
                id={course._id}
                title={course.title}
                description={course.description}
                price={course.price}
                enrollement={course.enrollement}
                imageUrls={course.imageUrls}
                role={user.role}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}