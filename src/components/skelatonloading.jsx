import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function SkeletonLoading() {

    return (
      
        <div className='w-64 h-84 mx-2 flex flex-col gap-2 shadow mb-4'>
          <div className='w-full h-[65%]'>
            {<Skeleton className='w-full h-full'/>}
          </div>
          <div className='w-full h-[35%] flex flex-col gap-2 items-center'>
            <p className='w-[94%] h-[45%]'> {<Skeleton className='w-full h-full'/>}</p>
            <div className='w-full h-[40%] flex gap-1 justify-center'>
                <div className='w-[46%]'>{<Skeleton className='w-full h-full'/>}</div>
                <div className='w-[46%]'>{<Skeleton className='w-full h-full'/>}</div>
            </div>
          </div>
      </div>
      
    )
  }