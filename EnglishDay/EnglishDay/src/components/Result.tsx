import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { EmotionScores } from '../utils/calculateResult';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ResultProps {
  emotion: string;
  emotionScores: EmotionScores;
  onReset: () => void;
  grade: string;
  translations: {
    result: string;
    resultDescription: string;
    emotionBreakdown: string;
    grade: string;
    takeAgain: string;
  };
}

const Result: React.FC<ResultProps> = ({ emotion, emotionScores, onReset, grade, translations }) => {
  const getEmotionColor = (emotion: string) => {
    switch (emotion.toLowerCase()) {
      case 'joy': return 'text-yellow-500';
      case 'sadness': return 'text-blue-500';
      case 'anger': return 'text-red-500';
      case 'fear': return 'text-purple-500';
      case 'disgust': return 'text-green-500';
      case 'anxiety': return 'text-orange-500';
      case 'envy': return 'text-emerald-500';
      default: return 'text-gray-500';
    }
  };

  const emotionTranslations = {
    Joy: { es: 'Alegría' },
    Sadness: { es: 'Tristeza' },
    Anger: { es: 'Ira' },
    Fear: { es: 'Miedo' },
    Disgust: { es: 'Disgusto' },
    Anxiety: { es: 'Ansiedad' },
    Envy: { es: 'Envidia' }
  };

  const chartData = {
    labels: Object.keys(emotionScores).map(emotion => 
      emotionTranslations[emotion as keyof typeof emotionTranslations]?.es || emotion
    ),
    datasets: [
      {
        data: Object.values(emotionScores),
        backgroundColor: [
          '#FCD34D', // Joy/Alegría (yellow)
          '#60A5FA', // Sadness/Tristeza (blue)
          '#EF4444', // Anger/Ira (red)
          '#A78BFA', // Fear/Miedo (purple)
          '#10B981', // Disgust/Disgusto (green)
          '#FBBF24', // Anxiety/Ansiedad (orange)
          '#34D399', // Envy/Envidia (emerald)
        ],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  const translatedEmotion = emotionTranslations[emotion as keyof typeof emotionTranslations]?.es || emotion;

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">{translations.result}</h2>
      <p className={`text-4xl font-extrabold mb-6 ${getEmotionColor(emotion)}`}>
        {translatedEmotion}
      </p>
      <p className="mb-6 text-gray-600">
        {translations.resultDescription}
      </p>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">{translations.emotionBreakdown}</h3>
        <div className="w-full max-w-md mx-auto">
          <Pie data={chartData} options={chartOptions} />
        </div>
      </div>
      <p className="mb-6 text-gray-600">
        {translations.grade}: {grade}
      </p>
      <button
        onClick={onReset}
        className="flex items-center justify-center px-6 py-3 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition duration-300 mx-auto"
      >
        <RefreshCw className="mr-2" />
        {translations.takeAgain}
      </button>
    </div>
  );
};

export default Result;