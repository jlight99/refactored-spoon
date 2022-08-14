import React from 'react';
import SignIn from './SignIn';
import './App.css';

export default function HomePage(props) {
    return (
        <div className="background">
            <div className="sign-in-form">
                <h3>Refactored Spoon</h3>
                <div>An app to help you track what you eat and provide nutritional insights</div>
                <span style={{ display: 'flex', justifyContent: 'center', margin: '5%' }}>
                    <SignIn setAuthenticated={props.setAuthenticated} />
                </span>
            </div>
        </div>
    );
}
