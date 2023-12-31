import { useState } from 'react';
import PropTypes from 'prop-types';

function Quiz(props) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
  };

  return (
    <div className='flex flex-col items-start px-6 w-full'>
      <h1 className="font-medium text-md capitalize max-w-[600px]">{props.question}</h1>
      <div className="flex gap-2 mt-6 flex-wrap justify-start">
        {props.answers.map((answer, index) => (
          <div
            key={index}
            className={`answer ${selectedAnswer === answer ? (answer === props.correct_answer ? 'correctAnswer' : 'incorrectAnswer') : ''}`}
            onClick={() => handleAnswerClick(answer)}
          >
            {answer}
          </div>
        ))}
      </div>
      <div className="separator"></div>
    </div>
  );
}

Quiz.propTypes = {
  question: PropTypes.string,
  answers: PropTypes.arrayOf(PropTypes.string),
  correct_answer: PropTypes.string,
  onAnswerSelected: PropTypes.func.isRequired,
};

export default Quiz;
