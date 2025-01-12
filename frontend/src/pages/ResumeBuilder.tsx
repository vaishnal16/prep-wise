import React, { useState } from 'react';
import { ClassicTemplate } from '../templates/ClassicTemplates';
import { ModernTemplate } from '../templates/ModernTemplates';
import  MinimalTemplate  from '../templates/MinimalTemplates';
import ProfessionalTemplates  from '../templates/ProfessionalTemplates';
import OneColumnTemplate from '../templates/OneColumnTemplate';
import { ResumeData } from '../types/resume';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const templates = {
  oneColumn: OneColumnTemplate,
  professional: ProfessionalTemplates,
  classic: ClassicTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
};

const initialResumeData: ResumeData = {
  personalInfo: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-111-1111',
  },
  experience: [
    {
      company: 'COMPANY A',
      position: 'Advanced Development Intern',
      startDate: 'May 2018',
      endDate: 'Aug 2018',
      location: 'Somewhere, XX',
      points: [
        'Developed tools to automate and enhance the engineering process for network installation using AWS and Python',
        'Worked with other teams to create a system to collect and curate customer feedback using AWS, Python, and Docker',
        'Collaborated with teams to jump start cloud-technology adoption',
        'Contributed to shift planning for voice alignment system utilizing AWS voice recognition features and NLP architecture',
      ],
    },
    {
      company: 'COMPANY B',
      position: 'Intern',
      startDate: 'Feb 2017',
      endDate: 'May 2017',
      location: 'Somewhere, XX',
      points: [
        'Designed and implemented test suite to lead a software product evaluation resulting in a fit-for-purpose verdict',
        'Acted as an information gateway to answer cross-departmental questions',
        'Participated in an Internal CodeJam to prototype a blockchain application',
      ],
    },
  ],
  education: [
    {
      university: 'MY UNIVERSITY',
      degree: 'Bachelor of Science in Mathematics and Statistics',
      startDate: '2016',
      endDate: '2020',
      location: 'Somewhere, XX',
      gpa: '4.0/4.0',
    },
  ],
  skills: [
    {
      category: 'Programming',
      items: ['Python', 'C/C++', 'Java', 'R', 'SAS'],
    },
    {
      category: 'Technology',
      items: ['AWS', 'Linux', 'Docker', 'Git'],
    },
  ],
  coursework: {
    Graduate: ['Analysis of Algorithms'],
    Undergraduate: ['Artificial Intelligence', 'Operating Systems I', 'Data Analysis I'],
  },
  projects: [
    {
      name: 'SPACE ROBOTICS TEAM',
      role: 'Path-Planning Lead',
      description: 'Space robotics project',
      technologies: ['Python', 'ROS'],
      points: [
        'Spearheaded the enhancement effort for the path-planning functionality of a team of three robots',
        'Led several development sprints and the planning is being documented in Python to allow for fully autonomous operation',
      ],
    },
  ],
  societies: [
    'Association for Computing Machinery',
    'Brown Alliance Certified ScrumMaster',
    'University Honor College',
  ],
  links: [
    { platform: 'GitHub', url: 'github.com/johndoe' },
    { platform: 'LinkedIn', url: 'linkedin.com/johndoe' },
  ],
};

function ResumeBuilder() {
  const [selectedTemplate, setSelectedTemplate] = useState<keyof typeof templates>('classic');
  const [isEditing, setIsEditing] = useState(true);
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);

  const handleDownloadPDF = async () => {
    const element = document.getElementById('resume-preview');
    if (!element) return;

    try {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('resume.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const SelectedTemplate = templates[selectedTemplate];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Resume Builder</h1>
          <div className="space-x-4">
            <select
              className="px-4 py-2 border rounded"
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value as keyof typeof templates)}
            >
              <option value="classic">Classic Template</option>
              <option value="professional">Professonal Template (Two-column)</option>
              <option value="oneColumn">Professonal Template (one-column)</option>
              <option value="modern">Modern Template</option>
              <option value="minimal">Minimal Template</option>
            </select>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Preview' : 'Edit'}
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded"
              onClick={handleDownloadPDF}
            >
              Download PDF
            </button>
          </div>
        </div>

        <div id="resume-preview" className="bg-white shadow-lg">
          <SelectedTemplate data={resumeData} isEditable={isEditing} />
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;
