import { useContext } from "react"
import { UserContext } from "./context"

function CheckOutProgress(){
    const{ProgressBar}=useContext(UserContext)
    return <>
        <div className="flex justify-center items-center pt-5 duration-300">
            <span className="flex flex-col items-center">
            <div className={`h-15 w-15  rounded-full flex justify-center items-center text-2xl z-10 ${ProgressBar>0?'bg-blue-600 text-white':'bg-gray-300 border border-gray-400 text-gray-600'}`}>1</div>
            <p> Shipping Details</p>
            </span>

            <span className={`${ProgressBar>1?"bg-blue-600":"bg-gray-300 "} w-30 h-2 relative bottom-3 -mx-8`}>

            </span>

            <span className="flex flex-col items-center">
            <div className={`h-15 w-15  rounded-full flex justify-center items-center  text-2xl z-10 ${ProgressBar>1?'bg-blue-600 text-white':'bg-gray-300 border border-gray-400 text-gray-600'}`}>2</div>
            <p> Payment details</p>
            </span>

            <span className={`${ProgressBar>2?"bg-blue-600":"bg-gray-300"} w-30 h-2 relative bottom-3 -mx-8`}>

            </span>

            <span className="flex flex-col items-center">
            <div className={`h-15 w-15  rounded-full flex justify-center items-center  text-2xl z-10 ${ProgressBar>2?'bg-blue-600 text-white':'bg-gray-300 border border-gray-400 text-gray-600'}`}>3</div>
            <p>Ordered Placed </p>
            </span>
        </div>
    </>
}

export default CheckOutProgress