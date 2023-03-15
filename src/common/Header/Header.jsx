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
            <div onClick={handleLogoClick} className='logoDesignHeader'>
                <img className='cameraAvatar' src="../../../../Images/logo.png" alt="Santa clarita" />
            </div>
            <div class="services">
                <div>Servicios de salud</div>
                <div onClick={() => navigate("/doctors")} className='Design'>Medicos</div>
                <div>Dental</div>
                <div>Mayores</div>
                <div>telefono</div>
            </div>


            <div className='Links'>

                {datosReduxUsuario.userPass.user.rol === "doctor" &&
                    <>
                        <div onClick={() => navigate("/doctorprofile")} className='Design'>doctor</div>
                        <div className='Design' onClick={() => logOff()}>logout</div>
                    </>
                }
                {datosReduxUsuario.userPass.user.rol === "admin" &&
                    <>
                        <div onClick={() => navigate("/admin")} className='Design'>admin</div>
                        <div className='Design' onClick={() => logOff()}>logout</div>
                    </>
                }

                {/* Renderizado condicional por si el usuario sí está logeado... */}
                {datosReduxUsuario.userPass.user.rol === "user" &&

                    <div class="services">
                        <div onClick={() => navigate("/profile")} className='Design' >{datosReduxUsuario.userPass.user.first_name}</div>
                        <div className='Design' onClick={() => logOff()}>logout</div>
                    </div>
                }

                {datosReduxUsuario.userPass.token === "" &&
                    <div class="services">

                        <div className='Design' onClick={() => setTimeout(() => { navigate("/login") }, 200)}>login</div>
                        <div className='Design' onClick={() => setTimeout(() => { navigate("/register") }, 200)}>register</div>
                    </div>
                }

            </div>
        </div>
    )
}