import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from '../../../common/InputText/InputText';
import { postLogin } from '../../../services/apiCalls';
import { errorCheck } from '../../../services/utiles';
import { useSelector, useDispatch } from "react-redux";
import { userData, login } from '../userSlice';

import './Login.css';

export const Login = () => {

    //Instancia de métodos de Redux
    const dispatch = useDispatch();
    const datosReduxUsuario = useSelector(userData);

    const [credenciales, setCredenciales] = useState({
        email: '',
        password: ''
    })

    const [credencialesError, setErrorCredenciales] = useState({
        emailError: '',
        passwordError: ''
    })
    const [credencialesLogin, setCredencialesLogin]=useState({
        loginError:''
    })

    const navigate = useNavigate();

    const InputHandler = (e) => {
        //Bindear (atar)
        setCredenciales((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value

        }));;
    }

    const Logeame = () => {

        //Este for in va a recorrer el objeto de js en busqueda de que una sola de sus propiedades
        //tenga un valor distinto de comillas vacias, es decir, haya un error presente
        for (const property in credencialesError) {
            if (credencialesError[property] !== '') {
                return;
            }
        }

        //Desde aqui llamamos al servicio....
        postLogin(credenciales)
            .then(
                resultado => {
                    if (resultado.data === 'Incorrect user or password') {
                        setCredencialesLogin((prevState) => ({
                            ...prevState,
                            loginError: 'An error occurred while trying to log in'
                        }))
                    } else {
                        let userPass = {
                            token: resultado.data.token,
                            user: resultado.data.user
                        }
                        //Guardo mediante la ACCIÓN login, los datos del token y del token decodificado (datos de usuario)
                        dispatch(login({ userPass: userPass }));
                        //Finalmente, navego y te llevo a home en casi un segundo de delay
                        setTimeout(() => {
                            navigate("/")
                        }, 750);
                    }

                }
            )
            .catch(error => {
                setCredencialesLogin((prevState) => ({
                    ...prevState,
                    loginError: 'An error occurred while trying to log in'
                }))
            });
    }

    useEffect(() => {
        if (datosReduxUsuario.userPass.token !== '') {
            navigate("/");
        }
    }, [])

    const loginErrorHandler = (e) => {
        let error = '';
        error = errorCheck(e.target.name, e.target.value);

        setErrorCredenciales((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error
        }));
    }


    return (
        <div className='login-box'>
            <p>Login</p>
            <form>
                <div className='user-box'>
                    <InputText
                        type={"email"}
                        name={"email"}
                        className={credencialesError.emailError === '' ? 'inputDesign' : 'inputDesign inputDesignError'}
                        placeholder={"example@email.com"}
                        functionHandler={InputHandler}
                        errorHandler={loginErrorHandler}

                    />
                    <div className='errorText'>{credencialesError.emailError}</div>
                </div>
                <div className='user-box'>
                    <InputText
                        type={"password"}
                        name={"password"}
                        className={credencialesError.passwordError === '' ? 'inputDesign' : 'inputDesign inputDesignError'}
                        placeholder={"Password"}
                        functionHandler={InputHandler}
                        errorHandler={loginErrorHandler}
                    />
                </div>
                <div className='errorText'>{credencialesError.passwordError}</div>
                <a href="#">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <div className='loginButtonDesign' onClick={() => Logeame()}>LOGIN</div>
                </a>
                <div className='errorText'>{credencialesLogin.loginError}</div>
            </form>
            <p>You do not have an account? <a onClick={() => navigate("/register")} className="a2">Sign up!</a></p>

            <div onClick={() => navigate("/doctorlogin")} className='linkDoctor'>Doctor</div>
        </div>
    );
};