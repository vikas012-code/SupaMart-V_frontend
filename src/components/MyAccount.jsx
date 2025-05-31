import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context";
// import Datas from "./datas";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

function MyAccount(){
   
    
    const{user,datas,ShippingAddress,setShippingAddress,Auth,setAuth,section,setSection,Ordered,WishListItem,setWishListItem}=useContext(UserContext)
    
    
    const [wishListdetails,setWishListdetails]=useState([])

    const navigete=useNavigate()
    if(!wishListdetails[0]){
        navigete("/")
    }

    const [orderDetails,setOrderDetails]=useState([])

    function wishlistadding(data){
        setWishListdetails((previousData)=>([...previousData,datas.filter( item => item._id===data.product_id)[0]]))
        
    }

    useEffect(()=>{
        for(let i=0;i<WishListItem.length;i++){
            wishlistadding(WishListItem[i])
        }
    },[user,WishListItem.length])

    function orderadding(data){
        for(let i=0;i<datas.length;i++){
            if(datas[i]._id===data.product_id){
                setOrderDetails((previousData)=>([...previousData,{item:datas[i] ,data:data} ]))
                return
        }
    }
        
    }
   
    useEffect(()=>{
        for(let i=0;i<Ordered.length;i++){
            //console.log(Ordered[i])
            orderadding(Ordered[i])
        }
    
    },[user,Ordered.length])
    
    
    return(
    <div className=" min-h-[50vh] bg-white -mb-2 flex flex-col items-center justify-between">

        <div className="flex justify-center">
            <div className=" w-50 text-center p-5 leading-15 text-xl font-bold">
                <button className={`${section=="myaccount" && "text-blue-600"} `} onClick={()=>{
                    setSection("myaccount")
                }}>My Account</button>
                <button className={`${section=="mywishlist" && "text-blue-600"}`}  onClick={()=>{
                    setSection("mywishlist")
                }} >My WishList</button>
                <button className={`${section=="myorder" && "text-blue-600"}`}  onClick={()=>{
                    setSection("myorder")
                }}>My Orders</button>
            </div>

            <div className=" w-[40vw] shadow mt-5">

                <div className={`p-8 pt-5 ${section!=="myaccount" && "hidden"}`}>
                    <h3 className="text-lg font-bold">My Profile</h3>
                    {
                    Auth?
                    <form className="mt-2 ml-4 flex flex-col pt-2">
                        <label htmlFor="">Full Name</label>
                        <input className="=rounded-sm p-1 bg-gray-100" type="text" value={ShippingAddress.fullName} onChange={(e)=>{
                        setShippingAddress({...ShippingAddress, fullName:e.target.value})
                        }}  />

                        <br />
                        <label htmlFor="">Email</label>
                        <input className=" rounded-sm p-1 bg-gray-100" type="email" value={ShippingAddress.Email} onChange={(e)=>{
                        setShippingAddress({...ShippingAddress, Email:e.target.value})
                        }}   />

                        <br />
                        <label htmlFor="">Address</label>
                        <input className="rounded-sm p-1 bg-gray-100" type="text" value={ShippingAddress.StreetAddress} onChange={(e)=>{
                        setShippingAddress({...ShippingAddress, StreetAddress:e.target.value})
                        }}  />

                        <div className="flex justify-around">
                        <button className="bg-gray-200 mt-4 rounded-sm w-16 hover:scale-105 duration-300">Cancel</button>
                        <button className="bg-blue-600 mt-4 text-white rounded-sm w-16 hover:scale-105 duration-300">Save</button>
                        </div>
                    </form>
                    :
                    <div className="text-center">
                        <p className="text-xl mt-4">Not Logged In</p>
                        <button className="mt-2 font-bold bg-cyan-500 w-15 rounded-md text-white" onClick={()=>{
                            setAuth(null)
                        }}>Login</button>

                    </div>
                    }

                </div>


                <div className={`p-8 pt-5  ${section!=="mywishlist" && "hidden"}`}>
                    <h3 className="text-lg font-bold">Products</h3>
                <div className="flex justify-center flex-wrap p-2 gap-2 -ml-3 ">
                {
                 Auth? WishListItem?.length>0?wishListdetails?.map((item,i)=>
                        <Link key={i} className="shadow w-25 h-35 mx-1" to={`/product/${item?._id}`}>
                            <img className=" h-25 object-contain" src={item?.image} alt="" />
                            <p className="text-xs truncate">{item?.title}</p>
                            <p className="text-sm font-bold">₹{item?.price}</p>
                        </Link>
                    )
                    :
                    <Link className=" flex flex-col items-center w-[100%] text-center " to={"/"} >
                        <p className="text-xl mt-10">There is no item your wishlist</p>
                        <button className=" mt-2 bg-blue-500 text-white w-40 rounded-lg hover:scale-105 duration-300">Continue Shopping</button>
                    </Link>
                    :
                    <div className="text-center ">
                        <p className="text-xl mt-4">Not Logged In</p>
                        <button className="mt-2 font-bold bg-cyan-500 w-15 rounded-md text-white" onClick={()=>{
                            setAuth(null)
                        }}>Login</button>

                    </div>
                    }
                </div>
                </div>

                <div className={`pl-8 pt-5  ${section!=="myorder" && "hidden"} overflow-y-auto`}>
                    <h1 className="text-xl font-bold">Ordered List</h1>
                    { 
                    Auth? 
                    Ordered.length > 0 ?

                    <div>
                    <div className="flex justify-between px-3">
                        <p>Product</p>
                        <p>Quantity</p>
                    </div>
                    {orderDetails.map((items,i)=>(
                        <div key={i}>
                            <hr />
                            <div className="flex items-center justify-between mt-2 shadow mr-2 pr-2">
                                <img className="w-20 h-20" src={items?.item?.image} alt={items?.item?.title} />
                                <p className=" text-gray-500 w-40 h-10 text-wrap truncate  text-sm mr-60">{items?.item?.title}</p>
                                <p>{items?.data?.quantity}</p>
                            </div>
                        </div>
                    ))}
                    </div>
                    :
                    <Link className=" flex flex-col items-center w-[100%] text-center " to={"/"} >
                        <p className="text-xl mt-10">your order list is empty</p>
                        <button className=" mt-2 bg-blue-500 text-white w-40 rounded-lg hover:scale-105 duration-300">Continue Shopping</button>
                    </Link>
                    :<div className="text-center">
                    <p className="text-xl mt-4">Not Logged In</p>
                    <button className="mt-2 font-bold bg-cyan-500 w-15 rounded-md text-white" onClick={()=>{
                        setAuth(null)
                    }}>Login</button>

                </div>
                    }
                </div>

            </div>
        </div>
    {
        Auth &&
        <button onClick={()=>{
            setAuth(null)
            ||
            Cookies.remove("UserAuth")
        }} className=" bg-blue-600 text-white w-30 rounded-md mt-4 mb-4">
            Logout</button>
    }
    </div>
    )
}

export default MyAccount;