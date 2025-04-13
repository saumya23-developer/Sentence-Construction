// Import core React hooks and components
import React, { useState, useEffect } from 'react';

// Import custom components
import Quiz from './components/Quiz';
import Start from './components/Start';
import Result from './components/Result';

// Import styles
import './App.css';

/**
 * Main App component that manages the quiz flow.
 */
function App() {
  // State to hold fetched questions
  const [questions, setQuestions] = useState([]);

  // Track current screen: 'start', 'quiz', or 'result'
  const [currentScreen, setCurrentScreen] = useState('start');

  // Track the index of the currently displayed question
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Track the user's selected answers for each question
  const [answers, setAnswers] = useState([]);

  // User's current score
  const [score, setScore] = useState(0);

  // Loading and error states for API call
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch questions from the backend when component mounts.
   */
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
const response = await fetch('https://sentence-construction.onrender.com/quiz');
        const data = await response.json();

        // Validate data structure before setting state
        if (data && data.data && data.data.questions) {
          setQuestions(data.data.questions);
        } else {
          throw new Error('Invalid data structure');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError('Failed to load questions. Please make sure the JSON server is running.');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  /**
   * Initialize the quiz and move to quiz screen.
   */
  const startQuiz = () => {
    setCurrentScreen('quiz');
    setAnswers(questions.map(() => [])); // Empty answer arrays for each question
  };

  /**
   * Save user's selected answers for a given question.
   * @param {number} questionIndex - Index of the question being answered
   * @param {Array} selectedAnswers - Array of selected answer(s)
   */
  const handleAnswer = (questionIndex, selectedAnswers) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = selectedAnswers;
    setAnswers(newAnswers);
  };

  /**
   * Confirm and quit quiz, show results screen with score 0.
   */
  const handleQuit = () => {
    if (confirm("Are you sure you want to quit? Your progress will be lost.")) {
      setCurrentQuestionIndex(0);
      setAnswers(questions.map(() => []));
      setScore(0);
      setCurrentScreen('result');
    }
  };

  /**
   * Move to the next question or finish quiz and calculate score.
   */
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate score by comparing user's answers with correct ones
      let newScore = 0;

      questions.forEach((question, index) => {
        const userAnswer = answers[index];
        const correctAnswer = question.correctAnswer;

        if (userAnswer && userAnswer.length === correctAnswer.length) {
          let correct = true;

          for (let i = 0; i < correctAnswer.length; i++) {
            if (userAnswer[i] !== correctAnswer[i]) {
              correct = false;
              break;
            }
          }

          if (correct) newScore++;
        }
      });

      setScore(newScore);
      setCurrentScreen('result');
    }
  };

  /**
   * Restart quiz and return to start screen.
   */
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers(questions.map(() => []));
    setScore(0);
    setCurrentScreen('start');
  };

  // Render loading or error messages if needed
  if (loading)
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (error)
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;

  // Main UI rendering based on current screen
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {currentScreen === 'start' && <Start onStart={startQuiz} questions={questions} />}
      
      {currentScreen === 'quiz' && (
        <Quiz
          question={questions[currentQuestionIndex]}
          questionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          onAnswer={(selectedAnswers) => handleAnswer(currentQuestionIndex, selectedAnswers)}
          onNext={goToNextQuestion}
          onQuit={handleQuit}
          userAnswers={answers[currentQuestionIndex] || []}
        />
      )}

      {currentScreen === 'result' && (
        <Result
          questions={questions}
          userAnswers={answers}
          score={score}
          onRestart={restartQuiz}
        />
      )}
    </div>
  );
}

export default App;
