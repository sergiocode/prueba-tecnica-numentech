import React from 'react'

type Props = {
  title: string;
}

const TitleH1 = ({ title }: Props) => {
  return (
    <h1 className='text-3xl text-slate-800'>{title}</h1>
  )
}

export default TitleH1