import React from 'react'

type Props = {
  text: string;
  htmlFor: string;
}

const Label = ({ text, htmlFor }: Props) => {
  return (
    <label htmlFor={htmlFor} className='font-light text-slate-700'>
      {text}
    </label>
  )
}

export default Label