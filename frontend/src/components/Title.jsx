import React from 'react'

const Title = ({ text1, text2 }) => {
    return (
        <div className='flex gap-2 w-full justify-center items-center mb-3 font-medium'>
            <h2>{text1}</h2>
            <h2 className='text-[#EC5228]'>{text2}</h2>
        </div>
    )
}

export default Title
