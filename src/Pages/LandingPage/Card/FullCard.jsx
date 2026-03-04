import React from 'react'
import ImageCard from './ImageCard'
import InfoCard from './InfoCard'

const FullCard2 = () => {
  return (
    <div  className='  rounded-2xl shadow-xl flex flex-col md:flex-row md:mx-32 mx-3 my-5 m-auto  ' >
      <ImageCard/>
      <InfoCard/>
    </div>
  )
}

export default FullCard2
