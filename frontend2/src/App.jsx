import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { useEffect } from 'react';
import axios from 'axios';
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Layout from "./pages/layout";
import Landing from "./pages/landing";
import Courses from "./pages/courses";
import Applay from "./pages/applay";
import MyCourses from "./pages/myCourses";
import { userAtom } from "./store/userAtom"

function AppContent() {
  const setUser = useSetRecoilState(userAtom);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token in localStorage:", token);
    if (token) {
      console.log("Attempting to verify token...");
      axios.get('http://localhost:3000/user/me', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        console.log("User verified:", response.data);
        setUser({ userId: response.data.userId });
        console.log("User state after verification:", { userId: response.data.userId });
      })
      .catch(error => {
        console.error('Error verifying token:', error.response ? error.response.data : error);
        localStorage.removeItem('token');
      });
    } else {
      console.log("No token found in localStorage");
    }
  }, [setUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/mycourses" element={<Layout><MyCourses /></Layout>} />
        <Route path="/courses" element={<Layout><Courses /></Layout>} />
        <Route path="/applay" element={<Layout><Applay /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <RecoilRoot>
      <AppContent />
    </RecoilRoot>
  );
}

export default App;