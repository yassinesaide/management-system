import React from "react";
import studentBG from "../../public/studentBG.jpg";
import studentBG1 from "@/../public/studentBG1.jpg";
import studentMan from "@/../public/student_man.jpg";
import Image from "next/image";

const Homepage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="w-full bg-blue-600 text-white p-4 shadow-lg">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">Management School</h1>
          <div className="space-x-4">
            <a href="/dashboard/admin" className="hover:underline">
              Management
            </a>
            <a href="/dahsboard/parent" className="hover:underline">
              parents
            </a>
            <a href="/dashboard/student" className="hover:underline">
              students
            </a>
            <a href="/courses" className="hover:underline">
              services
            </a>
            <a href="/dashboard/teacher" className="hover:underline">
              teachers
            </a>
            <a href="/contact" className="hover:underline">
              Contact Us
            </a>
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="p-2 rounded bg-white text-gray-800"
          />
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col items-center mt-10 cursor-pointer">
        <h2 className="text-3xl font-bold mb-4 animate-bounce">
          Welcome to Our School!
        </h2>
        <p className="text-lg text-center mb-4">
          Providing quality education and fostering a love for learning.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl p-4">
          {/* Animated Images */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
            <Image
              src={studentBG}
              alt="About Us"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold">Manage your school</h3>
              <p>Learn more about our mission and values.</p>
              <a
                href="/dashboard/admin"
                className="text-blue-600 hover:underline"
              >
                Read More
              </a>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
            <Image
              src={studentBG1}
              alt="Courses"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold">services</h3>
              <p>Explore the services we offer for all ages.</p>
              <a href="/courses" className="text-blue-600 hover:underline">
                View Courses
              </a>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
            <Image
              src={studentMan}
              alt="Contact Us"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold">Contact Us</h3>
              <p>Get in touch for any inquiries.</p>
              <a href="/contact" className="text-blue-600 hover:underline">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-blue-600 text-white p-4 mt-10">
        <p className="text-center">© 2024 Our School. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
