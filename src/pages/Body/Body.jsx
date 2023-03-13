import React from 'react';
import { Routes, Route} from 'react-router-dom';
import { Home } from '../Home/Home';
import { Login } from '../User/Login/Login';
import { DoctorLogin } from '../Doctors/Login/LoginDoctor';
import { Profile } from '../User/profile/Profile';
import { DoctorProfile } from '../Doctors/Profile/ProfileDoctor';
import { Doctors } from '../Doctors/Home/AllDoctors';
import { Register } from '../User/Register/Register';
import { Admin } from '../User/Admin/Admin';
import { Detail } from '../Doctors/Detail/Detail';

export const Body = () => {

    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/doctorlogin" element={<DoctorLogin />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/doctorprofile" element={<DoctorProfile />}/>
            <Route path="/doctors" element={<Doctors />}/>
            <Route path="/detail" element={<Detail />}/>
            <Route path="/admin" element={<Admin/>}/>
        </Routes>
    )
};