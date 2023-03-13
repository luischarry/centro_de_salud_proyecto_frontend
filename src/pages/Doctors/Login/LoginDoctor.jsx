import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from '../../../common/InputText/InputText';
import { postLoginDoctor } from '../../../services/apiCalls';
import { errorCheck } from '../../../services/utiles';
import { useSelector, useDispatch } from "react-redux";
import { userData, login } from '../../User/userSlice';

export const DoctorLogin = () => {

    //Instancia de métodos de Redux
    const dispatch = useDispatch();
    const datosReduxDoctor = useSelector(userData);
    //Hooks
    const [credenciales, setCredenciales] = useState({
        email: '',
        password: ''
    })
    const [credencialesError, setErrorCredenciales] = useState({
        emailError: '',
        passwordError: ''
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
        postLoginDoctor(credenciales)
            .then(
                resultado => {
                    //Una vez decodificado, guardaría los datos de usuario y el token,
                    //ambas cosas en REDUX, para usarlas cuando yo quiera
                    let doctorPass = {
                        token: resultado.data.token,
                        user: resultado.data.doctor
                    }
                    //Finalmente, guardo en RDX....
                    //Guardo mediante la ACCIÓN login, los datos del token y del token decodificado (datos de usuario)
                    dispatch(login({ userPass: doctorPass }));
                    //Finalmente, navego y te llevo a home en casi un segundo de delay
                    setTimeout(() => {
                        navigate("/doctorprofile")
                    }, 750);
                }
            )
            .catch(error => console.log("aqui entra", error));
    }


    useEffect(()=>{
        if(datosReduxDoctor.userPass.token !== ''){
            navigate("/");
        }
    },[])
    const loginErrorHandler = (e) => {
        
        let error = '';

        error = errorCheck(e.target.name, e.target.value);


        setErrorCredenciales((prevState)=>({...prevState, 
            [e.target.name + 'Error'] : error
        }));
    }


    return (
        <div className='loginDesign'>
            <InputText 
                type={"email"} 
                name={"email"}
                className={credencialesError.emailError === '' ? 'inputDesign' : 'inputDesign inputDesignError'} 
                placeholder={"Escribe tu email"} 
                functionHandler={InputHandler}
                errorHandler={loginErrorHandler}
            />
            <div className='errorText'>{credencialesError.emailError}</div>

            <InputText 
                type={"password"} 
                name={"password"}
                className={credencialesError.passwordError === '' ? 'inputDesign' : 'inputDesign inputDesignError'} 
                placeholder={"Escribe tu contraseña"} 
                functionHandler={InputHandler}
                errorHandler={loginErrorHandler}
            />
            <div className='errorText'>{credencialesError.passwordError}</div>

            <div className='loginButtonDesign' onClick={()=>Logeame()}>LOGIN</div>
            
        </div>
    );
}