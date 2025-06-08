import { useContext, useState } from "react";
import Similar from "./Similar"
// import Datas from "./datas";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "./context";
import heart from "../assets/heart.png";
import star from "../assets/white-star.png";

import Pink_heart from "../assets/pink_heart.png";

function Product(){
    const navigate=useNavigate()     
    const {datas,user,cartItem ,setCartItem,cartQuantity,setCartQuantity,Auth,setAuth,WishListItem,setWishListItem}=useContext(UserContext)

    const [quantity,setQuantity]=useState(1)

    let {_id} = useParams()

    let Data = datas.filter((value)=> value._id==_id)[0]

    


    function wishList(data){
    
            for(let i=0 ;i<WishListItem.length;i++){ 
                if(WishListItem[i]?.product_id===data._id){
                    return Pink_heart;
                }
            }
            return heart;
    }
        async function deletingWishList(data) {
            console.log("deleting wiushlist")
            const res= await fetch("https://supamart-v-backend.onrender.com/wishlists/unsaveWishlist",{
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    user_id: user._id,
                    product_id: data._id 
                }),
              })
            console.log(res.json())
        }
    
        async function addingWishList(data){
            const res=await fetch("https://supamart-v-backend.onrender.com/wishlists",{
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    user_id: user._id,
                    product_id: data._id 
                }),
              })
    
              console.log(res.json())
    
        }


    function addData(Data){
        if(cartItem.length > 0){
            for(let i=0;i<cartItem.length;i++){
                if(cartItem[i].Data._id===Data._id){
                    cartItem[i].quantity+=quantity
                    return
                }
            }
            setCartItem([...cartItem, {Data,quantity}])
        } 
        else{
            setCartItem([...cartItem, {Data,quantity}]) 

        }
    }
    return(
        <>
        {
        Data &&
        
        <div className="bg-white p-5">
            <div className={`flex h-96 ${Data.quantity==0&&" opacity-20 "}  max-lg:h-full max-lg:justify-center`}>

                <div className="flex items-center max-lg:flex-col max-lg:items">

                    <div className=" relative flex justify-center max-lg:w-[80vw]">
                        <img className=" ml-10  h-80 max-lg:ml-0 max-lg:w-[60vw] max-lg:h-[60vw]" src={Data.image} alt="product" />

                        <button className=" w-10 h-10 absolute top-0 -right-5 max-lg:top-2 max-lg:right-2 cursor-pointer hover:scale-115 duration-300"
                            onClick={()=>{
                                Auth?wishList(Data)===heart? addingWishList(Data) && setWishListItem([...WishListItem, Data]): deletingWishList(Data) && setWishListItem(WishListItem.filter(item=> item.product_id!==Data._id)) : setAuth(null)
                                
                            }}
                            >
                            <img className="min-w-10" src={Auth?wishList(Data):heart} />
                        </button>
                    </div>

                    <div className=" ml-10 w-[50vw] -mt-20 max-lg:m-0  max-lg:w-[90vw] ">

                        <p className="mt-5 text-2xl font-bold max-lg:text-lg">{Data.title}</p>
                        <p className="flex items-center bg-green-500 w-10 rounded-md px-1 mt-2 text-white"><img className="w-4 h-4 mr-1" src={star} alt="" /> 4</p>
                        {/* <p>{Data.onSale?"stock" : "out of stock "}</p> */}
                        <p className="mt-2">{Data.color && `Color : ${Data.color}`}</p>
                        <ul className=" mt-3  list-disc list-inside text-gray-700">
                            <li>{Data.brand && `Brand : ${Data.brand}`}</li>
                            <li>{Data.model && `Model : ${Data.model}`}</li>
                            <li>{Data.category && `category : ${Data.category}`}</li>
                        </ul>

                    </div>
                    
                    
                    <div className="  h-58 w-50 ml-10 shadow-md shadow-gray-400 max-lg:w-[90vw] max-lg:ml-0 max-lg:h-50 max-lg:mt-5 max-lg:shadow-sm max-lg:shadow-gray-200">

                        <div className=" m-4"> 
                            <div className="flex justify-between items-center max-lg:justify-start max-lg:gap-5">
                                <p className="text-lg font-bold max-lg:text-xl">₹{Data.price}</p>
                                {Data?.discount>0 &&<p className="text-green-400">({Data.discount}%off)</p> }
                            </div>
                            {Data.discount>0 && <p className=" text-sm text-gray-400  line-through">₹{(Data.price)+((Data.price)*Data.discount/100)}</p>}
                        </div>

                        <div className="flex justify-center items-center ">
                            <div className=" border border-gray-300  flex gap-4 justify-center items-center max-lg:rounded-lg max-lg:w-[75vw] max-lg:justify-around">
                            <button className={` w-8 h-8 max-lg:w-full  active:bg-gray-200 ${quantity<=1?" pointer-events-none opacity-20":""}`} onClick={()=>{
                                quantity > 0 && setQuantity(quantity-1)
                            }}>
                                -
                            </button>

                            <p className="">
                                {quantity}
                            </p>

                            <button className=" w-8 h-8 max-lg:w-full active:bg-gray-200 " onClick={()=>{
                                quantity<Data.quantity
                                &&
                                setQuantity(quantity+1)
                            }}>
                                +
                            </button>
                            </div>
                        </div>

                        <div className="flex flex-col mt-2 px-4 max-lg:flex-row max-lg:justify-evenly">
                            <button className=" border rounded-lg bg-blue-600 text-white h-10 my-2 hover:bg-white hover:text-blue-600 hover:scale-105 duration-300 max-lg:w-[35vw]"  onClick={()=>
                            {
                            Auth?
                            quantity > 0 ? setCartQuantity(cartQuantity+quantity) || addData(Data)
                             ||
                             setQuantity(1)
                             ||
                             navigate("/checkout")
                             :""                        
                             
                             :setAuth(null)

                            }}>Buy Now</button>
                            <button className=" border rounded-lg bg-white text-blue-600 h-10 my-2 hover:scale-105 duration-300 max-lg:w-[35vw]" onClick={()=>
                            {
                            Auth?
                            quantity > 0 && setCartQuantity(cartQuantity+quantity) || addData(Data)
                            ||
                            setQuantity(1)
                            :setAuth(null);
                            }}
                            >Add to cart</button>
                        </div>

                    </div>

                </div>
                

            </div>

            <div className="h-96 p-5 max-lg:h-full max-lg:p-3">
                <p className="text-xl font-bold">Product Description -</p>
                <hr className="mt-5 text-gray-400" />
                <p className="mt-5 flex pl-5 text-lg max-lg:pl-2 max-lg:text-md">{Data.description}</p>
                
            </div>
            <div>
                <p className="text-lg font-bold">Similar Products -</p>
                <hr className="mt-5 text-gray-400" />
                
                <Similar props={Data}/>
            </div>
            
        </div>
        }
        
        </>
    )
}

export default Product