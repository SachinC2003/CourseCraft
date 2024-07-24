import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen flex flex-col items-center justify-between p-4">
      <div className="text-center mt-16">
        <h1 className="text-5xl font-bold text-white mb-4">Welcome to EduMarket</h1>
        <p className="text-lg text-gray-200 mb-6">Find and buy the best classes to upgrade your skills</p>
        <p className="text-md text-gray-100 max-w-2xl mx-auto">
          EduMarket is your one-stop destination for online learning. With thousands of courses ranging from web development to data science, you can find the perfect class to improve your skills and advance your career.
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mt-8">
        <Link to="/signin">
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
            Sign In
          </button>
        </Link>
        <Link to="/signup">
          <button className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700">
            Sign Up
          </button>
        </Link>
      </div>

      <div className="mt-10 flex justify-between w-full mb-16">
        <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white m-4">
          <img className="w-full" src="https://via.placeholder.com/250x350" alt="Course 1" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Learn Web Development</div>
            <p className="text-gray-700 text-base">Build amazing websites and web apps using HTML, CSS, and JavaScript.</p>
          </div>
        </div>
        <div className="max-w-md rounded overflow-hidden shadow-lg bg-white m-4">
          <img className="w-full" src="https://via.placeholder.com/350x250" alt="Course 2" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Master Data Science</div>
            <p className="text-gray-700 text-base">Learn to analyze data, build predictive models, and more.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
