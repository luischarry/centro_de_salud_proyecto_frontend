import axios from 'axios';

const root = 'http://localhost:5500/';

export const postLogin = async (credenciales) => {

    return await axios.post(`${root}user/login`, credenciales);

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

export const AllDoctors = async (token) => {
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return await axios.get(`${root}doctor/alldoctors`, config);
}