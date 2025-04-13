import React, { useState, useEffect } from 'react';
import Timer from './Timer';

/**
 * Quiz Component
 * Handles rendering of a single quiz question with interactive answer selection,
 * a countdown timer, and navigation controls.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.question - Current question data
 * @param {number} props.questionIndex - Index of the current question
 * @param {number} props.totalQuestions - Total number of questions in the quiz
 * @param {function} props.onAnswer - Callback when an answer is selected
 * @param {function} props.onNext - Callback to go to the next question
 * @param {function} props.onQuit - Callback to quit the quiz
 * @param {Array} props.userAnswers - Preselected answers for this question
 */
const Quiz = ({ 
  question, 
  questionIndex, 
  totalQuestions, 
  onAnswer, 
  onNext,
  onQuit, 
  userAnswers 
}) => {
  // State for selected words (answers)
  const [selectedWords, setSelectedWords] = useState(userAnswers || []);

  // Remaining options that haven't been selected yet
  const [remainingOptions, setRemainingOptions] = useState([]);
//   The Quiz component directly uses question.options and filters options based on selectedWords during rendering.
// uses of remaining option could be shown unselected word but as in figma design it doesnt shown that unselected word that why i dont use it 
//  also declared this updateRemainingOptions(...); but usestate is better better practice.

  // Flag to track whether timer has expired
  const [timerExpired, setTimerExpired] = useState(false);

  // When question changes, reset selected words and remaining options
  useEffect(() => {
    setSelectedWords(userAnswers || []);
    updateRemainingOptions(userAnswers || []);
    setTimerExpired(false);
  }, [question, userAnswers]);

  // Handle what happens when timer runs out
  useEffect(() => {
    if (timerExpired && selectedWords.length === 4) {
      handleNext();
    } else if (timerExpired) {
      onAnswer(selectedWords);
      onNext();
    }
  }, [timerExpired]);

  /**
   * Updates the list of available options that haven't been selected
   * @param {Array} selected - Array of currently selected words
   */
  const updateRemainingOptions = (selected) => {
    const allOptions = [...question.options];
    const remaining = allOptions.filter(option => !selected.includes(option));
    setRemainingOptions(remaining);
  };

  /**
   * Handles when a user selects a word from the options
   * @param {string} word - The selected word
   */
  const handleSelectWord = (word) => {
    if (selectedWords.length < 4 && !selectedWords.includes(word)) {
      const newSelected = [...selectedWords, word];
      setSelectedWords(newSelected);
      onAnswer(newSelected);
      updateRemainingOptions(newSelected);
    }
  };

  /**
   * Removes a selected word when clicked on its placeholder
   * @param {number} index - Index of the word to remove
   */
  const handleRemoveWord = (index) => {
    const newSelected = [...selectedWords];
    newSelected.splice(index, 1);
    setSelectedWords(newSelected);
    onAnswer(newSelected);
    updateRemainingOptions(newSelected);
  };

  /**
   * Moves to the next question
   */
  const handleNext = () => {
    onNext();
  };

  /**
   * Called when the timer reaches 0
   */
  const handleTimerEnd = () => {
    setTimerExpired(true);
  };

  /**
   * Quits the quiz early
   */
  const handleQuit = () => {
    onQuit();
  };

  // Split the question into parts where blanks are to be filled
  const questionParts = question.question.split('_____________');

  return (
    <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-6">
      
      {/* Timer and Quit button */}
      <div className="flex justify-between items-center mb-6">
        <Timer initialTime={30} onTimeEnd={handleTimerEnd} />
        <button onClick={handleQuit} className="px-4 py-2 cursor-pointer rounded-md bg-gray-200 hover:bg-gray-300">
          Quit
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full overflow-hidden mb-8">
        <div className="flex space-x-2">
          {Array.from({ length: totalQuestions }).map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1 flex-1 rounded-full ${idx === questionIndex ? 'bg-amber-500' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>

      {/* Question Header */}
      <h2 className="text-2xl font-semibold text-center mb-10 text-gray-700">
        Select the missing words in the correct order
      </h2>

      {/* Question with answer blanks */}
      <div className="mb-10 text-lg">
        {questionParts.map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {index < questionParts.length - 1 && (
              <span 
                className={`inline-block min-w-[160px] mx-2 px-2 py-1 border-b-2 cursor-pointer border-gray-400 text-center ${selectedWords[index] ? 'bg-gray-100' : ''}`}
                onClick={() => selectedWords[index] && handleRemoveWord(index)}
              >
                {selectedWords[index] || ''}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Options to select from */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            className={`px-6 py-3  rounded-md border ${
              selectedWords.includes(option)
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white hover:bg-gray-100 cursor-pointer'
            }`}
            onClick={() => !selectedWords.includes(option) && handleSelectWord(option)}
            disabled={selectedWords.includes(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <div className="flex justify-end">
        <button
          className={`px-8 py-3 rounded-md flex  items-center ${
            selectedWords.length === 4
              ? 'bg-blue-600 text-white cursor-pointer'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
          onClick={handleNext}
          disabled={selectedWords.length !== 4}
        >
          <span>Next</span>
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Quiz;
