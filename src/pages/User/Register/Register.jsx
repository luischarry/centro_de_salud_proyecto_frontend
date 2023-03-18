import React, { useState, useEffect } from 'react';
import { InputText } from '../../../common/InputText/InputText';
import { errorCheck } from '../../../services/utiles';
import { useNavigate } from 'react-router-dom';
import { postRegister } from '../../../services/apiCalls';
import { ButtonsBack } from '../../../common/Buttons/ButtonsBack';
import './Register.css';

export const Register = () => {

    const [user, setUser] = useState({
        first_name: '',
        second_name: '',
        surname: '',
        second_surname: '',
        dni: '',
        phone: '',
        password: '',
        email: '',
        cipa: ''
    })

    const [userError, setUserError] = useState({
        first_nameError: '',
        second_nameError: '',
        surnameError: '',
        second_surnameError: '',
        dniError: '',
        passwordError: '',
        emailError: '',
        phoneError: '',
        cipaError: ''
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
        postRegister(user)
            .then(
                result => {
                    setTimeout(() => {
                        navigate("/")
                    }, 750);
                }
            )
            .catch(error => console.log(error));
    }

    return (
        <div className='register-container'>
            <div className='btn-back' onClick={() => navigate("/")}>
                <ButtonsBack ></ButtonsBack>
            </div>
            <div className='container-form'>
                <p>SIGN UP</p>
                <form>
                    <div className='register-box'>
                        <div className='errorText'>{userError.first_nameError}</div>
                        <InputText
                            type={'text'}
                            name={'first_name'}
                            className={userError.first_nameError === '' ? 'inputDesign' : 'inputDesign inputDesignError'}
                            placeholder={'First Name'} functionHandler={registerInputHandler}
                            errorHandler={registerErrorHandler}
                        />
                        <div className='errorText'>{userError.second_nameError}</div>
                        <InputText
                            type={'text'}
                            name={'second_name'}
                            className={userError.second_nameError === '' ? 'inputDesign' : 'inputDesign inputDesignError'}
                            placeholder={'Second Name'} functionHandler={registerInputHandler}
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
                        <div className='errorText'>{userError.second_surnameError}</div>
                        <InputText
                            type={'text'}
                            name={'second_surname'}
                            className={userError.second_surnameError === '' ? 'inputDesign' : 'inputDesign inputDesignError'}
                            placeholder={'Second Surname'} functionHandler={registerInputHandler}
                            errorHandler={registerErrorHandler}
                        />

                    </div>
                    <div className='register-box'>
                        <div className='errorText'>{userError.dniError}</div>
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
                        <div className='errorText'>{userError.cipaError}</div>
                        <InputText
                            type={'text'}
                            name={'cipa'}
                            className={userError.cipaError === '' ? 'inputDesign' : 'inputDesign inputDesignError'}
                            placeholder={'CIPA'}
                            functionHandler={registerInputHandler}
                            errorHandler={registerErrorHandler}
                        />

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