import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
const PrivateRoute = (props) => (
    <div>
        {props.isAuth ? <Route {...props}/> :
            <Redirect to={{
                pathname: "/auth",
                state: { from: props.path }
            }} /> }
    </div>
);

const mapStateToProps = (state) => {
    return { isAuth: !!state.auth.token }
}

export default connect(mapStateToProps)(PrivateRoute);