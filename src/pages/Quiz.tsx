import { useState, useEffect } from 'react'
import axios from 'axios';
import reactLogo from './assets/react.svg'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import QuizQuestion from './QuizQuestion';
import '../css/Navbar.css';
import '../css/QuizQuestion.css';
import '../css/Quiz.css';

function Quiz(props: {
  onGetQuestions: any}) {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([1,2,3,4,5]);

  let startQuiz = async () => {
    console.log("start");
    let response = await axios.get("https://infohub-quiz-app-api.herokuapp.com/");
    setQuestions(response.data);
    localStorage.setItem("quizStarted", "true");
    localStorage.setItem("questions", JSON.stringify(response.data));
    props.onGetQuestions(response.data);
    console.log(questions);
    navigate("/questions");
  }

  // if(!(localStorage.getItem("questions") === null)){
  //   setQuestions(JSON.parse(localStorage.getItem("questions") || "[]"));
  // }

    return (
      <button className="start-quiz-button" onClick={() => startQuiz()}>Start Quiz</button>
    )
  }

export default Quiz;