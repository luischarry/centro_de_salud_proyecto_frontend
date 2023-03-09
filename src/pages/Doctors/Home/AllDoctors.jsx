import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AllDoctors } from '../../../services/apiCalls'
import { useSelector, useDispatch } from "react-redux";
import { userData } from '../../User/userSlice';
import { doctorData, select } from '../doctorSlice';

export const Doctors = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userRDX = useSelector(userData);
    const [allDoctors, setAllDoctors] = useState([]);

    useEffect(() => {
        if (userRDX.userPass.token === "") {
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        if (allDoctors.length === 0) {
            AllDoctors(userRDX.userPass.token)
                .then(resultado => {
                    setAllDoctors(resultado.data)
                }).catch(error => console.log(error))
        }
    }, [allDoctors])

    const Choosen = (doctorId) => {
        //guardar en Redux el medico escogido
        dispatch(select({ choosen: doctorId }))

        //se redirecciona para pedir la cita

        setTimeout(() => {
            navigate("/detail");
        }, 250);

    }
    return (
        <div>
            <div>
                {allDoctors.length > 0 && allDoctors.map(
                    doctor => {
                        return (
                            <div key={doctor._id} onClick={() => Choosen(doctor._id)} className='linkDesign'>
                                <div>dr {doctor.name}</div>
                            </div>
                        )
                    }
                )}
            </div>
            <div onClick={() => navigate("/")} className='linkDesign'>regresar</div>
        </div>
    )
}