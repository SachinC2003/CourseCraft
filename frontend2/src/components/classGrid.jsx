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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <h1 className="font-bold text-2xl mb-4 col-span-1 md:col-span-2 lg:col-span-3">Courses</h1>
    {courses.length > 0 ? (
      courses.map((course) => (
        <div className="flex justify-center">
          <ClassCard 
            key={course._id} 
            id={course._id}
            title={course.title}
            description={course.description}
            price={course.price}
            role={user.role}
          />
        </div>
      ))
    ) : (
      <div className="col-span-1 md:col-span-2 lg:col-span-3 flex items-center justify-center h-64 text-xl">
        No pending courses found.
      </div>
    )}
  </div>
</div>


  );
}

