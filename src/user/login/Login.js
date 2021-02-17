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
                            message: '错误',
                            description: response.msg
                        });
                    }
                }).catch(error => {
                    notification.error({
                        message: '错误',
                        description: '出错了，请稍后重试。',
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
                        rules: [{ required: true, message: '请输入您的邮箱' }],
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
                    rules: [{ required: true, message: '请输入您的密码' }],
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
                        rules: [{ required: false, message: '请输入您的验证码' }],
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
                    <Button type="primary" htmlType="submit" size="large" className="login-form-button">登录</Button>
                    或者 <Link to="/signup">现在注册!</Link>
                </FormItem>
            </Form>
        );
    }
}


export default Login;