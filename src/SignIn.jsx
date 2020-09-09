import React, { useState } from 'react';
import SignInForm from './SignInForm';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useHistory } from "react-router-dom";
import { serverURL } from './App';

export function getUserFromLocalStorage() {
    return localStorage.getItem('currentUser');
}

export default function SignIn(props) {
    const history = useHistory();
    const [key, setKey] = useState('login');
    const [error, setError] = useState('');

    const handleSubmit = async (email, password, type) => {
        const response = await fetch(serverURL + '/' + type, {
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

        if ((type === 'login' && response.status === 302) ||
            (type === 'signup' && response.status === 201)) {
            localStorage.setItem('currentUser', JSON.stringify(responseText));
            props.setAuthenticated(true);
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

    return (
        <div style={{ width: '50%', height: 'auto' }}>
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
                </Tab>
                <Tab eventKey="signup" title="Sign Up">
                    <SignInForm
                        handleSubmit={handleSignupSubmit}
                    />
                </Tab>
            </Tabs>
            {error && <div style={{ color: "red" }}>sign in unsuccessful :(</div>}
        </div>
    );
}
