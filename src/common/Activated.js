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

    jump = (url) =>{
        console.log()
    }

    render() {
        console.log(this.props.message)
        return (
            (this.props.message.startsWith("http")) ? (
                <Result
                    status="success"
                    title="请在手机上使用OTP软件保存此密钥"
                    extra={[
                        <img src={`${decodeURIComponent(this.props.message).replace("0x0x0", `%`)}`} />,
                        <Button type="primary" key="console" onClick={() => this.jump()}>
                            Redirect To Console In 3 Seconds
                        </Button>
                    ]}
                />
            ) :
                (
                <Result
                    status="success"
                    title={this.props.message}
                    extra={[
                        <Button type="primary" key="console">
                            Redirect To Console In 3 Seconds
                        </Button>
                    ]}
                />
            )

        );
    }
}

export default Activated;