import React, { Component } from 'react';
import './NotFound.css';
import { Result, Button } from 'antd';

class Activated extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: "",
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.message){
            this.setState({
                image: nextProps.message,
            });
        }
    }

    goBack = () => {
        this.props.history.push("/");
    }

    render() {
        return (
            (this.props.message.startsWith("http")) ? (
                <Result
                    status="success"
                    title="请在手机上使用OTP软件保存此密钥"
                    extra={[
                        <img src={`${decodeURIComponent(this.props.message).replace("0x0x0", `%`)}`} />,
                        <Button type="primary" key="console" onClick={() => this.goBack()}>
                            去登陆
                        </Button>
                    ]}
                />
            ) :
                (
                <Result
                    status="success"
                    title={this.props.message}
                    extra={[
                        <Button type="primary" key="console" onClick={() => {
                            this.goBack();
                        }}>
                            去登陆
                        </Button>
                    ]}
                />
            )

        );
    }
}

export default Activated;