import React from "react";
import {Button, Col, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
import './registration.scss'
import IntlTelInput from "react-intl-tel-input";
import {mobileNumberInputValidation} from "../../../utilty/validation";
import {Link} from "react-router-dom";


class Registration extends React.Component {

    state={
        name:'',
        email:'',
        mobileNumber: '',
        mobileNumberEnter: '',
        country: 'lk',
        isValidMob: false,
        password:'',
        confirmPassword:'',
    };

    onPhoneNumberChange = (condition, value, object, withdialcode) => {
        if (mobileNumberInputValidation(value,withdialcode,condition).numberInputValidation){
            this.setState({
                isValidMob: mobileNumberInputValidation(value,withdialcode,condition).mobileNumberValidation,
                mobileNumber: withdialcode,
                mobileNumberEnter: value
            });
        }
    };

    render() {
        let {name,email,confirmPassword,password,mobileNumberEnter,country}=this.state;
        return (
            <div className='registration'>
                <Container>

                    <Row>
                        <Col  sm={12} lg={8}>

                        </Col>

                        <Col className={'input-wrapper'} sm={12} lg={4}>
                            <h5 className={'heading-sub'}>Hello! Welcome</h5>
                            <h1 className={'heading-main'}>Create your account</h1>
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
                                        value={confirmPassword}
                                    />
                                </FormGroup>
                                <hr/>
                                {' '}
                                <Button className='btn-registration'>
                                    Register Now
                                </Button>

                                <p className={'lbl-alreadyRegistered'}><span>Already Registered?</span> <Link to={'/login'}
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