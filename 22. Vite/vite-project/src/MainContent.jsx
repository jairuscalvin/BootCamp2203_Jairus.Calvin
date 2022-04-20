import React, { useState } from 'react';


function MainContent() { 
    let [Quantity, Jumlah] = useState(0)
    let add = () => {
        Jumlah(Quantity + 1)
    }
    let min = () => {
        Jumlah (Quantity - 1)
    }

    return (
        <React.Fragment>
            <h1>This Is React</h1>
            <p>WGS Bootcamp</p>
            <button class='btn1' onClick={add}>
                +
            </button>
            <button class='btn2' onClick={min}>
                -
            </button>
            <h3>Quantity : {Quantity}</h3>
        </React.Fragment>
    )
} 

export default MainContent;

