import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, FileText, MapPin } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-indigo-600 rounded-full"></div>
              </div>
              <div className="ml-4 text-xl font-bold text-indigo-600">PrepWise</div>
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-8">
              <a href="/resume" className="flex items-center text-gray-700 hover:text-indigo-600">
                <FileText className="w-5 h-5 mr-1" />
                Resume
              </a>
              <Link to="/interview-prep" className="flex items-center text-gray-700 hover:text-indigo-600">
                <BookOpen className="w-5 h-5 mr-1" />
                Interview Prep
              </Link>
              <Link to="/roadmap" className="flex items-center text-gray-700 hover:text-indigo-600">
                <MapPin className="w-5 h-5 mr-1" />
                Roadmap
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-6">
                Your Career Companion for Interview Success
              </h1>
              <p className="text-lg mb-8">
                Master your interviews, build stunning resumes, and follow personalized roadmaps to achieve your career goals.
              </p>
              <div className="flex space-x-4">
                <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90">
                  Start Practice
                </button>
                <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600">
                  View Roadmap
                </button>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <BookOpen className="w-8 h-8 text-indigo-600 mb-4" />
                <h3 className="font-semibold text-gray-800 mb-2">Mock Interviews</h3>
                <p className="text-gray-600">Practice with AI-powered mock interviews</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FileText className="w-8 h-8 text-indigo-600 mb-4" />
                <h3 className="font-semibold text-gray-800 mb-2">Resume Builder</h3>
                <p className="text-gray-600">Create professional resumes that stand out</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <MapPin className="w-8 h-8 text-indigo-600 mb-4" />
                <h3 className="font-semibold text-gray-800 mb-2">Career Roadmap</h3>
                <p className="text-gray-600">Follow personalized learning paths</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-8 h-8 text-indigo-600 mb-4">📈</div>
                <h3 className="font-semibold text-gray-800 mb-2">Track Progress</h3>
                <p className="text-gray-600">Monitor your improvement over time</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div className="text-gray-600">
              © 2025 PrepWise. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="/privacy" className="text-gray-600 hover:text-indigo-600">Privacy Policy</a>
              <a href="/terms" className="text-gray-600 hover:text-indigo-600">Terms of Service</a>
              <a href="/contact" className="text-gray-600 hover:text-indigo-600">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;