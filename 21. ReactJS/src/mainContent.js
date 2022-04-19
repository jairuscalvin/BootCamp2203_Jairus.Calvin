import React, { useState } from 'react';


const MainContent = () => { 
    const [Quantity, Jumlah] = useState(0)
    const add = () => {
        Jumlah(Quantity + 1)
    }

    return (
        <React.Fragment>
            <h1>This Is React</h1>
            <p>WGS Bootcamp</p>
            <button id='btn' onClick={add}>
                + Add
            </button>
            <h3>Quantity : {Quantity}</h3>
        </React.Fragment>
    )
} 

export default MainContent;

