import React, { useState } from 'react'
import { Button, Col, Image, Row } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { registerapi } from './service/Allapi';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import './register.css'



function Register() {

    

    const [register, setregister] = useState({
        name: '',
        mobile_no: '',
        email: '',
        password: '',
        confirm_password: ''
    })

    const navigate=useNavigate()

    const userregister = (e) => {
        let value = (e.target.value)
        let name = (e.target.name)

        setregister({ ...register, [name]: value })
    }
    console.log(register);

    const handlesubmit = async (e) => {
        e.preventDefault();

        const { name, mobile_no, email, password, confirm_password } = register

        console.log( name, mobile_no, email, password, confirm_password);


        if (name == '') {
            toast.warning("Name required")
        }
        else if (mobile_no == '') {
            toast.warning("Mobile_Number required")
        }
        else if (email == '') {
            toast.warning("Eamil required")
        }
        else if (password == '') {
            toast.warning("Password required")
        }
        else if (confirm_password == '') {
            toast.warning("Confirm_Password required")
        }
        else {

            if (password !== confirm_password) {
                toast.warning("Password and Confirm_Password Need to be same")

            }
            else{
                const response=await registerapi(register)

                if(response.status==200){
                    toast.success("account registration successfull")
                    navigate('/login')
                }

            }
        }

    }

    return (
        <div>
            <Row className="w-100 mb-5 " style={{ justifyContent: 'space-around', alignItems: 'center' }}>
                <Col lg={6} className='column1 container-fluid'>
                    <div className="register container-fluid ">
                        <div className="heading">
                            <h5>Feedback Portal</h5>

                        </div>

                        <Form.Floating className="mb-3">
                            <Form.Control
                                id="floatingInputCustom"
                                type="text"
                                placeholder="name@example.com"
                                name="name"
                                className="Name"
                                onChange={userregister}
                            />
                            <label htmlFor="floatingInputCustom">👤 | Name</label>
                        </Form.Floating>

                        <Form.Floating>
                            <Form.Control
                                id="floatingPasswordCustom"
                                type="text"
                                placeholder="Mobile Number"
                                name="mobile_no"
                                className="Mobile_Number"
                                onChange={userregister}
                            />
                            <label htmlFor="floatingPasswordCustom"> 📞 | Mobile Number</label>
                        </Form.Floating>
                        <Form.Floating className="mb-3">
                            <Form.Control
                                id="floatingInputCustom"
                                type="email"
                                placeholder="name@example.com"
                                name="email"
                                className="Email"
                                onChange={userregister}
                            />
                            <label htmlFor="floatingInputCustom"> ✉️ | Email address</label>
                        </Form.Floating>
                        <Form.Floating className="mb-3">
                            <Form.Control
                                id="floatingInputCustom"
                                type="password"
                                placeholder="name@example.com"
                                name="password"
                                className="Password"
                                onChange={userregister}
                            />
                            <label htmlFor="floatingInputCustom">🔒 | Password</label>
                        </Form.Floating>
                        <Form.Floating className="mb-3">
                            <Form.Control
                                id="floatingInputCustom"
                                type="password"
                                placeholder="name@example.com"
                                name="confirm_password"
                                className="Confirm_Password"
                                onChange={userregister}
                            />
                            <label htmlFor="floatingInputCustom">🔒 | Confirm Password</label>
                        </Form.Floating>

                        <Button className="Btn_login btn-lg mt-3 w-100" onClick={handlesubmit}>
                            Register
                        </Button>

                        <div className="or">
                            <hr className="hr" />
                            <div>or</div>
                            <hr className="hr" />
                        </div>

                        <p className='mb-5'>
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </div>
                </Col>

                <Col lg={6} className='column2 container-fluid'>
                    <div className="first container-fluid">
                        <div>
                            <h4 className="Second">
                                A few words from you can spark big changes. Let's create better together!
                            </h4>
                        </div>

                        <div className="third container-fluid">

                            <h3 className='sentanse'>Smarter service starts with your words — thank you for helping our AI learn</h3>
                        </div>
                    </div>
                </Col>
            </Row>
             <ToastContainer position="top-center" theme="colored" />

        </div>
    )
}

export default Register