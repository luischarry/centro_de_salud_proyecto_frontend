import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { userData } from '../../User/userSlice';
import { setUsers } from '../../../services/apiCalls'
import { setDoctors } from '../../../services/apiCalls'
import UserTable from '../../../Components/Userstable';

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
            <button onClick={handleGetAllUsers}>Obtener todos los usuarios</button>
            {showTable && <UserTable users={allUsers} />}
            <button onClick={handleGetAllDoctors}>Obtener todos los doctores</button>
            {showTable && <UserTable users={allDoctors} />}
        </div>
    )
}