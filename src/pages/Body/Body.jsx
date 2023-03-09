import React from 'react';
import { Routes, Route} from 'react-router-dom';
import { Home } from '../Home/Home';
import { Login } from '../User/Login/Login';
import { Profile } from '../User/profile/Profile';
import { Doctors } from '../Doctors/Home/AllDoctors';
import { Register } from '../User/Register/Register';
import { Detail } from '../Doctors/Detail/Detail';

export const Body = () => {

    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/doctors" element={<Doctors />}/>
            <Route path="/detail" element={<Detail />}/>
        </Routes>
    )
};