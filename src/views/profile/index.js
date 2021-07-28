import React from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { getCustomer, editCustomer } from 'actions/customerAction';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                "customerId": '',
                "firstName": "",
                "lastName": "",
                "email": "",
                "contactNumber": null,
                "address1": "",
                "address2": "",
                "city": null,
                "state": null,
                "zip": null,
                "status": "ACTIVE",
                "joinDate": "",
                "membershipStartDate": null,
                "membershipEndDate": null
            },
            password: {
                newPassword: '',
                oldPassword: '',
                confirm: ''
            }
        }
    }
    onChange = (e) => {
        let { type, name, value } = e.target;
        let data
        if (type === 'password') {
            data = this.state.password
            data[name] = value;
            this.setState({ password: data })
        } else {
            data = this.state.user
            data[name] = value;
            this.setState({ user: data })
        }
    }
    UNSAFE_componentWillReceiveProps(props) {
        let user = this.props.customer.data
        this.setState({ user })
    }
    UNSAFE_componentWillMount() {
        this.props.getCustomer();
    }
    updateProfile = (e) => {
        e.preventDefault();
        this.props.editCustomer(this.state.user)
    }
    changePwd = (e) => {
        e.preventDefault();
        let { password } = this.state;
        delete password.confirm;
        password.customerId = this.state.user.customerId;
        this.props.editCustomer(password)
    }
    render() {
        let { user } = this.state;
        return (
            <div className="content">
                <Card className="main-area">
                    <CardHeader className="d-flex align-items-center">
                        <h5 className="card-category">Edit profile</h5>
                    </CardHeader>
                    <CardBody className="main-area">
                        <Form onSubmit={this.updateProfile}>
                            <Row>
                                <Col className="pr-1" md="6">
                                    <FormGroup>
                                        <label>First Name</label>
                                        <Input
                                            name="firstName"
                                            defaultValue={user.firstName}
                                            placeholder="First Name"
                                            type="text"
                                            onChange={this.onChange}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col className="pl-1" md="6">
                                    <FormGroup>
                                        <label>Last Name</label>
                                        <Input
                                            name="lastName"
                                            defaultValue={user.lastName}
                                            placeholder="Last Name"
                                            type="text"
                                            onChange={this.onChange}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="pr-1" md="6">
                                    <FormGroup>
                                        <label htmlFor="exampleInputEmail1">
                                            Email address
                                        </label>
                                        <Input placeholder="Email" type="email" defaultValue={user.email} name="email" onChange={this.onChange} />
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Button className="float-right" color="primary" type="submit">
                                            Update User Info
                                         </Button>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                        <hr />
                        <h5 className="card-category mt-5">Change Password</h5>
                        <Form onSubmit={this.changePwd}>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <label>Old Password</label>
                                        <Input type="password" name="oldPassword" onChange={this.onChange} required />
                                    </FormGroup>
                                </Col>
                                <Col md="6">

                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <label>New Password</label>
                                        <Input type="password" name="newPassword" onChange={this.onChange} required />
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <label>Confirm Password</label>
                                        <Input name="confirm" onChange={this.onChange} type="password" required />
                                    </FormGroup>
                                </Col>
                                <Col md="12">
                                    <Button className="float-right" color="primary" type="submit" disabled={this.state.password.newPassword !== this.state.password.confirm}>
                                        Change Password
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

ProfilePage.propsTypes = {
    getCustomer: PropTypes.func.isRequired,
    editCustomer: PropTypes.func.isRequired,
    customer: PropTypes.object.isRequired
}

const mapDispatchToProps = {
    getCustomer, editCustomer
}
const mapStateToProps = (state) => ({
    customer: state.customer
})
const mappedProfilePage = connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
export default mappedProfilePage;
