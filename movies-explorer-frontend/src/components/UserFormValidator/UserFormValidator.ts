import { useState, useEffect } from "react";
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
  const [errors, setErrors] = useState<IUserData>({
    name: '',
    email: '',
    password: ''
  });
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleChange = (evt: any) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
  };

  function checkNameValid(name: string) {
    const regex = /[^a-zа-я\-ёЁ\s]/i;
    return !regex.test(name) && name.length > 0;
  }

  useEffect(() => {
    const isNameValid: boolean = checkNameValid(values.name);
    const isEmailValid: boolean = validator.isEmail(values.email);
    const isPasswordValid: boolean = values.password.length >= 8;

    setErrors({
      name: isNameValid ? '' : 'Имя может содержать только латиницу, кириллицу, пробел или дефис',
      email: isEmailValid ? '' : 'Введён не корректный e-mail',
      password: isPasswordValid ? '' : 'Пароль должен содержать минимум 8 знаков'
    });

    setIsValid(isNameValid && isEmailValid && isPasswordValid);
  }, [values])

  return { values, errors, isValid, handleChange };
}
