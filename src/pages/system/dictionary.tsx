import React, { Component } from 'react';
import { DictionaryModelState, ConnectRC, Loading, connect } from 'umi';
import { Tabs, Button, Menu } from 'antd'
import ITabs from '@/models/system/dictionary'
import List from '@/components/List.tsx'
import Region from './region'
import http from '@/utils/http'

import './system.less'

export interface IColumns {
  title: string;
  dataIndex: string;
  key: string;
  render?: (text: any) => JSX.Element;
}

interface PageProps {
  dictionary: DictionaryModelState;
  loading: boolean;
  dispatch: Function;
}

interface ISearch {
  mark: string;
  ps: number;
  p: number;
}

export interface ITabs {
  name: string;
  value: string;
  desc: string;
}

type Ttab = 'memberSource' | 'franchiserType' | 'region' | 'scene' ;

interface IState {
  list: Array<object>;
  search: ISearch
  count: number;
  tabs: ITabs;
  tab: Ttab;
}

const { TabPane } = Tabs;
const { SubMenu } = Menu;

class Dictionary extends Component<ConnectRC<PageProps, IState>> {
   // submenu keys of first level
   rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

   onOpenChange = openKeys => {
     const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
     if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
       this.setState({ openKeys });
     } else {
       this.setState({
         openKeys: latestOpenKey ? [latestOpenKey] : [],
       });
     }
   };

  // state = {
  //   tabs: [
  //     {name: '会员来源', value: 'memberSource', 'desc':'检测用户来源'},
  //     {name: '合作商类型', value: 'franchiserType', 'desc':'授权合作商类型'},
  //     {name: '地区', value: 'region', 'desc':'系统支持的国家地区选择'},
  //     {name: '场景', value: 'scene', 'desc':'采集客户端使用场景'},
  //   ],
  //   openKeys: ['sub1'],
  //   list: [],
  //   search: {
  //     mark: 'memberSource',
  //     ps:10,
  //     p:1
  //   },
  //   count: 0
  // }

  state = {
    openKeys: ['sub1'],
  }
 
  UNSAFE_componentWillMount () {
    this.getList();
  }
  
  getList() {
    const { dictionary } = this.props;
    const { ps, p, mark } = dictionary;
    console.log(dictionary, p )
    let search = {
      ps,
      p,
      mark
    }
    console.log(search)
    http.get('/api/system/dictionary/list', {
      params:search
    })
    .then( (res: object ) => {
      this.props.dispatch({
        type: 'dictionary/setList',
        payload: {data: {list: res.list}}
      })
    })
  }

  tabChange(k:object) {
    const { dictionary } = this.props;
    const { search } = dictionary;
    this.props.dispatch({
      type: 'dictionary/setMark',
      payload: { data: {mark: k.key}}
    })
    this.getList()
   console.log(dictionary.mark)
  }

  render() {
    const { dictionary } = this.props;
    const { tabs, tab, search, list, ps, p, count, mark } = dictionary;
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
        render: (text) => (
          <span>
            <Button onClick={ () => this.edit(text)}>编辑</Button>
            <Button onClick={ () => this.delete(text)}>删除</Button>
          </span>
        ),
      },
    ];
   
    return (
      <div className="dictionary"> 
        <Menu
          onClick = { this.tabChange.bind(this) }
          mode="inline"
          className="left-content"
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
          style={{ width: 256 }}
        >
          {
            tabs.map( (t:ITabs) => {
              return ( 
                <Menu.Item key={t.value} className="m-item" > 
                  {t.name} 
                  <p className="m-desc">{t.desc}</p>
                </Menu.Item>
               )
            })
          }
        </Menu>

        {/* <div className="r-content">
          { 
            mark === 'region' ? <Region /> : <List columns={columns} data={list} />    
          }
        </div> */}
      
      </div>
    );
  }
}

export default connect(({ dictionary, loading }: { dictionary: DictionaryModelState; loading: Loading }) => ({
  dictionary,
  loading: loading.models.dictionary,
}))(Dictionary);