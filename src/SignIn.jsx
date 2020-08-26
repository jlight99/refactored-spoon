import React from 'react';
import SignInForm from './SignInForm';

export default function SignIn() {
    const handleSubmit = (email, password, type) => {
        fetch('http://localhost:8081/' + type, {
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
    };

    const handleLoginSubmit = (email, password) => {
        handleSubmit(email, password, 'login');
    };

    const handleSignupSubmit = (email, password) => {
        handleSubmit(email, password, 'signup');
    };

    return (
        <div>
            <SignInForm
                label='login'
                handleSubmit={handleLoginSubmit}
            />
            <SignInForm
                label='signup'
                handleSubmit={handleSignupSubmit}
            />
        </div>
    );
}
