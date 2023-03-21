import axios from 'axios';

const root = 'http://localhost:5500/';

export const postLogin = async (credentials) => {

    return await axios.post(`${root}user/login`, credentials);

};
export const postLoginDoctor = async (credentials) => {

    return await axios.post(`${root}doctor/login`, credentials);

};
export const postAppoinment = async (data,token) => {
   
    let config = {
        headers: { Authorization: `Bearer ${token}`, },
    }
    return await axios.post(`${root}appointment`, data , config);
    
};
export const postRegister = async (userData) => {
    return await axios.post(`${root}user/singup`, userData);

}
export const AllAppointmentsUser = async (token, _id) => {
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return await axios.get(`${root}appointment/?userId=${_id}`, config);
}
export const AppointmentsToday = async (token, _id) => {
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return await axios.get(`${root}appointment/today/${_id}`, config);
}
export const AllDoctors = async (token) => {
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return await axios.get(`${root}doctor/alldoctors`, config);
}
export const setUsers = async (token) => {
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return await axios.get(`${root}user/allUser`, config);
}
export const setDoctors = async (token) => {
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return await axios.get(`${root}doctor/alldoctors`, config);
}
export const getCalendar = async (_id) => {
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return await axios.get(`${root}appointment/?doctorId=${_id}`, config);
}

export const deleteapp = async (token, _id) => {
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return await axios.delete(`${root}appointment/${_id}`, config);
}

export const postRegisterDoctor = async (userData,token) => {
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return await axios.post(`${root}user/singup`, userData, config);

}