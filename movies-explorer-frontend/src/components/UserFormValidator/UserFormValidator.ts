import { useState } from "react";
import validator from 'validator'

interface IUserData {
  name?: string,
  email?: string,
  password?: string,
}

export function UserFormValidator() {
  const [values, setValues] = useState<IUserData>({});

  const handleChange = (evt: any) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
  };

  function isValidName(name: string) {
    const regex = /[^a-zа-я\-ёЁ\s]/i;
    return !regex.test(name) && name.length > 0;
  }

  function isValidEmail(email: string) {
    return validator.isEmail(email)
  }

  function isValidPassword(password: string) {
    return password.length >= 8
  }

  return { values, isValidName, isValidEmail, isValidPassword, handleChange };
}
