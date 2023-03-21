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
            <div><h1>Welcome dr {userRDX.userPass.user.name} {userRDX.userPass.user.surname}</h1></div>
            <div><h2>These are today's patients.</h2></div>
            <table className='tableapp'>
                <thead>
                    <tr>
                        <th>Name of patient</th>
                        <th>Appointment time</th>
                        <th>Patient phone</th>
                        <th>Evaluated</th>
                    </tr>
                </thead>
                <tbody>
                    {allAppointments.length > 0 && allAppointments.map(appointment => {
                        {console.log(appointment)}
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