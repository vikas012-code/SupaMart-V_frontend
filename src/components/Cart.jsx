import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context";
import { Link } from "react-router-dom";

function Cart(){
    const {cartItem,setCartItem,cartQuantity,setCartQuantity,total,setTotal}=useContext(UserContext);


    let totalItem=0; 
    const [cartrefrese,setCartrefrese]=useState(0)
    
    console.log(cartItem)

    cartItem?.map((item)=>{
        totalItem=totalItem+item.quantity*item?.Data.price;
    })


    useEffect(()=>{
        setTotal(totalItem)
        setCartItem(cartItem.filter(item=> !item.quantity<=0))
        if(cartItem.length>0){
            localStorage.setItem("cartData",JSON.stringify(cartItem))
        }
        // if(cartItem.length>0){
        //     localStorage.setItem("cartData",JSON.stringify(cartItem))
        // }
       
    
        // setCartItem(cartItem.filter(item=> !item.quantity<=0))

        // setCartQuantity(0)

        // cartItem?.map((item)=>{
        //     setCartQuantity(cartQuantity=> cartQuantity+item.quantity)
        // })

        

    },[totalItem])

    function CartDataAdding(){
        setTotal(prev=> prev+totalItem)
        
        setCartItem(cartItem.filter(item=> !item.quantity<=0))

        setCartQuantity(0)

        cartItem?.map((item)=>{
            setCartQuantity(cartQuantity=> cartQuantity+item.quantity)
        })

        cartItem?.map((item)=>{
            totalItem=totalItem+item.quantity*item?.Data.price  
        })
        for(let i=0;i<cartItem.length;i++){
            totalItem=totalItem+cartItem[i].quantity*cartItem[i].Data.price 
        }
        if(cartItem[0].quantity<=0){
            localStorage.removeItem("cartData")
        }
        else{
            localStorage.setItem("cartData",JSON.stringify(cartItem))

        }
        
    }


    return(
        <>
        <div className="bg-white min-h-[50vh]">
            {
                cartItem.length>0?
                <>
                <h3 className="text-center mb-8 text-2xl font-bold">Check Out</h3>
                <div className=" flex justify-evenly text-xl font-bold">
                    <p className="relative right-[45vw] max-sm:right-[40vw] max-sm:text-sm">
                        Title
                    </p>
                    <p className="absolute right-[26vw] max-lg:right-[32vw] max-sm:text-sm">
                        Price
                    </p>
                    <p className="absolute right-[14vw] max-sm:text-sm">
                        Quantity
                    </p>
                    <p className="absolute right-[4vw] max-lg:right-1 max-sm:text-sm ">
                        Total
                    </p>
                </div>
                <hr className="border-b-2 border-black" />

            {cartItem.map((item)=>( 
            item.quantity>0&&
            <div className=" max-lg:text-[0.7rem]" key={item?.Data._id}>
            <ul className="flex justify-between items-center pb-3 p-2 ">
                <li className="w-[20%]"><img className="w-full h-20 object-contain " src={item?.Data.image} alt="" /></li>
                <li className=" w-220 overflow-clip h-12 text-nowrap mr-120 max-lg:mr-auto max-lg:w-[30vw] max-lg:text-wrap max-sm:text-[0.5rem] max-sm:w-[25%] ml-3 flex items-start truncate">{item?.Data.title}</li>
                <li className="absolute right-[26vw] pt-2 flex items-center max-lg:right-[32vw]"><img className="h-4 mt-0.5 max-lg:h-3 max-lg:mt-0" src="https://cdn3.iconfinder.com/data/icons/inficons-currency-set/512/rupee-512.png"/>{item?.Data.price}</li>

                <li className="absolute right-[13vw] pt-2 flex items-center max-lg:right-[16vw] max-sm:right-[16vw]">
                    <div className=" border border-gray-300  flex gap-4  items-center min-w-26 max-lg:flex-col max-lg:min-w-8 max-lg:h-22">
                    {item.quantity>0 &&     
                    <button className=" w-8 h-8  active:bg-gray-200" onClick={()=>{ 
                        item.quantity-=1 
                        CartDataAdding()
                        // setCartrefrese(prev=>prev-item.quantity)
                    }}>-</button> 
                    }
                    <p className="">{item.quantity} </p>
                    
                    {item.quantity<item.Data.quantity
                    &&
                    <button className=" w-8 h-8  active:bg-gray-200" onClick={()=>{
                        item.quantity+=1 
                        CartDataAdding()
                        //setCartrefrese(prev=>prev+item.quantity)
                    }}>+</button>
                    }
                    </div>
                </li>
                <li className="absolute right-[4vw] pt-2 flex items-center max-sm:right-[2vw]"><img className="h-4 mt-0.5 max-lg:h-3 max-lg:mt-0" src="https://cdn3.iconfinder.com/data/icons/inficons-currency-set/512/rupee-512.png"/>{item?.quantity*item?.Data.price}</li>
            </ul>
            <hr className="border-b-1 mb-2 border-gray-400"/>
            </div>)
            )
            }

            {
                total>0 &&
                <div>
                <div className="flex justify-between ml-2">
                <p className="text-xl font-bold ml-2">Grand Total</p>
                <p className="mr-[4vw] flex"><img className="h-4 mt-0.5" src="https://cdn3.iconfinder.com/data/icons/inficons-currency-set/512/rupee-512.png"/>{total?total:""}</p>
                </div>
                <div className="flex justify-end mt-5 ">
                <Link to="/checkout" className="mr-2 bg-blue-600 text-white p-2  rounded-md hover:text-blue-600 hover:bg-white hover:scale-105 hover:border duration-300">Processed To Checkout</Link>
                </div>
                </div>
            }
            </>
            :
            <div className="flex flex-col items-center">
                <img src="https://i.pinimg.com/originals/5a/d0/47/5ad047a18772cf0488a908d98942f9bf.gif" alt="" />
            </div>
            }
        </div>
        </>
    )


}

export default Cart;