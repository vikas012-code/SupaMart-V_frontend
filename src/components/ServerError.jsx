import React from 'react'

function ServerError() {
  return ( 
          <div className='min-h-[70vh] flex justify-center items-center bg-white'>
            <div className="animate-fade-in-down bg-white border border-red-200 shadow-lg rounded-xl p-8 max-w-md text-center">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
                <h1 className="text-2xl font-semibold text-red-700 mb-2">500 | Server Error</h1>
                <p className="text-red-600 mb-6">
                  Oops! Something went wrong on our end. Please try again later.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                >
                  Retry
                </button>
          </div>
          </div>
  )
}

export default ServerError