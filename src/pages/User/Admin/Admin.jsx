import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { userData } from '../../User/userSlice';
import { setUsers } from '../../../services/apiCalls'
import { setDoctors } from '../../../services/apiCalls'
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
                console.log(resultado)
                setAllDoctors(resultado.data)
                setShowTable(true);
            }).catch(error => console.log(error))
    };
    return (
        <div>
            <div className='admin'>
                <div className='menuAdmin'>
                    <h2>Todos los usuarios</h2><button onClick={handleGetAllUsers}>Usuarios</button>
                    {showTable && <UserTable users={allUsers} />}
                </div>
                <div className='menuAdmin'>
                    <h2>Todos los medicos</h2><button onClick={handleGetAllDoctors}>Doctores</button>
                    {showTable && <UserTable users={allDoctors} />}
                </div>
            </div>
            <div>
            <button onClick={() => navigate("/registerdoctor")}>Registrar Doctores</button>
            </div>
        </div>
    )
}