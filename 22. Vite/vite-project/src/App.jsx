import React, { useState } from 'react';
import { Toast, Button } from "react-bootstrap";

function Increment(props) {
  return (
      <Button onClick={props.onClickFunc} variant="primary"> Add </Button>
  )
}

function Decrement(props) {
  return (
      <Button onClick={props.onClickFunc} variant="danger"> Reduce </Button>
  )
}

function Display(props) {
  return (
  <label>{props.message}</label>
  )
}   

function App() {
  const [counter, setCounter] = useState(0);
  const incrementCounter = () => setCounter(counter + 1)
  const decrementCounter = () => setCounter(counter - 1)

  return (
      <Toast>
          <Toast.Header>
              <strong className="me-auto">Button Add</strong>
              <small>click button to change number</small>
          </Toast.Header>
          <Toast.Body>
          <Increment onClickFunc={incrementCounter}/>
          {' '}
          <Decrement onClickFunc={decrementCounter}/>
          <hr/>
          <label>Quantity : </label> <Display message={counter}/>
          </Toast.Body>
      </Toast>
  );
}

export default App;

