import React from 'react';
import './CardDoctor.css';
export const CardDoctor = ({ name, surname }) => {
    return (
        <div className='card'>
            <div className="user-picture">
            <img src="https://img.icons8.com/carbon-copy/256/guest-male.png" alt="Medico" />
            </div>
            <div className='caracter'>
            <div><p>Dr {name} {surname}</p></div>
            <p>General practitioner</p>
            </div>
        </div>
    )
}