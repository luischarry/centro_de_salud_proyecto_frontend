import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { userData } from '../userSlice';
//llamada a la api para ver todas las citas
import { AllAppointmentsUser } from '../../../services/apiCalls'
export const Profile = () => {

    const navigate = useNavigate();
    const userRDX = useSelector(userData);
    const [allAppointments, setAllAppointments] = useState([]);
    

    useEffect(() => {
        if (userRDX.userPass.token === "") {
            navigate("/");
        } 
    }, []);

    useEffect(() => {
        if (allAppointments.length === 0) {
            AllAppointmentsUser(userRDX.userPass.token, userRDX.userPass.user._id)
                .then(resultado => {
                    setAllAppointments(resultado.data)
                }).catch(error => console.log(error))
        }
    }, [allAppointments])


    return (
        <div className='profileDesign'>
            <div className='profile'>
                <header>
                    <h1>TU PERFIL</h1>
                </header>
                <div>
                    <h3>Nombre: {userRDX.userPass.user.first_name} {userRDX.userPass.user.second_name}</h3>
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
            <div>
                {allAppointments.length>0 && allAppointments.map(
                    appointment=>{
                        return (
                            <div key={appointment._id} >
                                <div>hora de la cita {appointment.appointment_date}</div>
                                <div>doctor {appointment.doctorId.name}</div>
                            </div>
                        )
                    }
                )}
            </div>
            <div onClick={() => navigate("/")} className='linkDesign'>regresar</div>

        </div>
    )
}