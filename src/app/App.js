import React, { Component } from 'react';
import './App.css';
import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom';

import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import AppHeader from '../common/AppHeader';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import PrivateRoute from '../common/PrivateRoute';

import { Layout, notification } from 'antd';
import Activated from "../common/Activated";
import Validation from "../user/signup/Validation";
import ActivateFailed from "../common/ActivateFailed";
import ApiShow from "../debug/ApiShow";
import DebugHistory from "../history/DebugHistory";
import ChangePass from "../user/signup/ChangePass";
const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false,
      check: true
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });    
  }

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
    .then(res => {
      if (res.code === 1){
        this.setState({
          currentUser: res.data,
          isAuthenticated: true,
          isLoading: false
        });
      }
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
    });
  }

  componentWillMount() {
    this.loadCurrentUser();
  }

  handleLogout(redirectTo="/", notificationType="success", description="已退出登录") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);
    
    notification[notificationType]({
      message: 'Liv',
      description: description,
    });
  }

  handleLogin() {
    notification.success({
      message: 'Liv',
      description: "登陆成功",
    });
    this.loadCurrentUser();
    this.props.history.push("/");
  }

  render() {
    if(this.state.isLoading) {
      return <LoadingIndicator />
    }
    return (
        <Layout className="app-container">
          <AppHeader isAuthenticated={this.state.isAuthenticated} 
            currentUser={this.state.currentUser} 
            onLogout={this.handleLogout} />

          <Content className="app-content">
            <div className="container">
              <Switch>
                <PrivateRoute exact authenticated={this.state.isAuthenticated} path="/"
                              component={ApiShow} props={this.props}>
                </PrivateRoute>

                <Route path="/login" 
                  render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>

                <Route path="/signup" component={Signup}></Route>

                <Route path="/history" component={DebugHistory}></Route>

                <Route path="/activated/:message"
    render={(props) => <Activated message={props.match.params.message} {...props} />}/>

                <Route path="/activateFailed/:message"
                       render={(props) => <ActivateFailed message={props.match.params.message} {...props} />}/>

                <Route path="/changePass/:token"
                       render={(props) => <ChangePass token={props.match.params.token} onLogout={this.handleLogout} {...props} />}/>

                <Route path="/registrationConfirm/:token"
                       render={(props) => <Validation source="reg" token={props.match.params.token} {...props} />}></Route>

                <Route path="/locationConfirm/:token"
                       render={(props) => <Validation source="loc" token={props.match.params.token} {...props} />}></Route>

                <Route path="/changePassConfirm/:token"
                       render={(props) => <Validation source="pass" token={props.match.params.token} {...props} />}></Route>

                <Route path="/users/:username" 
                  render={(props) => <Profile isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props}  />}>
                </Route>

                <Route component={NotFound}></Route>
              </Switch>
            </div>
          </Content>
        </Layout>
    );
  }
}

export default withRouter(App);
