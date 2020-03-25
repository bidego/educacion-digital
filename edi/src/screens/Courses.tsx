import React, { useState } from 'react';
import { Container, Form, FormControl } from 'react-bootstrap';
import { TiMortarBoard } from 'react-icons/ti';
import { Btn } from '../components';
import ReactPlayer from 'react-player';

const Courses = (props:any) => {
    const sources = [
        {
            title:"PLE Entornos Personales de Aprendisaje",
            url:"https://www.youtube.com/watch?v=MPUlHtYfSzA"
        },
        {
            title: "¿Que es PLE?",
            url: "https://www.youtube.com/watch?v=d7PR_uo5gaE"
        },
        {
            title: "PLE by Jordi Adell",
            url: "https://www.youtube.com/watch?v=blzYQlj63Cc"
        }
    ];
    const [ activeSource, setActiveSource ] = useState(sources[Math.floor(Math.random() * 3)]);

    const handleYoutubelClick = async() => {
        const res = await fetch("https://www.youtube.com/results?search_query=una+cerveza");
        console.log(res.json());
    };
    const handleVideoChange = (ev:any) => {
        ev.preventDefault();
        console.log(ev.currentTarget.href);
        setActiveSource({title: ev.currentTarget.value, url: ev.currentTarget.href });
    };
    function renderLinks() {
        let list = [];
        for (let source of sources) {
            list.push(<li>
                <a onClick={handleVideoChange} href={source.url}>
                    {source.title}
                </a>
            </li>);
        }
        return list;
    }
    return(
        <Container className="Screen-container">
            <Container className="Screen-header">
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
            <Container className="Screen-content">
                <section className="Screen-left">
                    <ReactPlayer
                        title={activeSource.title}
                        url={activeSource.url}
                        config={{
                            youtube: {
                                playerVars: {
                                    showinfo: 1 }
                                }
                            }}
                    />
                </section>
                <section className="Screen-right">
                    <ul className="Sources-list">
                        {renderLinks()}
                    </ul>
                    <Form hidden inline>
                        <FormControl type="text" placeholder="¿Que desea buscar?" className="mr-sm-2" />
                        <Btn onClick={handleYoutubelClick} variant="outline-success">Busca en yutu</Btn>
                    </Form>
                </section>
            </Container>
        </Container>
    )
}

export default Courses;