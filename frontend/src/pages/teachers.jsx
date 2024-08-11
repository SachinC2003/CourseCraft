import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchTeachers();
    }
  }, [token]);

  const handleDelete = async (teacherId) => {
    try {
      await axios.delete(`http://localhost:3000/admin/teacher/${teacherId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTeachers((prevTeachers) => prevTeachers.filter(teacher => teacher._id !== teacherId));
    } catch (error) {
      console.error("Error deleting teacher:", error);
      setError("Failed to delete teacher. Please try again later.");
    }
  }

  const fetchTeachers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:3000/admin/teachers', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Response data:', response.data);
      if (Array.isArray(response.data.teachers)) {
        setTeachers(response.data.teachers);
      } else {
        console.error("Unexpected data format:", response.data);
        setError("Received unexpected data format from the server.");
      }
    } catch (error) {
      console.error("Error fetching teachers:", error);
      setError("Failed to fetch teachers. Please try again later.");
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
    <div className="p-4">
      {teachers.length > 0 ? (
        teachers.map((teacher) => (
          <div
            key={teacher._id}
            className="flex flex-col sm:flex-row items-center justify-between bg-white shadow-md rounded-lg p-4 mb-4 w-full"
          >
            <div className="flex-1 mr-10 ml-10">
              <h2 className="text-xl font-bold mb-2">{teacher.bio}</h2>
              <p className="text-gray-600">Qualifications: {teacher.qualifications}</p>
              <p className="text-gray-600">Subjects: {teacher.subjects.join(', ')}</p>
            </div>
            <button
              onClick={() => handleDelete(teacher._id)}
              className="self-end mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-600">No teachers found.</div>
      )}
    </div>
  );
}

export default Teachers;
