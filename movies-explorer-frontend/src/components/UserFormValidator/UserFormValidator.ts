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

  function isValidNameLength() {
    if (values.name !== '') {
      return values.name.length <= 30 && values.name.length >= 2;
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
    isValidNameLength: isValidNameLength(),
    isValidEmail: isValidEmail(),
    isValidPassword: isValidPassword()
  }

  function isValidForm(inputNamesArray: string[]) {
    return inputNamesArray.every((inputName: string) => {
      if (inputName === 'name') {
        return isValidName() && isValidNameLength();
      } else if (inputName === 'email') {
        return isValidEmail() && values.email.length > 0;
      } else if (inputName === 'password') {
        return isValidPassword() && values.password.length > 0;
      }
      return true
    })
  }

  return { values, setValues, validators, handleChange, isValidForm };
}
