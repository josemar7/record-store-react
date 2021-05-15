import React, {Component} from 'react';
import {Suspense} from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Logout from "./components/Auth/Logout/Logout";
import * as actions from './store/actions/index';
import Records from './components/Records/Records';

const Artists = React.lazy(() => {
    return import('./components/Artists/Artists');
});

const Artist = React.lazy(() => {
    return import('./components/Artists/Artist/Artist');
});

const Record = React.lazy(() => {
    return import('./components/Records/Record/Record');
});

const Auth = React.lazy(() => {
    return import('./components/Auth/Auth');
});

const Home = React.lazy(() => {
    return import('./components/Home/Home');
});

const Cart = React.lazy(() => {
    return import('./components/Cart/Cart');
});

const Orders = React.lazy(() => {
    return import('./components/Orders/Orders');
});

const Order = React.lazy(() => {
    return import('./components/Orders/Order/Order');
});
class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/home" render={(props) => <Home {...props}/>}/>
                <Route path="/auth" render={(props) => <Auth {...props}/>}/>
                {/* <Route render={() => <h1>Not found</h1>}/> */}
                {/* <Redirect to="/home"/> */}
                <Route path="/cart" render={(props) => <Auth {...props}/>}>
                    <Redirect to="/auth" />
                </Route>
            </Switch>
        );
        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/home" render={(props) => <Home {...props}/>}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/artists/new" render={(props) => <Artist {...props}/>}/>
                    <Route path="/artists/delete/:id" render={(props) => <Artists {...props}/>}/>
                    <Route path="/artists/:id" render={(props) => <Artist {...props}/>}/>
                    <Route path="/artists" render={(props) => <Artists {...props}/>}/>                    
                    <Route path="/records/new" render={(props) => <Record {...props}/>}/>
                    <Route path="/records/delete/:id" render={(props) => <Records {...props}/>}/>
                    <Route path="/records/:id" render={(props) => <Record {...props}/>}/>
                    <Route path="/records" render={(props) => <Records {...props}/>}/>          
                    <Route path="/auth" render={(props) => <Auth {...props}/>}/>                    
                    <Route path="/cart" render={(props) => <Cart {...props}/>} />
                    <Route path="/orders/:id" render={(props) => <Order {...props}/>} />
                    <Route path="/orders" render={(props) => <Orders {...props}/>} />                    
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
        isAuthenticated: state.auth.access_token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
