import React, { useState } from 'react';

export default function SignInForm(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = event => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        props.handleSubmit(email, password);
    };

    return (
        <div>
            <div>
                {props.label}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>email</label>
                        <input type="text" onChange={handleEmailChange} value={email}></input>
                    </div>
                    <div>
                        <label>password</label>
                        <input type="text" onChange={handlePasswordChange} value={password}></input>
                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
}
