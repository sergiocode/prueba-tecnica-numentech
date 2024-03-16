import React from 'react'

type Props = {
  value: string;
  id: string;
  name: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler;
  // onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

const InputTextarea = ({ value, id, name, placeholder, onChange }: Props) => {
  return (
    <textarea
      value={value}
      id={id}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className='border rounded-lg p-2 h-44 font-light focus-visible:outline outline-emerald-500 outline-offset-1 outline-1'
    />
  )
}

export default InputTextarea