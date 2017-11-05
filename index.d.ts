import React, { Component } from 'react';

interface FirebaseAuthGuardRouterProps {
    navBar?: any;
    loading?: any;
}

interface FirebaseAuthGuardRouteProps {
    authOnly?: boolean;
    noAuthOnly?: boolean;
    component: Component | void;
    path: string;
    exact?: boolean;
    redirectPath: string
}

export class FirebaseAuthGuardRouter extends Component<FirebaseAuthGuardRouterProps, {}> { }

export const FirebaseAuthGuardRoute = (props: FirebaseAuthGuardRouteProps): void => { }
