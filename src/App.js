import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Value from './components/value'
import Category from './components/category'
import Answer from './components/answer'

const App = () => {
  
  const [trivia, setTrivia] = useState()
  const [value, setValue] = useState()
  const [category, setCategory] = useState()
  const [answer, setAnswer] = useState()
  const [score, setScore] = useState(0)

  const getTrivia = () => {
    axios.get('https://jservice.io/api/random').then((response) => {
      setTrivia(response.data[0].question)
      setValue(response.data[0].value)
      setCategory(response.data[0].category.title)
      setAnswer(response.data[0].answer)
      document.getElementById('answer').style.display="none";
    })
  }

  const showAnswer = () => {
    document.getElementById('answer').style.display="block";
  }

  const increaseScore = () => {
    setScore(score + value)
  }

  const decreaseScore = () => {
    setScore(score - value)
  }

  const resetScore = () => {
    setScore(0)
  }

  useEffect(() => {
    getTrivia()
  }, [])

  return (
    <div>
      <h1 class="logo">This . Is . JEOPARDY!</h1>

      <h4>Score:</h4>
      <h3>{score}</h3>
      <div className="buttons">
        <button onClick={increaseScore} class="increase">Increase Score</button>
        <br/>
        <br/>
        <button onClick={decreaseScore} class="decrease">Decrease Score</button>
        <br/>
        <br/>
        <button onClick={resetScore} class="reset">Reset Score</button>
      </div>
      <hr></hr>
      <br/>
      <button onClick={getTrivia} class="next">Next Clue</button>

      <h4>Category:</h4>
      <h3><Category category={category}/></h3>

      <h4>Point Value:</h4>
      <h3><Value value={value}/></h3>

      <h4>Question:</h4>
      <h2>{trivia}</h2>

      <button onClick={showAnswer} class="next">Reveal Answer</button>
      <div id="answer">
        <h4>Answer:</h4>
        <h2><Answer answer={answer}/></h2>
      </div>

    </div>
  )
}

export default App
