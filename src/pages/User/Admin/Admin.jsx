import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { userData } from '../../User/userSlice';
import { setUsers } from '../../../services/apiCalls'
import { setDoctors } from '../../../services/apiCalls'
import { setAllpointments } from '../../../services/apiCalls'
import UserTable from '../../../Components/Userstable';
import { RegisterDoctor } from '../../Doctors/Register/RegisterDoctor';
import './Admin.css'

export const Admin = () => {
    const navigate = useNavigate();
    const userRDX = useSelector(userData);
    const [allUsers, setAllUsers] = useState([]);
    const [allDoctors, setAllDoctors] = useState([]);
    const [showTable, setShowTable] = useState(false);

    useEffect(() => {
        if (userRDX.userPass.token === "" && userRDX.userPass.user.rol !== 'admin') {
            navigate("/");
        }
    }, []);

    const handleGetAllUsers = () => {
        setUsers(userRDX.userPass.token)
            .then(resultado => {
                setAllUsers(resultado.data)
                setShowTable(true);
            }).catch(error => console.log(error))
    };
    const handleGetAllDoctors = () => {
        setDoctors(userRDX.userPass.token)
            .then(resultado => {
                setAllDoctors(resultado.data)
                setShowTable(true);
            }).catch(error => console.log(error))
    };

    return (
        <div>
            <div className='admin'>
                <button onClick={handleGetAllUsers}>Usuarios</button>
                <button onClick={handleGetAllDoctors}>Doctores</button>
                <button onClick={() => navigate("/registerdoctor")}>Registrar Doctores</button>
            </div>
            <div className='menuAdmin'>
                <h2>Todos los usuarios</h2>
                {showTable && <UserTable users={allUsers} />}
            </div>
            <div className='menuAdmin'>
                <h2>Todos los medicos</h2>
                {showTable && <UserTable users={allDoctors} />}
            </div>
        </div>
    )
}