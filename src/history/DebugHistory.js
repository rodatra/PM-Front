import {Button, Col, Input, message, notification, Radio, Row, Select, Table, Tabs, Tag, Tooltip} from 'antd';
import React, {PureComponent} from 'react';
import {getDebugHistory} from "../util/APIUtils";


class DebugHistory extends PureComponent {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'Method',
                dataIndex: 'method',
                width: '10%',
            },
            {
                title: 'Url',
                dataIndex: 'url',
                width: '77%',
            },
            {
                title: 'Operation',
                dataIndex: 'operation',
                render: (text, record) =>
                    this.state.entryList.length >= 1 ? (
                        <Button style={{marginLeft: "20px", marginRight: "20px"}} shape="circle"
                                icon="delete" onClick={() => {
                            this.restore(record.key);
                        }}></Button>
                    ) : null,
            },
        ];
        this.state = {
            entryList: [
                {
                    method: '',
                    url: '',
                }
            ],
        }
        this.loadDebugHistory = this.loadDebugHistory.bind(this);
    };

    componentDidMount() {
        this.loadDebugHistory();
    }

    loadDebugHistory = () => {
        getDebugHistory()
            .then(res => {
                let arr = []
                if (res && res.code === 1){
                    res.data.map(item => {
                        let ob = JSON.parse(item.jsonParam);
                        arr.push({
                            method: ob.get("method"),
                            url: ob.get("url"),
                        })
                    })
                    this.setState({
                        entryList: arr,
                    });
                }
            }).catch(error => {
            if(error.status === 404) {
                this.setState({
                    notFound: true,
                    isLoading: false
                });
            } else {
                this.setState({
                    serverError: true,
                    isLoading: false
                });
            }
        });
    }

    restore = (postParam) => {

    }

    render() {
        const {entryList} = this.state;
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

        return (
            <Table
                bordered
                dataSource={entryList}
                columns={columns}
            />
        );
    }
}

export default (DebugHistory);
