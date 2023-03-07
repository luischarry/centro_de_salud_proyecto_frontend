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
            <div>
                <div><h1>SEGURO MEDICO</h1></div>
                <div>
                <div onClick={() => navigate("/appointment")} className='linkDesign'>pide tu cita</div>
                    <div>llamanos 9958874</div>
                </div>
            </div>
        </div>
        
    )
}