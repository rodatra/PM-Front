import React, { Component } from 'react';
import './NotFound.css';
import { Result, Button } from 'antd';

class Activated extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Result
                status="success"
                title={this.props.message}
                extra={[
                    <Button type="primary" key="console">
                        Redirect To Console In 3 Seconds
                    </Button>
                ]}
            />
        );
    }
}

export default Activated;