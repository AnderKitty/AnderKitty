import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface QuestionCardProps {
  question: string;
  onAnswer: (answer: boolean) => void;
  progress: number;
  translations: {
    agree: string;
    disagree: string;
  };
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer, progress, translations }) => {
  return (
    <div className="text-center">
      <div className="mb-4 bg-gray-200 rounded-full">
        <div
          className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
          style={{ width: `${progress}%` }}
        >
          {Math.round(progress)}%
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-6 text-gray-700">{question}</h2>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => onAnswer(true)}
          className="flex items-center px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300"
        >
          <ThumbsUp className="mr-2" />
          {translations.agree}
        </button>
        <button
          onClick={() => onAnswer(false)}
          className="flex items-center px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300"
        >
          <ThumbsDown className="mr-2" />
          {translations.disagree}
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;