import React from 'react'

function Loading() {
  return (
     <div className="min-h-[70vh] flex items-center justify-center w-full h-full">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-cyan-600 border-t-transparent animate-spin"></div>
      </div>
    </div>
  )
}

export default Loading