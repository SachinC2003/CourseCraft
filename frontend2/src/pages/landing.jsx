/*import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">CourseCraft</h1>
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
            <h2 className="text-4xl font-bold text-gray-800">Welcome to CourseCraft</h2>
            <p className="mt-4 text-gray-600">
              Discover a wide range of courses or upload your own as a teacher. 
              Our platform connects students with top-quality educators and classes.
            </p>
            <a href="#features" className="mt-8 inline-block bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600">Learn More</a>
          </div>
          <img src="path-to-your-image2.jpg" alt="Side Image 2" className="w-full md:w-1/4 h-64 rounded-lg shadow-lg mt-4 md:mt-0" />
        </section>

        <section id="features" className="mt-20">
          <h3 className="text-2xl font-bold text-gray-800 text-center">Features</h3>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-bold text-gray-800">Browse Courses</h4>
              <p className="mt-2 text-gray-600">Find the best courses tailored to your needs.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-bold text-gray-800">Upload Courses</h4>
              <p className="mt-2 text-gray-600">Teachers can easily upload and manage their courses.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-bold text-gray-800">Admin Approval</h4>
              <p className="mt-2 text-gray-600">Admins ensure only the best content by approving teacher applications.</p>
            </div>
          </div>
        </section>

        <section id="about" className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-800">About Us</h3>
          <p className="mt-4 text-gray-600">
            At CourseCraft, we are dedicated to bridging the gap between students and educators. 
            Our mission is to provide a seamless platform for discovering, uploading, and managing courses 
            that cater to a diverse range of interests and skills.
          </p>
        </section>

        <section id="contact" className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-800">Contact Us</h3>
          <p className="mt-4 text-gray-600">
            If you have any questions or would like to get in touch, please contact us at:
            <br />
            <strong>Email:</strong> contact@coursecraft.com
            <br />
            <strong>Phone:</strong> (123) 456-7890
            <br />
            <strong>Address:</strong> 123 CourseCraft St, Kolhapur, India
          </p>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;*/
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-gray-800">CourseCraft</h1>
          </div>
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
          <img src="abc.png" alt="Side Image 1" className="w-full md:w-1/4 h-64 rounded-lg shadow-lg mb-4 md:mb-0" />
          <div className="text-center mx-4 md:w-1/2">
            <h2 className="text-4xl font-bold text-gray-800">Welcome to CourseCraft</h2>
            <p className="mt-4 text-gray-600">
              Discover a wide range of courses or upload your own as a teacher. 
              Our platform connects students with top-quality educators and classes.
            </p>
            <a href="#features" className="mt-8 inline-block bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600">Learn More</a>
          </div>
          <img src="path-to-your-image2.jpg" alt="Side Image 2" className="w-full md:w-1/4 h-64 rounded-lg shadow-lg mt-4 md:mt-0" />
        </section>

        <section id="features" className="mt-20">
          <h3 className="text-2xl font-bold text-gray-800 text-center">Features</h3>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-bold text-gray-800">Browse Courses</h4>
              <p className="mt-2 text-gray-600">Find the best courses tailored to your needs.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-bold text-gray-800">Upload Courses</h4>
              <p className="mt-2 text-gray-600">Teachers can easily upload and manage their courses.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-bold text-gray-800">Admin Approval</h4>
              <p className="mt-2 text-gray-600">Admins ensure only the best content by approving teacher applications.</p>
            </div>
          </div>
        </section>

        <section id="about" className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-800">About Us</h3>
          <p className="mt-4 text-gray-600">
            At CourseCraft, we are dedicated to bridging the gap between students and educators. 
            Our mission is to provide a seamless platform for discovering, uploading, and managing courses 
            that cater to a diverse range of interests and skills.
          </p>
        </section>

        <section id="contact" className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-800">Contact Us</h3>
          <p className="mt-4 text-gray-600">
            If you have any questions or would like to get in touch, please contact us at:
            <br />
            <strong>Email:</strong> contact@coursecraft.com
            <br />
            <strong>Phone:</strong> (123) 456-7890
            <br />
            <strong>Address:</strong> 123 CourseCraft St, Kolhapur, India
          </p>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;

