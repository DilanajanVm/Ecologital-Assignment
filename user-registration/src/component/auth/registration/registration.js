import React from "react";
import {Button, Col, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
import './registration.scss'
import IntlTelInput from "react-intl-tel-input";
import {mobileNumberInputValidation, passwordValidator, emailRegex} from "../../../utilty/validation";
import {Link} from "react-router-dom";
import * as commonFun from "../../../utilty/commonFun";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'


class Registration extends React.Component {

    state = {
        name: '',
        email: '',
        mobileNumber: '',
        mobileNumberEnter: '',
        country: 'lk',
        isValidMob: false,
        password: '',
        confirmPassword: '',
    };

    onPhoneNumberChange = (condition, value, object, withdialcode) => {
        if (mobileNumberInputValidation(value, withdialcode, condition).numberInputValidation) {
            this.setState({
                isValidMob: mobileNumberInputValidation(value, withdialcode, condition).mobileNumberValidation,
                mobileNumber: withdialcode,
                mobileNumberEnter: value
            });
        }
    };

    handleChange = async (event) => {
        let name = event.target.name;
        let value = event.target.value;
        await this.setState({[name]: value});
    };

    validateDetails = () => {
        let {name, email, confirmPassword, password, isValidMob} = this.state;
        name.trim() === "" ? commonFun.notifyMessage('Name cannot be empty!', 0) :
            !emailRegex.test(email) ? commonFun.notifyMessage("Please enter valid email address", 0) :
                !isValidMob ? commonFun.notifyMessage('Enter valid mobile number', 0) :
                    password.trim() === "" ? commonFun.notifyMessage('Password cannot be empty!', 0) :
                        confirmPassword.trim() === "" ? commonFun.notifyMessage('Confirm password cannot be empty!', 0) :
                            !passwordValidator(password) ? commonFun.notifyMessage('Password must contain at least 8 characters, including UPPER/LOWERCASE/SPECIAL_CHARACTER and NUMBERS', 0) :
                                password !== confirmPassword ? commonFun.notifyMessage('Confirm password is not match', 0) :
                                    this.registerUser();
    };

    registerUser = async () => {
        let {name, email, password, mobileNumber} = this.state;
        let obj = {
            userName: name,
            email: email,
            mobile: mobileNumber,
            password: password,
        };

        await axios.post('http://localhost:3001/register', obj).then(res => {
            console.log(res)
            if (res.status === 200) {
                commonFun.notifyMessage('Your Account Creation Successful!', 1);
                this.setState({
                    userName: '',
                    email: '',
                    mobile: '',
                    password: '',
                    confirmPassword: '',
                    mobileNumberEnter: ''
                })
                window.location.href = '/login'
            }
        })


    };

    render() {
        let {name, email, confirmPassword, password, mobileNumberEnter, country} = this.state;
        return (
            <div className='registration'>
                <Container>

                    <Row>
                        <Col sm={12} lg={8}>

                        </Col>

                        <Col className={'input-wrapper'} sm={12} lg={4}>
                            <h5 className={'heading-sub'}>Hello! Welcome</h5>
                            <h1 className={'heading-main'}>Create your account</h1>
                            <hr/>
                            <Form>
                                <FormGroup>
                                    <Label
                                        className='lbl-registration'
                                    >
                                        Name
                                    </Label>
                                    <Input
                                        className='input-registration'
                                        name="name"
                                        placeholder="Your Name"
                                        type="text"
                                        onChange={this.handleChange}
                                        value={name}
                                    />
                                </FormGroup>
                                {' '}

                                <FormGroup>
                                    <Label
                                        className='lbl-registration'
                                    >
                                        Email
                                    </Label>
                                    <Input
                                        className='input-registration'
                                        name="email"
                                        placeholder="Your email"
                                        type="email"
                                        onChange={this.handleChange}
                                        value={email}
                                    />
                                </FormGroup>
                                {' '}

                                <FormGroup>
                                    <Label
                                        className='lbl-registration'
                                    >
                                        Contact Number
                                    </Label>
                                    <div>
                                        <IntlTelInput
                                            defaultCountry={country}
                                            preferredCountries={['lk']}
                                            inputClassName="form-control auth-input w-100"
                                            containerClassName="intl-tel-input w-100"
                                            customPlaceholder={'XXXXXXXXXX'}
                                            onPhoneNumberChange={this.onPhoneNumberChange}
                                            value={mobileNumberEnter}
                                        />
                                    </div>
                                </FormGroup>
                                {' '}
                                <FormGroup>
                                    <Label
                                        className='lbl-registration'
                                    >
                                        Password
                                    </Label>
                                    <Input
                                        className='input-login'
                                        name="password"
                                        placeholder="Password"
                                        type="password"
                                        onChange={this.handleChange}
                                        value={password}
                                    />
                                </FormGroup>

                                {' '}
                                <FormGroup>
                                    <Label
                                        className='lbl-registration'
                                    >
                                        Confirm password
                                    </Label>
                                    <Input
                                        className='input-login'
                                        name="confirmPassword"
                                        placeholder="Confirm password"
                                        type="password"
                                        onChange={this.handleChange}
                                        value={confirmPassword}
                                    />
                                </FormGroup>
                                <hr/>
                                {' '}
                                <Button className='btn-registration' onClick={() => this.validateDetails()}>
                                    Register Now
                                </Button>

                                <p className={'lbl-alreadyRegistered'}><span>Already Registered?</span> <Link
                                    to={'/login'}
                                    className='lbl-LoginNow'> <b>Login Now</b></Link>
                                </p>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Registration;