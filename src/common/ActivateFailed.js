import React, { Component } from 'react';
import './NotFound.css';
import { Result, Button } from 'antd';

class ActivateFailed extends Component {
    render() {
        return (
            <Result
                status="error"
                title={this.props.message}
                extra={[
                    <Button type="primary" key="console">
                        Redirect To Login In 3 Seconds
                    </Button>
                ]}
            />
        );
    }
}

export default ActivateFailed;