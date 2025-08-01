import { useContext, useState } from "react"
import { UserContext } from "./context"
import CheckOutProgress from "./CheckOutProgress";
import { Outlet } from "react-router-dom";


function CheckOut(){
   
    return(
    <>
        <div className="min-h-[50vh] bg-neutral-50">
            <CheckOutProgress />
            <Outlet/>
        </div>
    </>
    )
}

export default CheckOut