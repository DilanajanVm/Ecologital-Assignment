import React from "react";
import {Button, Col, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
import './login.scss'
import {Icon} from "@iconify/react";
import {Link} from "react-router-dom";


class Login extends React.Component {
    render() {
        return (
            <div className='login'>
                <Container>

                    <Row>
                        <Col className={'input-wrapper'} sm={12} lg={4}>
                            <h5 className={'heading-sub'}>Welcome Back</h5>
                            <h1 className={'heading-main'}>Login to your account</h1>
                            <Form>
                                <FormGroup>
                                    <Label
                                        for="exampleEmail"
                                        className='lbl-login'
                                    >
                                        Email
                                    </Label>
                                    <Input
                                        className='input-login'
                                        name="email"
                                        placeholder="Email"
                                        type="email"
                                    />
                                </FormGroup>
                                {' '}
                                <FormGroup>
                                    <Label
                                        for="examplePassword"
                                        className='lbl-login'
                                    >
                                        Password
                                    </Label>
                                    <Input
                                        className='input-login'
                                        name="password"
                                        placeholder="Password"
                                        type="password"
                                    />
                                </FormGroup>
                                <hr/>
                                {' '}
                                <Button className='btn-login'>
                                    Login
                                </Button>

                                <p className='lbl-createAccount mt-3 mb-3'> - Or Sign in with - </p>

                                <div className='d-flex  mt-3 mb-3'>

                                    <Row className={'w-100'}>
                                        <Col sm={12} md={12} xl={4}> <Button className='btn-social'><Icon
                                            icon="entypo-social:facebook" height="20"/> Facebook</Button></Col>
                                        <Col sm={12} md={12} xl={4}> <Button className='btn-social'><Icon
                                            icon="akar-icons:google-fill" height="20"/> Google</Button> </Col>
                                        <Col sm={12} md={12} xl={4}> <Button className='btn-social'><Icon
                                            icon="bi:apple"
                                            height="20"/> Apple Id</Button>
                                        </Col>

                                    </Row></div>

                                <p className={'lbl-createAccount'}><span>Don't You Have an account?</span> <Link
                                    to={'/registration'}

                                    className='lbl-registerNow'> <b>Register Now</b></Link>
                                </p>
                            </Form>
                        </Col>


                    </Row>
                </Container>
            </div>
        )
    }
}

export default Login;