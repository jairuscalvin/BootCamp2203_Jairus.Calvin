import React from 'react'
import ReactDOM from 'react-dom'


const navbar = (
<div class="links">  
<h3>Bootcamp BATCH 1</h3>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>      
        <li><a href="/contact">Contact</a></li>
    </ul>  
</div>
)

const element = <h1>This Is React</h1>



renderNavbar(navbar, 'navbar')
function renderNavbar(navdata, target) {
    ReactDOM.render(navdata, document.getElementById(target))
}

render(element, 'root')
function render(data, almt) {
    ReactDOM.render(data, document.getElementById(almt))
}


