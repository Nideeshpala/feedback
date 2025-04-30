import React, { useContext, useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import './login.css'
import { Button, Col, Image, Row } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { loginapi } from './service/Allapi';
import { Link, useNavigate } from 'react-router-dom';
import { loginContext } from './usercontext/Contextshare';




function Login() {
    const { loginData, setloginData } = useContext(loginContext)
    console.log(loginData);


    const [login, setlogin] = useState({
        email: '',
        password: ''
    })

    const [adminlog, setadminlog] = useState({})

    const navigate = useNavigate()

    const userlogin = (e) => {
        let value = (e.target.value)
        let name = (e.target.name)

        setlogin({ ...login, [name]: value })

    }
    console.log(login);

    const handlesubmit = async (e) => {
        e.preventDefault();

        const { email, password } = login;

        if (email === "") {
            toast.warning('Email is required');
        } else if (password === "") {
            toast.warning('Password is required');
        } else {
            try {
                const response = await loginapi(login);

                if (response.status === 200) {
                    localStorage.setItem('active_user', JSON.stringify(response.data));

                    if (response.data.user.role == "admin") {
                         await setloginData(response.data.user)
                        setadminlog(response.data)
                        console.log(response.data);
                        navigate('/admindashboard')
                    }
                    else {
                        await setloginData(response.data.user);
                        // toast.success('Logged in successfully');
                        setlogin({ email: '', password: '' });
                        navigate('/userview')
                    }
                }
            } catch (error) {
                toast.error('Login failed');
                console.error(error);
            }
        }
    };




    return (
        <div>


            <Row className="w-100 mb-5 " style={{ justifyContent: 'space-around', alignItems: 'center' }}>
                <Col lg={6} className='column1 container-fluid'>
                    <div className="Logins container-fluid ">
                        <div className="headings">
                            <h5>Feedback Portal</h5>
                            <h2>Welcome to <br />Client Feedback-Portal</h2>
                            <p className="sentences">
                                We'd love to hear your thoughts — your feedback helps us grow and improve!
                            </p>
                        </div>

                        <Form.Floating className="mb-3">
                            <Form.Control
                                id="floatingInputCustom"
                                type="email"
                                placeholder="name@example.com"
                                name="email"
                                onChange={userlogin}
                                className="Emails"
                            />
                            <label htmlFor="floatingInputCustom">✉️ | Email address</label>
                        </Form.Floating>

                        <Form.Floating>
                            <Form.Control
                                id="floatingPasswordCustom"
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={userlogin}
                                className="Passwords"
                            />
                            <label htmlFor="floatingPasswordCustom">🔒 | Password</label>
                        </Form.Floating>

                        <Button onClick={handlesubmit} className="Btn_logins btn-lg mt-3 w-100">
                            Login
                        </Button>

                        <div className="ors">
                            <hr className="hrs" />
                            <div>or</div>
                            <hr className="hrs" />
                        </div>

                        <p className='mb-5'>
                            Don't have an account? <Link to="/register">Register</Link>
                        </p>
                    </div>
                </Col>

                <Col lg={6} className='column2 container-fluid'>
                    <div className="firsts container-fluid">
                        <div>
                            <h4 className="Seconds">
                                A few words from you can spark big changes. Let's create better together!
                            </h4>
                        </div>

                        <div className="thirds container-fluid">

                            <h3 className='sentanses'>Smarter service starts with your words — thank you for helping our AI learn</h3>
                        </div>
                    </div>
                </Col>
            </Row>

            <ToastContainer position="top-center" theme="colored" />
        </div>
    )
}

export default Login