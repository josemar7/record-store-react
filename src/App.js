import React, {Component} from 'react';
import {Suspense} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Logout from "./components/Auth/Logout/Logout";
import * as actions from './store/actions/index';

const Test = React.lazy(() => {
    console.log('Test');
    return import('./components/Test/Test');
});

const About = React.lazy(() => {
    return import('./components/About/About');
});

const Artists = React.lazy(() => {
    return import('./components/Artists/Artists');
});

const Artist = React.lazy(() => {
    return import('./components/Artist/Artist');
});

const Auth = React.lazy(() => {
    return import('./components/Auth/Auth');
});

class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/home" render={(props) => <Test {...props}/>}/>
                <Route path="/about" render={(props) => <About {...props}/>}/>
                <Route path="/auth" render={(props) => <Auth {...props}/>}/>
                <Route path="/params" render={(props) => <Test {...props}/>}/>
                <Route path="/test" render={(props) => <Test {...props}/>}/>
                <Route path="/:id" render={(props) => <Test {...props}/>}/>
                <Route render={() => <h1>Not found</h1>}/>
                <Redirect to="/"/>
            </Switch>
        );
        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/home" render={(props) => <Test {...props}/>}/>
                    <Route path="/about" render={(props) => <About {...props}/>}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/params" render={(props) => <Test {...props}/>}/>
                    <Route path="/artists/new" render={(props) => <Artist {...props}/>}/>
                    <Route path="/artists" render={(props) => <Artists {...props}/>}/>                    
                    <Route path="/test" render={(props) => <Test {...props}/>}/>
                    <Route path="/:id" render={(props) => <Test {...props}/>}/>
                    <Redirect to="/"/>
                    {/*<Route render={() => <h1>Not found</h1>}/>*/}

                </Switch>
            );
        }

        return (
            <div>
                <Layout><Suspense fallback={<p>Loading...</p>}>{routes}</Suspense></Layout>
            </div>
        );
    }


}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
