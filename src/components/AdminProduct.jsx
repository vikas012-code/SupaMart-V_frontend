import { useContext, useState } from "react";
import { UserContext } from "./context";
import Loading from "./Loading";
import AdminUploadProduct from "./AdminUploadProduct";

function AdminProduct({setProductIsUploading}) {
    const {datas,setRefresh}=useContext(UserContext)
    
    async function AddQuantity(data,quantity){
        try {
            let respose = await fetch("https://supamart-v-backend.onrender.com/products/UpdateQuantityByAdding",{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    _id:data?._id,
                    quantity: quantity
                })
            })
        let res=await respose.json()
        console.log(res)
        setRefresh(prev=> !prev)
        } catch (error) {
            console.log(error)
        }
    }


    const [quantity,setQuantity]=useState(0)

    const[addPoductToggle,setAddProductToggle]=useState(false)

    

    
    return (
        <>
            <div className="pb-10 mt-10 flex flex-col items-center gap-5 relative">
                <h3 className=" self-start p-5 -mt-7 font-bold  text-3xl">
                    Product Page
                </h3>
                {
                addPoductToggle?
                <div className="z-10 w-[93%] bg-white min-h-100 rounded-2xl p-2  ">
                    <AdminUploadProduct props={{setAddProductToggle,setRefresh,setProductIsUploading}}/>
                </div>
                :
                <div className="bg-white w-[93%] p-10 rounded-2xl flex  items-center justify-end  relative">
                    
                    <button className=" border border-cyan-400  h-20 min-w-50 rounded-xl hover:bg-cyan-400 hover:text-white hover:scale-105 duration-300" 
                    onClick={()=>{
                        setAddProductToggle(true)
                    }}>
                        Add New Product
                    </button>
                    
                </div>
                }
                <div className="bg-white w-[93%] pb-6 rounded-2xl flex flex-col items-center">
                    <div className=" border-b-2 border-gray-300 w-[90%] py-4">
                        <h3 className="text-2xl font-bold max-lg:text-lg">All Product Listing</h3>
                    </div>
                    <div className="w-[90%] text-center">
                        <div className="border-b-2 border-gray-300 text-xl opacity-40 max-lg:text-sm">
                            <div className="h-20 flex justify-between items-center">
                                <p className=" w-[42%] flex place-items-start pl-4">Product</p>
                                <p className=" w-[23%]">Product_id</p>
                                <p className=" w-[13%]">Price</p>
                                <p className=" w-[12%]">Total Quantity</p>
                            </div>
                        </div>


                        <div className="w-[100%] flex flex-col">
                            {
                                datas.map((item)=>(
                                    <div key={item?._id} className=" relative">
                                        <div className="bg-gray-50 left-0 z-10 mt-1  h-18 w-full opacity-0 hover:opacity-100 duration-300 absolute flex items-center justify-center ">
                                            <div className="flex justify-center items-center border border-gray-300 h-8 duration-300">
                                                    <button className=" bottom-4 border-x border-gray-300 h-8 px-2 active:bg-cyan-400 active:text-white" onClick={()=>{
                                                        setQuantity(0)
                                                        setRefresh(prev=> !prev)
                                                    }}>
                                                    <p className="text-red-500 text-4xl relative bottom-2">x</p>
                                                    </button> 
                                                    <button className="border-x border-gray-300 h-8 w-8 active:bg-cyan-400 active:text-white" onClick={()=>{
                                                        quantity>0&&
                                                        setQuantity(quantity-1)
                                                    }}>
                                                        -
                                                    </button>
                                                    <p className="min-w-8 px-2">{quantity<=0?"+ Add Stock":quantity}</p>

                                                    <button className="border-x border-gray-300 h-8 w-8 active:bg-cyan-400 active:text-white" onClick={()=>{
                                                        setQuantity(quantity+1)
                                                    }}>
                                                        +
                                                    </button>
                                                    <button className="border-x border-gray-300 h-8 w-8 active:bg-cyan-400 active:text-white" onClick={()=>{
                                                        setQuantity(quantity+10)
                                                    }}>
                                                        ++
                                                    </button>
                                                    <button className="text-green-500 text-3xl border-x border-gray-300 h-8 w-8 active:bg-cyan-400 active:text-white " onClick={()=>{
                                                        quantity>0&&
                                                        AddQuantity(item,quantity)
                                                        setQuantity(0)
                                                        setRefresh(prev=> !prev)
                                                    }}>
                                                        <p className="relative bottom-1">✓</p>
                                                    </button>
                                            </div>
                                        </div>
            
                                        <div  className="h-20 flex justify-between items-center border-b-2 border-gray-400 relative max-lg:text-xs max-sm:text-[0.5rem]">
                                
                                            <div className="flex w-[42%]">
                                                <div className="w-15 h-15 mr-4">
                                                    <img className="w-15 h-15 object-contain" src={item.image} alt="" />
                                                </div>
                                                <p className="w-100 h-12 text-wrap truncate text-left max-sm:flex max-sm:items-center">{item.title}</p>
                                            </div>
                                            <p className=" w-[23%]  max-sm:truncate">#{item._id}</p>
                                            <p className=" w-[13%] ">₹{item.price}</p>
                                            <p className=" w-[12%]">{item.quantity}</p>
                                        </div>
                                    </div>
                                    
                                ))
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminProduct;