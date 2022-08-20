import { useState } from 'react'

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const reset = () => setValues(initialState);

  const handleInputChange = ({ target }) => {
    const { name: key, value } = target;
    setValues({
      ...values,
      [key]: value,
    })
  };

  return [values, handleInputChange, reset];
}
