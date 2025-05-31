import { useContext, useEffect, useState } from "react"
import { UserContext } from "./context"

function AdminUser({props}) {

    const [totalOrder,totalOrderDetails,total]=props

    const {refresh,setRefresh}=useContext(UserContext)
    

    const [totalusers,setTotalUsers]=useState([])

    useEffect(()=>{
        fetch("https://supamart-v-backend.onrender.com/user")
        .then((res)=> res.json())
        .then((res)=> setTotalUsers(res))
        .catch((err)=> console.log(err))
    },[refresh])
    
    function DeleteAccount(UserID){
        try {
          fetch("https://supamart-v-backend.onrender.com/user/deleteuserbyid",
            {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                _id:UserID
            }),
          })
          .then((respone) => respone.json())
          .then((res)=> {console.log(res)} )
          .catch((err)=>{console.log(err)})
          setRefresh(refresh+1)
        } catch (error) {
          console.log(error)
        }
      }
      //console.log(totalOrderDetails)

      function totalsingleUserOrders(id){
        let totalsigleOrders=0
        for(let i=0;i<totalOrderDetails.length;i++){
            if(totalOrderDetails[i].data.user_id==id){
                totalsigleOrders=totalsigleOrders+totalOrderDetails[i].data.quantity
            }
        }
        return totalsigleOrders
      }

      function totalsingleUserOrdersPrice(id){
        let totalsigleOrdersprice=0
        for(let i=0;i<totalOrderDetails.length;i++){
            if(totalOrderDetails[i].data.user_id==id){
                totalsigleOrdersprice=totalsigleOrdersprice+totalOrderDetails[i].item.price
            }
        }
        return totalsigleOrdersprice
      }

    return (
        <div className="pb-10 mt-10 flex flex-col items-center  gap-5">
            <h3 className=" self-start p-5 -mt-7 font-bold  text-3xl">
                Total Users List
            </h3>
                    <div className="bg-white w-[93%] pb-6 rounded-2xl flex flex-col items-center">
                        <div className=" border-b-2 border-gray-300 w-[90%] py-4">
                            <h3 className="text-2xl font-bold ">All Users</h3>
                        </div>

                        <div className="w-[90%] text-center">
                            <div className="border-b-2 border-gray-300 text-xl opacity-40">
                                <div className="h-20 flex justify-between items-center">
                                    <div>User Name</div>
                                    <div>Cutomer ID</div>
                                    <div>User Email</div>
                                    <div>Date</div>
                                    <div className="w-35">Total Number of Purchases</div>
                                    <div className="w-35">Total Purchases Amount</div>
                                    <div className=""></div>
                                </div>
                            </div>
                            <div className="w-[100%] flex flex-col">
                                {
                                    totalusers?.map((datas)=>(
                                        <div key={datas._id} className="border-b-2 border-gray-300 text-sm h-20 flex gap-2  items-center">
                                            <div className="flex">
                                                <p className='w-30 h-10 text-wrap truncate text-left ml-2'>{datas.name}</p>
                                            </div>
                                            <div><p className='w-40 h-10 text-wrap truncate'>#{datas._id}</p></div>
                                            <div><p className='w-50  h-10 text-wrap truncate'>{datas.email}</p></div>
                                            <div><p className='w-35 h-10 text-wrap truncate -ml-5'>#{datas.createdAt}</p></div>
                                            <div><p className='w-45  h-10 text-wrap truncate'>{totalsingleUserOrders(datas._id)}</p></div>
                                            <div><p className='w-45 pl-5  h-10 text-wrap truncate'>₹{totalsingleUserOrdersPrice(datas._id)}</p></div>
                                            <button className="bg-red-500 text-white rounded-md hover:scale-105 duration-300"
                                            onClick={()=>{
                                                DeleteAccount(datas._id)
                                            }}>Delete User</button>
                                         </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
            </div>
    )
}

export default AdminUser;