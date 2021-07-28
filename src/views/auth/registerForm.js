import React, { Component } from 'react'
import { Card, CardBody, CardHeader, Form, Row, Col, FormGroup, Input, Button } from 'reactstrap';
// import { FacebookLoginButton } from "react-social-login-buttons";
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { register, clearErr } from "actions/authAction";
import { NotificationContainer } from 'react-notifications';
import notify from 'views/utils/notification';
import 'react-notifications/lib/notifications.css';
import Loader from 'views/utils/loader';
// import { GoogleLogin } from 'react-google-login';
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

// import { appID } from './appParams'

class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                // contactNo: '',
                // city: '',
                // state: '',
                // address1: '',
                // zip: '',
            },
            validPass: true,
            agreement: false,
            showTerms: false,
        }
    }

    onChange = (e) => {
        let user = this.state.user;
        user[e.target.name] = e.target.value;
        this.setState({ ...this.state, user: user })
    }

    onSubmit = (e) => {
        e.preventDefault();
        let { user } = this.state
        if (user.password === user.confirmPassword) {
            let validPass = this.checkPassword(user.password)
            if (validPass) {
                delete user.confirmPassword;
                this.props.register(user);
            } else {
                notify('warning', 'Password must include at least one number, one lowercase and one uppercase letter, should be at least 6 characters', 'Invalid Password', 3000)
            }
        } else {
            notify('error', 'Password does not match.', 'Auth')
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let { state } = nextProps;
        if (!state.isLoading && state.errors) {
            notify('error', state.errors, 'Register')
            this.props.clearErr()
        } else if (!state.isLoading && state.status) {
            notify('success', 'Successfully registered.', 'Register');
            // window.location.href = '/auth/login'
        }

    }

    checkTerms = (e) => {
        this.setState({ ...this.state, agreement: e.target.checked })
    }

    checkPassword = (str) => {
        // at least one number, one lowercase and one uppercase letter
        // at least six characters
        var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        return re.test(str);
    }

    responseGoogle = (response) => {
        let { profileObj } = response;
        let user = {
            firstName: profileObj.givenName,
            lastName: profileObj.familyName,
            email: profileObj.email,
            password: profileObj.email,
        }
        this.props.register(user);
    }

    responseFacebook = (response) => {
        console.log(response);
    }

    render() {
        return (
            <div className="auth-form">
                <Card>
                    <CardHeader className="auth-form-header mb-2">SIGN UP TO GET STARTED</CardHeader>
                    <CardBody>
                        <Form onSubmit={this.onSubmit}>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <label>First Name</label>
                                        <Input name="firstName" type="text" onChange={this.onChange} required />
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <label>Last Name</label>
                                        <Input name="lastName" onChange={this.onChange} type="text" required />
                                    </FormGroup>
                                </Col>
                                <Col md="12">
                                    <FormGroup>
                                        <label>Email Address</label>
                                        <Input name="email" onChange={this.onChange} type="email" required />
                                    </FormGroup>
                                </Col>
                                {/* <Col md="6">
                                    <FormGroup>
                                        <label>Phone Number</label>
                                        <PhoneInput
                                            inputProps={{
                                                name: 'phone',
                                                required: true
                                            }}
                                            onChange={this.onChange}
                                        />
                                    </FormGroup>
                                </Col> */}
                                <Col md="6">
                                    <FormGroup>
                                        <label>Password</label>
                                        <Input name="password" onChange={this.onChange} type="password" />
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <label>Confirm Password</label>
                                        <Input name="confirmPassword" onChange={this.onChange} type="password" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col md="12" className="ml-4">
                                    <FormGroup>
                                        <Input type="checkbox" id="agreement" name="agreement" onChange={this.checkTerms} /> I agree to <span className="termsCondition" onClick={this.props.showTerms}>Terms and Conditions.</span>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="mt-4">
                                <Col md="12" className="text-center mb-3">
                                    <Button color="primary" type="submit" disabled={!this.state.agreement}>
                                        SIGN UP
                                    </Button>
                                </Col>
                                <hr style={{ width: '83%' }} />
                            </Row>
                        </Form>
                        <Row>
                            {/* <Col md="12" className="text-center mt-2">
                                <p className="social-header">Sign up with social account.</p>
                            </Col>
                            <Col md="6" className="d-flex social-google">
                                <GoogleLogin
                                    clientId={appID.google}
                                    buttonText="Sign up with Google"
                                    onSuccess={this.responseGoogle}
                                    onFailure={this.responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </Col>
                            <Col md="6" className="social-fb">
                                <FacebookLogin
                                    appId="1088597931155576"
                                    callback={this.responseFacebook}
                                    render={renderProps => (
                                        <FacebookLoginButton onClick={renderProps.onClick}>
                                            <span className="socail-btn-txt">Sign up with Facebook</span>
                                        </FacebookLoginButton>
                                    )}
                                />
                            </Col> */}
                            <Col md="12" className="text-center mt-4 mb-3">
                                <p className="social-header">Already have an account? <a href="/auth/login">Sign in Now</a></p>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                <NotificationContainer />
                <Loader active={this.props.state.isLoading} />
            </div>
        )
    }
}


RegisterForm.propsTypes = {
    register: PropTypes.func.isRequired,
    clearErr: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired
}

const mapDispatchToProps = {
    register, clearErr
}
const mapStateToProps = (state) => ({
    state: state.auth
})

const mappedRegisterForm = connect(mapStateToProps, mapDispatchToProps)(RegisterForm)


export default mappedRegisterForm