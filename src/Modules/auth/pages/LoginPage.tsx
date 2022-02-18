import React from 'react'
import LoginForm from '../components/LoginForm'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../Link/Link';
import { HandleLogin } from '../../Handle/HandleLogin';

export default function LoginPage(props: any) {

  let navigate = useNavigate();

  const login = async (values: any) => {
    await HandleLogin({
      email: values.email,
      password: values.password,
    })
    try {
      navigate(ROUTE.home)
    }
    catch (error) {

    }
  }
  return (
    <LoginForm onLogin={login} />
  )
}
