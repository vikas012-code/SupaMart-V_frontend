import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "./context"

function ShippingDetails(){
    let {ShippingAddress,setShippingAddress,ProgressBar,setProgressBar}=useContext(UserContext)
    setProgressBar(ProgressBar=1)
    const navigate=useNavigate()
    return<>
        <div className="flex flex-col items-center mt-5">

            <p className="text-2xl mb-5">Delivery Address</p>
            <form className=" shadow-lg shadow-gray-400 flex flex-col p-5 gap-2 rounded-lg mb-5 w-[60vw] max-sm:w-[90vw]" onSubmit={(e)=>{
                e.preventDefault()
                navigate("/checkout/PaymentDetails")
                setProgressBar(ProgressBar+1)
                }} >
                <label htmlFor="FullName">FullName <span className="text-red-600">*</span></label>
                <input className=" border p-1 rounded-lg" type="text" name="FullName" value={ShippingAddress.fullName} required onChange={(e)=>{
                    setShippingAddress({...ShippingAddress, fullName:e.target.value})
                }}/>
                <label htmlFor="StreetAddress">Street Address <span className="text-red-600">*</span></label>
                <input className=" border p-1 rounded-lg" type="text" name="StreetAddress" value={ShippingAddress.StreetAddress} required onChange={(e)=>{
                    setShippingAddress({...ShippingAddress, StreetAddress:e.target.value})
                }}/>
                <label htmlFor="Floor">Floor/apt </label>
                <input className=" border p-1 rounded-lg" type="text" name="Floor" value={ShippingAddress.floor} onChange={(e)=>{
                    setShippingAddress({...ShippingAddress, Floor:e.target.value})
                }}/>

                <div className="flex gap-2 p-2 justify-evenly max-sm:flex-col">
                    
                    <label htmlFor="State">State<span className="text-red-600">*</span></label>
                    <input className=" border p-1 rounded-lg w-[30%] max-sm:w-full" type="text" name="State" required value={ShippingAddress.State} onChange={(e)=>{
                    setShippingAddress({...ShippingAddress, State:e.target.value})
                    }}/>
                    <label htmlFor="City">City<span className="text-red-600">*</span></label>
                    <input className=" border p-1 rounded-lg w-[50%] max-sm:w-full" type="text" name="City" value={ShippingAddress.City} onChange={(e)=>{
                    setShippingAddress({...ShippingAddress, City:e.target.value})
                    }} required />
                    <label htmlFor="Pincode">Zip/Pincode<span className="text-red-600">*</span></label>
                    <input className=" border p-1 rounded-lg w-[30%] max-sm:w-full" type="number" name="Pincode" required value={ShippingAddress.Pincode} onChange={(e)=>{
                    setShippingAddress({...ShippingAddress, Pincode:e.target.value})
                    }}/>
                </div>

                <p className="text-2xl mb-5 self-center mt-5">Contact Info</p>

                <div className="flex items-center justify-between mb-5 max-sm:flex-col max-sm:items-start">
                    <label htmlFor="FullName">Email<span className="text-red-600">*</span></label>
                    <input className=" border p-1 rounded-lg w-[40%] mr-5 h-10 max-sm:w-full" type="email" name="Email" required value={ShippingAddress.Email} onChange={(e)=>{
                    setShippingAddress({...ShippingAddress, Email:e.target.value})
                    }}/>
                    <label htmlFor="FullName">Phone Number<span className="text-red-600">*</span></label>
                    <input className=" border p-1 rounded-lg w-[40%] h-10 max-sm:w-full" type="number" name="PhoneNumber" required value={ShippingAddress.PhoneNumber} onChange={(e)=>{
                    setShippingAddress({...ShippingAddress, PhoneNumber:e.target.value})
                    }}/>
                </div>

                <button type="submit" className=" self-end w-[40%] mr-2 bg-blue-600 text-white p-2  rounded-md hover:text-blue-600 hover:bg-white hover:scale-105 hover:border duration-300 max-sm:text-xs max-sm:w-[60%]">Proceed To Saving and Payment</button>

            </form>
        </div>
    </>
}

export default ShippingDetails