'use client'
import { useRouter } from 'next/navigation';
import './globals.css';

export default function Home() {
  const router = useRouter();

  const handleQuizStart = () => {
    router.push('/quiz');  
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Quiz App</h1>
      <button
        onClick={handleQuizStart}
        className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Start the Quiz
      </button>
    </div>
  );
}
