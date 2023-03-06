import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { userData } from '../userSlice';
//llamada a la api para ver todas las citas
//import { AllrentalsUser} from '../../../services/apiCalls'
export const Profile = () => {

    const navigate = useNavigate();
    const userRDX = useSelector(userData);
    useEffect(() => {
        if (userRDX.userPass.token === "") {
            navigate("/");
        } else {
            //A este else entraremos si SI que tenemos el token....

            console.log(userRDX.userPass);
        }
    }, []);
    return (
        <div className='profileDesign'>
            <div className='profile'>
                <header>
                    <h1>TU PERFIL</h1>
                </header>
                <div>
                    <h3>Nombre: {userRDX.userPass.user.first_name} {userRDX.userPass.user.second_name}</h3>
                    {console.log(userRDX)}
                </div>
                <div>
                    <h3>Apellidos: {userRDX.userPass.user.surname} {userRDX.userPass.user.second_surname}</h3>
                </div>
                <div>
                    <h3>Correo: {userRDX.userPass.user.email} </h3>
                </div>
                <div>
                    <h3>DNI: {userRDX.userPass.user.dni} </h3>
                </div>
                <div>
                    <h3>cipa: {userRDX.userPass.user.cipa} </h3>
                </div>
            </div>


        </div>
    )
}