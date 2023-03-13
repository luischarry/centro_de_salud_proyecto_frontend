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
        <div>
            <h1>Calendario y Hora</h1>
            <Calendar
                onChange={handleDateChange}
                value={date}
                minDate={moment().add(1, 'day').toDate()}
                tileDisabled={({ date }) => !isWeekday(date)}
            />
            <Datetime
                value={time}
                onChange={handleTimeChange}
                dateFormat={false}
                inputProps={{ placeholder: 'Seleccione la hora' }}
                timeConstraints={{ hours: { min: 9, max: 17, step: 1 }, minutes: { step: 60 } }}
            />
            <button onClick={handleShowDateTime}>confirmar</button>
            {showDateTime && (
                <div>
                    <p>Fecha seleccionada: {moment(date).format('DD/MM/YYYY')}</p>
                    <p>Hora seleccionada: {moment(time).format('hh:mm A')}</p>
                    <button onClick={sendDateTimeToAPI}>Guardar</button>
                </div>

            )}
            <div>{message && <p>{message}</p>}</div>
        </div>
    )
}