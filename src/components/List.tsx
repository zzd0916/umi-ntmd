import React from 'react'
import { Table, Button } from 'antd';

interface IProps {
  columns: Array<object>;
  data: Array<object>;
}

export interface IColumns {
  title: string;
  dataIndex: string;
  key: string;
  render?: (text: any) => JSX.Element;
}

class List extends React.Component<IProps>{
  
  edit = (text) => {
    console.log(text)
  }

  delete = (text) => {
    console.log(text)
  }

  render() {

    const { data } = this.props
    const columns:Array<IColumns>  = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
      },
      {
        title: '值',
        dataIndex: 'value',
        key: 'value',
      },
      {
        title: '扩展数据',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '描述',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: '操作',
        render: (text ) => (
          <span>
            <Button onClick={ () => this.edit(text)}>编辑</Button>
            <Button onClick={ () => this.delete(text)}>删除</Button>
          </span>
        ),
      },
    ];

    return (
      <div>
        <Table
          columns={columns}
          rowKey='value'
          pagination={{ position: 'bottomRight' }}
          dataSource={data}
        />
      </div>
    )
  }
}

export default List