import { useState, useEffect } from "react";
import validator from 'validator'

export function UserFormValidator() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isValid, setIsValid] = useState(false);

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
    const isNameValid = checkNameValid(values.name);
    const isEmailValid = validator.isEmail(values.email);
    const isPasswordValid = values.password.length >= 8;

    setErrors({
      name: isNameValid ? '' : 'Имя может содержать только латиницу, кириллицу, пробел или дефис',
      email: isEmailValid ? '' : 'Введён не корректный e-mail',
      password: isPasswordValid ? '' : 'Пароль должен содержать минимум 8 знаков'
    });

    setIsValid(isNameValid && isEmailValid && isPasswordValid);
  }, [values])

  return { values, errors, isValid, handleChange };
}
