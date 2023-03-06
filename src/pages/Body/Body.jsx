import React from 'react';
import { Routes, Route} from 'react-router-dom';
import { Home } from '../Home/Home';
import { Login } from '../User/Login/Login';
import { Profile } from '../User/profile/Profile';
import { Register } from '../User/Register/Register';

export const Body = () => {

    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/profile" element={<Profile />}/>
        </Routes>
    )
};