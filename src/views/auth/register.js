import React, { Component } from 'react'
import Footer from "components/Footer/Footer.js";
import AuthHeader from './header'
import RegisterForm from './registerForm';
import TermsAndCondition from './termsCondition';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTerms: false
        }
    }

    showTerms = () => {
        this.setState({ ...this.state, showTerms: true })
    }
    backToSignUp = () => {
        this.setState({ ...this.state, showTerms: false })
    }
    render() {
        return (
            <div className="auth-wrap">
                <AuthHeader />
                {this.state.showTerms ?
                    (<div className="term-condition">
                        <TermsAndCondition backToSignUp={this.backToSignUp} />
                    </div>)
                    :
                    (<div className="main">
                        <RegisterForm showTerms={this.showTerms} />
                    </div>)
                }

                <Footer fluid />
            </div>
        )
    }
}

export default Register