import React from 'react'
import ReactDOM from 'react-dom'
import Nav from './Nav'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';


function renderDOM(content, id ) {
ReactDOM.render(content, document.getElementById(id))
}

renderDOM(<Nav />, 'nav')
renderDOM(<App />, 'root')