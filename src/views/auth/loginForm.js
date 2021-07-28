import React, { Component } from 'react'
import { Card, CardBody, CardHeader, Form, Row, Col, FormGroup, Input, Button } from 'reactstrap';
// import { FacebookLoginButton } from "react-social-login-buttons";

import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { login } from "actions/authAction";
import { NotificationContainer } from 'react-notifications';
import notify from 'views/utils/notification';
import 'react-notifications/lib/notifications.css';
import Loader from 'views/utils/loader';
// import { GoogleLogin } from 'react-google-login';
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

// import { appID } from './appParams'

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                password: ''
            }
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.login(this.state.user)
    }

    onChange = (e) => {
        let user = this.state.user;
        user[e.target.name] = e.target.value
        this.setState({ user: user })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let { state } = nextProps;
        if (!state.isLoading && state.errors) {
            notify('error', state.errors, 'Auth')
        }
    }

    notification = () => {
        notify('info', 'Google Login', 'Authentication');

    }
    responseGoogle = (response) => {
        let { profileObj } = response;
        let user = {
            username: profileObj.email,
            password: profileObj.email,
        }
        this.props.login(user);
    }

    responseFacebook = (response) => {
        console.log(response);
    }

    render() {
        return (
            <div className="auth-form">
                <Card>
                    <CardHeader className="auth-form-header mb-2">SIGN IN TO GET STARTED</CardHeader>
                    <CardBody>
                        <Form onSubmit={this.onSubmit}>
                            <Row>
                                <Col md="12">
                                    <FormGroup>
                                        <label>Email Address</label>
                                        <Input name='username' type="email" onChange={this.onChange} required />
                                    </FormGroup>
                                </Col>
                                <Col md="12">
                                    <FormGroup>
                                        <label>Password</label>
                                        <Input type="password" name="password" onChange={this.onChange} required />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="mt-4">
                                <Col md="12" className="text-center mb-2">
                                    <Button color="primary" type="submit">
                                        SIGN IN
                                    </Button>
                                </Col>
                                <Col md="12" className="text-center mt-1 mb-1">
                                    <p className="social-header">Forgot password? <a href="/auth/resetpwd">RESET NOW</a></p>
                                </Col>
                                <hr style={{ width: '83%' }} />
                            </Row>
                        </Form>
                        <Row>
                            {/* <Col md="12" className="text-center mt-2">
                                <p className="social-header">Sign in with social account.</p>
                            </Col>
                            <Col md="6" className="d-flex social-google">
                                <GoogleLogin
                                    clientId={appID.google}
                                    buttonText="Sign in with Google"
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
                                            <span className="socail-btn-txt">Sign in with Facebook</span>
                                        </FacebookLoginButton>
                                    )}
                                />
                            </Col> */}
                            <Col md="12" className="text-center mt-4 mb-3">
                                <p className="social-header">Don't you have an account? <a href="/auth/register">SIGN UP Now</a></p>
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

LoginForm.propsTypes = {
    login: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired
}

const mapDispatchToProps = {
    login
}
const mapStateToProps = (state) => ({
    state: state.auth
})

const mappedLoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)


export default mappedLoginForm