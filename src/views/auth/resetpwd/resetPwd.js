import React, { Component } from 'react'
import AuthHeader from '../header';
import ResetpwdForm from './resetpwdForm';
import Footer from "components/Footer/Footer.js";

export default class ResetPwd extends Component {
    render() {
        return (
            <div className="auth-wrap">
                <AuthHeader />
                <div className="main">
                    <ResetpwdForm />
                </div>
                <Footer fluid />
            </div>
        )
    }
}
