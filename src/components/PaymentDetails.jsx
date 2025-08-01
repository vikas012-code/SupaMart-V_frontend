import { useContext, useEffect } from "react"
import { UserContext } from "./context"
import { useNavigate } from "react-router-dom"

function PaymentDetails(){
    let {user,ShippingAddress,ProgressBar,setProgressBar,cartItem,cartQuantity,total,setTotal,Ordered,setOrdered,setCartItem,setCartQuantity}=useContext(UserContext)
    
    let totalItem=0;
    
    cartItem?.map((item)=>{
            totalItem=totalItem+item.quantity*item?.Data.price;
        })
    
    useEffect(()=>{
            setTotal(totalItem)
    },[totalItem])
    
    
    const navigate=useNavigate()

    async function orderhandler(){
        let respose=[]
        try {
            for(let i=0;i<cartItem.length;i++){
                respose = await fetch("https://supamart-v-backend.onrender.com/orders",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id: user._id,
                        product_id: cartItem[i]?.Data._id,
                        quantity: cartItem[i]?.quantity
                    })
        
                })
            }
            let res= await respose.json()
            
        } catch (error) {
            console.log(error)
        }
        try {
            for(let i=0;i<cartItem.length;i++){
                respose = await fetch("https://supamart-v-backend.onrender.com/products/UpdateQuantityByOrder",{
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        _id: cartItem[i]?.Data._id,
                        quantity: cartItem[i]?.quantity
                    })
        
                })
            }
            let res= await respose.json()
            
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }



    console.log(Ordered)
    console.log(cartItem)

    return<>
            <div className="flex flex-col items-center mt-10 max-lg:text-xs">
                <p className="text-4xl mb-5">Payment Method</p>
                <form onSubmit={(e)=>{
                        const result=orderhandler()
                        result?
                        setOrdered([...Ordered,...cartItem])
                        ||
                        setCartItem([])
                        ||
                        setCartQuantity(0)
                        ||
                        navigate("/checkout/OrderedPlaced")
                        ||
                        localStorage.removeItem("cartData")
                        ||
                        setProgressBar(ProgressBar+1)
                        :console.error("error while ordering product")
                    }}>
                <div className="  shadow-lg shadow-gray-500 w-[60vw] h-[60vw] flex p-5 justify-between rounded-xl mb-5 max-lg:flex-col max-lg:items-center max-lg:h-full max-lg:p-4 max-lg:w-full">

                    <div className="border w-[48%] border-gray-300 rounded-lg p-5 flex flex-col items-center max-lg:w-full">
                        <p className="text-2xl font-bold">Payment Type</p>
                        <hr className="w-[80%] justify-self-center text-gray-400" />
                        <div className=" mt-5 flex flex-col w-[80%] items-center">
                            <div className="border border-gray-300 p-5 w-[100%] flex gap-2  items-center justify-between">
                                <input  type="radio" name="payment" required/>
                                <label htmlFor="">Cash On Delivery</label>
                                <img className="w-10" src="https://cdn.iconscout.com/icon/free/png-256/free-cash-on-delivery-icon-download-in-svg-png-gif-file-formats--payment-hand-food-services-pack-icons-1569374.png" alt="cashonedelivery" />

                            </div>
                            <div className="border border-gray-300 p-5 w-[100%] flex gap-2 items-center justify-between">
                                <input type="radio" name="payment" />
                                <label htmlFor="">Online Banking</label>
                                <img className="w-10 " src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK5ZT_94d9ZrYMaqT-sUqDpVcsN9pciTfz7g&s" alt="cashonedelivery" />

                            </div>
                            <div className="border border-gray-300 p-5 w-[100%] flex gap-2  items-center justify-between">
                                <input type="radio" name="payment" />
                                <label htmlFor="">Credit/Debit card</label>
                                <img className="w-10 " src="https://cdn0.iconfinder.com/data/icons/major-credit-cards-colored/48/JD-15-512.png" alt="cashonedelivery" />

                            </div>
                            <div className="border border-gray-300 p-5 w-[100%] flex  items-center justify-between">
                                <input type="radio" name="payment" />
                                <label className="-ml-8" htmlFor="">UPI App</label>
                                <img className="w-10" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtj1QNHzC6AVkGEEf1UoX2yVRkhM3w9nsA5w&s" alt="cashonedelivery" />
                            </div>
                        </div>

                    </div>

                    <div className="w-[48%] rounded-lg flex flex-col justify-between max-lg:w-full max-lg:mt-5 max-lg:flex-row max-lg:gap-4">
                        <div className="h-[48%] border border-gray-300 rounded-lg ">
                            <div className="flex justify-between px-10 mt-5 max-sm:px-4">
                                <p className="text-2xl font-bold max-sm:text-lg">Total</p>
                                <p className="text-2xl flex items-center max-sm:text-lg"><img className="h-6 max-sm:h-4" src="https://cdn3.iconfinder.com/data/icons/inficons-currency-set/512/rupee-512.png"/>{total}</p>
                            </div>
                            <hr className="w-[80%] justify-self-center text-gray-400" />
                            <div className="flex justify-between px-10 mt-5 opacity-60 max-sm:px-4">
                                <p className="text-2xl max-sm:text-[1rem]">Items</p>
                                <p className="text-2xl max-sm:text-[1rem]">{cartQuantity}</p>
                            </div>
                            <div className="flex justify-between px-10 mt-5 opacity-60 max-sm:px-4">
                                <p className="text-2xl max-sm:text-[1rem]">Discount</p>
                                <p className="text-2xl text-red-600 flex items-center max-sm:text-[1rem]"><img className="h-6 max-sm:h-[1rem]" src="https://cdn3.iconfinder.com/data/icons/inficons-currency-set/512/rupee-512.png"/>-{total/20}</p>
                            </div>
                            <div className="flex justify-between px-10 mt-5 opacity-60 max-sm:px-4">
                                <p className="text-2xl max-sm:text-[1rem]">Shipping Cost</p>
                                <p className="text-2xl text-green-500 max-sm:text-[1rem]">Free</p>
                            </div>
                        </div>

                        <div className="h-[48%] border border-gray-300 rounded-lg flex flex-col items-center max-lg:p-4">
                            <p className="text-2xl mt-5 font-bold max-sm:text-lg max-sm:mx-0 max-lg:mt-0">Billing Address</p>
                            <hr className="w-[80%] justify-self-center text-gray-400" />
                            <div className="text-2xl flex flex-col self-start ml-10 mt-5 opacity-60 max-lg:ml-1 max-lg:mt-1 max-sm:mt-0 max-sm:ml-0">
                                <p className="max-sm:text-[1rem]">{ShippingAddress?.fullName}</p>
                                <p className="max-sm:text-[1rem]">{ShippingAddress?.StreetAddress}</p>
                                <p className="max-sm:text-[1rem]">{ShippingAddress?.State}</p>
                                <p className="max-sm:text-[1rem]">{ShippingAddress?.City}</p>
                                <p className="max-sm:text-[1rem]">{ShippingAddress?.Pincode}</p>
                                <p className="max-sm:text-[1rem]">{ShippingAddress?.PhoneNumber}</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="w-[60vw] flex justify-center mb-10 max-lg:w-full" >
                    <button type="submit" className=" self-end w-[40%] mr-2 bg-blue-600 text-white p-2  rounded-md hover:text-blue-600 hover:bg-white hover:scale-105 hover:border duration-300">Place Order</button>
                </div>
                </form> 
            </div>
    </>
}

export default PaymentDetails