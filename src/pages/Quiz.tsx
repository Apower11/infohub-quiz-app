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

  let startQuiz = async () => {
    let response = await axios.get("https://infohub-quiz-app-api.herokuapp.com/");
    localStorage.setItem("questions", JSON.stringify(response.data));
    props.onGetQuestions(response.data);
    navigate("/questions");
  }

    return (
      <button className="start-quiz-button" onClick={() => startQuiz()}>Start Quiz</button>
    )
  }

export default Quiz;