import {Button, Col, Input, message, notification, Radio, Row, Select, Table, Tabs, Tag, Tooltip} from 'antd';
import {connect} from "dva";
import React, {PureComponent} from 'react';
import {MonacoEditor} from "../../../components/MonacoEditor/MonacoEditor";
import {EditableCell, EditableFormRow} from './EditableCell'
import {PostFormBody} from './PostFormBody'
import {HeaderForm} from './HeaderForm'
import {Blank} from './Blank'
import styles from './ApiShow.less';
import copy from "copy-to-clipboard";

const {TabPane} = Tabs;

class ApiShow extends PureComponent {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.columns = [
      {
        title: 'Key',
        dataIndex: 'keyAlias',
        width: '43%',
        editable: true,
      },
      {
        title: 'Value',
        dataIndex: 'value',
        width: '43%',
        editable: true,
      },
      {
        title: 'Operation',
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.entryList.length >= 1 ? (
            <Button style={{marginLeft: "20px", marginRight: "20px"}} type="danger" shape="circle" icon="delete" onClick={() => {
              this.handleDelete(record.key);
            }}></Button>
          ) : null,
      },
    ];
    this.state = {
      url: "",
      encryptedUrl: "",
      apiList: [],
      postParam: {},
      postBody: {},
      header: {
        "Accept": "*/*",
        "Connection": "keep-alive",
        "Accept-Encoding": "deflate, br",
      },
      editorValue: "",
      bodyType: "",
      bodyRaw: "",
      methodUsed: 'GET',
      getParam: {},
      decryptedList: "",
      placeHolder: undefined,
      entryList: [
        {
          key: 'k' + 0,
          keyAlias: '',
          value: '',
          chosen: true,
        }
      ],
      selectedRowKeys: [],
      count: 1,
      up: 1,
      warning: 0
    }
  };

  componentDidMount() {
    if (this.props.location.search) {
      this.setState({encryptedUrl: window.location.href})
      const append = this.props.location.search.toString().substr(8)
      this.decryptList(append)
    } else if (this.props.location.state) {
      this.setState({encryptedUrl: this.props.location.state.encryptedUrl})
      this.getApiList(this.props.location.state.apiList);
    } else {
      this.setState({warning: 1})
    }
  }

  decryptList = (encryptedString) => {
    this.props.dispatch({
      type: 'api/decrytion',
      payload: encryptedString,
    }).then((res) => {
      if (res && res.code === 0) {
        this.setState({decryptedList: res.data}, () => {
          this.getApiList(this.state.decryptedList);
        });
      } else {
        message.error(res && res.msg ? res.msg : '解密ID List失败', 3);
      }
    });
  }

  exportUrl = () => {
    let url = this.state.encryptedUrl;
    message.success("文档链接已复制到剪切板: " + url, 3);
    copy(url);
  }

  onBodyRaw = (newValue) => {
    this.setState({postParam: newValue},() => {
      this.changePostParam(newValue)
    })
  }

  onBodyType = (e) => {
    this.setState({
      bodyType: e.target.value,
    }, () => {
      this.changePostParam(this.state.postParam)
    });
  }

  onMethod = (value) => {
    this.setState({methodUsed: value}, () => {
      this.updateURL()
    })
  }

  handleDelete = (key) => {
    const {count, entryList, selectedRowKeys} = this.state;
    if (entryList.length === 1) {
      notification.warn({
        message: '目前只有一项',
        description: '请至少保留一项',
        onClick: () => {
        },
      });
      return
    }
    this.setState({
      entryList: entryList.filter(item => item.key !== key),
      selectedRowKeys: selectedRowKeys.filter(item => item !== key),
      count: count - 1
    }, () => {
      this.updateURL()
    });
  };

  handleAdd = () => {
    const {up, count, entryList} = this.state;
    const newData = {
      key: 'k' + up,
      keyAlias: '',
      value: '',
      chosen: false,
    };
    this.setState({
      entryList: [...entryList, newData],
      count: count + 1,
      up: up + 1,
    }, () => {
      this.updateURL()
    });
  };

  updateURL = () => {
    const {entryList, selectedRowKeys} = this.state;
    let json = {};
    let append = "";

    for (let i = 0; i < selectedRowKeys.length; i++) {
      entryList.map(j => {
        if (j.key === selectedRowKeys[i])
          append = append + "&" + j.keyAlias + "=" + j.value
      })
    }
    if (selectedRowKeys.length > 0) {
      append = "?" + append.substring(1)
    }
    for (let i = 0; i < selectedRowKeys.length; i++) {
      entryList.map(j => {
        if (j.key === selectedRowKeys[i])
          json[j.keyAlias] = j.value
      })
    }

    this.setState({
      getParam: json,
      url: append,
    })
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({selectedRowKeys}, () => {
      this.updateURL()
    });
  };

  handleSave = row => {
    const newData = [...this.state.entryList];
    const {selectedRowKeys} = this.state;
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    row.chosen = true;
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({
      entryList: newData,
      selectedRowKeys: Array.from(new Set([...selectedRowKeys, item.key])),
    }, () => {
      this.updateURL()
      if (index === this.state.count - 1) {
        this.handleAdd();
      }
    });
  };

  getApiList = (param) => {
    this.props.dispatch({
      type: 'api/getApiList',
      payload: param,
    }).then((res) => {
      if (res && res.code === 0) {
        this.setState({apiList: res.data});
      } else {
        message.error(res && res.msg ? res.msg : '文档数据数据查询失败', 3);
      }
    });
  }

  onSendingRequest = (path, param, header) => {
    if (this.state.methodUsed === 'GET') {
      let list = [path, this.state.methodUsed, header, param]
      this.props.dispatch({
        type: 'api/getResponse',
        payload: list,
      }).then((res) => {
        if (res && res.code === 0) {
          this.setState({placeHolder: JSON.parse(res.data)});
        } else {
          message.error(res && res.msg ? res.msg : 'Debug查询失败', 3);
        }
      });
    } else {
      let list = [path, this.state.methodUsed, header, param, this.state.postBody]
      this.props.dispatch({
        type: 'api/postResponse',
        payload: list,
      }).then((res) => {
        if (res && res.code === 0) {
          this.setState({placeHolder: JSON.parse(res.data)});
        } else {
          message.error(res && res.msg ? res.msg : 'Debug查询失败', 3);
        }
      });
    }
  }

  changePostParam = (postParam) => {
    let json = {}
    json['type'] = this.state.bodyType;
    json['value'] = postParam
    this.setState({
      postParam: postParam,
      postBody: json,
    })
  }

  changeHeader = (header) => {
    this.setState({header: header})
  }

  render() {
    const {entryList} = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });

    const paramColumns = [
      {
        title: '参数名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '参数说明',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: '是否必须',
        dataIndex: 'required',
        render: required => `${required.toString()}`,
        key: 'required',
      },
      {
        title: '数据类型',
        dataIndex: 'modelRef.type',
        key: 'modelRef.type',
      },
    ];

    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    if (this.state.warning === 1){
      return <Blank />
    }

    return (
      <div>
        <div>
          <Button icon="file-word" style={{ marginLeft: "10px", marginBottom: "5px" }} type="primary" onClick={() => {
            this.exportUrl()
          }}>复制链接</Button>
        </div>
        <Tabs defaultActiveKey="1" tabPosition='left'>
          {this.state.apiList.map(i => (
            <TabPane tab={(
              <Tooltip title={i.description}>
                <span>{i.description.toString().substr(0, 9) + '...'}</span>
              </Tooltip>
            )} key={i.path}>
              <Tabs tabPosition='top'>
                <TabPane tab="文档" key="1">
                  {i.operations.map(j => (
                    <Tag style={{marginLeft: "5px", marginBottom: "5px"}} color="#87d068">{j.method}</Tag>
                  ))}
                  <Tooltip placement="topLeft" title="Path" arrowPointAtCenter>
                    <span>{i.baseUrl + i.path}</span>
                  </Tooltip>
                  <Table style={{marginTop: "5px"}} dataSource={i.operations[0].parameters} columns={paramColumns}/>
                </TabPane>
                <TabPane tab="调试" key="2">
                  <div>
                    <Select style={{width: '10%'}} defaultValue="GET" style={{width: 80}} onChange={this.onMethod}>
                      {i.operations.map(j => (
                        <Option value={j.method}>{j.method}</Option>
                      ))}
                    </Select>
                    <Input style={{width: '80%'}} placeholder={i.baseUrl + i.path + this.state.url} disabled={true}/>
                    <Button style={{marginLeft: "1px", width: '10%'}}
                            type="primary"
                            onClick={() => {
                              this.onSendingRequest(
                                i.path,
                                this.state.getParam,
                                this.state.header,
                              )
                            }
                            }>Send</Button>
                  </div>
                  <Tabs tabPosition='top'>
                    <TabPane tab="Headers" key="header">
                      <HeaderForm changeHeader={this.changeHeader} data={this.state.bodyType}/>
                    </TabPane>
                    <TabPane tab="Params" key="param">
                      <Table
                        rowSelection={rowSelection}
                        rowClassName={() => styles["editable-row"]}
                        components={components}
                        bordered
                        dataSource={entryList}
                        columns={columns}
                      />
                    </TabPane>
                    {/*<TabPane tab="Authorization" key="auth">*/}
                    {/*  <Select defaultValue="无需鉴权" style={{width: 120, marginBottom: '10px', marginLeft: '10px'}}*/}
                    {/*          onChange={this.onAuth}>*/}
                    {/*    <Option value='无需鉴权'>无需鉴权</Option>*/}
                    {/*    <Option value='简单鉴权'>简单鉴权</Option>*/}
                    {/*    <Option value='时间鉴权'>时间鉴权</Option>*/}
                    {/*  </Select>*/}
                    {/*  <Form layout="vertical" style={{marginLeft: '10px'}}>*/}
                    {/*    <Form.Item label="Key">*/}
                    {/*      <Input placeholder="Input Key"/>*/}
                    {/*    </Form.Item>*/}
                    {/*    <Form.Item label="Value">*/}
                    {/*      <Input placeholder="Input Value"/>*/}
                    {/*    </Form.Item>*/}
                    {/*    <Form.Item>*/}
                    {/*      <Button type="primary">确认</Button>*/}
                    {/*    </Form.Item>*/}
                    {/*  </Form>*/}
                    {/*</TabPane>*/}
                    <TabPane tab="Body" key="body">
                      <Radio.Group onChange={this.onBodyType} value={this.state.bodyType}
                                   style={{marginLeft: '5px', marginBottom: '10px'}}>
                        <Radio value='form-data'>form-data</Radio>
                        <Radio value='x-www-form-urlencoded'>x-www-form-urlencoded</Radio>
                        <Radio value='raw'>raw</Radio>
                      </Radio.Group>
                      <Select style={{width: '10%'}} defaultValue="JSON" style={{width: 80}}>
                          <Option value="JSON">JSON</Option>
                      </Select>
                      {
                        this.state.bodyType === 'raw' ? (
                          <MonacoEditor
                            height="200"
                            theme="vs"
                            language="json"
                            onChange={this.onBodyRaw}
                            options={{
                              contextmenu: false,
                              minimap: {enabled: false},
                              matchBrackets: true,
                            }}
                          />
                        ) : (
                          <div>
                            <PostFormBody changePostParam={this.changePostParam}/>
                          </div>
                        )
                      }
                    </TabPane>
                  </Tabs>
                  <Tabs tabPosition='top'>
                    <TabPane tab="Response" key="1">
                      <MonacoEditor
                        height="200"
                        theme="vs"
                        language="json"
                        value={JSON.stringify(this.state.placeHolder, null, '\t')}
                        options={{
                          contextmenu: false,
                          minimap: {enabled: false},
                          matchBrackets: true,
                        }}
                      />
                    </TabPane>
                  </Tabs>
                </TabPane>
              </Tabs>
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(ApiShow);
