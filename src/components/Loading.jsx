import React from 'react'

function Loading() {
  return (
     <div className="min-h-[70vh] flex items-center justify-center w-full h-full">
      <div className="relative">
        <p className=' text-2xl text-blue-500 mb-2 ml-2'>Loading...</p>
        <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div> 
        </div>
    </div>
  )
}

export default Loading