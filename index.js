import React, { Component } from 'react';
import { auth } from 'firebase';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

interface FirebaseAuthGuardRouterProps {
  navBar: any;
  loading: any;
}
export class FirebaseAuthGuardRouter extends Component<FirebaseAuthGuardRouterProps, {}> {
  constructor(props) {
    super(props)
  }
  state = {
    loading: true,
    user: null
  }
  componentWillMount() {
    auth().onAuthStateChanged(user => this.setState({ user, loading: false }))
  }
  render() {
    return (
      <Router>
        <div>
          {<this.props.navBar auth={this.state.user ? true : false} />}
          {this.state.loading ? (this.props.loading || <Loading />) : this.props.children}
        </div>
      </Router>
    )
  }
}

interface FirebaseAuthGuardRouteProps {
  authOnly: boolean;
  noAuthOnly: boolean;
  component: any;
  path: string;
  exact: boolean;
  redirectPath: string
}

export const FirebaseAuthGuardRoute = (props: FirebaseAuthGuardRouteProps) => {
  let {
    authOnly,
    noAuthOnly,
    component,
    path,
    exact,
    redirectPath
  } = props
  let check = (() => {
    let user = auth().currentUser
    console.log(authOnly, user, noAuthOnly)
    return (authOnly && user) || (noAuthOnly && !user) || (!authOnly && !noAuthOnly) ? true : false
  })
  return <Route exact={exact} path={path} component={Guard({ check, component, redirectPath })} />
}

const Guard = (prop) => (props) => {
  console.log(props, prop, !prop.check())
  if (!prop.check()) {
    (props.history && props.history.push && prop.redirectPath) ? props.history.push(prop.redirectPath) : (props.history && props.history.goBack) ? props.history.goBack : (props.router && props.router.goBack) && props.router.goBack()
  }
  return <prop.component { ...props } />
}

export const Loading = () => <h1>Loading</h1>
