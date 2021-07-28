import React, { Component } from 'react'
import Footer from "components/Footer/Footer.js";
import AuthHeader from './header';
import LoginForm from './loginForm';


class Login extends Component {
    render() {
        return (
            <div className="auth-wrap">
                <AuthHeader />
                <div className="main">
                    <LoginForm {...this.props} />
                </div>
                <Footer fluid />
            </div>
        )
    }
}

export default Login