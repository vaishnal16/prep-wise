import React from 'react';

function InterviewPrep() {
  return (
    <div className="w-full h-screen bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 flex items-center justify-center">
      <div className="w-11/12 h-5/6 bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200">
        <iframe
          src="http://localhost:8501"
          className="w-full h-full"
          title="Streamlit UI"
        ></iframe>
      </div>
    </div>
  );
}

export default InterviewPrep;
