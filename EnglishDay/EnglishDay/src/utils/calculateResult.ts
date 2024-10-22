export interface EmotionScores {
  joy: number;
  sadness: number;
  anger: number;
  fear: number;
  disgust: number;
  anxiety: number;
  envy: number;
}

const calculateResult = (answers: boolean[]): { dominantEmotion: string; scores: EmotionScores } => {
  const scores: EmotionScores = {
    joy: 0,
    sadness: 0,
    anger: 0,
    fear: 0,
    disgust: 0,
    anxiety: 0,
    envy: 0
  };

  // This is a simplified scoring system. You might want to adjust the weights and logic based on the specific questions and their relevance to each emotion.
  answers.forEach((answer, index) => {
    if (answer) {
      switch (index) {
        case 0: case 3: case 11: scores.anxiety += 1; break;
        case 1: case 5: case 9: scores.disgust += 1; break;
        case 2: case 6: case 10: scores.joy += 1; break;
        case 4: case 8: scores.fear += 1; break;
        case 7: case 14: scores.envy += 1; break;
        case 12: scores.sadness += 1; break;
        case 13: scores.anger += 1; break;
      }
    }
  });

  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  
  // Convert scores to percentages
  Object.keys(scores).forEach((key) => {
    scores[key as keyof EmotionScores] = Number(((scores[key as keyof EmotionScores] / totalScore) * 100).toFixed(2));
  });

  const maxScore = Math.max(...Object.values(scores));
  const dominantEmotion = Object.keys(scores).find(key => scores[key as keyof EmotionScores] === maxScore);

  return {
    dominantEmotion: dominantEmotion ? dominantEmotion.charAt(0).toUpperCase() + dominantEmotion.slice(1) : 'Mixed',
    scores
  };
};

export { calculateResult };