import { useRef, useState } from 'react';
import './quiz.css'
import { data } from "../../assets/data.js";

const Quiz = () => {

  let [index, setIndex] = useState(0);
  let [questions, setQuestions] = useState(data[index])
  let [lock, setLock] = useState(false)
  let [score, setScore] = useState(0)

  let [result, setResult] = useState(false)

  let opt1 = useRef(null)
  let opt2 = useRef(null)
  let opt3 = useRef(null)
  let opt4 = useRef(null)

  let option_array = [opt1, opt2, opt3, opt4];

  const checkAnswer = (e, answer) => {
    if (lock === false) {
      if (questions.ans === answer) {
        e.target.classList.add("correct")
        setLock(true)
        setScore(prev => prev+1)
      }
      else {
        e.target.classList.add("wrong")
        setLock(true)

        option_array[questions.ans - 1].current.classList.add("correct")
      }
    } 
  }

  const next = () => {
    if (lock) {
      if (index === data.length - 1) {
        setResult(true)
        return 0;
      }

      setIndex(++index);
      setQuestions(data[index])
      setLock(false)

      option_array.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct")
        return null;
      })
    }
  }

  const reset = () => {
    setIndex(0)
    setQuestions(data[0])
    setLock(false)
    setScore(0)
    setResult(false)
  }

  return (
    <div className='container'>
      <h1>Quiz App in React</h1>
      <hr />

      {result ? 
        <>
          <h2>You Scored {score} out of {data.length}</h2>
          <button onClick={() => reset()}>Reset</button>
        </> 
        : 
        <>
          <h2>{index + 1}. {questions.question}</h2>

          <ul>
            <li onClick={(e) => {checkAnswer(e, 1)}} ref={opt1}>{questions.option1}</li>
            <li onClick={(e) => {checkAnswer(e, 2)}} ref={opt2}>{questions.option2}</li>
            <li onClick={(e) => {checkAnswer(e, 3)}} ref={opt3}>{questions.option3}</li>
            <li onClick={(e) => {checkAnswer(e, 4)}} ref={opt4}>{questions.option4}</li>
          </ul>

          <button onClick={() => next()}>Next</button>

          <div className='index'>
            {index + 1} to {data.length} questions
          </div>
        </>
      }

    </div>
  )
}

export default Quiz