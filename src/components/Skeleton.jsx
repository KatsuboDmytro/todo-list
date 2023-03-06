import React from 'react'
import ContentLoader from "react-content-loader"
export const Skeleton = () => {
  return (
    <>
  <ContentLoader 
    speed={2}
    width={1000}
    height={40}
    viewBox="0 0 1000 40"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">

    <rect x="10" y="10" rx="0" ry="0" width="200" height="25" /> 
    
  </ContentLoader>
    </>
  )
}
