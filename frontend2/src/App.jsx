import {BrowserRouter, Route, Routes} from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Layout from "./pages/layout";
import Landing from "./pages/landing";
import Courses from "./pages/courses";
import Applay from "./pages/applay";
import MyCourses from "./pages/myCourses";
function App() {
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

export default App;
