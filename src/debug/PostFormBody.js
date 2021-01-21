import React, {PureComponent} from "react";
import {Button, notification, Table} from "antd";
import {EditableCell, EditableFormRow} from "./EditableCell";
import styles from "./ApiShow.css";

export class PostFormBody extends PureComponent {
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
          this.state.entryList.length >= 1 ? (
            <Button style={{marginLeft: "20px", marginRight: "20px"}} type="danger" shape="circle" icon="delete" onClick={() => {
              this.handleDelete(record.key);
            }}></Button>
          ) : null,
      },
    ];
    this.state = {
      up: 1,
      postParam: "",
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
    }
  };

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

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({selectedRowKeys}, () => {
      this.updateURL()
    });
  };

  updateURL = () => {
    const {entryList, selectedRowKeys} = this.state;
    let json = {};

    for (let i = 0; i < selectedRowKeys.length; i++) {
      entryList.map(j => {
        if (j.key === selectedRowKeys[i])
          json[j.keyAlias] = j.value
      })
    }

    this.setState({
      postParam: json
    })
    this.props.changePostParam(json)
  }

  handleSave = (row) => {
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

    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <Table
        rowSelection={rowSelection}
        components={components}
        rowClassName={() => styles["editable-row"]}
        bordered
        dataSource={entryList}
        columns={columns}
      />
    )
  }
}
