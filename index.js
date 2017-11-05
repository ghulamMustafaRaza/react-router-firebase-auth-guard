import React, { Component } from 'react';
import { auth } from 'firebase';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export class FirebaseAuthGuardRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: null
    };
  }
  componentWillMount() {
    auth().onAuthStateChanged(user => this.setState({ user, loading: false }));
  }
  render() {
    return dom(
      Router,
      null,
      dom(
        'div',
        null,
        dom(this.props.navBar, { auth: this.state.user ? true : false }),
        this.state.loading ? this.props.loading || dom(Loading, null) : this.props.children
      )
    );
  }
}

export const FirebaseAuthGuardRoute = props => {
  let {
    authOnly,
    noAuthOnly,
    component,
    path,
    exact,
    redirectPath
  } = props;
  let check = () => {
    let user = auth().currentUser;
    console.log(authOnly, user, noAuthOnly);
    return authOnly && user || noAuthOnly && !user || !authOnly && !noAuthOnly ? true : false;
  };
  return dom(Route, { exact: exact, path: path, component: Guard({ check, component, redirectPath }) });
};

const Guard = prop => props => {
  console.log(props, prop, !prop.check());
  if (!prop.check()) {
    props.history && props.history.push && prop.redirectPath ? props.history.push(prop.redirectPath) : props.history && props.history.goBack ? props.history.goBack : props.router && props.router.goBack && props.router.goBack();
  }
  return dom(prop.component, props);
};

export const Loading = () => dom(
  'h1',
  null,
  'Loading'
);
