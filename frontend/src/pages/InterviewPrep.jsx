import React from 'react';
import SparklesText from "../components/ui/sparkles-text";
import { motion } from 'framer-motion';

const InterviewPrep = () => {
  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center">
      <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <SparklesText>Get Your Personalized Roadmap</SparklesText>
            <p className="mt-4 text-lg text-muted-foreground">
              Create a customized learning journey tailored to your goals and pace
            </p>
          </motion.div>
      {/* Grid Background */}
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, purple 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        opacity: 0.15
      }}></div>
      
      {/* Glass Effect Container */}
      <div className="relative w-11/12 h-5/6 backdrop-blur-sm bg-white/10 rounded-xl shadow-2xl border border-white/20 overflow-hidden">
        {/* Header Bar */}
        
        {/* Main Content */}
        <div className="w-full h-[calc(100%-3rem)]">
          <iframe
            src="http://localhost:8501"
            className="w-full h-full"
            title="Streamlit UI"
          ></iframe>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/20 rounded-full filter blur-3xl"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300/20 rounded-full filter blur-3xl"></div>
    </div>
  );
};

export default InterviewPrep;