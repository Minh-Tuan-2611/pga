import React from 'react'
import { useNavigate } from 'react-router-dom'
import { HandleRegister } from '../../Handle/HandleRegister';
import { ROUTE } from '../../Link/Link';
import Register from '../components/Register'

export default function RegisterPage() {

  var navigate = useNavigate();

  var register = async (value: any) => {
    await HandleRegister({
      email: value.email,
      password: value.password,
      repeatPassword: value.confirm,
      name: value.fullname,
      gender: value.gender,
      region: value.National,
      state: value.City
    })
    try {
      navigate(ROUTE.login);
    } 
    catch (error) {
      alert('Fail !');
    }
  }

  return (
    <Register onRegister={register} />
  )
}
