import React, {Component} from 'react';
import {changePass} from '../../util/APIUtils';
import './Signup.css';

import {
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from '../../constants';

import {Form, Input, Button, notification} from 'antd';
import {PasswordInput} from "antd-password-input-strength";
const FormItem = Form.Item;

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: {
                value: ''
            },
            matchingPassword: {
                value: ''
            },
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onPassChange = this.onPassChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const request = {
            oldPassword: this.state.password.value,
            newPassword: this.state.password.value,
            token: this.props.token,
        };
        changePass(request)
        .then(response => {
            if (response.code === 1){
                notification.success({
                    message: '成功',
                    description: "密码已修改，请重新登录。",
                });
                this.props.onLogout();
            }else{
                notification.error({
                    message: '错误',
                    description: '出错了，请稍后重试。',
                });
            }
        }).catch(error => {
            notification.error({
                message: '错误',
                description: '出错了，请稍后重试。',
            });
        });
    }

    isFormInvalid() {
        return !(
            this.state.password.validateStatus === 'success'
        );
    }

    render() {
        return (
            <div className="signup-container">
                <h1 className="page-title">Sign Up</h1>
                <div className="signup-content">
                    <Form onSubmit={this.handleSubmit} className="signup-form">
                        <FormItem label="New Password"
                                  // hasFeedback
                                  validateStatus={this.state.password.validateStatus}
                                  help={this.state.password.errorMsg}>
                            <PasswordInput
                                name="password"
                                onChange={(event) => this.handleInputChange(event, this.validatePassword)}
                            />
                        </FormItem >
                        <FormItem
                            label="Confirm Password"
                            validateStatus={this.state.matchingPassword.validateStatus}
                            help={this.state.matchingPassword.errorMsg}>
                            <Input
                                size="large"
                                name="matchingPassword"
                                type="password"
                                autoComplete="off"
                                placeholder="请再输一遍"
                                value={this.state.matchingPassword.value}
                                onChange={(event) => this.handleInputChange(event, this.validateMatchingPassword)} />
                        </FormItem>
                        <FormItem
                            label="Reset Token">
                            <Input
                                size="large"
                                name="token"
                                type="text"
                                value={this.props.token}
                                />
                        </FormItem>
                        <FormItem>
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                className="signup-form-button"
                                disabled={this.isFormInvalid()}>提交</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }

    // Validation Functions

    onPassChange(event, password){
        this.setState({
            password: {
                value: password,
            }
        })
    }

    validatePassword = (password) => {
        if(password.length > PASSWORD_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Too Long`
            }
        } else if (password.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Too Short`
            };
        }else{
            return {
                validateStatus: 'success',
                errorMsg: `Validation Passed`
            };
        }
    }

    validateMatchingPassword = (password) => {
        if(password !== this.state.password.value) {
            return {
                validateStatus: 'error',
                errorMsg: `Passwords do not match`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }
}

export default Signup;