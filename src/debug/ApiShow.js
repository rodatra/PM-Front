import {Button, Col, Input, message, notification, Radio, Row, Select, Table, Tabs, Tag, Tooltip} from 'antd';
import React, {PureComponent} from 'react';
import {EditableCell, EditableFormRow} from './EditableCell'
import {PostFormBody} from './PostFormBody'
import {HeaderForm} from './HeaderForm'
import './ApiShow.css';
import {getResponse, postResponse} from "../util/APIUtils";
import {MonacoEditor} from "../util/MonacoEditor/MonacoEditor";
const { Option } = Select;
const {TabPane} = Tabs;

class ApiShow extends PureComponent {
    constructor(props) {
        super(props);
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
                        <Button style={{marginLeft: "20px", marginRight: "20px"}} type="danger" shape="circle"
                                icon="delete" onClick={() => {
                            this.handleDelete(record.key);
                        }}></Button>
                    ) : null,
            },
        ];
        this.state = {
            url: "",
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
            up: 1
        }
    };

    onBodyRaw = (newValue) => {
        this.setState({postParam: newValue}, () => {
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

    onUrlChange = (e) => {
        this.setState({
            url: e.target.value,
        },() => {
            console.log(this.state.url)
        })
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

    onSendingRequest = (path, param, header) => {
        if (this.state.methodUsed === 'GET') {
            let list = [path, this.state.methodUsed, header, param]
            getResponse(list)
                .then(res => {
                    if (res && res.code === 1) {
                        this.setState({placeHolder: JSON.parse(res.data)});
                    } else {
                        notification.error({
                            message: 'Something went wrong',
                            description: res && res.msg ? res.msg : 'Debug查询失败'
                        });
                    }
                })
        } else {
            let list = [path, this.state.methodUsed, header, param, this.state.postBody]

            postResponse(list).then(res => {
                if (res && res.code === 0) {
                    this.setState({placeHolder: JSON.parse(res.data)});
                } else {
                    notification.error({
                        message: 'Something went wrong',
                        description: res && res.msg ? res.msg : 'Debug查询失败'
                    });
                }
            })
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

        return (
                <Tabs tabPosition='top'>
                <TabPane tab="调试" key="2">
                    <div>
                        <Select style={{width: '10%'}} defaultValue="GET" style={{width: 80}}
                                onChange={this.onMethod}>
                            {['GET', 'POST'].map(j => (
                                <Option value={j.method}>{j.method}</Option>
                            ))}
                        </Select>
                        <Input style={{width: '80%'}} placeholder="Url" onChange={this.onUrlChange}/>
                        <Button style={{marginLeft: "1px", width: '10%'}}
                                type="primary"
                                onClick={() => {
                                    this.onSendingRequest(
                                        this.state.url,
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
                                rowClassName={() => "editable-row"}
                                components={components}
                                bordered
                                dataSource={entryList}
                                columns={columns}
                            />
                        </TabPane>
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
                                        language="c"
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
                                language="c"
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
        );
    }
}

export default (ApiShow);
