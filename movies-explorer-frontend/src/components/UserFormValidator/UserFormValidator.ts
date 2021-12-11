import { useState } from "react";
import validator from 'validator'

interface IUserData {
  name: string,
  email: string,
  password: string,
}

export function UserFormValidator() {
  const [values, setValues] = useState<IUserData>({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (evt: any) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
  };

  function isValidName() {
    if (values.name !== '') {
      const regex = /[^a-zа-я\-ёЁ\s]/i;
      return !regex.test(values.name) && values.name.length > 0;
    } else {
      return true
    }
  }

  function isValidEmail() {
    if (values.email !== '') {
      return validator.isEmail(values.email)
    } else {
      return true
    }
  }

  function isValidPassword() {
    if (values.password !== '') {
      return values.password.length >= 8
    } else {
      return true
    }
  }

  const validators = {
    isValidName: isValidName(),
    isValidEmail: isValidEmail(),
    isValidPassword: isValidPassword()
  }

  function isValidForm() {
    return (isValidName() && isValidEmail() && isValidPassword())
  }

  return { values, validators, handleChange, isValidForm };
}
