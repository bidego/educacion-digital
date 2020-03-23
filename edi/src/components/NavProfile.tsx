import React from 'react';
import { Nav, NavDropdown, ButtonGroup } from 'react-bootstrap';
import { TiUser } from 'react-icons/ti';
import { Btn } from './';
import { Link } from 'react-router-dom';
import * as moment from 'moment';

const NavProfile = (props:any) => {

    let stringUserData:any = sessionStorage.getItem('userData');
    let userData:any = JSON.parse(stringUserData);
    let expiryDate:any;
    if (userData && userData.expiryDate) {
        expiryDate = moment.parseZone(userData.expiryDate);
    }
    if (userData && userData.expiryDate && expiryDate.isSameOrBefore(moment.now())) {
        let f = new Date(expiryDate);
        console.log("borrando" + f);
        sessionStorage.clear();
        userData = null;
    }
    if (!sessionStorage.getItem("userData")) {
        return (
            <Nav>
                <ButtonGroup className="Button-group">
                    <Link to="/login">
                        <Btn className="ml-2" variant="outline-secondary" name="Log In">Log In</Btn>
                    </Link>
                    <Link to="/signup">
                        <Btn className="ml-2" variant="outline-secondary" name="Sign In">Sign In</Btn>
                    </Link>
                </ButtonGroup>
            </Nav>
        )
    }
    return (
        <Nav className="mr-right">
            <NavDropdown
                drop="left"
                title={<TiUser size={32} />}
                id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Mis datos</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Mi perfil</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Configuraciones</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Acerca de EDi</NavDropdown.Item>
            </NavDropdown>
        </Nav>
    )
}

export default NavProfile;