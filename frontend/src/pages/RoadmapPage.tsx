import React, { useState } from "react";
import { ThemeProvider } from "next-themes";
import ReactMarkdown from "react-markdown";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import Label from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import DatePicker from "../components/DatePicker";
import ThemeToggle from "../components/ThemeToggle";
import RippleButton from "../components/ui/ripple-button";
import { callConsoleGroqApi } from "../api"; // Import the API function
import SparklesText from "../components/ui/sparkles-text";

const App: React.FC = () => {
  const [endGoal, setEndGoal] = useState("");
  const [learningSpeed, setLearningSpeed] = useState("");
  const [learningLevel, setLearningLevel] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [roadmap, setRoadmap] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!endGoal) newErrors.endGoal = "Please select an end goal";
    if (!learningSpeed) newErrors.learningSpeed = "Please select your learning speed";
    if (!learningLevel) newErrors.learningLevel = "Please select your learning level";
    if (!startDate) newErrors.startDate = "Please select a start date";
    if (!endDate) newErrors.endDate = "Please select an end date";
    if (startDate && endDate && startDate > endDate) newErrors.dateRange = "End date must be after start date";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const systemMessage = "Generate a personalized learning roadmap.";
      const prompt = `
        I am a ${learningSpeed} aiming to prepare for ${endGoal} at a ${learningLevel} level. My preparation timeline is from ${startDate} to ${endDate}. Ensure the references and YouTube channel links are correct and legitimate, and provide clickable hyperlinks so users can directly access them.

Please keep in mind the following:

JEE has three subjects: Physics, Chemistry, and Mathematics.
GATE has 7 subjects.
UPSC has 3 subjects.
CA has 2 subjects.
Provide the following information:

Goal: A one-line description of the end goal.

Daily Study Plan:

Include a day-wise and topic-wise study plan.
Provide clickable references for each topic.
Present the study plan in a bullet point format.
Example structure 

Day	Topic	Reference
Day 1-2	Physics: Kinematics	Kinematics - Khan Academy
Day 3-4	Physics: Dynamics	Dynamics - BYJU'S
...	...	...
YouTube Channels:

Provide a list of YouTube channels for JEE preparation.Also use the youtube api to get the correct links for the channels ensure the links are correct and refer to the correct channel.Only list and provide clickable links which are correct and ensure you double-check them.
Separate the channels into English and Hindi categories.
English:

Hindi:

Books List:

Include a list of recommended books for JEE preparation, separated by subject.
Physics:


Chemistry:


Mathematics:


Websites:

Provide a list of helpful websites for JEE preparation.



Additional Tips:

Please ensure that the references and resources are reliable and up-to-date. The study plan should be detailed, and each element should be accessible with the provided hyperlinks.
      `;

      const response = await callConsoleGroqApi(prompt, systemMessage);
      setRoadmap(response); // Update roadmap with API response
    } catch (error) {
      console.error("Error generating roadmap:", error);
      setRoadmap("Failed to generate roadmap. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Get Your Personalized Roadmap</h1>
          <ThemeToggle />
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* End Goal */}
          <div>
            <Label htmlFor="end-goal">What is your end goal?</Label>
            <Select value={endGoal} onValueChange={setEndGoal}>
              <SelectTrigger id="end-goal">
                <SelectValue placeholder="Select your end goal" />
              </SelectTrigger>
              <SelectContent>
                {["UPSC", "JEE", "NEET", "GATE", "CA"].map((goal) => (
                  <SelectItem key={goal} value={goal}>
                    {goal}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.endGoal && <p className="text-red-500 text-sm mt-1">{errors.endGoal}</p>}
          </div>

          {/* Learning Speed */}
          <div>
            <Label>How do you describe your learning speed?</Label>
            <RadioGroup value={learningSpeed} onValueChange={setLearningSpeed}>
              {["Fast learner", "Medium learner", "Slow learner"].map((speed) => (
                <div key={speed} className="flex items-center space-x-2">
                  <RadioGroupItem value={speed} id={speed} />
                  <Label htmlFor={speed}>{speed}</Label>
                </div>
              ))}
            </RadioGroup>
            {errors.learningSpeed && <p className="text-red-500 text-sm mt-1">{errors.learningSpeed}</p>}
          </div>

          {/* Learning Level */}
          <div>
            <Label>At what level do you want to learn?</Label>
            <RadioGroup value={learningLevel} onValueChange={setLearningLevel}>
              {["Beginner", "Intermediate", "Advanced"].map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <RadioGroupItem value={level} id={level} />
                  <Label htmlFor={level}>{level}</Label>
                </div>
              ))}
            </RadioGroup>
            {errors.learningLevel && <p className="text-red-500 text-sm mt-1">{errors.learningLevel}</p>}
          </div>

          {/* Preparation Timeline */}
          <div>
            <Label>Select your preparation timeline:</Label>
            <div className="flex space-x-4">
              <div>
                <Label>Start Date</Label>
                <DatePicker selected={startDate} onSelect={setStartDate} />
                {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
              </div>
              <div>
                <Label>End Date</Label>
                <DatePicker selected={endDate} onSelect={setEndDate} />
                {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
              </div>
            </div>
            {errors.dateRange && <p className="text-red-500 text-sm mt-1">{errors.dateRange}</p>}
          </div>

          {/* Submit Button */}
          <RippleButton
            type="submit"
            disabled={isLoading}
            className="w-auto py-2 px-6 text-center text-lg max-w-xs"
            rippleColor="#ADD8E6"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating Roadmap...
              </>
            ) : (
              "Generate Roadmap"
            )}
          </RippleButton>
        </form>

        {/* Roadmap Display */}
        {roadmap && (
          <div className="mt-6 p-4 bg-secondary rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Generated Roadmap</h2>
            <ReactMarkdown className="prose max-w-none">{roadmap}</ReactMarkdown>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;