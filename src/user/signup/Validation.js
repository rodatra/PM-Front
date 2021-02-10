import React, { Component } from 'react';
import {validateLocToken, validatePassToken, validateRegToken} from '../../util/APIUtils';
import {Avatar} from 'antd';
import { getAvatarColor } from '../../util/Colors';
import { formatDate } from '../../util/Helpers';

class Validation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validation: false,
        }
        this.checkRegTokenValidity = this.checkRegTokenValidity.bind(this);
        this.checkLocTokenValidity = this.checkLocTokenValidity.bind(this);
    }

    checkRegTokenValidity(token) {
        validateRegToken(token)
        .then(response => {
            if (response.code === 1) {
                this.props.history.push(`/activated/${encodeURIComponent(response.data.replace(`%`, "0x0x0"))}`);
            }else{
                this.props.history.push(`/activateFailed/${response.msg}`);
            }
        }).catch(error => {

        });        
    }

    checkLocTokenValidity(token) {
        validateLocToken(token)
            .then(response => {
                if (response.code === 1) {
                    this.props.history.push(`/activated/${response.msg}`);
                }else{
                    this.props.history.push(`/activateFailed/${response.msg}`);
                }
            }).catch(error => {

        });
    }

    checkPassTokenValidity(token) {
        validatePassToken(token)
            .then(response => {
                if (response.code === 1) {
                    this.props.history.push(`/changePass`);
                }else{
                    this.props.history.push(`/activateFailed/${response.msg}`);
                }
            }).catch(error => {

        });
    }

    componentDidMount() {
        const token = this.props.token;
        const source = this.props.source;
        if (source === "reg"){
            this.checkRegTokenValidity(token);
        }else if (source === "loc"){
            this.checkLocTokenValidity(token);
        }else if (source === "pass"){
            this.checkPassTokenValidity(token);
        }

    }

    render() {

        const tabBarStyle = {
            textAlign: 'center'
        };

        return (
            <div className="profile">
                { 
                    this.state.user ? (
                        <div className="user-profile">
                            <div className="user-details">
                                <div className="user-avatar">
                                    <Avatar className="user-avatar-circle" style={{ backgroundColor: getAvatarColor(this.state.user.name)}}>
                                        {this.state.user.name[0].toUpperCase()}
                                    </Avatar>
                                </div>
                                <div className="user-summary">
                                    <div className="full-name">{this.state.user.name}</div>
                                    <div className="username">@{this.state.user.username}</div>
                                    <div className="user-joined">
                                        Joined {formatDate(this.state.user.joinedAt)}
                                    </div>
                                </div>
                            </div>
                            <div className="user-poll-details">    
                                {/*<Tabs defaultActiveKey="1" */}
                                {/*    animated={false}*/}
                                {/*    tabBarStyle={tabBarStyle}*/}
                                {/*    size="large"*/}
                                {/*    className="profile-tabs">*/}
                                {/*    <TabPane tab={`${this.state.user.pollCount} Polls`} key="1">*/}
                                {/*        <PollList username={this.props.match.params.username} type="USER_CREATED_POLLS" />*/}
                                {/*    </TabPane>*/}
                                {/*    <TabPane tab={`${this.state.user.voteCount} Votes`}  key="2">*/}
                                {/*        <PollList username={this.props.match.params.username} type="USER_VOTED_POLLS" />*/}
                                {/*    </TabPane>*/}
                                {/*</Tabs>*/}
                            </div>  
                        </div>  
                    ): null               
                }
            </div>
        );
    }
}

export default Validation;