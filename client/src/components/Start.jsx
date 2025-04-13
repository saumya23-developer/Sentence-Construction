import React from 'react';

/**
 * Start Component
 *
 * This component renders the introduction screen for the Sentence Construction quiz.
 * It displays instructions, key details like time per question and total questions,
 * and provides a "Start" button to begin the quiz.
 *
 * Props:
 * - onStart (function): Callback function triggered when the Start button is clicked.
 * - questions (array): Array of question objects, used to display the total question count.
 */
const Start = ({ onStart, questions }) => {
  return (
    <div className="text-center bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <div className="border-2 border-orange-500 p-6 rounded-lg">
        
        {/* Icon at the top */}
        <div className="flex justify-center mb-4">
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>

        {/* Title and instructions */}
        <h1 className="text-xl font-bold mb-2">Sentence Construction</h1>
        <p className="text-sm text-gray-600 mb-4">
          Select the correct words to complete the sentence by arranging the provided options in the right order.
        </p>

        {/* Quiz details (time, question count, coins) */}
        <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
          <div>
            <h3 className="font-semibold">Time Per Question</h3>
            <p>30 sec</p>
          </div>
          <div>
            <h3 className="font-semibold">Total Questions</h3>
            <p>{questions.length}</p>
          </div>
          <div>
            <h3 className="font-semibold">Coins</h3>
            <p>10</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-between">
          <button className="px-6 py-2 cursor-pointer bg-gray-200 text-gray-800 rounded-md">
            Back
          </button>
          <button 
            className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded-md"
            onClick={onStart}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
