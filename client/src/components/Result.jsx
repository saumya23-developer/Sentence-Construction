import React from 'react';
// I prefer using <React.Fragment> over the shorthand <> since it allows passing props such as key, which isn't supported by the shorthand syntax
/**
 * Result Component
 * ----------------
 * Displays the final quiz score and detailed feedback for each question.
 *
 * Props:
 * - questions: Array of quiz question objects.
 * - userAnswers: Array of user-selected answers for each question.
 * - score: Total number of correct answers.
 * - onRestart: Function to restart the quiz.
 */
const Result = ({ questions, userAnswers, score, onRestart }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-6">
      
      {/* Score Summary Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-4 border-green-500 mb-4">
          <span className="text-xl font-bold">{score}/{questions.length}</span>
        </div>
        <h2 className="text-xl font-semibold">
          Congratulations! You've completed the Sentence Construction test and scored {score} out of {questions.length}.
        </h2>
      </div>

      {/* Restart Button */}
      <div className="text-center mb-6">
        <button
          onClick={onRestart}
          className="px-6 py-2 cursor-pointer bg-pink-500 text-white rounded-md"
        >
          Take Another Quiz
        </button>
      </div>

      {/* Feedback Section for Each Question */}
      <div className="space-y-4">
        {questions.map((question, idx) => {
          const correctAnswer = question.correctAnswer;
          const userAnswer = userAnswers[idx] || [];

          // Check if the user's answer is completely correct
          const isCorrect = userAnswer.length === correctAnswer.length && 
                            userAnswer.every((word, i) => word === correctAnswer[i]);

          // Split question text by blanks to insert user answers in between
          const questionParts = question.question.split('_____________');

          return (
            <div key={idx} className="border rounded-lg p-4">
              
              {/* Question Heading with Result */}
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Question {idx + 1}</span>
                <span className={isCorrect ? "text-green-500" : "text-red-500"}>
                  {isCorrect ? "Correct" : "Incorrect"}
                </span>
              </div>
              
              {/* Display Question with User's Answers Highlighted */}
              <div className="text-sm text-gray-700 mb-2">
                {questionParts.map((part, index) => (
                  <React.Fragment key={index}>
                    {part}
                    {index < questionParts.length - 1 && (
                      <span 
                        className={`inline-block mx-1 px-1 ${
                          userAnswer[index] === correctAnswer[index] 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {userAnswer[index] || '[blank]'}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
              
              {/* Show Correct Answer if User's Answer Was Wrong */}
              {!isCorrect && (
                <div className="text-sm text-gray-600">
                  <span className="font-semibold">Correct answer:</span>{' '}
                  {questionParts.map((part, index) => (
                    <React.Fragment key={index}>
                      {part}
                      {index < questionParts.length - 1 && (
                        <span className="bg-green-100 text-green-700 inline-block mx-1 px-1">
                          {correctAnswer[index]}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Result;
