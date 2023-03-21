import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../pages/User/userSlice";


export const Header = () => {

    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const handleMenuClick = () => {
        setIsMenuVisible(!isMenuVisible);
    };
    const handleLabelClick = (e) => {
        e.stopPropagation();
      };

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
                <img src="https://www.clinicasantaclarita.com/images/logo.png" alt="Santa clarita" />
            </div>

            <div className="containericon" onClick={handleMenuClick}>
                <input className="label-check" id="label-check" type="checkbox" />
                <label htmlFor="label-check" className="hamburger-label" onClick={handleLabelClick}>
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </label>
            </div>
            {isMenuVisible &&
                <div className='menucenter menucenter-active'>
                    <div>Health services</div>
                    <div onClick={() => navigate("/doctors")} className='Design'>Doctors</div>
                    <div>Dental</div>
                    <div>Phone</div>
                </div>
            }
            <div className='menucenter'>
                <div>Health services</div>
                <div onClick={() => navigate("/doctors")} className='Design'>Doctors</div>
                <div>Dental</div>
                <div>Phone</div>
            </div>
            <div className='Links'>
                {datosReduxUsuario.userPass.user.rol === "doctor" &&
                    <div className="services">
                        <div onClick={() => navigate("/doctorprofile")} className='Design'>Doctor</div>
                        <div className='Design' onClick={() => logOff()}>Logout</div>
                    </div>
                }
                {datosReduxUsuario.userPass.user.rol === "admin" &&
                    <div className="services">
                        <div onClick={() => navigate("/admin")} className='Design'>Admin</div>
                        <div className='Design' onClick={() => logOff()}>Logout</div>
                    </div>
                }

                {/* Renderizado condicional por si el usuario sí está logeado... */}
                {datosReduxUsuario.userPass.user.rol === "user" &&
                    <div className="services">
                        <div onClick={() => navigate("/profile")} className='Design' >{datosReduxUsuario.userPass.user.first_name}</div>
                        <div className='Design' onClick={() => logOff()}>Logout</div>
                    </div>
                }

                {datosReduxUsuario.userPass.token === "" &&
                    <div className="services">
                        <div className='Design' onClick={() => setTimeout(() => { navigate("/login") }, 200)}>Login</div>
                        <div className='Design' onClick={() => setTimeout(() => { navigate("/register") }, 200)}>Register</div>
                    </div>
                }
            </div>
        </div>
    )
}