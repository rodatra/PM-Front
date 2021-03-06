import React, {Component} from 'react';
import { signup, checkUsernameAvailability, checkEmailAvailability } from '../../util/APIUtils';
import './Signup.css';
import { Link } from 'react-router-dom';

import {
    USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
    EMAIL_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from '../../constants';

import {Form, Input, Button, notification, Checkbox} from 'antd';
import {PasswordInput} from "antd-password-input-strength";
const FormItem = Form.Item;

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: {
                value: ''
            },
            email: {
                value: ''
            },
            password: {
                value: ''
            },
            matchingPassword: {
                value: ''
            },
            isUsing2FA: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onPassChange = this.onPassChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
        this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    onTwoStep = () => {
        const current = this.state.isUsing2FA;
        this.setState({
            isUsing2FA: !current
        })
    };

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
    
        const signupRequest = {
            username: this.state.username.value,
            email: this.state.email.value,
            password: this.state.password.value,
            using2FA: this.state.isUsing2FA
        };
        signup(signupRequest)
        .then(response => {
            if (response.code === 1){
                notification.success({
                    message: '成功',
                    description: "请检查您的邮箱，根据邮件提示完成注册。",
                });
                this.props.history.push("/login");
            }else{
                let temp = response.msg;
                let msg = temp.match(/Password\s\w.*\./)[0].replaceAll(',', '\t');
                const pass = this.state.password.value;
                this.setState({
                    password:{
                        validateStatus: 'error',
                        errorMsg: msg,
                        value: pass
                    }
                })
                notification.error({
                    message: '失败',
                    description: '',
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
        return !(this.state.username.validateStatus === 'success' &&
            this.state.email.validateStatus === 'success' &&
            this.state.password.validateStatus === 'success'
        );
    }

    render() {
        return (
            <div className="signup-container">
                <h1 className="page-title">注册</h1>
                <div className="signup-content">
                    <Form onSubmit={this.handleSubmit} className="signup-form">
                        <FormItem label="用户名"
                            hasFeedback
                            validateStatus={this.state.username.validateStatus}
                            help={this.state.username.errorMsg}>
                            <Input 
                                size="large"
                                name="username"
                                autoComplete="off"
                                placeholder="昵称"
                                value={this.state.username.value} 
                                onBlur={this.validateUsernameAvailability}
                                onChange={(event) => this.handleInputChange(event, this.validateUsername)} />    
                        </FormItem>
                        <FormItem 
                            label="邮箱"
                            hasFeedback
                            validateStatus={this.state.email.validateStatus}
                            help={this.state.email.errorMsg}>
                            <Input 
                                size="large"
                                name="email"
                                type="email" 
                                autoComplete="off"
                                placeholder="邮箱"
                                value={this.state.email.value} 
                                onBlur={this.validateEmailAvailability}
                                onChange={(event) => this.handleInputChange(event, this.validateEmail)} />    
                        </FormItem>
                        <FormItem label="密码"
                                  // hasFeedback
                                  validateStatus={this.state.password.validateStatus}
                                  help={this.state.password.errorMsg}>
                            <PasswordInput
                                name="password"
                                onChange={(event) => this.handleInputChange(event, this.validatePassword)}
                            />
                        </FormItem >
                        <FormItem
                            label="确认密码"
                            validateStatus={this.state.matchingPassword.validateStatus}
                            help={this.state.matchingPassword.errorMsg}>
                            <Input
                                size="large"
                                name="matchingPassword"
                                type="password"
                                autoComplete="off"
                                placeholder="请再输一遍密码"
                                value={this.state.matchingPassword.value}
                                onChange={(event) => this.handleInputChange(event, this.validateMatchingPassword)} />
                        </FormItem>
                        <FormItem>
                            <Checkbox onChange={() => {this.onTwoStep()}}>开启二步验证</Checkbox>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                className="signup-form-button"
                                disabled={this.isFormInvalid()}>注册</Button>
                            已经注册过? <Link to="/login">现在登录!</Link>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }

    // Validation Functions

    validateEmail = (email) => {
        if(!email) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email may not be empty'                
            }
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if(!EMAIL_REGEX.test(email)) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email not valid'
            }
        }

        if(email.length > EMAIL_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`
            }
        }

        return {
            validateStatus: null,
            errorMsg: null
        }
    }

    validateUsername = (username) => {
        if(username.length < USERNAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `用户名过短 (最小允许 ${USERNAME_MIN_LENGTH} 个字符)`
            }
        } else if (username.length > USERNAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `用户名过短 (最大允许 ${USERNAME_MAX_LENGTH} 个字符)`
            }
        } else {
            return {
                validateStatus: null,
                errorMsg: null
            }
        }
    }

    validateUsernameAvailability() {
        // First check for client side errors in username
        const usernameValue = this.state.username.value;
        const usernameValidation = this.validateUsername(usernameValue);

        if(usernameValidation.validateStatus === 'error') {
            this.setState({
                username: {
                    value: usernameValue,
                    ...usernameValidation
                }
            });
            return;
        }

        this.setState({
            username: {
                value: usernameValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkUsernameAvailability(usernameValue)
        .then(response => {
            if(response.data) {
                this.setState({
                    username: {
                        value: usernameValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
            } else {
                this.setState({
                    username: {
                        value: usernameValue,
                        validateStatus: 'error',
                        errorMsg: '此用户名已被注册'
                    }
                });
            }
        }).catch(error => {
            // Marking validateStatus as success, Form will be recchecked at server
            this.setState({
                username: {
                    value: usernameValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
    }

    validateEmailAvailability() {
        // First check for client side errors in email
        const emailValue = this.state.email.value;
        const emailValidation = this.validateEmail(emailValue);

        if(emailValidation.validateStatus === 'error') {
            this.setState({
                email: {
                    value: emailValue,
                    ...emailValidation
                }
            });    
            return;
        }

        this.setState({
            email: {
                value: emailValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkEmailAvailability(emailValue)
        .then(response => {
            if(response.data && response.data === true) {
                this.setState({
                    email: {
                        value: emailValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
            } else {
                this.setState({
                    email: {
                        value: emailValue,
                        validateStatus: 'error',
                        errorMsg: '邮箱已被注册过'
                    }
                });
            }
        }).catch(error => {
            // Marking validateStatus as success, Form will be recchecked at server
            this.setState({
                email: {
                    value: emailValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
    }

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
                errorMsg: `密码过长`
            }
        } else if (password.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `密码过短`
            };
        }else{
            return {
                validateStatus: 'success',
                errorMsg: `验证通过`
            };
        }
    }

    validateMatchingPassword = (password) => {
        if(password !== this.state.password.value) {
            return {
                validateStatus: 'error',
                errorMsg: `密码不匹配`
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