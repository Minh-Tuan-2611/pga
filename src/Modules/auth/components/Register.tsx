import React, { useEffect, useState } from 'react'
import {
  Form,
  Input,
  Select,
  Checkbox,
  Button,
} from 'antd';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { ROUTE } from '../../Link/Link';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default function Register(props:any) {

  var [location,setLocation] = useState([]);

  var [city,setCity] = useState([]);

  var [id,setId] = useState(null)

  const [form] = Form.useForm();

  const getLocation = ()=>{
    var promise = axios.get('http://api.training.div3.pgtest.co/api/v1/location');
    promise.then((result)=>{
      setLocation(result.data.data);
    })

    promise.catch((error)=>{

    })
  }

  const getCity = ()=>{
    var promise = axios.get(`http://api.training.div3.pgtest.co/api/v1/location?pid=${id}`);
    promise.then((result)=>{
      setCity(result.data.data);
    })
  }

  useEffect(()=>{
    getLocation();
  },[])

  useEffect(()=>{
    getCity();
  },[id]);

  const onFinish = (values: any) => {
    props.onRegister(values);
    console.log('Received values of form: ', values);
  };

  return (
    <div className="container">
      <h3 className="text-center mt-5 mb-5">Register</h3>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
        }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
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
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="fullname"
          label="Fullname"
          rules={[
            {
              required: true,
              message: 'Please input your fullname !',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: 'Please select gender!' }]}
        >
          <Select placeholder="select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="National"
          label="National"
          rules={[{ required: true, message: 'Please select national !' }]}
        >
          <Select onChange={(event:any) =>{
            setId(event)
          }}placeholder="select your national">
            {location.map((item:any,index) => {
              return <Option value={item.id} key={index} >{item.name}</Option>
            })}
          </Select>
        </Form.Item>

        <Form.Item
          name="City"
          label="City"
          rules={[{ required: true, message: 'Please select city !' }]}
        >
          <Select placeholder="select your city">
            {city.map((item:any,index) => {
              return <Option key={index}>{item.name}</Option>
            })}
          </Select>
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <NavLink to="">agreement</NavLink>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          Return to <NavLink to={ROUTE.login}>Login !</NavLink>
          <br />
          <Button type="primary" htmlType="submit" className="mt-4">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
