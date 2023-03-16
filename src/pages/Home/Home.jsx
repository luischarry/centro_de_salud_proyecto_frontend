import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

import { useSelector, useDispatch } from "react-redux";
export const Home = () => {

    //Instanciamos dispatch para poder ejecutar accionces en el estado de Redux
    const dispatch = useDispatch();
    //Instanciamos useNavigate en navigate para poder movernos por el router
    const navigate = useNavigate();

    return (
        <div className='homeDesign'>
            <div className="container">

                <div className="overlay">
                    <h1>SEGURO MEDICO</h1>
                    <div onClick={() => navigate("/doctors")} class="linkDesign">Pide tu cita</div>
                    <p>llamanos 9958874</p>
                </div>


            </div>
        </div>

    )
}