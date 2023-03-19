import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { ButtonsBack } from '../../../common/Buttons/ButtonsBack';
import { useSelector } from "react-redux";
import { userData } from '../userSlice';
import { deleteapp } from '../../../services/apiCalls';
//llamada a la api para ver todas las citas
import { AllAppointmentsUser } from '../../../services/apiCalls'
export const Profile = () => {

    const navigate = useNavigate();
    const userRDX = useSelector(userData);
    const [allAppointments, setAllAppointments] = useState([]);
    const [showAppointments, setShowAppointments] = useState(false);
    
    function handleDelete(token,id){
        deleteapp(token,id)
        .then(() => {
            AllAppointmentsUser(userRDX.userPass.token, userRDX.userPass.user._id)
                .then(resultado => {
                    setAllAppointments(resultado.data)
                }).catch(error => console.log(error))
            navigate("/profile")
        })
        .catch( console.log('error al eliminar'))
    }

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
            <div className='profile'>
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

                <div className='appointmentprofile'>
                    <button className='btn' onClick={() => setShowAppointments(!showAppointments)}>Mostrar citas</button>
                    <div style={{ display: showAppointments ? 'block' : 'none' }}>
                        {allAppointments.length > 0 && (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Fecha de la cita</th>
                                        <th>Hora de la cita</th>
                                        <th>Doctor</th>
                                        <th>Eliminar cita</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allAppointments.map(appointment => (
                                        <tr key={appointment._id}>
                                            <td>{appointment.date} </td>
                                            <td>{appointment.time}</td>
                                            <td>{appointment.doctorId.name} {appointment.doctorId.surname}</td>
                                            <td><button className='noselect' onClick={() => handleDelete(userRDX.userPass.token,appointment._id)}><span className='text'>Delete</span><span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.500 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button></td>
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