import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div>
      <h1>Landing Page</h1>
      <p>hiiiiiiiiiiiiiiiiiiiiiiiiiiiii</p>
      <button>
        <Link to="/signin">Sign In</Link>
      </button>
      <button>
        <Link to="/signup">Sign Up</Link>
      </button>
    </div>
  );
}
