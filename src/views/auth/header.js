import React, { Component } from 'react'
import logo from "logo-gray.png";


export default class authHeader extends Component {
    render() {
        return (
            <div className="auth-header text-center">
                <a href="/">
                    <img src={logo} alt="logo" width="170" />
                </a>
            </div>
        )
    }
}
