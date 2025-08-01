import { useContext, useEffect, useState } from "react"
import { UserContext } from "./context"

function AdminUser({props}) {
    const {totalOrderDetails,setProductIsUploading}=props

    const {refresh,setRefresh}=useContext(UserContext)
    
    const [totalusers,setTotalUsers]=useState([])

    useEffect(()=>{
        fetch("https://supamart-v-backend.onrender.com/user")
        .then((res)=> res.json())
        .then((res)=> setTotalUsers(res))
        .catch((err)=> console.log(err))
    },[refresh])
    
    function DeleteAccount(UserID){
        setProductIsUploading(true)
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
          setRefresh(prev=> !prev)
          setProductIsUploading(false)
        } catch (error) {
          console.log(error)
          setProductIsUploading(false)
        }
      }
      
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

        // console.log(totalOrderDetails)

    return (
        <div className="pb-10 mt-10 flex flex-col items-center  gap-5">
            <h3 className=" self-start p-5 -mt-7 font-bold  text-3xl max-lg:text-lg">
                Total Users List
            </h3>
                    <div className="bg-white w-[93%] pb-6 rounded-2xl flex flex-col items-center">
                        <div className=" border-b-2 border-gray-300 w-[95%] py-4">
                            <h3 className="text-2xl font-bold max-lg:text-lg">All Users</h3>
                        </div>

                        <div className="w-[95%] text-center">
                            <div className="border-b-2 border-gray-300 text-xl opacity-40">
                                <div className="h-20 flex justify-between items-center max-lg:text-sm max-sm:text-[0.6rem]">
                                    <div className="w-[12%]">User Name</div>
                                    <div className="w-[20%] mx-1">Cutomer ID</div>
                                    <div className="w-[20%] mx-1">User Email</div>
                                    <div className="w-[10%] mx-1">Date</div>
                                    <div className="w-[15%] mx-1">Total Number of Purchases</div>
                                    <div className="w-[15%] mx-1">Total Purchases Amount</div>
                                    <div className=""></div>
                                </div>
                            </div>
                            <div className="w-full flex flex-col">
                                {
                                    totalusers?.map((datas)=>(
                                        <div key={datas._id} className="w-full border-b-2 border-gray-300 text-sm h-20 flex items-center max-lg:text-xs max-sm:text-[0.4rem]">
                                            <div className="flex w-[12%]">
                                                <p className=' text-wrap truncate text-left ml-2'>{datas.name}</p>
                                            </div>
                                            <div className="w-[20%] mx-1"><p className='  text-wrap truncate'>#{datas._id}</p></div>
                                            <div className="w-[20%] mx-2"><p className='  text-wrap truncate'>{datas.email}</p></div>
                                            <div className="w-[15%] mx-2"><p className='  text-wrap truncate '>#{datas.createdAt}</p></div>
                                            <div className="w-[10%] mx-1"><p className='  text-wrap truncate'>{totalsingleUserOrders(datas._id)}</p></div>
                                            <div className="w-[10%] mx-1"><p className='  text-wrap truncate'>₹{totalsingleUserOrdersPrice(datas._id)}</p></div>
                                            <button className="w-10 bg-red-500 text-white rounded-md hover:scale-105 duration-300 max-lg:rounded-sm max-sm:rounded-xs"
                                            onClick={()=>{
                                                DeleteAccount(datas._id)
                                            }}>Delete User
                                            </button>
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