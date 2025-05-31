import { Link } from "react-router-dom"
import heart from "../assets/heart.png"
import Pink_heart from "../assets/pink_heart.png"
import { useContext, useEffect } from "react";

import { UserContext } from "./context.js";


function Cards({data}){
    
    const {WishListItem,setWishListItem ,Auth,setAuth,user}=useContext(UserContext)


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
        const res= await fetch("http://localhost:8000/wishlists/unsaveWishlist",{
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
        const res=await fetch("http://localhost:8000/wishlists",{
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

    function truncateString(str, maxLength) {
        if (str?.length > maxLength) {
            return str?.slice(0, maxLength) + '...';
        }
        return str;
    }
    return (<>
                             
        <div className={`w-64 h-86 m-4 rounded-lg shadow-lg overflow-hidden bg-white ${data?.quantity<=0&&" opacity-20"}`} key={data?._id}>
        <Link className="" to={`/product/${data?._id}`}>
            <img className="h-64 w-64 object-contain hover:scale-105 duration-300 hover:-translate-y-2 "  src={data?.image} alt={data?.title} />
            <div className=" bg-gray-100 p-3 ">
                <p className="min-h-12 hover:text-black text-gray-600  font-medium">{truncateString(data?.title,45)}</p>
                <div className="flex items-center">
                <p className="flex items-center w-16 font-bold"><img className="h-4" src="https://cdn3.iconfinder.com/data/icons/inficons-currency-set/512/rupee-512.png"/>{data?.price}</p>
                {data?.discount>0 && <p className="ml-3 text-sm text-gray-400  line-through">₹{data?.discount > 0 && (data?.price)+((data?.price)*data?.discount/100)}</p>}
                {data?.discount>0 && <p className="text-sm ml-2 text-green-400">({data?.discount}% off)</p> }                    
                </div>
            </div>
        </Link>
        <button className=" relative bottom-86 left-56 cursor-pointer hover:scale-115 duration-300"
            onClick={()=>{
                Auth?wishList(data)===heart? addingWishList(data) && setWishListItem([...WishListItem, data]): deletingWishList(data) && setWishListItem(WishListItem.filter(item=> item.product_id!==data._id)) : setAuth(null)
            }}
            >
        <img className="w-6 h-6" src={Auth?wishList(data):heart} />
        </button>
    </div>
    </> 
    )
}

export default Cards