import React from 'react';
import SignIn from './SignIn';

export default function HomePage(props) {
    return (
        <div style={{ margin: '3%' }}>
            <h3>Refactored Spoon</h3>
            <div>an app to help you track what you eat and provide nutritional insights</div>
            <span style={{ display: 'flex', justifyContent: 'center', margin: '5%' }}>
                <SignIn setAuthenticated={props.setAuthenticated} />
            </span>
        </div>
    );
}
