'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

const quizQuestions: Question[] = [
  {
    question: 'Which planet is closest to the sun?',
    options: ['Earth', 'Mars', 'Mercury', 'Venus'],
    correctAnswer: 'Mercury',
  },
  {
    question: 'Who wrote "Hamlet"?',
    options: ['Charles Dickens', 'J.K. Rowling', 'William Shakespeare', 'Mark Twain'],
    correctAnswer: 'William Shakespeare',
  },
  {
    question: 'What is the square root of 64?',
    options: ['6', '7', '8', '9'],
    correctAnswer: '8',
  },
  {
    question: 'Which country is known as the Land of the Rising Sun?',
    options: ['China', 'Japan', 'India', 'Thailand'],
    correctAnswer: 'Japan',
  },
  {
    question: 'How many continents are there?',
    options: ['5', '6', '7', '8'],
    correctAnswer: '7',
  },
];

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const router = useRouter(); // Initialize the router

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleAnswerClick = (answer: string) => {
    setUserAnswers([...userAnswers, answer]);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setIsQuizCompleted(false);
  };

  const getResults = () => {
    return userAnswers.map((answer, index) => ({
      question: quizQuestions[index].question,
      correctAnswer: quizQuestions[index].correctAnswer,
      userAnswer: answer,
      isCorrect: answer === quizQuestions[index].correctAnswer,
    }));
  };

  const correctAnswersCount = getResults().filter(result => result.isCorrect).length;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6">
      {!isQuizCompleted ? (
        <div className="w-full max-w-lg bg-white p-6 rounded-md shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            {currentQuestion.question}
          </h2>
          <div className="flex flex-col space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-lg bg-white p-6 rounded-md shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Quiz Completed!</h2>
          <h3 className="text-lg font-semibold mb-4">Your Results:</h3>

          <p className="text-xl font-bold mb-4">
            You got {correctAnswersCount} out of {quizQuestions.length} questions correct!
          </p>
          <p className="text-lg font-semibold mb-4">
            Your score: {(correctAnswersCount / quizQuestions.length) * 100}%
          </p>

         
          <button
            onClick={restartQuiz}
            className="mt-6 bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300"
          >
            Restart Quiz
          </button>

          
          <button
            onClick={() => router.push('/')} 
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
}



