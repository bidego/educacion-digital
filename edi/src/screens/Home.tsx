import React from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { TiGroup } from 'react-icons/ti';
import { Btn } from '../components';

const Home = (props:any) => {
    return(
        <header className="App-header">
            <Form inline className="Search-content">
            <FormControl type="text" placeholder="¿Que desea buscar?" className="mr-sm-2" />
            <Btn variant="outline-success">Buscar</Btn>
            </Form>
            <TiGroup size={96} />
            <h1>Educacion Digital</h1>
            <p>
                El patio de intercambio de conocimientos
            </p>
            <a
                className="App-link"
                href="https://google.com?q=Educacion+Digital"
                target="_blank"
                rel="noopener noreferrer"
                hidden
            >Entrá</a>
        </header>
    )
}

export default Home;