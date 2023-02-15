import { useState, useEffect, useRef, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal } from 'react'
import reactLogo from './assets/react.svg'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Img1 from '../assets/images/spain.svg';
import Img2 from '../assets/images/romania.png';
import Img3 from '../assets/images/niger.png';
import Img4 from '../assets/images/mexico.png';
import Img5 from '../assets/images/barbados.svg';
import Img6 from '../assets/images/saint-lucia.png';
import '../css/Navbar.css';
import '../css/QuizQuestion.css';

function QuizQuestion(props: {
    questions: any;
}) {    
    const [counter, setCounter] = useState(60);
    const [quizQuestions, setQuizQuestions] = useState(JSON.parse(localStorage.getItem("questions") || "[]") || [1,2,3,4,5]);
    const [questionIndex, setQuestionIndex] = useState(parseInt(localStorage.getItem("questionIndex") || "0") || 0);
    const [currentQuestion, setCurrentQuestion] = useState(quizQuestions[questionIndex]);
    const [score, setScore] = useState(0);
    const navigate = useNavigate();
    let quizScore = JSON.parse(window.localStorage.getItem('score') || "0");
    console.log(quizQuestions);   
    console.log("Current Question: " + currentQuestion);
    function correctAnswer() {
        // setQuestionIndex(questionIndex + 1)
        window.localStorage.setItem('score', (parseInt(quizScore) + 1).toString());
        localStorage.setItem("questionIndex", (questionIndex+1).toString())
        setQuestionIndex(parseInt(localStorage.getItem("questionIndex") || "0") || 0);
        setScore(score + 1);
        setCurrentQuestion(quizQuestions[questionIndex + 1]);
        localStorage.setItem("counter","60");
        console.log("Score: " + score);
    }
    function wrongAnswer() {
        localStorage.setItem("questionIndex", (questionIndex+1).toString())
        setQuestionIndex(parseInt(localStorage.getItem("questionIndex") || "0") || 0);
        setScore(score + 1);
        setCurrentQuestion(quizQuestions[questionIndex + 1]);
        localStorage.setItem("counter","60");
    }
    const retryQuiz = () => {
        localStorage.removeItem("score");
        setQuestionIndex(0);
        setScore(0);
        localStorage.setItem("questionIndex", "0");
        setCurrentQuestion(quizQuestions[0]);
        localStorage.setItem("counter","60");
    }
    let exitQuiz = () => {
        navigate("/");
        localStorage.removeItem("questions");
        localStorage.removeItem("questionIndex");
        localStorage.removeItem("score");
        localStorage.removeItem("counter");
    }
    useEffect(() => {
        setCounter(parseInt(localStorage.getItem("counter") || "60"));
        counter > 0 && setTimeout(() => {
            localStorage.setItem("counter",(parseInt(localStorage.getItem("counter") || "60") - 1).toString());
            setCounter(parseInt(localStorage.getItem("counter") || "60"));
        }, 1000);
        if(counter <= 0 && !(questionIndex == quizQuestions.length)){
            setCounter(60);
            setQuestionIndex(questionIndex + 1);
            setCurrentQuestion(quizQuestions[0]);
            localStorage.setItem("counter","60");
        }
    }, [counter]);
    if(!(questionIndex == quizQuestions.length)){
        return (
            <div className="question-container">
              <div className="question-and-counter">
                  <h3 className="question">{currentQuestion.question}</h3>
                  <span className="counter">{localStorage.getItem("counter")}</span>
              </div>
              <div className="question-image">
                  <img src={currentQuestion.imageLink} />
              </div>
              <div className="answer-options">
              {currentQuestion.answers.map((item: any,index: any) => {
                  if(index == currentQuestion.correctAnswerIndex){
                      return <button onClick={correctAnswer} key={index}>{item}</button>
                  } else {
                      return <button onClick={wrongAnswer} key={index}>{item}</button>
                  }
              })}
              </div>
            </div>
          );
    } else {
        return (
            <div>
                <h2>No Questions Left</h2>
                <h5>Score: {quizScore} / {quizQuestions.length} ({(Math.round((quizScore / quizQuestions.length) * 100) / 100) * 100}%)</h5>
                <button onClick={retryQuiz} className="retry-button">Retry Quiz</button>
                <br />
                <button className="exit-button" onClick={exitQuiz}>Exit Quiz</button>
            </div>
        )
    }
  }

export default QuizQuestion;