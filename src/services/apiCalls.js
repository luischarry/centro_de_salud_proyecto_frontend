import axios from 'axios';

const root = 'http://localhost:5500/';

export const postLogin = async (credenciales) => {

    return await axios.post(`${root}user/login`, credenciales);

};

export const postRegister = async (userData) => {
    return await axios.post(`${root}user/singup`, userData);

}