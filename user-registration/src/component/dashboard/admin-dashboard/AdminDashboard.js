import React from "react";
import Header from "../../header/Header";
import '../dashboard.scss'
import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import DataTable from 'react-data-table-component';
import {Edit, Edit2} from "react-feather";
import IntlTelInput from "react-intl-tel-input";
import {Link} from "react-router-dom";
import {emailRegex, mobileNumberInputValidation, passwordValidator} from "../../../utilty/validation";
import axios from "axios";
import * as commonFun from "../../../utilty/commonFun";

class AdminDashboard extends React.Component {

    state = {
        isOpen: false,
        name: '',
        userId: '',
        email: '',
        mobileNumber: '',
        mobileNumberEnter: '',
        country: 'lk',
        isValidMob: false,
        password: '',
        confirmPassword: '',
        users: [],
        selectedUser: []
    };

    editUserDetailsModal = (user) => {
        console.log(user)
        this.setState({
            isOpen: !this.state.isOpen,
            selectedUser: user,
            name: user.name,
            userId: user.user_id,
            email: user.email,
            mobileNumberEnter: user.mobile,
        })
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

    validateUser = () => {
        let {name, email,mobileNumberEnter,isValidMob} = this.state;
        name.trim() === "" ? commonFun.notifyMessage('Name cannot be empty!', 0) :
            !emailRegex.test(email) ? commonFun.notifyMessage("Please enter valid email address", 0) :
                // !isValidMob ? commonFun.notifyMessage('Enter valid mobile number', 0) :
                         this.updateUser();
    };

    updateUser = async () => {
        let {userId, name, email, mobileNumberEnter} = this.state;

        let obj = {
            id: userId,
            name: name,
            email: email,
            mobile: mobileNumberEnter
        };

        await axios.put(`http://localhost:3001/update/user`, obj).then(res => {
            console.log(res);
            if (res.status === 200) {
                commonFun.notifyMessage('Your Account Details Updated', 1);
                this.fetchAllUsers();
                this.setState({
                    isOpen: !this.state.isOpen
                })
            }
        })

    };

    handleChange = async (event) => {
        let name = event.target.name;
        let value = event.target.value;
        await this.setState({[name]: value});
    };

    componentDidMount() {
        let userType = localStorage.getItem('UserType');

        this.fetchAllUsers();

    }

    fetchAllUsers = async () => {
        await axios.get('http://localhost:3001/getalluserdetails').then(res => {
            if (res.status === 200) {
                let details = res.data.data;
                let userList = [];
                details.map((user, index) => {
                    userList.push({
                        key: index,
                        id: user.user_id,
                        userName: user.name,
                        email: user.email,
                        mobile: user.mobile,
                        action:
                            <div className='d-flex justify-content-center align-items-center'>
                                <Button onClick={() => this.editUserDetailsModal(user)} className={'tbl-status-btn'}>
                                    <Edit2 size="15"/>
                                </Button>
                            </div>
                    })
                });


                this.setState({users: userList})
            }
        })
    };

    render() {
        let {isOpen, name, users, mobileNumber, selectedUser, email, confirmPassword, password, mobileNumberEnter, country} = this.state;
        const columns = [
            {
                name: 'Id',
                selector: row => row.id,
                sortable: true,
            }, {
                name: 'UserName',
                selector: row => row.userName,
                sortable: true,
            },
            {
                name: 'Email',
                selector: row => row.email,
                sortable: true,
            },
            {
                name: 'Contact',
                selector: row => row.mobile,
                sortable: true,
            },
            {
                name: 'Action',
                selector: row => row.action,
                sortable: true,
            },
        ];

        const data = [
            {
                id: 1,
                userName: 'Dilanjana Vimukthi',
                email: 'dilanjanavimukthi48@gmail.com',
                mobile: '0770185440',
                action:
                    <div className='d-flex justify-content-center align-items-center'>
                        <Button onClick={() => this.editUserDetailsModal()} className={'tbl-status-btn'}>
                            <Edit2 size="15"/>
                        </Button>
                    </div>
            }, {
                id: 2,
                userName: 'Dilanjana Vimukthi',
                email: 'dilanjanavimukthi48@gmail.com',
                mobile: '0770185440',
                action:
                    <div className='d-flex justify-content-center align-items-center'>
                        <Button className={'tbl-status-btn'}>
                            <Edit2 size="15"/>
                        </Button>
                    </div>
            }, {
                id: 3,
                userName: 'Dilanjana Vimukthi',
                email: 'dilanjanavimukthi48@gmail.com',
                mobile: '0770185440',
                action:
                    <div className='d-flex justify-content-center align-items-center'>
                        <Button className={'tbl-status-btn'}>
                            <Edit2 size="15"/>
                        </Button>
                    </div>
            }, {
                id: 4,
                userName: 'Dilanjana Vimukthi',
                email: 'dilanjanavimukthi48@gmail.com',
                mobile: '0770185440',
                action:
                    <div className='d-flex justify-content-center align-items-center'>
                        <Button className={'tbl-status-btn'}>
                            <Edit2 size="15"/>
                        </Button>
                    </div>
            }, {
                id: 5,
                userName: 'Dilanjana Vimukthi',
                email: 'dilanjanavimukthi48@gmail.com',
                mobile: '0770185440',
                action:
                    <div className='d-flex justify-content-center align-items-center'>
                        <Button className={'tbl-status-btn'}>
                            <Edit2 size="15"/>
                        </Button>
                    </div>
            },
        ];

        return (
            users && <div className={'dashboard'}>
                <Header/>
                <div className="container">
                    <Row className={'topic-holder'}>
                        <Col sm={12} md={12}>
                            <h1 className='mt-5'> User Details </h1>
                            <hr/>
                        </Col>
                    </Row>

                    <Row>
                        <DataTable
                            columns={columns}
                            data={users}
                        />
                    </Row>
                </div>


                <Modal isOpen={isOpen} toggle={() => this.setState({isOpen: !this.state.isOpen})}>
                    <ModalHeader toggle={() => this.setState({isOpen: !this.state.isOpen})}>User Details
                        Update</ModalHeader>
                    <ModalBody>
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
                                        defaultValue={mobileNumber}
                                        onPhoneNumberChange={this.onPhoneNumberChange}
                                        value={mobileNumberEnter}
                                    />
                                </div>
                            </FormGroup>

                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="warning" onClick={() => this.validateUser()}>
                            Update
                        </Button>{' '}
                        <Button color="secondary" onClick={() => this.setState({isOpen: !this.state.isOpen})}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>

            </div>
        )
    }
}

export default AdminDashboard;