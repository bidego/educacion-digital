import React from 'react';
import { Container, Form, FormControl } from 'react-bootstrap';
import { Btn } from '../components';
import { TiFolderOpen } from 'react-icons/ti';
const Projects = (props:any) => {
    return(
        <Container className="Screen-content">
            <section className="Screen-left">
                <TiFolderOpen size={42} />
                <h2>&nbsp;&nbsp;Proyectos</h2>
            </section>
            <section className="Screen-right">
                <Form inline>
                    <FormControl type="text" placeholder="Proyectos" className="mr-sm-2" />
                    <Btn variant="outline-success">Buscar</Btn>
                </Form>
            </section>
        </Container>
    )
}

export default Projects;