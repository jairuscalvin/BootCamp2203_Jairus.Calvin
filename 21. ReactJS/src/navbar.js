import React from 'react';


const Navbar = () => {
    let waktu = new Date().toLocaleTimeString()
    return (
        <div class="links">
            <h3>Bootcamp BATCH 1</h3>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
                <li>
                    Time {waktu}
                </li>
            </ul>
        </div>
    )
}

export default Navbar;
