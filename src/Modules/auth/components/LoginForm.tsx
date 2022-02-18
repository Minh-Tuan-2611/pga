import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { ROUTE } from '../../Link/Link';

export default function LoginForm(props:any) {
  const onFinish = (values: any) => {
    props.onLogin(values);
    console.log('Received values of form: ', values);
    localStorage.setItem('account', JSON.stringify(values));
  };

  var account = localStorage.getItem('account');
  console.log(account);
  return (
    <div className="container">
      <h3 className="mt-5 mb-5 text-center">Login</h3>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <NavLink className="login-form-forgot" to="/">
            Forgot password
          </NavLink>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button mb-3">
            Log in
          </Button>
          <br/>
          Or <NavLink to={ROUTE.register}>register now!</NavLink>
        </Form.Item>
      </Form>
    </div>
  );
  // if(account!==null){
  // }
  // else if(account===null) {
  //   window.location.pathname = '/home'
  //   return <></>
  // }

}


