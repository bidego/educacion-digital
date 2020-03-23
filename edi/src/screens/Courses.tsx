import React from 'react';
import { Container, Form, FormControl } from 'react-bootstrap';
import { TiMortarBoard } from 'react-icons/ti';
import { Btn } from '../components';

const Courses = (props:any) => {
    return(
        <Container className="Screen-content">
            <section className="Screen-left">
                <TiMortarBoard size={42} />
                <h2>&nbsp;&nbsp;Cursos</h2>
            </section>
            <section className="Screen-right">
                <Form inline>
                    <FormControl type="text" placeholder="¿Que desea buscar?" className="mr-sm-2" />
                    <Btn variant="outline-success">Buscar</Btn>
                </Form>
            </section>
        </Container>
    )
}

export default Courses;