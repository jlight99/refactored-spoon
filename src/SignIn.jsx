import React, { useState } from 'react';
import SignInForm from './SignInForm';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useHistory } from "react-router-dom";
import GoogleLogin from 'react-google-login';

export default function SignIn() {
    const history = useHistory();
    const [key, setKey] = useState('login');
    const [error, setError] = useState('');

    const handleSubmit = async (email, password, type) => {
        const response = await fetch('http://localhost:8081/' + type, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        });

        const responseText = await response.text();

        if (type == 'login' && response.status == 302 ||
            type == 'signup' && response.status == 201) {
            history.push('/days');
        } else {
            setError("error with " + type + "\n" + responseText);
        }
    };

    const handleLoginSubmit = (email, password) => {
        handleSubmit(email, password, 'login');
    };

    const handleSignupSubmit = (email, password) => {
        handleSubmit(email, password, 'signup');
    };

    const googleSignup = (res, type) => {
        const googleResponse = {
            Name: res.profileObj.name,
            email: res.profileObj.email,
            token: res.googleId,
            Image: res.profileObj.imageUrl,
            ProviderId: 'Google'
        };

        handleSubmit(googleResponse.email, googleResponse.token, type);
    };

    return (
        <div>
            <Tabs
                id="signin-tabs"
                activeKey={key}
                onSelect={(k) => {
                    setKey(k);
                    setError('');
                }}
            >
                <Tab eventKey="login" title="Login">
                    <SignInForm
                        handleSubmit={handleLoginSubmit}
                    />
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Login with Google"
                        onSuccess={res => googleSignup(res, 'login')}
                        onFailure={res => googleSignup(res, 'login')} />
                </Tab>
                <Tab eventKey="signup" title="Sign Up">
                    <SignInForm
                        handleSubmit={handleSignupSubmit}
                    />
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Login with Google"
                        onSuccess={res => googleSignup(res, 'signup')}
                        onFailure={res => googleSignup(res, 'signup')} />
                </Tab>
            </Tabs>
            {error && <div style={{ color: "red" }}>error!</div>}
        </div>
    );
}
