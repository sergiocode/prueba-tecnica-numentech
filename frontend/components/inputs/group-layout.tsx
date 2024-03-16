import React from 'react'

type Props = {
    children: React.ReactNode
}

const GroupLayout = ({ children }: Props) => {
    return (
        <div className='flex flex-col justify-start mb-3'>
            {children}
        </div>
    )
}

export default GroupLayout