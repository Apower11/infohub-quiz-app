import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import { Link } from 'react-router-dom';
import QuizQuestion from './QuizQuestion';
import '../css/Navbar.css';
import '../css/QuizQuestion.css';


function Quiz() {
    const [score, setScore] = useState(0);
    function correctAnswer(totalScore: number) {
        alert("Correct Answer");
        setScore(score + 1);
        console.log(score);
        window.location.reload();
    }
    return (
      <div className="quiz">
        <QuizQuestion score={score} />
      </div>
    );
  }

export default Quiz;