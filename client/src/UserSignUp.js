import React from "react";
import { Redirect } from 'react-router-dom'
import Header from "./Header";
import config from "./config";

class UserSignUp extends React.Component {
    state = {
        redirect: false,
        post: false,
        body: {
            firstName: '',
            lastName: '',
            emailAddress: '',
            confirmedPassword: '',
            password: ''
        },
        errors: false
    }

    constructor(props) {
        super(props);
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/'/>
        }
    }

    renderValidationErrors = () => {
        if (this.state.errors) {
            console.log("errors", this.state.errors);
        }
    }

    setSignUp = () => {
        // set the form content in the below variable.
        this.setState({
            post: true
        })
    }
    renderSignUp = () => {

        if (this.state.post) {
            fetch(config.apiBaseUrl + `/users`, {
                method: 'POST',
                body: JSON.stringify(this.state.body)
            })
                .then(res => res.json())
                .then((body) => {
                    if (body.error){
                        this.handleValidationErrors([body.error]);
                    } else if (body.errors){
                        this.handleValidationErrors(body.errors);
                    } else {
                        console.log("err", body);
                    }
                })
                .catch(err => console.log('err', err));

            return <Redirect to='/'/>
        }
    }

    handleValidationErrors = (errors) => {
        console.log("errors set on state:", errors);
        this.state.errors = errors;
    }

    handleEmailChange = (e) => {
        this.state.body.emailAddress = e.target.value;
    }

    handleFirstNameChange = (e) => {
        this.state.body.firstName = e.target.value;
    }

    handleLastNameChange = (e) => {
        this.state.body.lastName = e.target.value;
    }

    handlePasswordChange = (e) => {
        this.state.body.password = e.target.value;
    }

    handleConfirmedPasswordChange = (e) => {
        this.state.body.confirmedPassword = e.target.value;
    }



    render () {
        return (
            <div>
            <Header/>
                <div className="bounds">
                    <div className="grid-33 centered signin">
                        <h1>Sign Up</h1>
                        <div>
                            {this.renderValidationErrors()}
                            <form>
                                <div><input id="firstName" name="firstName" type="text"  placeholder="First Name"
                                            value={this.state.firstName} onChange={this.handleFirstNameChange.bind(this)}/></div>
                                <div><input id="lastName" name="lastName" type="text"  placeholder="Last Name"
                                            value={this.state.lastName} onChange={this.handleLastNameChange.bind(this)}/></div>
                                <div><input id="emailAddress" name="emailAddress" type="text"
                                            placeholder="Email Address" value={this.state.emailAddress} onChange={this.handleEmailChange.bind(this)}/></div>
                                <div><input id="password" name="password" type="password" placeholder="Password"
                                            value={this.state.confirmedPassword} onChange={this.handleConfirmedPasswordChange.bind(this)}/></div>
                                <div><input id="confirmPassword" name="confirmPassword" type="password"
                                            placeholder="Confirm Password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)}/></div>
                                <div className="grid-100 pad-bottom">
                                    {this.renderSignUp()}
                                    <button className="button" type="button"
                                            onClick={this.setSignUp.bind(this)}>Sign Up</button>
                                    {this.renderRedirect()}
                                    <button className="button button-secondary"
                                            onClick={this.setRedirect}>Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                        <p>&nbsp;</p>
                        <p>Already have a user account? <a href="signin">Click here</a> to sign in!</p>
                    </div>
                </div>
            </div>

        )}
}

export default UserSignUp;