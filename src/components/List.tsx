import React from 'react'
import { Table } from 'antd';

interface IProps {
  columns: Array<object>;
  data: Array<object>;
}

class List extends React.Component<IProps>{

  render() {
    const { columns, data } = this.props
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