import {Button, Table} from 'antd';
import React, {PureComponent} from 'react';
import {getDebugHistory} from "../util/APIUtils";


class DebugHistory extends PureComponent {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'Method',
                dataIndex: 'method',
                key: 'method',
                width: '10%',
            },
            {
                title: 'Url',
                dataIndex: 'url',
                key: 'url',
                width: '77%',
            },
            {
                title: 'Operation',
                dataIndex: 'operation',
                key: 'operation',
                render: (text, record) =>
                    this.state.entryList.length >= 1 ? (
                        <Button style={{marginLeft: "20px", marginRight: "20px"}} shape="circle"
                                icon="rollback" onClick={() => {
                            this.restore(record.key);
                        }}></Button>
                    ) : null,
            },
        ];
        this.state = {
            entryList: [],
            data: []
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
                    for (let i = 0; i< res.data.length; i++){
                        let ob = JSON.parse(res.data[i].jsonParam);
                        arr.push({
                            // key: res.data[i].id,
                            key: i,
                            method: ob.method,
                            url: ob.url,
                        })
                    }
                    this.setState({
                        data: res.data,
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
        this.props.history.push("/", this.state.data[postParam]);
    }

    render() {
        const {entryList} = this.state;

        return (
            <Table
                bordered
                dataSource={entryList}
                columns={this.columns}
            />
        );
    }
}

export default (DebugHistory);
