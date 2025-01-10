import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import LandingPage from './pages/LandingPage';
import RoadmapPage from './pages/RoadmapPage';

export default function App() {
  return (
    <>
    <RoadmapPage/>
    </>
  )
}
