import React, { useState } from 'react'

function AdminUploadProduct({props}) {

    const {setAddProductToggle,setRefresh,setProductIsUploading}=props
    console.log("props",props)

    const [productDetail,setPoductDetail]=useState({
        title: "",
        price: null,
        description: "",
        brand: "",
        model: "",
        color: "",
        category: "mobile",
        discount:null,
        quantity:null
        })

    const [image,setImage]=useState(null)

    const formData = new FormData();
    formData.append('files',image);

    async function AddNewProduct(){

        setProductIsUploading(true)

        try {
            const respose = await fetch("https://supamart-v-backend.onrender.com/products/uploadimage",{
                method: "POST",
                body: formData
            })
            const res= await respose.json()
            console.log(res)

            try {
                const respose2 = await fetch("https://supamart-v-backend.onrender.com/products",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title: productDetail.title,
                        image: res,
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
                const res2= await respose2.json()
                console.log(res2)
                setRefresh(prev=> !prev)
                setProductIsUploading(false)
                setPoductDetail({...productDetail,
                title: "",
                price: 0,
                description: "",
                brand: "",
                model: "",
                color: "",
                category: "mobile",
                discount:0,
                quantity:0
                })
                setImage(null)
                return true
            
                } catch (error) {
                    setProductIsUploading(false)
                    alert("something went wrong while uploading product?...")
                    console.log(error)
                    return false
                }
        } catch (error) {
            setProductIsUploading(false)
            alert("something went wrong while uploading image?...")
            console.log(error)
            return false
        }
    }

  return (
    <>
        <form className="flex flex-col " onSubmit={(e)=>{
            e.preventDefault()
            productDetail.price>0 && productDetail.quantity>0 && productDetail.discount>0 &&

            AddNewProduct()
        }}>
            <h3 className=" text-2xl font-bold flex pl-4 pt-4">Add New Product</h3>
            <div className="flex justify-evenly p-4 max-sm:flex-col">
                <div className="flex flex-col  w-[48%] max-sm:w-full">
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
                    <input className="border border-gray-400 p-4 h-10 rounded-lg" type="file" placeholder="insert Link Of Image"  onChange={(e)=>{
                        setImage(e.target.files[0])
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

                <div className="flex flex-col w-[48%] max-sm:w-full">
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
                <button className=" border border-gray-300 w-[20%] h-10 self-end bg-cyan-500 text-white  hover:bg-white hover:text-black hover:scale-105 duration-300 rounded-lg max-lg:w-fit" type="submit">Add Product</button>
            </div>
        </form>
    </>
  )
}

export default AdminUploadProduct