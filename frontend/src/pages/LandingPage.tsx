"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import "../index.css";
import Confetti from "../components/ui/confetti";
import { NeonGradientCard } from "../components/ui/neon-gradient-card";
import Particles from "../components/ui/particles";
import ScrollProgress from "../components/ui/scroll-progress";

import WordPullUp from "../components/ui/word-pull-up";
import { BentoGrid } from "../components/ui/bento-grid";
import Marquee from "../components/ui/marquee";
import Navbar from "../components/ui/navbar";
import TypingAnimation from "../components/ui/typing-animation";




const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "PrepWise transformed my interview preparation. The mock interviews were incredibly realistic!",
    img: "/api/placeholder/32/32"
  },
  {
    name: "Jill",
    username: "@jill",
    body: "The skill tracking feature helped me identify and improve my weak areas. Highly recommended!",
    img: "/api/placeholder/32/32"
  },
  {
    name: "John",
    username: "@john",
    body: "The personalized learning paths made my career transition so much smoother.",
    img: "/api/placeholder/32/32"
  },
  {
    name: "Jane",
    username: "@jane",
    body: "Outstanding resource library! Everything I needed was just a click away.",
    img: "/api/placeholder/32/32"
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "PrepWise's structured approach helped me land my dream job. Thank you!",
    img: "/api/placeholder/32/32"
  },
  {
    name: "James",
    username: "@james",
    body: "The progress tracking features kept me motivated throughout my journey.",
    img: "/api/placeholder/32/32"
  }
];

// Split reviews for alternate scrolling
const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

// Review Card Component
const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure className={cn(
      // Base styles
      "relative w-64 cursor-pointer overflow-hidden rounded-xl p-4 mx-2",
      // Updated border and background styles for better visibility
      "border-2 border-gray-700/50",
      "bg-gray-900/80 backdrop-blur-sm",
      // Hover effects
      "hover:border-gray-500/50 hover:bg-gray-800/90",
      "transition-all duration-300",
      // Dark mode specific styles
      "dark:border-gray-600/50 dark:hover:border-gray-400/50"
    )}>
      <div className="flex flex-row items-center gap-2">
        <img 
          className="rounded-full ring-2 ring-gray-700/50" 
          width="32" 
          height="32" 
          alt={name} 
          src={img} 
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-gray-400">
            {username}
          </p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-gray-300">
        {body}
      </blockquote>
    </figure>
  );
};
function App() {
  const [showDialog, setShowDialog] = useState(false);
  const [confettiTrigger, setConfettiTrigger] = useState(false);
  const navigate=useNavigate();

  const handleConfetti = () => {
    setConfettiTrigger(true);
    setTimeout(() => setConfettiTrigger(false), 3000);
  };

  const handleGetStarted = () => {
    navigate("/auth");
  };

  return (
    <div className="relative font-inter bg-black text-white min-h-screen">
      <Navbar />
      <Particles 
        className="absolute inset-0 -z-10"
        quantity={50}
        staticity={50}
        ease={50}
      />
      {/* Scroll Progress */}
      <ScrollProgress />

      {/* Background Particles */}
      

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900">
        <div className="text-center space-y-6 max-w-4xl px-4">
          <h1 className="text-4xl md:text-7xl font-bold mb-4 drop-shadow-lg">
            
            <TypingAnimation>
              Welcome to PrepWise
            </TypingAnimation>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 drop-shadow-md max-w-2xl mx-auto">
            Your Ultimate Career Companion for Interview Success and Professional Growth
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button
              onClick={handleGetStarted}
              className="px-8 py-4 bg-white text-gray-800 font-semibold rounded-full shadow-lg hover:scale-110 transition-transform"
            >
              Get Started
            </button>
            <a
              href="#features"
              className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full shadow-lg hover:bg-white/10 transition-all"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 bg-black w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 drop-shadow-lg">
          <WordPullUp>Features You’ll Love</WordPullUp>
        </h2>
        <BentoGrid>
          <NeonGradientCard
            className="max-w-sm mx-auto"
            gradientFrom="#FF6A00"
            gradientTo="#FF4F58"
            textColor="#FFFFFF"
            backgroundColor="#1a1a1a"
          >
            <h3 className="text-xl font-bold mb-2 text-white drop-shadow-md">
              Skill Progress Tracker
            </h3>
            <p className="text-white/90">
              Monitor and improve your skillsets seamlessly.
            </p>
          </NeonGradientCard>
          <NeonGradientCard
            className="max-w-sm mx-auto"
            gradientFrom="#2E8B57"
            gradientTo="#3CB371"
            textColor="#FFFFFF"
            backgroundColor="#1a1a1a"
          >
            <h3 className="text-xl font-bold mb-2 text-white drop-shadow-md">
              Mock Interviews
            </h3>
            <p className="text-white/90">
              Simulate interviews to boost your confidence.
            </p>
          </NeonGradientCard>
          <NeonGradientCard
            className="max-w-sm mx-auto"
            gradientFrom="#8A2BE2"
            gradientTo="#9370DB"
            textColor="#FFFFFF"
            backgroundColor="#1a1a1a"
          >
            <h3 className="text-xl font-bold mb-2 text-white drop-shadow-md">
              Learning Paths
            </h3>
            <p className="text-white/90">
              Get personalized learning paths tailored to your goals.
            </p>
          </NeonGradientCard>
          <NeonGradientCard
            className="max-w-sm mx-auto"
            gradientFrom="#FF6347"
            gradientTo="#FF4500"
            textColor="#FFFFFF"
            backgroundColor="#1a1a1a"
          >
            <h3 className="text-xl font-bold mb-2 text-white drop-shadow-md">
              Resume Builder
            </h3>
            <p className="text-white/90">
              Build an ATS Friendly Resume.
            </p>
          </NeonGradientCard>
        </BentoGrid>
      </section>

      <section className="py-16 bg-black">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 drop-shadow-lg">
          <WordPullUp>What Our Users Say</WordPullUp>
        </h2>
        <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-lg bg-gray-950/50 py-8">
          {/* First Marquee row with updated spacing and visibility */}
          <div className="mb-4 w-full">
            <Marquee pauseOnHover className="[--duration:20s]">
              {firstRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
          </div>
          
          {/* Second Marquee row with updated spacing and visibility */}
          <div className="w-full">
            <Marquee reverse pauseOnHover className="[--duration:20s]">
              {secondRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
          </div>

          {/* Updated gradient overlays with reduced opacity for better border visibility */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-gray-950/90 to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-gray-950/90 to-transparent"></div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-12 bg-gradient-to-r from-gray-800 to-black text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg">
          Ready to Elevate Your Career?
        </h2>
        <button
          onClick={handleConfetti}
          className="px-8 py-4 bg-white text-gray-800 font-semibold rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          Get Started
        </button>
        {confettiTrigger && <Confetti />}
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-900 text-gray-400 text-center">
        <p>© 2025 PrepWise. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
