import React, { useState } from 'react'
import { Layout, Menu, BackTop } from 'antd';
import { Link } from 'umi';
import TopBar from './TopBar'
import HeaderBar from './HeaderBar'
import {
    HomeOutlined,
    MailOutlined,
    SettingOutlined,
    BarChartOutlined,
    AppstoreAddOutlined,
    DotChartOutlined
} from '@ant-design/icons';

const { SubMenu } = Menu;

import './layout.less'

const { Sider, Content } = Layout;

const BaseLayout = (props: any) => {
    const [collapsed, setCollapsed] = useState(false);

    function toggle() {
        setCollapsed(!collapsed)
    };

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        <Link to="/">系统首页</Link>
                    </Menu.Item>
                    <SubMenu key="system" icon={<SettingOutlined />} title="系统管理">
                        <Menu.Item key="system-param"><Link to="/system/param">参数设置</Link></Menu.Item>
                        <Menu.Item key="system-dictionary"><Link to="/system/dictionary">字典管理</Link></Menu.Item>
                        <Menu.Item key="system-role"><Link to="/system/role">角色管理</Link></Menu.Item>
                        <Menu.Item key="system-user"><Link to="/system/user">用户管理</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="opear" icon={<BarChartOutlined />} title="运营管理">
                        <Menu.Item key="5">商户管理</Menu.Item>
                        <SubMenu key="sub2" icon={<MailOutlined />} title="终端管理">
                            <Menu.Item key="5">终端管理</Menu.Item>
                            <Menu.Item key="5">活动记录</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="7">检测用户管理</Menu.Item>
                        <Menu.Item key="8">产品服务管理</Menu.Item>
                        <Menu.Item key="8">收支管理</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" icon={<DotChartOutlined />} title="数据分析">
                        <Menu.Item key="5">检测记录</Menu.Item>
                        <Menu.Item key="6">报告查询</Menu.Item>
                        <Menu.Item key="7">多动作记录</Menu.Item>
                        <Menu.Item key="8">多动作报告</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub1" icon={<AppstoreAddOutlined />} title="开发管理">
                        <Menu.Item key="5">健康参数配置</Menu.Item>
                        <Menu.Item key="6">动作算法</Menu.Item>
                        <Menu.Item key="7">版本管理</Menu.Item>
                        <Menu.Item key="8">检测分析</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <HeaderBar onClickHander={toggle} collapsed={collapsed} />
                <TopBar />
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '0px 16px 24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {props.children}
                </Content>
            </Layout>
            <BackTop />
        </Layout>
    );
}

export default BaseLayout