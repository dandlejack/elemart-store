import React, { useEffect, useState } from 'react';
// import {
//   IonContent,
//   IonHeader,
//   IonCard,
//   IonCardHeader,
//   IonPage,
// } from '@ionic/react';
import './Login.css';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
export const LoginPage: React.FC = () => {
  const [msg, setMsg] = useState('');
  // const { signIn, user } = useAuth();

  const onLogin = async (values: any) => {
    // setLoadingState(true);
    // try {
    //   const res = await signIn({
    //     username: values.username,
    //     password: values.password,
    //   });
    //   setMsg(res.msg);
    // } catch {
    //   console.log('Login Error');
    // } finally {
    //   setLoadingState(false);
    // }
    /*UserApi.postSignin(values)
      .then(response => {
        console.log(response);
        if (response.data.token) {
          Cookie.set('token', response.data.token);
          Cookie.set('user', JSON.stringify(response.data.user));
          window.location.reload();
        } else {
          setMsg(response.data.msg);
        }
        return response;
      })
      .catch(error => {
        console.log(error);
      });*/
  };

  return (
          <Form className={'login-form'} onFinish={onLogin}>
            <Form.Item
              label=""
              name="username"
              rules={[{ required: true, message: 'กรุณากรอก Username' }]}
            >
              <Input
                size="large"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                className={'uinput'}
              />
            </Form.Item>
            <Form.Item
              label=""
              name="password"
              rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน' }]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
                className={'uinput'}
              />
            </Form.Item>
            <div>
              <span style={{ fontSize: 16, color: 'red' }}>{msg}</span>
            </div>
            <Form.Item>
              <Button type="primary" className="buttonT" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
  );
};
