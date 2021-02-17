import React, { Component } from 'react';
import {enable2Factor, getUserProfile, resetPassword} from '../../util/APIUtils';
import {Avatar, Button, notification, Switch} from 'antd';
import { getAvatarColor } from '../../util/Colors';
import { formatDate } from '../../util/Helpers';
import LoadingIndicator  from '../../common/LoadingIndicator';
import './Profile.css';
import NotFound from '../../common/NotFound';
import ServerError from '../../common/ServerError';
import DebugHistory from "../../history/DebugHistory";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isUsing2FA: false,
            isLoading: false
        }
        this.loadUserProfile = this.loadUserProfile.bind(this);
    }

    loadUserProfile(username) {
        this.setState({
            isLoading: true
        });

        getUserProfile(username)
            .then(response => {
                this.setState({
                    user: response,
                    isUsing2FA: response.isUsing2FA,
                    isLoading: false
                });
            }).catch(error => {
                if(error.status === 404) {
                    this.setState({
                        notFound: true,
                        isLoading: false
                    });
                } else {
                    this.setState({
                        serverError: true,
                        isLoading: false
                    });
                }
            });
    }

    componentDidMount() {
        const username = this.props.match.params.username;
        this.loadUserProfile(username);
    }

    componentDidUpdate(nextProps) {
        if(!this.props.isAuthenticated) {
            this.props.history.push("/login");
            return;
        }
        if(this.props.match.params.username !== nextProps.match.params.username) {
            this.loadUserProfile(nextProps.match.params.username);
        }
    }

    update2Factor = () => {
        const fc = !this.state.isUsing2FA;
        enable2Factor(fc)
            .then(res => {
                if (res.code === 1){
                    this.setState({
                        isUsing2FA: fc,
                    }, () => {
                        this.props.history.push(`/activated/${encodeURIComponent(res.data.replace(`%`, "0x0x0"))}`);
                    });
                }
            });
    }

    changePassword = () => {
        resetPassword(this.state.user.email)
            .then(res => {
                if (res.code === 1){
                    notification.success({
                        message: '成功',
                        description: res.msg,
                    });
                }else{
                    notification.error({
                        message: '错误',
                        description: res.msg,
                    });
                }
            }).catch(error => {
            if(error.status === 404) {
                this.setState({
                    notFound: true,
                    isLoading: false
                });
            } else {
                this.setState({
                    serverError: true,
                    isLoading: false
                });
            }
        });
    }

    render() {
        if(this.state.isLoading) {
            return <LoadingIndicator />;
        }

        if(this.state.notFound) {
            return <NotFound />;
        }

        if(this.state.serverError) {
            return <ServerError />;
        }

        const tabBarStyle = {
            textAlign: 'center'
        };

        return (
            <div className="profile">
                {
                    this.state.user ? (
                        <div className="user-profile">
                            <div>
                                <div className="user-avatar">
                                    <Avatar className="user-avatar-circle" style={{ backgroundColor: getAvatarColor(this.state.user.username)}}>
                                        {this.state.user.username[0].toUpperCase()}
                                    </Avatar>
                                </div>
                                <div className="user-summary">
                                    <div className="full-name">{this.state.user.username}</div>
                                    <div className="username">@{this.state.user.username}</div>
                                    <div className="user-joined">
                                        Joined {formatDate(this.state.user.createdAt)}
                                    </div>
                                </div>
                                <div>
                                    开启二步验证
                                    <Switch checkedChildren="开启"
                                            unCheckedChildren="关闭"
                                            defaultChecked={this.state.isUsing2FA}
                                            onClick={() => {
                                                this.update2Factor();
                                            }}/>

                                    <Button type="dashed" onClick={() => {
                                        this.changePassword();
                                    }}>
                                        修改密码
                                    </Button>
                                </div>
                            </div>
                            <div className="user-poll-details">
                                <DebugHistory />
                            </div>
                        </div>
                    ): null
                }
            </div>
        );
    }
}

export default Profile;