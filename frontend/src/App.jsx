import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Layout from "./pages/layout";
import Landing from "./pages/landing";
import Courses from "./pages/courses";
import Applay from "./pages/applay";
import MyCourses from "./pages/myCourses";
import ApplicationGrid from "./components/applicationGrid";
import { userAtom } from "./store/userAtom"
import UploadCourse from "./pages/uplodeCourse";
import Teachers from "./pages/teachers";
import ProtectedRoute from "./components/protectedRoute";


function AppContent() {
  const setUser = useSetRecoilState(userAtom);
  const [isLoading, setIsLoading] = useState(true);
  console.log(import.meta.env)
  console.log(import.meta.env.VITE_BACKEND_URL)

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token from localStorage:", token); // Log the token
    if (token) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        console.log("Full response from /user/me:", response.data);
        if (!response.data.userId) {
          console.error("userId is missing from the response");
          throw new Error("Invalid response from server");
        }
        setUser({ userId: response.data.userId, role: response.data.role || 'user' });
        console.log("User state set:", { userId: response.data.userId, role: response.data.role || 'user' });
      })
      .catch(error => {
        console.error('Error verifying token:', error.response ? error.response.data : error.message);
        localStorage.removeItem('token');
        setUser({ userId: null, role: '' }); // Reset user state on error
      })
      .finally(() => {
        setIsLoading(false);
      });
    } else {
      console.log("No token found in localStorage");
      setIsLoading(false);
    }
  }, [setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />


        {/*************************** * Protected Routes *********************/}
        <Route
          path="/mycourses"
          element={
            <ProtectedRoute allowedRoles={["user", "teacher", "admin"]}>
              <Layout><MyCourses /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <ProtectedRoute allowedRoles={["user", "teacher", "admin"]}>
              <Layout><Courses /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/applay"
          element={
            <ProtectedRoute allowedRoles={["user", "teacher"]}>
              <Layout><Applay /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Layout><ApplicationGrid /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/aplodecourse"
          element={
            <ProtectedRoute allowedRoles={["teacher", "admin"]}>
              <Layout><UploadCourse /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/teachers"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Layout><Teachers /></Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <RecoilRoot>
      <AppContent />
      <ToastContainer />
    </RecoilRoot>
  );
}

export default App;