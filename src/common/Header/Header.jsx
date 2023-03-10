import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
//primero importo métodos que me permitirán conectarme para leer y modificar en redux
import { useSelector, useDispatch } from "react-redux";
//a continuación, importo los datos del estado de la slice de user (userData) y la ACCION logout
import { userData, logout } from "../../pages/User/userSlice";


export const Header = () => {
    //Al instanciar dispatch, lo podré usar para emitir ACCIONES de REDUX
    const dispatch = useDispatch();
    //Initial es un objeto de JavaScript que es igual que el estado de redux por defecto, 
    //para pasárselo luego cuando haga el logout
    const initial = {
        token: '',
        user: {}
    }
    //Guardo en la constante datosReduxUsuario, los datos que me traigo del state de redux (userData)
    const datosReduxUsuario = useSelector(userData);
    //Instanciamos el método useNavigate para poder utilizarlo
    const navigate = useNavigate();

    const logOff = () => {
        dispatch(logout({ userPass: initial }))

        navigate("/")
    }
    return (
        <div className='headerDesign'>
            <div>logo</div>

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