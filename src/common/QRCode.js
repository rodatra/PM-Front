import React, { Component } from 'react';
import './NotFound.css';
import {Result, Button, Icon} from 'antd';

class QRCode extends Component {
    render() {
        return (
            <Result
                icon={<Icon type="smile" theme="twoTone" />}
                title="Scan the qrCode below to enable two factor verification"
                extra={<img
                    src={this.props.qrcode}
                    alt="new"
                />}
            />
        );
    }
}

export default QRCode;