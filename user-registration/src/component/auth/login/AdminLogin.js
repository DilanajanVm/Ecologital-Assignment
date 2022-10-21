import React from "react";
import {Button, Col, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
import './login.scss'
import * as commonFun from "../../../utilty/commonFun";


class AdminLogin extends React.Component {

    state = {
        userName: '',
        password: ''
    };

    handleChange = async (event) => {
        let name = event.target.name;
        let value = event.target.value;
        await this.setState({[name]: value});
    };

    checkValidity = async () => {
        let {userName, password} = this.state;
        userName.trim() === '' ? commonFun.notifyMessage('Please enter your user name', 0) :
            password.trim() === '' ? commonFun.notifyMessage('Please enter your password', 0) :
                this.Login();
    };
    Login = () => {
        let {userName, password} = this.state;
        let obj = {
            userName: userName,
            password: password,
            userType: 'ADMIN'
        };

        localStorage.setItem('UserType', 'ADMIN');
        window.location.href = '/admin';
    };

    render() {
        let {userName, password} = this.state;
        return (
            <div className='login adminLogin'>
                <Container>

                    <Row>
                        <Col className={'input-wrapper'} sm={12} lg={4}>
                            <h5 className={'heading-sub'}>Welcome Back</h5>
                            <h1 className={'heading-main'}>Login to your account</h1>
                            <hr/>
                            <Form>
                                <FormGroup>
                                    <Label
                                        className='lbl-login'
                                    >
                                        User Name
                                    </Label>
                                    <Input
                                        className='input-login'
                                        name="userName"
                                        placeholder="User Name"
                                        type="text"
                                        value={userName}
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
                                <Button onClick={() => this.checkValidity()} className='btn-login'>
                                    Login
                                </Button>

                            </Form>
                        </Col>


                    </Row>
                </Container>
            </div>
        )
    }
}

export default AdminLogin;