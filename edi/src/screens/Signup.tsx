import React, { useState } from 'react';
import { Container, ButtonGroup, Form, FormControl, FormLabel } from 'react-bootstrap';
import { BtnConfirm } from '../components'
import { TiUser, TiPen } from 'react-icons/ti';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';

const Signup = (props:any) => {    
    const dispatch = useDispatch();

//    let [ error, setError ] = useState();
//    let [ isLoading, setIsLoading ] = useState(false);

    const authHandler = async() => {
        let action;
        const DocumentInputs:any = document.getElementsByTagName("Input");
        let { email, password } = DocumentInputs;
        action = authActions.signUp(email.value, password.value);
//        setIsLoading(true);
        try {
            await dispatch(action);
        } catch (error) {
//            setError(error.message);
//            setIsLoading(false);
        }
    };

    return (
        <Container className="Signup-content">
            <section className="Signup-block">
                <TiUser size={48} /> <TiPen size={48} /> <h2>Registrate</h2>
            </section>
            <section className="Signup-form">
                <h3>
                    Ingresá un nombre de usuario y contraseña
                </h3>
                <Form>
                    <FormLabel>Usuario</FormLabel>
                    <FormControl
                        type="text" placeholder="Usuario" name="email" />
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl  
                        type="password"
                        placeholder="Contraseña"
                        name="password" />
                    <FormLabel>Confirma contraseña</FormLabel>
                    <FormControl  
                        type="re-password"
                        placeholder="Confirma contraseña" />
                    <ButtonGroup size="lg" className="mt-3 pull-right">
                        <BtnConfirm className="pull-right">Reset</BtnConfirm>
                        <BtnConfirm onClick={authHandler} className="ml-3 pull-right">Confirmar</BtnConfirm>
                    </ButtonGroup>
                </Form>
            </section>
        </Container>
    )    
}

export default Signup;