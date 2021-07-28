import React, { Component } from 'react'
import { Card, CardBody, CardHeader, Form, Row, Col, FormGroup, Input, Button } from 'reactstrap';

import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { resetpwd } from "actions/authAction";
import Loader from 'views/utils/loader';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import notify from 'views/utils/notification';

class ResetpwdForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: ''
        }
    }

    onSubmit = (e) => {
        // console.log(this.state);
        e.preventDefault();
        this.props.resetpwd(this.state)
    }

    onChange = (e) => {
        let email = e.target.value
        this.setState({ email: email })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let { state } = nextProps;
        console.log("ResetpwdForm -> UNSAFE_componentWillReceiveProps -> state", state)
        if (!state.isLoading && state.status) {
            notify('success', state.message, 'Reset Password')
        }
        if (!state.isLoading && !state.status) {
            notify('error', state.errors, 'Reset password')
        }
    }

    render() {
        return (
            <div className="auth-form">
                <Card>
                    <CardHeader className="auth-form-header mb-2">Please insert email adress to reset password</CardHeader>
                    <CardBody>
                        <Form onSubmit={this.onSubmit}>
                            <Row>
                                <Col md="12">
                                    <FormGroup>
                                        <label>Email Address</label>
                                        <Input name='username' type="email" onChange={this.onChange} required />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="mt-4">
                                <Col md="12" className="text-center mb-2">
                                    <Button color="primary" type="submit">
                                        RESET PASSWORD
                                    </Button>
                                </Col>
                                <Col md="12" className="text-center mt-2 mb-1">
                                    <p className="social-header"><a href="/auth/login">Go To LOG IN</a></p>
                                </Col>
                                <hr style={{ width: '83%' }} />
                            </Row>
                        </Form>
                    </CardBody>
                </Card>
                <NotificationContainer />
                <Loader active={this.props.state.isLoading} />
            </div>
        )
    }
}

ResetpwdForm.propsTypes = {
    resetpwd: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired
}

const mapDispatchToProps = {
    resetpwd
}
const mapStateToProps = (state) => ({
    state: state.auth
})

const mappedResetpwdForm = connect(mapStateToProps, mapDispatchToProps)(ResetpwdForm)

export default mappedResetpwdForm