import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userData } from '../../User/userSlice';
import { doctorData, select } from '../doctorSlice';
import { useSelector } from "react-redux";
import { postAppoinment } from '../../../services/apiCalls';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import './Detail.css';

function isWeekday(date) {
    const day = date.getDay();
    return day !== 0 && day !== 6;
}

export const Detail = () => {
    const [date, setDate] = useState(moment().add(1, 'day').startOf('day').toDate());
    const [time, setTime] = useState(moment().hour(9).startOf('hour').toDate());
    const [showDateTime, setShowDateTime] = useState(false);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const userRDX = useSelector(userData);
    const doctorRDX = useSelector(doctorData);

    const handleDateChange = (value) => {
        if (moment(value).isBefore(moment().startOf('day').add(1, 'day'))) {
            setDate(moment().add(1, 'day').startOf('day').toDate());
        } else {
            setDate(value);
        }
    };

    const handleTimeChange = (value) => {
        const selectedTime = moment(value).toDate();
        const minTime = moment(date).hour(9).startOf('hour').toDate();
        const maxTime = moment(date).hour(17).startOf('hour').toDate();

        if (selectedTime < minTime) {
            setTime(minTime);
        } else if (selectedTime > maxTime) {
            setTime(maxTime);
        } else {
            setTime(selectedTime);
        }
    };

    const handleShowDateTime = () => {
        setShowDateTime(true);
    };
    const token = userRDX.userPass.token
    const sendDateTimeToAPI = () => {
        const data = {
            date: moment(date).format('YYYY-MM-DD'),
            time: moment(time).format('HH:mm:ss'),
            doctorId: doctorRDX.choosen,
            userId: userRDX.userPass.user._id
        };
        postAppoinment(data, token)
            .then(
                result => {
                    console.log(result);
                    if (typeof result.data === 'string') {
                        console.log("aqui entra fallo");
                        setMessage(result.data);
                    } else {
                        setMessage('Cita creada correctamente');
                        console.log("aqui entra bien");
                        setTimeout(() => {
                            navigate("/")
                        }, 750);
                    }

                }
            )
            .catch(error => console.log(error));

    };
    return (
        <div >
            <div className='containerAppointments'>
                <h1>Calendario y Hora</h1>
            </div>

            <div className='calendar-box'>
                <div className='calendar'>
                    <Calendar
                        onChange={handleDateChange}
                        value={date}
                        minDate={moment().add(1, 'day').toDate()}
                        tileDisabled={({ date }) => !isWeekday(date)}
                    />
                </div>
                <div className='datetime'>
                    <div className='sendapp'>
                        <Datetime
                            value={time}
                            onChange={handleTimeChange}
                            dateFormat={false}
                            inputProps={{ placeholder: 'Seleccione la hora' }}
                            timeConstraints={{ hours: { min: 9, max: 17, step: 1 }, minutes: { step: 60 } }}
                        />
                    </div>

                    <div className='calendar-box'>
                        <button className='select' onClick={handleShowDateTime}><span className='text'>Confirmar</span><span className="icon"></span><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 32 32"><path d="M5 16.577l2.194-2.195 5.486 5.484L24.804 7.743 27 9.937l-14.32 14.32z"></path></svg></button>

                        <button className='noselect' onClick={() => navigate("/")}><span className='text'>Cancelar</span><span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.500 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
                    </div>

                    {showDateTime && (
                        <div className='dateselect'>
                            <p>Fecha seleccionada: {moment(date).format('DD/MM/YYYY')}</p>
                            <p>Hora seleccionada: {moment(time).format('hh:mm A')}</p>
                            <p>Medico: {doctorRDX.doctorPass.user.name} {doctorRDX.doctorPass.user.surname}</p>
                            {console.log(doctorRDX.doctorPass.user.name)}
                            <div className='sendapp'>
                                <button onClick={sendDateTimeToAPI}>Guardar</button>
                            </div>

                        </div>
                    )}
                </div>
            </div>
            <div>{message && <p>{message}</p>}</div>
        </div>
    )
}