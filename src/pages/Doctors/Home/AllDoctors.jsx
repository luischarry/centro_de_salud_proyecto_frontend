import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AllDoctors } from '../../../services/apiCalls'
import { useSelector, useDispatch } from "react-redux";
import { ButtonsBack } from '../../../common/Buttons/ButtonsBack';
import { CardDoctor } from '../../../common/CardDoctor/CardDoctor';
import { userData } from '../../User/userSlice';
import { doctorData, select } from '../doctorSlice';
import './AllDoctors.css';

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

    const Choosen = (doctor) => {
        //guardar en Redux el medico escogido
        dispatch(select({ choosen: doctor }))

        //se redirecciona para pedir la cita

        setTimeout(() => {
            navigate("/detail");
        }, 250);

    }
    return (
        <div>  
            <div className='btn-back' onClick={() => navigate("/")}>
                <ButtonsBack ></ButtonsBack>
            </div>
            <div className='cards'>
                {allDoctors.length > 0 && allDoctors.map(
                    doctor => {
                        return (

                            <div key={doctor._id} onClick={() => Choosen(doctor)} className='linkDesign'>
                                <CardDoctor name={doctor.name} surname={doctor.surname} />
                            </div>
                        )
                    }
                )}
            </div>
        </div>
    )
}