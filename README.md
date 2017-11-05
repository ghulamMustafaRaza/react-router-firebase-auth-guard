# react-router-firebase-auth-guard
A Package For Managing React-Router Firebase Auth Guard 
<br/>

## Installing Required Packages

```sh
npm install --save firebase react-router-dom
```
OR

```sh
yarn add firebase react-router-dom
```

## Installing Package

```sh
npm install --save react-router-firebase-auth-guard
```
OR

```sh
yarn add react-router-firebase-auth-guard
```

## Usage

<br/>

```jsx
import { initializeApp } from 'firebase';
import React from 'react';
import ReactDOM from 'react-dom';
import { FirebaseAuthGuardRouter, FirebaseAuthGuardRoute } from 'react-router-firebase-auth-guard';
import {
    Link
} from 'react-router-dom'

// COPIED FROM YOUR FIREBASE PROJECT
var config = {
    apiKey: "<API_KEY>",
    authDomain: "<AUTH_DOMAIN>",
    databaseURL: "BASE_URL",
    projectId: "PROJECT_ID"
};

initializeApp(config);

const NavBar = ({ auth }) => (
    <div>
        react-router-firebase-auth-guard
        {auth ?
            <ul style={{ display: 'flex' }}>
                <li><Link to="/">Nutral</Link></li>
                <li><Link to="/auth">Auth Required</Link></li>
            </ul>
            :
            <ul style={{ display: 'flex' }}>
                <li><Link to="/">Nutral</Link></li>
                <li><Link to="/noauth">noAuth Required</Link></li>
            </ul>
        }
    </div>
)
ReactDOM.render(
    <div>
        <FirebaseAuthGuardRouter loading={<span>loading...</span>} navBar={NavBar}>
            <FirebaseAuthGuardRoute exact path="/" component={() => <h1>Nutral</h1>} />
            <FirebaseAuthGuardRoute noAuthOnly exact redirectPath="/auth" path="/noauth" component={() => <h1>auth</h1>} />
            <FirebaseAuthGuardRoute authOnly redirectPath="/noauth" path="/auth" component={() => <h1>no auth</h1>} />
        </FirebaseAuthGuardRouter>
    </div>,
    document.getElementById('root') // ROOT IS MY ID PASTE HERE YOURS
);
```

<br/>


