import React, { useState, useEffect } from 'react';
import { InputText } from '../../../common/InputText/InputText';
import { errorCheck } from '../../../services/utiles';
import { useSelector } from "react-redux";
import { userData } from '../../User/userSlice';
import { useNavigate } from 'react-router-dom';
import { postRegisterDoctor } from '../../../services/apiCalls';
import { ButtonsBack } from '../../../common/Buttons/ButtonsBack';
export const RegisterDoctor = () => {

    const userRDX = useSelector(userData);

    const [user, setUser] = useState({
        name: '',
        surname: '',
        dni: '',
        phone: '',
        password: '',
        email: '',
    })

    const [userError, setUserError] = useState({
        nameError: '',
        surnameError: '',
        dniError: '',
        passwordError: '',
        emailError: '',
        phoneError: ''

    })
    const navigate = useNavigate();

    const registerInputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));;
    }

    const registerErrorHandler = (e) => {
        let error = '';
        error = errorCheck(e.target.name, e.target.value);
        setUserError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error
        }));
    }
    const singup = () => {
        //llamamos al servicio....
        postRegisterDoctor(user,userRDX.userPass.token)
            .then(
                navigate("/")
            )
            .catch(error => console.log(error));
    }

    return (
        <div className='register-container'>
            <div className='btn-back' onClick={() => navigate("/profile")}>
                <ButtonsBack ></ButtonsBack>
            </div>
            <div className='container-form'>
                <p>SIGN UP DOCTOR</p>
                <form>
                    <div className='register-box'>
                        <div className='errorText'>{userError.first_nameError}</div>
                        <InputText
                            type={'text'}
                            name={'name'}
                            className={userError.first_nameError === '' ? 'inputDesign' : 'inputDesign inputDesignError'}
                            placeholder={'Name'} functionHandler={registerInputHandler}
                            errorHandler={registerErrorHandler}
                        />
                    </div>
                    <div className='register-box'>
                        <div className='errorText'>{userError.surnameError}</div>
                        <InputText
                            type={'text'}
                            name={'surname'}
                            className={userError.surnameError === '' ? 'inputDesign' : 'inputDesign inputDesignError'}
                            placeholder={'Surname'} functionHandler={registerInputHandler}
                            errorHandler={registerErrorHandler}
                        />
                    </div>
                    <div className='register-box'>
                        <InputText
                            type={'text'}
                            name={'dni'}
                            className={userError.dniError === '' ? 'inputDesign' : 'inputDesign inputDesignError'}
                            placeholder={'DNI'} functionHandler={registerInputHandler}
                            errorHandler={registerErrorHandler}
                        />
                        <div className='errorText'>{userError.phoneError}</div>
                        <InputText
                            type={'text'}
                            name={'phone'}
                            className={userError.phoneError === '' ? 'inputDesign' : 'inputDesign inputDesignError'}
                            placeholder={'phone'}
                            functionHandler={registerInputHandler}
                            errorHandler={registerErrorHandler}
                        />
                    </div>
                    <div className='register-box'>
                        <InputText
                            type={'email'}
                            name={'email'}
                            className={userError.emailError === '' ? 'inputDesign' : 'inputDesign inputDesignError'}
                            placeholder={'correo'}
                            functionHandler={registerInputHandler}
                            errorHandler={registerErrorHandler}
                        />
                    </div>
                    <div className='register-box'>
                        <InputText
                            type={'password'}
                            name={'password'}
                            className={userError.passwordError === '' ? 'inputDesign' : 'inputDesign inputDesignError'}
                            placeholder={'password'}
                            functionHandler={registerInputHandler}
                            errorHandler={registerErrorHandler}
                        />
                        <div className='errorText'>{userError.passwordError}</div>
                    </div>
                    <div className='register-box'>
                        <button className='signupButtonDesign' onClick={() => singup()}>SignUp</button>
                    </div>
                </form>
            </div>
        </div>
    );
};