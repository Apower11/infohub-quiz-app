import { useState, useEffect, useRef, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import reactLogo from './assets/react.svg';
import { Link } from 'react-router-dom';
import Img1 from '../assets/images/spain.svg';
import Img2 from '../assets/images/romania.png';
import Img3 from '../assets/images/niger.png';
import Img4 from '../assets/images/mexico.png';
import Img5 from '../assets/images/barbados.svg';
import Img6 from '../assets/images/saint-lucia.png';
import '../css/Navbar.css';
import '../css/QuizQuestion.css';

class Question {
    question: string;
    answer: string;
    imageLink: string;
    constructor(question: string, answer: string, imageLink: string){
        this.question = question;
        this.answer = answer;
        this.imageLink = imageLink;
    }
}

let questions: any[] = [];

let questionsFinished = false;

let question1: Question = new Question("What country is represented by this flag?", "Spain", Img1);
let question2: Question = new Question("What country is represented by this flag?", "Romania", Img2);
let question3: Question = new Question("What country is represented by this flag?", "Niger", Img3);
let question4: Question = new Question("What country is represented by this flag?", "Mexico", Img4);
let question5: Question = new Question("What country is represented by this flag?", "Barbados", Img5);
let question6: Question = new Question("What country is represented by this flag?", "Saint Lucia", Img6);

questions.push(question1);
questions.push(question2);
questions.push(question3);
questions.push(question4);
questions.push(question5);
questions.push(question6);

const countryList = ["Afghanistan", "Albania", "Algeria", "Argentina", "Armenia", "Bangladesh", "Barbados", "Belarus", "Belgium"];

let answers = ["","","",""];

function randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

let loadedQuestions = JSON.parse(localStorage.getItem("questions") || "null");

if(loadedQuestions === null){
    loadedQuestions = questions;
} else if(loadedQuestions.length <= 0){
    questionsFinished = true;
}

let answerPosition: number;
let chosenIndex: number;
let chosenQuestion: { answer: string; question: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; imageLink: string | undefined; };

if(!questionsFinished){
    answerPosition = randomIntFromInterval(0,3);

chosenIndex = randomIntFromInterval(0,loadedQuestions.length - 1);

chosenQuestion = loadedQuestions[chosenIndex];

answers[answerPosition] = chosenQuestion.answer;

for(let i = 0; i < 4; i++){
    if(i == answerPosition){
        continue;
    }
    let uniqueAnswerFound = false;
    while(!uniqueAnswerFound){
        let selectedAnswer = countryList[randomIntFromInterval(0,countryList.length - 1)];
        if(answers.includes(selectedAnswer)){
            continue;
        }
        else {
            answers[i] = selectedAnswer;
            uniqueAnswerFound = true;
        }
    }
}

}

function QuizQuestion(props: {
    updateScore(): unknown; score: number; 
}) {
    const [counter, setCounter] = useState(60);
    let quizScore = JSON.parse(window.localStorage.getItem('score') || props.score.toString());
    function correctAnswer() {
        window.localStorage.setItem('score', (parseInt(quizScore) + 1).toString());
        loadedQuestions.splice(chosenIndex,1);
        localStorage.setItem("questions", JSON.stringify(loadedQuestions));
        localStorage.setItem("counter","60");
        window.location.reload();
    }
    function wrongAnswer() {
        loadedQuestions.splice(chosenIndex,1);
        localStorage.setItem("questions", JSON.stringify(loadedQuestions));
        localStorage.setItem("counter","60");
        window.location.reload();
    }
    const retryQuiz = () => {
        localStorage.removeItem("score");
        localStorage.removeItem("questions");
        localStorage.setItem("counter","60");
        window.location.reload();
    }
    useEffect(() => {
        setCounter(parseInt(localStorage.getItem("counter") || "60"));
        counter > 0 && setTimeout(() => {
            localStorage.setItem("counter",(counter - 1).toString());
            setCounter(parseInt(localStorage.getItem("counter") || "60"));
        }, 1000);
        if(counter <= 0 && !questionsFinished){
            loadedQuestions.splice(chosenIndex,1);
            localStorage.setItem("questions", JSON.stringify(loadedQuestions));
            localStorage.setItem("counter","60");
            window.location.reload();
        }
    }, [counter]);
    if(!questionsFinished){
        return (
            <div className="question-container">
              <div className="question-and-counter">
                  <h3 className="question">{chosenQuestion.question}</h3>
                  <span className="counter">{counter}</span>
              </div>
              <div className="question-image">
                  <LazyLoadImage src={chosenQuestion.imageLink} />
              </div>
              <div className="answer-options">
              {answers.map((item,index) => {
                  if(index == answerPosition){
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
                <h5>Score: {quizScore} / {questions.length} ({(Math.round((quizScore / questions.length) * 100) / 100) * 100}%)</h5>
                <button onClick={retryQuiz} className="retry-button">Retry Quiz</button>
            </div>
        )
    }
  }

export default QuizQuestion;