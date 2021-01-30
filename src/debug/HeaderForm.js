import React, {PureComponent} from "react";
import {Button, notification, Table} from "antd";
import {EditableCell, EditableFormRow} from "./EditableCell";
import "./ApiShow.css";

export class HeaderForm extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Key',
        dataIndex: 'keyAlias',
        width: '45%',
        editable: true,
      },
      {
        title: 'Value',
        dataIndex: 'value',
        width: '45%',
        editable: true,
      },
      {
        title: 'Operation',
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.headerList.length >= 1 ? (
            <Button style={{marginLeft: "20px", marginRight: "20px"}} type="danger" shape="circle" icon="delete" onClick={() => {
              this.handleDelete(record.key);
            }}></Button>
          ) : null,
      },
    ];
    this.state = {
      legacy: '',
      bodyType: this.props.data,
      note: -1,
      up: 4,
      postParam: {},
      headerList: [
        {
          key: 'k' + 0,
          keyAlias: 'Accept',
          value: '*/*',
          chosen: true,
        },
        {
          key: 'k' + 1,
          keyAlias: 'Accept-Encoding',
          value: 'deflate, br',
          chosen: true,
        },
        {
          key: 'k' + 2,
          keyAlias: 'Connection',
          value: 'keep-alive',
          chosen: true,
        },
        {
          key: 'k' + 3,
          keyAlias: '',
          value: '',
          chosen: true,
        },
      ],
      selectedRowKeys: ['k0', 'k1', 'k2'],
      count: 4,
    }
  };

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.legacy){
    //   let arr = []
    //   let result = Object.keys(nextProps.legacy).map((key) => [key, nextProps.legacy[key]]);
    //   for (let i = 0; i< result.length; i++){
    //     arr.push({
    //       key: 'k' + this.state.count+i,
    //       keyAlias: result[i][0],
    //       value: result[i][1],
    //       chosen: true,
    //     })
    //   }
    //   this.setState({
    //     headerList: arr
    //   })
    // }
    if (nextProps.data !== this.state.legacy){
      this.setState({
        bodyType: nextProps.data,
        legacy: nextProps.data
      }, () => {
        this.onBodyTypeChange()
      });
    }
  }

  onBodyTypeChange = () => {
    const {up, headerList, bodyType, note, selectedRowKeys} = this.state;
    let newData
    if (bodyType === "form-data") {
      newData = {
        key: 'k' + up,
        keyAlias: 'Content-Type',
        value: 'multipart/form-data',
        chosen: true,
      };
    } else if (bodyType === "x-www-form-urlencoded"){
      newData = {
        key: 'k' + up,
        keyAlias: 'Content-Type',
        value: 'application/x-www-form-urlencoded',
        chosen: true,
      };
    } else if (bodyType === "raw"){
      newData = {
        key: 'k' + up,
        keyAlias: 'Content-Type',
        value: 'application/json',
        chosen: true,
      };
    }
    let newDataSource = [...headerList, newData].filter(item => item.key !== ('k'+note))
    let len = newDataSource.length
    this.setState({
      headerList: newDataSource,
      selectedRowKeys: [...selectedRowKeys, ('k'+up)].filter(item => item !== ('k'+note)),
      note: up,
      count: len,
      up: up + 1,
    }, () => {
      if (this.state.bodyType !== "") {
        this.reArrange()
      }
      this.handleAdd()
    });
  }

  reArrange = () => {
    const {count, headerList, selectedRowKeys} = this.state;
    const index = headerList.findIndex(item => item.keyAlias === '');
    this.setState({
      headerList: headerList.splice(index, 1),
      selectedRowKeys: selectedRowKeys.filter(item => item !== index),
      count: count-1
    });

  }

  handleDelete = key => {
    const {count, headerList, selectedRowKeys} = this.state;
    if (headerList.length === 1) {
      notification.warn({
        message: '目前只有一项',
        description: '请至少保留一项',
        onClick: () => {
        },
      });
      return
    }
    this.setState({
      headerList: headerList.filter(item => item.key !== key),
      selectedRowKeys: selectedRowKeys.filter(item => item !== key),
      count: count - 1
    }, () => {
      this.updateHeader()
    });
  };

  handleSave = row => {
    const newData = [...this.state.headerList];
    const {selectedRowKeys} = this.state;
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    row.chosen = true;
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({
      headerList: newData,
      selectedRowKeys: Array.from(new Set([...selectedRowKeys, item.key])),
    }, () => {
      this.updateHeader()
      if (this.state.bodyType === "") {
        if (index === this.state.count - 1) {
          this.handleAdd();
        }
      } else {
        if (index === this.state.count - 2) {
          this.handleAdd();
        }
      }
    });
  };


  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({selectedRowKeys}, () => {
      this.updateHeader()
    });
  };

  handleAdd = () => {
    const {up, count, headerList} = this.state;
    const newData = {
      key: 'k' + up,
      keyAlias: '',
      value: '',
      chosen: false,
    };
    this.setState({
      headerList: [...headerList, newData],
      count: count + 1,
      up: up + 1,
    }, () => {
      this.updateHeader()
    });
  };

  updateHeader = () => {
    const {headerList, selectedRowKeys} = this.state;
    let json = {};

    for (let i = 0; i < selectedRowKeys.length; i++) {
      headerList.map(j => {
        if (j.key === selectedRowKeys[i])
          json[j.keyAlias] = j.value
      })
    }

    this.setState({
      postParam: json
    })
    this.props.changeHeader(json)
  }

  render() {
    const {headerList} = this.state;
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

    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <Table
        rowSelection={rowSelection}
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={headerList}
        columns={columns}
      />
    )
  }
}
