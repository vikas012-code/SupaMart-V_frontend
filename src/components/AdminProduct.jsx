import { useContext, useState } from "react";
import { UserContext } from "./context";

function AdminProduct() {
    const {datas,refresh,setRefresh}=useContext(UserContext)
    

    async function AddQuantity(data,quantity){
        try {
            let respose = await fetch("http://localhost:8000/products/UpdateQuantityByAdding",{
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
        setRefresh(refresh+1)
        } catch (error) {
            console.log(error)
        }
    }


    const [quantity,setQuantity]=useState(0)

    const[addPoductToggle,setAddProductToggle]=useState(false)

    const [productDetail,setPoductDetail]=useState({
    title: "",
    image: "",
    price: null,
    description: "",
    brand: "",
    model: "",
    color: "",
    category: "mobile",
    discount:null,
    quantity:null
    })

    async function AddNewProduct(){
        try {
            respose = await fetch("http://localhost:8000/products",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: productDetail.title,
                    image: productDetail.image,
                    price: productDetail.price,
                    description: productDetail.description,
                    brand: productDetail.brand,
                    model: productDetail.model,
                    color: productDetail.color,
                    category: productDetail.category,
                    discount:productDetail.discount,
                    quantity:productDetail.quantity
                })
    
            })
        let res= await respose.json()
        console.log(res)
        setRefresh(refresh+1)
        return true
        
        } catch (error) {
            console.log(error)
            return false
        }
    }
    return (
        <>
            <div className="pb-10 mt-10 flex flex-col items-center gap-5 relative">
                <h3 className=" self-start p-5 -mt-7 font-bold  text-3xl">
                    Product Page
                </h3>
                {
                addPoductToggle?
                <div className="z-10 w-[93%] bg-white min-h-100 rounded-2xl p-2  ">
                    <form className="flex flex-col " onSubmit={(e)=>{
                        e.preventDefault()
                        productDetail.price>0 && productDetail.quantity>0 && productDetail.discount>0 &&

                        AddNewProduct()?
                        setPoductDetail({...productDetail,
                            title: "",
                            image: "",
                            price: 0,
                            description: "",
                            brand: "",
                            model: "",
                            color: "",
                            category: "mobile",
                            discount:0,
                            quantity:0
                            })
                        ||
                        setAddProductToggle(false)
                        ||
                        alert("Successfully Add Product")
                        :
                        alert("Something Went Wrong")
                    }}>
                        <h3 className=" text-2xl font-bold flex pl-4 pt-4">Add New Product</h3>
                        <div className="flex justify-evenly p-4">
                            <div className="flex flex-col  w-[48%]">
                                <div>
                                    <label className="font-bold" htmlFor="">Product Name<span className="text-red-600">*</span></label>
                                </div>
                                <input className="border border-gray-400 p-4 h-10 rounded-lg" type="text" placeholder="Enter Name/Title of Product" value={productDetail.title} onChange={(e)=>{
                                    setPoductDetail({...productDetail,title:e.target.value})
                                }} required />
                                <br />
                                <div>
                                    <label className="font-bold" htmlFor="">Image<span className="text-red-600">*</span></label>
                                </div>
                                <input className="border border-gray-400 p-4 h-10 rounded-lg" type="text" placeholder="insert Link Of Image" value={productDetail.image} onChange={(e)=>{
                                    setPoductDetail({...productDetail,image:e.target.value})
                                }} required/>
                                <br />

                                <div>
                                    <label className="font-bold" htmlFor="">Price<span className="text-red-600">*</span> </label>
                                </div>
                                <input className="border border-gray-400 p-4 h-10 rounded-lg" type="number" placeholder="Enter Price Of Product" value={productDetail.price} onChange={(e)=>{
                                    e.target.value>=0 &&
                                    setPoductDetail({...productDetail,price:e.target.value})
                                }} required/>
                                <br />

                                <div>
                                    <label className="font-bold" htmlFor="">Description<span className="text-red-600">*</span></label>
                                </div>
                                <textarea className=" border border-gray-400 p-4 h-54 max-h-55 min-h-54 rounded-lg" type="text" placeholder="Enter Description Of Product...it" value={productDetail.description} onChange={(e)=>{
                                    setPoductDetail({...productDetail,description:e.target.value})
                                }} required/>
                                <br />
                            </div>

                            <div className="flex flex-col w-[48%]">
                                <div>
                                    <label className="font-bold" htmlFor="">Brand<span className="text-red-600">*</span></label>
                                </div>
                                <input className="border border-gray-400 p-4 h-10 rounded-lg" type="text" placeholder="Enter Brand Of Product" value={productDetail.brand} onChange={(e)=>{
                                    setPoductDetail({...productDetail,brand:e.target.value})
                                }} required/>
                                <br />

                                <div>
                                    <label className="font-bold" htmlFor="">model</label>
                                </div>
                                <input className="border border-gray-400 p-4 h-10 rounded-lg" type="text" placeholder="Enter Model Of Product" value={productDetail.model} onChange={(e)=>{
                                    setPoductDetail({...productDetail,model:e.target.value})
                                }}/>
                                <br />

                                <div>
                                    <label className="font-bold" htmlFor="">color</label>
                                </div>
                                <input className="border border-gray-400 p-4 h-10 rounded-lg" type="text" placeholder="Enter color Of Product" value={productDetail.color} onChange={(e)=>{
                                    setPoductDetail({...productDetail,color:e.target.value})
                                }}/>
                                <br />

                                <div>
                                    <label className="font-bold" htmlFor="">category<span className="text-red-600">*</span></label>
                                </div>
                                <select className="border border-gray-400 h-10  rounded-lg"  value={productDetail.category}
                                onChange={(e)=>{
                                    setPoductDetail({...productDetail,category:e.target.value}) }}>
                                    <option value="mobile">mobile</option>
                                    <option value="audio">audio</option>
                                    <option value="gaming">gaming</option>
                                    <option value="TV">TV</option>
                                </select>
                                <br />

                                <div>
                                    <label className="font-bold" htmlFor="">discount</label>
                                </div>
                                <input className="border border-gray-400 p-4 h-10 rounded-lg" type="number" placeholder="Enter Discount Available in Product" value={productDetail.discount} onChange={(e)=>{
                                    e.target.value>=0 &&
                                    setPoductDetail({...productDetail,discount:e.target.value})
                                }}/>
                                <br />

                                <div>
                                    <label className="font-bold" htmlFor="">quantity<span className="text-red-600">*</span></label>
                                </div>
                                <input className="border border-gray-400 p-4 h-10 rounded-lg" type="number" placeholder="Enter Total Quantity of Product" value={productDetail.quantity} onChange={(e)=>{
                                    e.target.value>=0 &&
                                    setPoductDetail({...productDetail,quantity:e.target.value})
                                }} required/>
                                <br />
                            </div>
                        </div>
                        <div className=" flex justify-around px-4 pb-4">
                            <button className=" border border-gray-300 w-[20%] h-10 self-end  hover:bg-cyan-500 hover:text-white hover:scale-105 duration-300 rounded-lg" onClick={()=>{
                                setAddProductToggle(false)
                            }}>Cancel</button>
                            <button className=" border border-gray-300 w-[20%] h-10 self-end bg-cyan-500 text-white  hover:bg-white hover:text-black hover:scale-105 duration-300 rounded-lg" type="submit">Add Product</button>
                        </div>
                    </form>
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
                        <h3 className="text-2xl font-bold ">All Product Listing</h3>
                    </div>
                    <div className="w-[90%] text-center">
                        <div className="border-b-2 border-gray-300 text-xl opacity-40">
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
                                                    }}>
                                                        <p className="relative bottom-1">✓</p>
                                                    </button>
                                            </div>
                                        </div>
            
                                        <div  className="h-20 flex justify-between items-center border-b-2 border-gray-400 relative">
                                            
                                            <div className="flex w-[42%]">
                                                <div className="w-15 h-15 mr-4">
                                                    <img className="w-15 h-15 object-contain" src={item.image} alt="" />
                                                </div>
                                                <p className="w-100 h-12 text-wrap truncate text-left">{item.title}</p>
                                            </div>
                                            <p className=" w-[23%]">#{item._id}</p>
                                            <p className=" w-[13%]">₹{item.price}</p>
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