import React, { useState } from 'react';
import axios from 'axios';
import UploadCard from './UploadCard';
import { FaFileAlt, FaFileUpload, FaFileSignature } from 'react-icons/fa';
import Results from './Results';

interface QuestionResult {
  attempted: boolean;
  score: number;
  content_score: number;
  semantic_score: number;
  feedback: string;
}

interface GradingResult {
  score: number;
  grade: string;
  question_results: { [key: string]: QuestionResult };
  attempted_count: number;
  total_questions: number;
  questions: { [key: string]: string };
  student_answers: { [key: string]: string };
  reference_answers: { [key: string]: string };
}

const TryIt: React.FC = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [questionFile, setQuestionFile] = useState<File | null>(null);
  const [referenceFile, setReferenceFile] = useState<File | null>(null);
  const [studentFile, setStudentFile] = useState<File | null>(null);
  const [gradingResult, setGradingResult] = useState<GradingResult | null>(null);

  const handleGrade = async () => {
    if (!questionFile || !referenceFile || !studentFile) {
      alert('Please upload all files.');
      return;
    }

    setIsChecking(true);
    const formData = new FormData();
    formData.append('questionFile', questionFile);
    formData.append('referenceFile', referenceFile);
    formData.append('studentFile', studentFile);

    console.log('Files being sent:', {
      questionFile: questionFile.name,
      referenceFile: referenceFile.name,
      studentFile: studentFile.name
    });

    try {
      console.log('Sending request to server...');
      console.log('FormData contents:');
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`${key}: File name=${value.name}, type=${value.type}, size=${value.size} bytes`);
        } else {
          console.log(`${key}: ${value}`);
        }
      }

      const response = await axios.post('http://127.0.0.1:5000/grade', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: false,
        timeout: 30000, // 30 second timeout
      });
      
      console.log('Server response:', response.data);
      
      if (!response.data) {
        throw new Error('Server returned empty response');
      }

      setGradingResult(response.data);
      setShowResults(true);
    } catch (error: any) {
      console.error('Detailed error:', error);
      let errorMessage = 'Error occurred while grading.\n\n';
      
      if (error.response) {
        // Server responded with error
        console.error('Server error response:', {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
          headers: error.response.headers
        });
        errorMessage += `Server error ${error.response.status}: ${error.response.data.error || error.response.data.message || error.response.statusText}`;
      } else if (error.request) {
        // Request made but no response
        console.error('No response from server. Request details:', error.request);
        errorMessage += `No response from server. Please check if the server is running at http://127.0.0.1:5000\n\nMake sure you have started the Flask server with 'python app.py' in the backend directory.`;
      } else {
        // Error in request setup
        console.error('Request setup error:', {
          message: error.message,
          stack: error.stack
        });
        errorMessage += `Error: ${error.message}`;
      }
      
      alert(errorMessage);
      setShowResults(false); // Reset show results if there's an error
    } finally {
      setIsChecking(false);
    }
  };

  const handleGradeAnother = () => {
    setShowResults(false);
    setQuestionFile(null);
    setReferenceFile(null);
    setStudentFile(null);
    setGradingResult(null);
  };

  return (
    <div className="min-h-screen bg-black px-4 pt-8 pb-20">
      {showResults && gradingResult ? (
        <Results 
          gradingResult={gradingResult}
          onGradeAnother={handleGradeAnother}
        />
      ) : (
        <div className="mx-auto max-w-6xl">
          <h1 
            className="mb-16 text-center text-4xl font-bold text-white opacity-0 animate-fade-in-up md:text-5xl"
            data-text="Try Our AI Marking Engine"
          >
            Try Our AI Marking Engine
          </h1>

          <div className="mb-8 grid gap-8 md:grid-cols-3">
            <UploadCard
              title="Upload Question Key"
              icon={<FaFileAlt />}
              acceptedFiles=".txt"
              delay={0.2}
              onFileUpload={(file) => setQuestionFile(file)}
              selectedFile={questionFile}
            />
            <UploadCard
              title="Upload Student Answer"
              icon={<FaFileUpload />}
              acceptedFiles=".txt"
              delay={0.4}
              onFileUpload={(file) => setStudentFile(file)}
              selectedFile={studentFile}
            />
            <UploadCard
              title="Upload Reference Answer"
              icon={<FaFileSignature />}
              acceptedFiles=".txt"
              delay={0.6}
              onFileUpload={(file) => setReferenceFile(file)}
              selectedFile={referenceFile}
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleGrade}
              disabled={!questionFile || !studentFile || !referenceFile || isChecking}
              className="group relative overflow-hidden rounded-full bg-black px-8 py-3 opacity-100"
            >
              {/* Animated Border */}
              <div className="absolute inset-0 animate-spin-slow">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00fff7] via-[#ff00c8] to-[#00fff7] blur opacity-50" />
              </div>
              
              {/* Button Background */}
              <div className="absolute inset-[2px] rounded-full bg-black" />
              
              {/* Button Content */}
              <span className="relative font-semibold text-white group-hover:text-[#00fff7] transition-colors duration-200">
                {isChecking ? 'Grading...' : 'Grade Me'}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TryIt; 