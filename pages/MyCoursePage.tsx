import React from 'react';
import CourseProgress from '../components/CourseProgress';
import EnrolmentSnapshot from '../components/EnrolmentSnapshot';
import SubjectResultsList from '../components/SubjectResultsList';
import CanvasGradesList from '../components/CanvasGradesList';
import { CourseProgress as CourseProgressType, SubjectResult, CanvasGrade } from '../types';

// Mock Data
const MOCK_PROGRESS: CourseProgressType = {
  courseName: "Bachelor of Science",
  totalCredits: 300,
  completedCredits: 150,
  enrolledCredits: 50,
  expectedCompletion: "Sem 2, 2025"
};

const MOCK_RESULTS: SubjectResult[] = [
  { id: '1', code: 'COMP1000', name: 'Media Computation', semester: 'Sem 1', year: 2023, grade: 'H1', mark: 88, status: 'Final', updatedAt: new Date('2023-07-15') },
  { id: '2', code: 'MAST1001', name: 'Calculus 1', semester: 'Sem 1', year: 2023, grade: 'H2A', mark: 76, status: 'Final', updatedAt: new Date('2023-07-15') },
  { id: '3', code: 'PHYS1001', name: 'Physics 1', semester: 'Sem 2', year: 2023, grade: 'H1', mark: 92, status: 'Final', updatedAt: new Date('2023-12-10') },
];

const MOCK_GRADES: CanvasGrade[] = [
  { id: 'g1', subjectCode: 'COMP1001', assessmentName: 'Project 1: Python', mark: '18/20', weighting: '20%', updatedAt: new Date() },
  { id: 'g2', subjectCode: 'CHEM1001', assessmentName: 'Lab Report 3', mark: '9/10', weighting: '10%', updatedAt: new Date(Date.now() - 86400000) },
];

const MyCoursePage: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
         <h1 className="text-3xl font-fraunces text-brand-main">My Course</h1>
         <p className="text-secondary-text">Track your academic progress and results.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
           <CourseProgress progress={MOCK_PROGRESS} />
        </div>
        <div>
           <EnrolmentSnapshot />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <SubjectResultsList results={MOCK_RESULTS} />
         <CanvasGradesList grades={MOCK_GRADES} />
      </div>
    </div>
  );
};

export default MyCoursePage;