import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { userData } from '../../User/userSlice';
import { AppointmentsToday } from '../../../services/apiCalls'
import './ProfileDoctor.css'

export const DoctorProfile = () => {
    const navigate = useNavigate();
    const userRDX = useSelector(userData);
    const [allAppointments, setAllAppointments] = useState([]);
    const [checked, setChecked] = useState({});

    useEffect(() => {
        if (userRDX.userPass.token === "" && userRDX.userPass.user.rol !== 'doctor') {
            navigate("/");
        }
    }, []);

    useEffect(() => {
        if (allAppointments.length === 0) {
            AppointmentsToday(userRDX.userPass.token, userRDX.userPass.user._id)
                .then(resultado => {
                    setAllAppointments(resultado.data)
                }).catch(error => console.log(error))
        }
    }, [allAppointments])


    return (
        <div>
            <div><h1>Bienvenido Dr {userRDX.userPass.user.name} {userRDX.userPass.user.surname}</h1></div>
            <div><h2>Estas son tus citas de hoy</h2></div>
            <table className='tableapp'>
                <thead>
                    <tr>
                        <th>Nombre del Paciente</th>
                        <th>Hora de la Cita</th>
                        <th>Telf del paciente</th>
                        <th>Evaluado</th>
                    </tr>
                </thead>
                <tbody>
                    {allAppointments.length > 0 && allAppointments.map(appointment => {
                        return (
                            <tr key={appointment._id} className={checked[appointment._id] ? 'selected' : ''}>
                                <td>{appointment.userId.first_name} {appointment.userId.second_name} {appointment.userId.surname} {appointment.userId.second_surname}</td>
                                <td>{appointment.time}</td>
                                <td>{appointment.userId.phone}</td>
                                <td>
                                    <input type="checkbox" onChange={() => setChecked({...checked, [appointment._id]: !checked[appointment._id]})}></input>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}