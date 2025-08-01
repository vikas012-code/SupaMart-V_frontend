import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function SkeletonLoading() {

    return (
      
        <div className='w-64 max-lg:w-40 h-80 max-lg:h-50 ml-4 flex flex-col gap-2 max-lg:gap-1 shadow mb-4 rounded-lg'>
          <div className='w-full h-[65%]'>
            {<Skeleton className='w-full h-full'/>}
          </div>
          <div className='w-full h-[35%] flex flex-col gap-2 max-lg:gap-1 items-center'>
            <p className='w-[94%] h-[45%]'> {<Skeleton className='w-full h-full'/>}</p>
            <div className='w-full h-[40%] flex gap-1 justify-center'>
                <div className='w-[46%]'>{<Skeleton className='w-full h-full'/>}</div>
                <div className='w-[46%]'>{<Skeleton className='w-full h-full'/>}</div>
            </div>
          </div>
      </div>
      
    )
  }