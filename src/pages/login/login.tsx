import React, { Component } from 'react'
import logoSrc from '@/assets/images/logo-login.png'
import { Form, Input, Button, Radio, message, Modal } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { history } from 'umi'
import { Store } from 'antd/es/form/interface';
import http from '@/utils/http'
import { setLogin } from '@/utils/auth'

import DictionaryAddModel from '@/components/DictionaryAddModel'
import './login.less'
import UserModel from '@/models/user'

class Login extends Component {

  state = {
    formList: [
      {}
    ],
    modalVisible: false
  }

  setModalSHow = () => {
    this.setState({
      modalVisible : true
    })
  }

  onFinish = (values: Store) : void => {
    http.post('/api/account/signIn',{
      data: {
        name: values.username,
        pwd: values.password
      }
    }).then( res => {
      if(res.data && res.data._id) {
        setLogin(res.data)
        message.success('log in success')
        history.push('/')
      }
    })
  };

  render() {
    const { modalVisible } = this.state;
    return (
      <div className="login">
         <div className="login-lang">
            <label className="lang-label">语言切换：</label>
            <Radio.Group className="lang-wrapper" defaultValue="zh-CH" size="small">
                <Radio.Button value="zh-CH">中文</Radio.Button>
                <Radio.Button value="en-US">English</Radio.Button>
                <Radio.Button value="ja-JP">日语</Radio.Button>
            </Radio.Group>
        </div>
        <div className="login-box">
          <DictionaryAddModel visible={this.state.modalVisible} title="新增" />
          <button onClick={this.setModalSHow.bind(this)}>设置</button>
          <img src={logoSrc} width="100%" alt="" />
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={ this.onFinish }
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                autoComplete="off"
              />
            </Form.Item>
            {/* <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a className="login-form-forgot" href="">Forgot password</a>
            </Form.Item> */}
            {/* <Form.Item> */}
            <Button type="primary" htmlType="submit" className="login-form-button"> Log in </Button>
          {/* Or <a href="" disabled>register now!</a> */}
            {/* </Form.Item> */}
          </Form>
        </div>
      </div>
    )
  }

}
export default Login 