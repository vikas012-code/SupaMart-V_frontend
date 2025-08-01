import { useContext } from "react"
import { UserContext } from "./context"
import OrderPlace from "../assets/OrderPlace.gif"

function OrderedPlaced(){
        // let {ProgressBar,setProgressBar}=useContext(UserContext)
    return<>
    <div className="flex justify-center p-10">
        <img src={OrderPlace} alt="" />
    </div>
    </>
}

export default OrderedPlaced