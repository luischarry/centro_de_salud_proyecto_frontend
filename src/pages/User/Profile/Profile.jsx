import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { ButtonsBack } from '../../../common/Buttons/ButtonsBack';
import { useSelector } from "react-redux";
import { userData } from '../userSlice';
//llamada a la api para ver todas las citas
import { AllAppointmentsUser } from '../../../services/apiCalls'
export const Profile = () => {

    const navigate = useNavigate();
    const userRDX = useSelector(userData);
    const [allAppointments, setAllAppointments] = useState([]);
    const [showAppointments, setShowAppointments] = useState(false);


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
            <div className='btn-back' onClick={() => navigate("/")}>
                <ButtonsBack ></ButtonsBack>
            </div>

            <header>
                <h1>TU PERFIL</h1>
            </header>
            <div className='pp'>
                <div className='cardprofile'>
                    <div className='div1'>
                        <img src="	https://centrojovenalcorcon.files.wordpress.com/2021/02/servicio-madrid-salud.jpg" alt="Descripción de la imagen" />
                    </div>
                    <div className='div2'>
                        <div>
                            <h4>{userRDX.userPass.user.cipa}</h4>
                        </div>
                        <div>
                            <p>{userRDX.userPass.user.dni}</p>
                            <p>TFNO. URG: 112</p>
                            <p>01</p>
                        </div>
                        <h4>{userRDX.userPass.user.first_name} {userRDX.userPass.user.second_name} {userRDX.userPass.user.surname} {userRDX.userPass.user.second_surname}</h4>

                    </div>
                </div>

                <div>
                    <button className='btn' onClick={() => setShowAppointments(!showAppointments)}>Mostrar citas</button>
                    <div style={{ display: showAppointments ? 'block' : 'none' }}>
                        {allAppointments.length > 0 && (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Fecha de la cita</th>
                                        <th>Hora de la cita</th>
                                        <th>Doctor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allAppointments.map(appointment => (
                                        <tr key={appointment._id}>
                                            <td>{appointment.date} </td>
                                            <td>{appointment.time}</td>
                                            <td>{appointment.doctorId.name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}