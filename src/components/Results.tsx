import React from 'react';

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

interface ResultsProps {
  gradingResult: GradingResult;
  onGradeAnother: () => void;
}

const Results: React.FC<ResultsProps> = ({ gradingResult, onGradeAnother }) => {
  const {
    score = 0,
    grade = 'N/A',
    question_results = {},
    questions = {},
    student_answers = {},
    reference_answers = {},
    attempted_count = 0,
    total_questions = 0
  } = gradingResult || {};

  return (
    <div className="mx-auto max-w-5xl p-8 rounded-3xl bg-gradient-to-br from-[#1a1f2e]/95 via-[#14182b] to-[#1a1f2e]/95 shadow-2xl backdrop-blur-lg border border-white/5">
      {/* Header with score and grade */}
      <div className="relative mb-8">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-row items-center justify-center gap-3">
            {/* Score */}
            <div>
              <div className="px-6 py-2.5 rounded-full bg-[#22d3ee]">
                <span className="text-lg font-semibold text-gray-900">
                  Overall Score: {score.toFixed(2)}%
                </span>
              </div>
            </div>

            {/* Grade */}
            <div>
              <div className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500">
                <span className="text-lg font-semibold text-white">
                  Grade: {grade}
                </span>
              </div>
            </div>
          </div>

          {/* Attempt Count */}
          <p className="text-base text-gray-400">
            Attempted <span className="text-cyan-400 font-semibold">{attempted_count}</span> out of <span className="text-purple-400 font-semibold">{total_questions}</span> questions
          </p>
        </div>
      </div>

      {/* Questions Section */}
      <div className="space-y-8">
        {Object.entries(questions).map(([questionNumber, questionText]) => {
          const result = question_results[questionNumber] || {
            attempted: false,
            score: 0,
            content_score: 0,
            semantic_score: 0,
            feedback: 'No feedback available'
          };

          return (
            <div
              key={questionNumber}
              className="transform hover:scale-[1.01] transition-all duration-300 ease-in-out"
            >
              <div className="p-6 rounded-2xl bg-[#1e2538]/50 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500">
                    <span className="text-lg font-bold text-white">Q{questionNumber}</span>
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Question {questionNumber}
                  </h3>
                </div>

                <div className="space-y-6">
                  {/* Question Text */}
                  <div className="p-4 rounded-xl bg-[#14182b]/80 border border-white/5">
                    <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-2">Question:</h4>
                    <p className="text-gray-200 text-lg whitespace-pre-wrap leading-relaxed">{questionText}</p>
                  </div>

                  {/* Your Answer */}
                  <div className="p-4 rounded-xl bg-[#14182b]/80 border border-white/5">
                    <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-2">Your Answer:</h4>
                    <p className="text-gray-200 text-lg whitespace-pre-wrap leading-relaxed">
                      {student_answers[questionNumber] || 'Not attempted'}
                    </p>
                  </div>

                  {/* Reference Answer */}
                  <div className="p-4 rounded-xl bg-[#14182b]/80 border border-white/5">
                    <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-2">Reference Answer:</h4>
                    <p className="text-gray-200 text-lg whitespace-pre-wrap leading-relaxed">
                      {reference_answers[questionNumber]}
                    </p>
                  </div>

                  {/* Scores Grid */}
                  {result.attempted ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                        <p className="text-sm uppercase tracking-wider text-gray-400 mb-1">Question Score</p>
                        <p className="text-3xl font-bold text-cyan-400">{result.score.toFixed(1)}%</p>
                      </div>
                      <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                        <p className="text-sm uppercase tracking-wider text-gray-400 mb-1">Content Score</p>
                        <p className="text-3xl font-bold text-blue-400">{result.content_score.toFixed(1)}%</p>
                      </div>
                      <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                        <p className="text-sm uppercase tracking-wider text-gray-400 mb-1">Semantic Score</p>
                        <p className="text-3xl font-bold text-purple-400">
                          {result.semantic_score < 10 ? result.semantic_score.toFixed(2) : result.semantic_score.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-red-900/20 border border-red-500/30 backdrop-blur-sm">
                      <p className="text-red-400 text-lg">Question not attempted</p>
                    </div>
                  )}

                  {/* Feedback Section */}
                  {result.attempted && (
                    <div className="p-4 rounded-xl bg-[#14182b]/80 border border-white/5">
                      <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-2">Feedback:</h4>
                      <p className="text-gray-200 text-lg leading-relaxed">{result.feedback}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Grade Another Button */}
      <div className="mt-12 flex justify-center">
        <button
          onClick={onGradeAnother}
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
            Grade Another
          </span>
        </button>
      </div>
    </div>
  );
};

export default Results; 