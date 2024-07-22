import {BrowserRouter, Route, Routes} from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/home";
import Layout from "./pages/layout";
import Landing from "./pages/landing";
import Courses from "./pages/courses";
import Applay from "./pages/applay";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/courses" element={<Layout><Courses /></Layout>} />
        <Route path="/applay" element={<Layout><Applay /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
