import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './App';
require('./styles/App.css');
window.ServerDate = function(){
    return new Date();
};
ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute getComponent={
                (nextState, callback) => {
                    require.ensure([], (require) => {
                        callback(null, require('./pages/index'));
                    }, 'home');
                }} />
        </Route>
        <Route path="login" component={App}>
            <IndexRoute getComponent={
                (nextState, callback) => {
                    require.ensure([], (require) => {
                        callback(null, require('./pages/index'));
                    }, 'login');
                }} />
        </Route>
        <Route path='home' getComponent={
            (nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('./pages/task/index'));
                }, 'home');
            }} />
        <Route path='register' getComponent={
            (nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('./pages/register/index'));
                }, 'register');
            }} />
        <Route path='registerCreate' getComponent={
            (nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('./pages/register/createOrEdit'));
                }, 'registerCreate');
            }} />
        <Route path='task' getComponent={
            (nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('./pages/task/index'));
                }, 'task');
            }} />
        <Route path='adjustment' getComponent={
            (nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('./pages/adjustment/index'));
                }, 'adjustment');
            }} />
        <Route path='paymentPlan' getComponent={
            (nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('./pages/adjustment/paymentPlan'));
                }, 'paymentPlan');
            }} />
        <Route path='report' getComponent={
            (nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('./pages/report/index'));
                }, 'task');
            }} />
        <Route path="report" component={App}>
            <Route path='reportAudit' getComponent={
                (nextState, callback) => {
                    require.ensure([], (require) => {
                        callback(null, require('./pages/report/reportAudit'));
                    }, 'reportAudit');
                }} />
            <Route path='reportBill' getComponent={
                (nextState, callback) => {
                    require.ensure([], (require) => {
                        callback(null, require('./pages/report/bill'));
                    }, 'reportBill');
                }} />
        </Route>
        <Route component={App}></Route>
        <Route path="plan" getComponent={
            (nextState,callback) => {
                require.ensure([],(require)=> {
                    callback(null, require('./pages/plan/index'));
                },'plan');
            }
        }></Route>
        <Route path="create" getComponent={
            (nextState,callback) => {
                require.ensure([],(require)=> {
                    callback(null, require('./pages/plan/create'));
                },'create');
            }
        }></Route>
        <Route path="approve/:case" getComponent={
            (nextState,callback) => {
                require.ensure([],(require)=> {
                    callback(null, require('./pages/task/approve'));
                },'approve');
            }
        }></Route>
    </Router>
    , document.getElementById('app'));
