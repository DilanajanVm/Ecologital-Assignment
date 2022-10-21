import React from "react";
import {Button, Col, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
import './login.scss'
import {Icon} from "@iconify/react";
import {Link} from "react-router-dom";
import * as commonFun from "../../../utilty/commonFun";
import {emailRegex} from "../../../utilty/validation";


class UserLogin extends React.Component {

    state = {
        email: '',
        password: ''
    };


    handleChange = async (event) => {
        let name = event.target.name;
        let value = event.target.value;
        await this.setState({[name]: value});
    };

    checkValidity = async () => {
        let {email, password} = this.state;
        email.trim() === '' ? commonFun.notifyMessage('Please enter your email', 0) :
            !emailRegex.test(email) ? commonFun.notifyMessage('Please enter valid email address', 0) :
                password.trim() === '' ? commonFun.notifyMessage('Please enter your password', 0) :
                    this.Login();
    };
    Login = () => {
        let {email, password} = this.state;
        let obj = {
            email: email,
            password: password,
            userType: 'USER'
        };
        localStorage.setItem('UserType','USER');
    };


    render() {
        let {email, password} = this.state;
        return (
            <div className='login userLogin'>
                <Container>

                    <Row>
                        <Col className={'input-wrapper'} sm={12} lg={4}>
                            <h5 className={'heading-sub'}>Welcome Back</h5>
                            <h1 className={'heading-main'}>Login to your account</h1>
                            <hr/>
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
                                        value={email}
                                        type="email"
                                        onChange={this.handleChange}
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
                                        value={password}
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                                <hr/>
                                {' '}
                                <Button onClick={() => {
                                    this.checkValidity()
                                }} className='btn-login'>
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

export default UserLogin;