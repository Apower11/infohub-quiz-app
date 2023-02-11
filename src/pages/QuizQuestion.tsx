import { useState, useEffect, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal } from 'react'
import reactLogo from './assets/react.svg'
import { Link } from 'react-router-dom';
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

let questions = [];

let question1: Question = new Question("What country is represented by this flag?", "Spain", "./src/assets/images/spain.svg");
let question2: Question = new Question("What country is represented by this flag?", "Romania", "./src/assets/images/romania.png");
let question3: Question = new Question("What country is represented by this flag?", "Niger", "./src/assets/images/niger.png");
let question4: Question = new Question("What country is represented by this flag?", "Mexico", "./src/assets/images/mexico.png");

questions.push(question1);
questions.push(question2);
questions.push(question3);
questions.push(question4);

const countryList = ["Afghanistan", "Albania", "Algeria", "Argentina", "Armenia", "Bangladesh", "Barbados", "Belarus", "Belgium"]

let answers = ["","","",""];

function randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

let answerPosition = randomIntFromInterval(0,3);

let chosenQuestion = questions[randomIntFromInterval(0,questions.length - 1)];

answers[answerPosition] = chosenQuestion.answer;

for(let i = 0; i < 4; i++){
    if(i == answerPosition){
        continue;
    }
    answers[i] = countryList[randomIntFromInterval(0,countryList.length - 1)]
}

function wrongAnswer() {
    alert("Wrong Answer");
}

function QuizQuestion(props: { score: number; }) {
    const [counter, setCounter] = useState(60);
    const [score, setScore] = useState(props.score);
    function correctAnswer() {
        alert("Correct Answer");
        // setScore(score + 1);
        // props.score = props.score + 1;
        window.location.reload();
    }
    useEffect(() => {
        counter > 0 && setTimeout(() => (setCounter(counter - 1)), 1000);
        if(counter <= 0){
            window.location.reload();
        }
    }, [counter]);
    return (
      <div className="question">
        <h3>{question1.question}</h3>
        <h5>{counter}</h5>
        <h6>{props.score}</h6>
        <div className="question-image">
            <img src={chosenQuestion.imageLink} />
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
  }

export default QuizQuestion;