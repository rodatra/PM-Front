import React, {PureComponent} from 'react';
import 'antd/dist/antd.css';
import Result from 'ant-design-pro/lib/Result';
import { Button } from 'antd';

export class Blank extends PureComponent {

  render() {
    const actions = <Button icon="arrow-left" type="primary" onClick={() => window.location.href = "/#/one-service/list"}>前往服务列表</Button>;
    return (
      <Result
        style={{marginTop: "100px"}}
        type="error"
        title="请勿直接访问此界面"
        description="请先在左侧服务列表中选择需要查看的文档"
        actions={actions}
      />
    )
  }
}
