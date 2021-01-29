import React, { Component } from 'react';
import { login } from '../../util/APIUtils';
import './Login.css';
import { Link } from 'react-router-dom';
import {ACCESS_TOKEN} from '../../constants';

import { Form, Input, Button, Icon, notification } from 'antd';
const FormItem = Form.Item;


class Login extends Component {
    render() {
        const AntWrappedLoginForm = Form.create()(LoginForm)
        return (
            <div className="login-container">
                <h1 className="page-title">Login</h1>
                <div className="login-content">
                    <AntWrappedLoginForm onLogin={this.props.onLogin} />
                </div>
            </div>
        );
    }
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();   
        this.props.form.validateFields((err, values) => {
            if (!err) {
                login(values)
                .then(response => {
                    if (response.code === 1){
                        localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
                        this.props.onLogin();
                    }else{
                        notification.error({
                            message: 'Error',
                            description: response.msg
                        });
                    }
                }).catch(error => {
                    notification.error({
                        message: 'Error',
                        description: error.message || 'Sorry! Something went wrong. Please try again!'
                    });
                    this.props.onLogin();
                });
            }
        });
    }

    onChange = (value) => {
        console.log("Captcha value:", value);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                    <Input 
                        prefix={<Icon type="user" />}
                        size="large"
                        name="username"
                        placeholder="Email" />
                    )}
                </FormItem>
                <FormItem>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                    <Input 
                        prefix={<Icon type="lock" />}
                        size="large"
                        name="password" 
                        type="password" 
                        placeholder="Password"  />                        
                )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('code', {
                        rules: [{ required: false, message: 'Please input your code!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" />}
                            type="text"
                            size="large"
                            name="code"
                            placeholder="Optional"  />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" size="large" className="login-form-button">Login</Button>
                    Or <Link to="/signup">register now!</Link>
                </FormItem>
            </Form>
        );
    }
}


export default Login;