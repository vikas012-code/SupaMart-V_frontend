import smartphone from "../assets/smartphone.png"
import account_icon from "../assets/account_icon.png"
import notification from "../assets/notification.png"
import Dashboard from "./AdminDashboard"
import AdminProduct from "./AdminProduct"
import AdminOrder from "./AdminOrder"
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './context';
import AdminUser from "./AdminUser"


function AdminPanel(){
    const[asidePage,setAsidePage]=useState("dashboard")

    const [totalOrder,setTotalOrder]=useState([])

    const [totalOrderDetails,setTotalOrderDetails]=useState([])

    const{datas,setAuth}=useContext(UserContext)

    let total=0

    useEffect(()=>{
        fetch("https://supamart-v-backend.onrender.com/orders")
        .then((res)=> res.json())
        .then((res)=> setTotalOrder(res))
        .catch((err)=> console.log(err))
    },[])


    function totalOrderAdding(data){
        for(let i=0;i<datas.length;i++){
            if(datas[i]._id===data.product_id){
                setTotalOrderDetails((previousData)=>([...previousData,{item:datas[i] ,data:data} ]))
                return
            }
        }
    }
       
        
        if(totalOrderDetails<totalOrder){
            for(let i=0;i<totalOrder.length;i++){
            //console.log(Ordered[i])
            totalOrderAdding(totalOrder[i])
        }}
        
       
       

        if(totalOrderDetails.length>0){
            for(let i=0;i<totalOrderDetails.length;i++){
                total=total+(totalOrderDetails[i].data.quantity*totalOrderDetails[i].item.price)
            }
        }
    
    return <>
        <div className="flex justify-end bg-white">
            <aside className="bg-white border-r border-gray-400 w-[15vw] h-[100vh] flex flex-col items-center fixed left-0 ">
                <div className=" h-20 w-45 flex justify-center items-center">
                    <img className="w-10 h-10 " src={smartphone} alt="mobileshop"/> 
                    <h3 className="text-xl font-extrabold text-blue-600 ">SupaMart-V</h3>
                </div>
                <div className=" m-4 w-45 flex flex-col">
                    <button className={`my-2  p-2 rounded-md flex ${asidePage==="dashboard"&&"bg-cyan-600 text-white"}`} onClick={()=>{
                        setAsidePage("dashboard")
                    }}>Dashboard</button>
                    <button className={`my-2  p-2 rounded-md flex ${asidePage==="product"&&"bg-cyan-600 text-white"}`} onClick={()=>{
                        setAsidePage("product")
                    }}>Products</button>
                    <button className={`my-2  p-2 rounded-md flex ${asidePage==="order"&&"bg-cyan-600 text-white"}`} onClick={()=>{
                        setAsidePage("order")
                    }}>Orders lists</button>
                    <button className={`my-2  p-2 rounded-md flex ${asidePage==="users"&&"bg-cyan-600 text-white"}`} onClick={()=>{
                        setAsidePage("users")
                    }}>Users</button>
                </div>
            </aside>
            <div className="w-[84vw]  bg-gray-100">
                <nav className=" bg-white p-2 h-20 flex justify-end items-center sticky top-0 z-10">
                    <ul className="flex p-2 gap-10 justify-end items-center mr-4">
                        <li>
                            <img className="w-10" src={notification} alt="" />
                        </li>
                        <li className="flex flex-col items-center">
                            
                            <button className=" peer "> <img className="w-8 peer ml-2 mt-5" src={account_icon} alt="" /> Admin</button>
                            <button  className=" invisible peer-focus:visible active:visible ease-linear text-white bg-cyan-500 px-1 rounded-lg" onClick={()=>{
                                setAuth(null)
                            }}>LogOut</button>
                        </li>
                    </ul>
                </nav>
                {
                    asidePage==="dashboard" && <Dashboard props={[totalOrder,totalOrderDetails,total]}/>
                    ||
                    asidePage==="product" && <AdminProduct />
                    ||
                    asidePage==="order" && <AdminOrder props={[totalOrder,totalOrderDetails,total]}/>
                    ||
                    asidePage==="users" && <AdminUser props={[totalOrder,totalOrderDetails,total]}/>

                }
            </div>
        </div>
        
    </>
} 

export default AdminPanel