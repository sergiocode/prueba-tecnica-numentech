import React from 'react'

type Props = {
  value: string;
  id: string;
  name: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const InputDatetime = ({ value, id, name, placeholder, onChange }: Props) => {
  return (
    <input
      type="datetime-local"
      value={value}
      id={id}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className='border rounded-lg p-2 font-light focus-visible:outline outline-emerald-500 outline-offset-1 outline-1'
    />
  )
}

export default InputDatetime