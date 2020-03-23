import React, { useState } from 'react';
import { Container, Form, FormControl, FormLabel, ButtonGroup } from 'react-bootstrap';
import { BtnConfirm } from '../components'
import { TiKeyOutline } from 'react-icons/ti';
import * as authActions from '../store/actions/auth';
import { useDispatch } from 'react-redux';

const Login = (props:any) => {
    const dispatch = useDispatch();

//    let [ error, setError ] = useState();
//    let [ isLoading, setIsLoading ] = useState(false);
//    let [ isSignup, setIsSignup ] = useState(false);

    const authHandler = async() => {
        let action;
        const DocumentInputs:any = document.getElementsByTagName("Input");
        console.log(DocumentInputs)
        let { email, password } = DocumentInputs;
        action = authActions.login(email.value, password.value);
//        setIsLoading(true);
        try {
            await dispatch(action);
            document.location.href = "/";
        } catch (error) {
//            setError(error.message);
//            setIsLoading(false);
        }
    };

    return (
        <Container className="Login-content">
            <section className="Login-block">
                <TiKeyOutline size={48} /> <h2>Ingresar</h2>
            </section>
            <section className="Login-form">
                <h3>
                    Ingresá tu usuario y contraseña
                </h3>
                <Form>
                    <FormLabel>Usuario</FormLabel>
                    <FormControl
                        name="email"
                        type="text" placeholder="Email"/>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl
                        name="password"  
                        type="password"
                        placeholder="Contraseña" />
                    <ButtonGroup size="lg" className="mt-3 pull-right">
                        <BtnConfirm className="pull-right">Reset</BtnConfirm>
                        <BtnConfirm className="ml-3 pull-right" onClick={authHandler}>Confirmar</BtnConfirm>
                    </ButtonGroup>
                </Form>
            </section>
        </Container>
    )    
}

export default Login;