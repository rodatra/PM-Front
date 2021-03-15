import React, { Component } from 'react';
import './NotFound.css';
import { Result, Button } from 'antd';

class ActivateFailed extends Component {

    goBack = () => {
        this.props.history.push("/");
    }

    render() {
        return (
            <Result
                status="error"
                title={this.props.message}
                extra={[
                    <Button type="primary" key="console" onClick={() => {
                        this.goBack();
                    }}>
                        回到登录页
                    </Button>
                ]}
            />
        );
    }
}

export default ActivateFailed;