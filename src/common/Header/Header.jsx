import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../pages/User/userSlice";


export const Header = () => {
    const dispatch = useDispatch();
    const initial = {
        token: '',
        user: {}
    }
    const datosReduxUsuario = useSelector(userData);
    const navigate = useNavigate();

    function handleLogoClick() {
        navigate('/');
      }
    const logOff = () => {
        dispatch(logout({ userPass: initial }))
        navigate("/")
    }
    return (
        <div className='headerDesign'>
            <div onClick={handleLogoClick}  className='logoDesignHeader'>
             <img className='cameraAvatar' src="../../../../Images/logo.png" alt="Santa clarita" />   
            </div>
            
            <div className='headerLinksDesign'>
                
                {datosReduxUsuario.userPass.user.rol === "doctor" &&


                    <>
                        <div onClick={() => navigate("/doctorprofile")} className='linkDesign'>doctor</div>
                        <div className='linkDesign' onClick={() => logOff()}>logout</div>
                    </>
                }
                {datosReduxUsuario.userPass.user.rol === "admin" &&


                    <>
                        <div onClick={() => navigate("/admin")} className='linkDesign'>admin</div>
                        <div className='linkDesign' onClick={() => logOff()}>logout</div>
                    </>
                }

                {/* Renderizado condicional por si el usuario sí está logeado... */}
                {datosReduxUsuario.userPass.user.rol === "user" &&

                    <>
                        <div onClick={() => navigate("/doctors")} className='linkDesign'>Medicos</div>
                        <div onClick={() => navigate("/profile")} className='linkDesign' >{datosReduxUsuario.userPass.user.first_name}</div>
                        <div className='linkDesign' onClick={() => logOff()}>logout</div>
                    </>
                }
                
                {datosReduxUsuario.userPass.token === "" &&
                    <>
                        <div>Servicios de salud</div>
                        <div onClick={() => navigate("/doctors")} className='linkDesign'>Medicos</div>
                        <div>Dental</div>
                        <div>Mayores</div>
                        <div>telefono</div>
                        <div className='linkDesign' onClick={() => setTimeout(() => { navigate("/login") }, 200)}>login</div>
                        <div className='linkDesign' onClick={() => setTimeout(() => { navigate("/register") }, 200)}>register</div>
                    </>
                }

            </div>
        </div>
    )
}