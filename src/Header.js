import React, { useContext, useEffect, useState } from 'react'
import './header.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import { loginContext } from './usercontext/Contextshare';
import { Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';





function Header() {
    const { loginData, setloginData } = useContext(loginContext)

    const [user, setUser] = useState({});

    const navigate = useNavigate()

    const logout = async (e) => {
        e.preventDefault()
        localStorage.removeItem('active_user')
        navigate('/')

        setloginData(null)
        setUser({})

    }


    useEffect(() => {
        if (loginData) {
            setUser(loginData);
        }
    }, [loginData]);

    console.log(user.name);


    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary w-100">
                <Container fluid className='w-100'>
                    <Navbar.Brand className='ms-5' href="#home">Client-Feedback</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <div className="notification">
                                <i className="bell fa-solid fa-bell position-relative ms-2 me-4" style={{ color: 'gray' }}></i>
                                <span className="badge me-3">4</span>
                            </div>

                            <Navbar.Text className='me-5'>
                                Signed in as: <a href="#login">{user?.name || 'Guest'}</a>
                            </Navbar.Text>
                        </Nav>
                        {user?.name ? <Button onClick={logout}>Logout</Button> : ""}
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <ToastContainer position="top-center" theme="colored" />
        </div>
    )
}

export default Header