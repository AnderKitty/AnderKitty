import React, { useState } from 'react';
import { Smile, Languages } from 'lucide-react';
import GradeSelection from './components/GradeSelection';
import QuestionCard from './components/QuestionCard';
import Result from './components/Result';
import { translations } from './data/translations';
import { calculateResult, EmotionScores } from './utils/calculateResult';

type Language = 'en' | 'es';

function App() {
  const [grade, setGrade] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [emotionScores, setEmotionScores] = useState<EmotionScores | null>(null);
  const [language, setLanguage] = useState<Language>('en');

  const t = translations[language];

  const handleGradeSelection = (selectedGrade: string) => {
    setGrade(selectedGrade);
  };

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < t.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const { dominantEmotion, scores } = calculateResult(newAnswers);
      setEmotionScores(scores);
      setShowResult(true);
    }
  };

  const resetTest = () => {
    setGrade(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setEmotionScores(null);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 via-pink-500 to-red-500 flex flex-col items-center justify-center p-4">
      <button
        onClick={toggleLanguage}
        className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
        aria-label="Toggle language"
      >
        <Languages className="w-6 h-6 text-gray-600" />
      </button>
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          {t.title}
        </h1>
        {!grade ? (
          <GradeSelection onSelect={handleGradeSelection} translations={t} />
        ) : !showResult ? (
          <QuestionCard
            question={t.questions[currentQuestion]}
            onAnswer={handleAnswer}
            progress={(currentQuestion / t.questions.length) * 100}
            translations={t}
          />
        ) : (
          <Result 
            emotion={calculateResult(answers).dominantEmotion} 
            emotionScores={emotionScores!}
            onReset={resetTest} 
            grade={grade}
            translations={t}
          />
        )}
      </div>
      <footer className="mt-8 text-white text-center">
        <p>{t.createdBy} <Smile className="inline-block w-5 h-5" /> {t.by}</p>
      </footer>
    </div>
  );
}

export default App;