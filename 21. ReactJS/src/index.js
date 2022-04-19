import React from 'react'
import ReactDOM from 'react-dom'

import MainContent from './mainContent'
import Navbar from './navbar'


function render(data, target) {
    ReactDOM.render(data, document.getElementById(target))
}

render(<Navbar />, "navbar")
render(<MainContent />, 'root')

