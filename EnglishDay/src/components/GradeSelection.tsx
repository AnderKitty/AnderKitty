import React from 'react';

interface GradeSelectionProps {
  onSelect: (grade: string) => void;
  translations: {
    selectGrade: string;
    grade: string;
  };
}

const GradeSelection: React.FC<GradeSelectionProps> = ({ onSelect, translations }) => {
  const grades = ['4th', '5th', '6th'];

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-6 text-gray-700">{translations.selectGrade}</h2>
      <div className="flex justify-center space-x-4">
        {grades.map((grade) => (
          <button
            key={grade}
            onClick={() => onSelect(grade)}
            className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
          >
            {grade} {translations.grade}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GradeSelection;