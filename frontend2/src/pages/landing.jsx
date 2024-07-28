import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Your Project Name</h1>
          <ul className="flex space-x-4">
            <li><a href="#features" className="text-gray-600 hover:text-gray-800">Features</a></li>
            <li><a href="#about" className="text-gray-600 hover:text-gray-800">About</a></li>
            <li><a href="#contact" className="text-gray-600 hover:text-gray-800">Contact</a></li>
            <li>
              <Link to="/signin">
                <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
                  Sign In
                </button>
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <button className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700">
                  Sign Up
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="container mx-auto mt-10 p-4">
        <section className="flex flex-col md:flex-row justify-between items-center">
          <img src="path-to-your-image1.jpg" alt="Side Image 1" className="w-full md:w-1/4 h-64 rounded-lg shadow-lg mb-4 md:mb-0" />
          <div className="text-center mx-4 md:w-1/2">
            <h2 className="text-4xl font-bold text-gray-800">Welcome to Your Project</h2>
            <p className="mt-4 text-gray-600">This is a simple and elegant landing page template using React and Tailwind CSS.</p>
            <a href="#features" className="mt-8 inline-block bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600">Learn More</a>
          </div>
          <img src="path-to-your-image2.jpg" alt="Side Image 2" className="w-full md:w-1/4 h-64 rounded-lg shadow-lg mt-4 md:mt-0" />
        </section>

        <section id="features" className="mt-20">
          <h3 className="text-2xl font-bold text-gray-800 text-center">Features</h3>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-bold text-gray-800">Feature One</h4>
              <p className="mt-2 text-gray-600">Description of feature one.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-bold text-gray-800">Feature Two</h4>
              <p className="mt-2 text-gray-600">Description of feature two.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-bold text-gray-800">Feature Three</h4>
              <p className="mt-2 text-gray-600">Description of feature three.</p>
            </div>
          </div>
        </section>

        <section id="about" className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-800">About Us</h3>
          <p className="mt-4 text-gray-600">
            We are a team of passionate developers and designers dedicated to creating
            innovative solutions for our clients. Our mission is to provide high-quality
            services that exceed our clients' expectations. We believe in the power of
            technology to transform businesses and make the world a better place.
          </p>
        </section>

        <section id="contact" className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-800">Contact Us</h3>
          <p className="mt-4 text-gray-600">
            If you have any questions or would like to get in touch, please contact us at:
            <br />
            <strong>Email:</strong> contact@yourproject.com
            <br />
            <strong>Phone:</strong> (123) 456-7890
            <br />
            <strong>Address:</strong> 123 Your Project St, City, Country
          </p>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
