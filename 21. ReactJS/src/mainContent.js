import React, { UseState } from 'react';


const mainContent = () => { 
    let [Quantity, Jumlah] = UseState(0)
    let add = () => {
        Jumlah(Quantity+1)
    }

    return (
        <React.Fragment>
            <h1>This Is React</h1>
            <p>WGS Bootcamp</p>
            <button id='btn' onClick={add}>
                + Add
            </button>
            <h3>Quantity : {Jumlah}</h3>
        </React.Fragment>
    )
} 

export default mainContent;

