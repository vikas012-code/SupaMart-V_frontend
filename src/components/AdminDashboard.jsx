import { LineChart } from '@mui/x-charts';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './context';
import order_icon from "../assets/icon-order.png"


function Dashboard({props}){

    const {totalOrder,totalOrderDetails,total}=props

    let newdate=Date()

    const{datas,user}=useContext(UserContext)

    const [recentOrder,setRecentOrder]=useState([])

    const [orderDetails,setOrderDetails]=useState([])



    let todaytotal=0

    useEffect(()=>{
        fetch("https://supamart-v-backend.onrender.com/orders/recentOrder")
        .then((res)=> res.json())
        .then((res)=> setRecentOrder(res))
        .catch((err)=> console.log(err))
    },[])


    function orderadding(data){
            for(let i=0;i<datas.length;i++){
                if(datas[i]._id===data.product_id){
                    setOrderDetails((previousData)=>([...previousData,{item:datas[i] ,data:data} ]))
                return
            }
        }
            
    }
       
        
        if(orderDetails<recentOrder){
            for(let i=0;i<recentOrder.length;i++){
            //console.log(Ordered[i])
            orderadding(recentOrder[i])
        }}
        

        if(orderDetails.length>0){
            for(let i=0;i<orderDetails.length;i++){
                todaytotal=todaytotal+(orderDetails[i].data.quantity*orderDetails[i].item.price)
            }
        }


        function graphValue(){
            let graphVal=[0]
            for(let i=0;i<orderDetails.length;i++){
                graphVal.push(orderDetails[i].item.price*orderDetails[i].data.quantity)
            }
            graphVal.length>20?graphVal.length=20:"";

            return graphVal
        }

        // function graphValue(){
        //     let graphVal=[0]
        //     for(let i=0;i<totalOrderDetails.length;i++){
        //         graphVal.push(totalOrderDetails[i].item.price*totalOrderDetails[i].data.quantity)
        //     }
        //     graphVal.length>20?graphVal.length=20:"";

        //     return graphVal
        // }
    
    return(
        <>
        <div className="mt-10 h-40 flex justify-center items-center gap-5 flex-wrap max-lg:h-fit max-lg:mt-4 max-md:gap-2">
            
            <div className="bg-white h-40 w-[22%] rounded-2xl py-3 px-6 flex flex-col justify-around max-lg:w-40 max-lg:h-30 max-lg:text-sm max-lg:py-1 max-lg:px-2">
                <div className="flex justify-between">
                    <h3 className=" font-bold text-lg max-lg:text-sm">Total Orders</h3>
                
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <img className="w-10 text-white bg-blue-950 p-1 rounded-lg mr-5 max-lg:w-5 max-lg:h-5 max-lg:text-sm max-lg:rounded-sm" src={order_icon} alt="" />
                        <p className=" font-bold">{totalOrder?.length}</p>
                    </div>
                    <p className='text-green-400'>↑34%</p>
                </div>
                <p className="flex justify-end opacity-50">Compared to {newdate?.slice(4,15)}</p>
            </div>

            <div className="bg-white h-40 w-[22%] rounded-2xl py-3 px-6 flex flex-col justify-around max-lg:w-40 max-lg:h-30 max-lg:text-sm max-lg:py-1 max-lg:px-2">
                <div className="flex justify-between">
                    <h3 className=" font-bold text-lg max-lg:text-sm">Total Revenue</h3>
                    
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <p className="w-10 h-10 bg-blue-950 p-1 rounded-lg mr-5 text-white flex justify-center items-center text-3xl max-lg:mr-1 max-lg:w-5 max-lg:h-5 max-lg:text-sm max-lg:rounded-sm">₹</p>
                        <p className=" font-bold">₹{total}</p>
                    </div>
                    <p className='text-green-400'>↑23%</p>
                </div>
                <p className="flex justify-end opacity-50">Compared to {newdate?.slice(4,15)}</p>
            </div>

            <div className="bg-white h-40 w-[22%] rounded-2xl py-3 px-6 flex flex-col justify-around max-lg:w-40 max-lg:h-30 max-lg:text-sm max-lg:py-1 max-lg:px-2">
                <div className="flex justify-between">
                    <h3 className=" font-bold text-lg max-lg:text-sm">Today's Orders</h3>
                    
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <img className="w-10 bg-blue-950 p-1 rounded-lg mr-5 max-lg:w-5 max-lg:h-5 max-lg:text-sm max-lg:rounded-sm" src={order_icon} alt="" />
                        <p className=" font-bold">{orderDetails?.length}</p>
                    </div>
                    <p className='text-green-400'>↑50%</p>
                </div>
                <p className="flex justify-end opacity-50">Compared to {newdate?.slice(4,15)}</p>
            </div>

            <div className="bg-white h-40 w-[22%] rounded-2xl py-3 px-6 flex flex-col justify-around max-lg:w-40 max-lg:h-30 max-lg:text-sm max-lg:py-1 max-lg:px-2">
                <div className="flex justify-between">
                    <h3 className=" font-bold text-lg max-lg:text-sm">Today's Revenue</h3>
                    
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <p className="w-10 h-10 bg-blue-950 p-1 rounded-lg mr-2 text-white flex justify-center items-center text-3xl max-lg:w-5 max-lg:h-5 max-lg:text-sm max-lg:rounded-sm">₹</p>
                        <p className=" font-bold text-sm">₹{todaytotal}</p>
                    </div>
                    <p className='text-green-400'>↑84%</p>
                </div>
                <p className="flex justify-end opacity-50">Compared to {newdate?.slice(4,15)}</p>
            </div>

        </div>

        <div className=" mt-10 h-100 flex justify-center  gap-5">
            
            <div className="bg-white w-[92%] rounded-2xl flex flex-col  items-center max-md:pl-2">
                <div className=" border-b-2 border-gray-300 w-[90%] py-4">
                    <h3 className="text-2xl font-bold max-lg:text-lg">Today's Sales Graph</h3>
                </div>
                <LineChart
                    xAxis={[{ data: [0,1, 2, 3, 5, 8, 10,11, 12, 13, 14, 15 ,16 ,17 ,18 ,19 ,20 ,22 ,23 ,24] }]}
                    series={[
                        {
                        // data: [100, 250, 400, 1000, 1200, 5000, 5500, 7000, 8500 ,9000 ,9200, 10000, 10500, 11000 ,12000, 13200, 14000 ,14100],
                            data: graphValue()
                        },
                    ]}
                    width={`850`}
                    height={`350`}
                    />
            </div>

        </div>

        <div className="pb-10 mt-10 flex justify-center  gap-5">
            <div className="bg-white w-[93%] pb-6 rounded-2xl flex flex-col items-center">
                <div className=" border-b-2 border-gray-300 w-[90%] py-4">
                    <h3 className="text-2xl font-bold max-lg:text-lg max-sm:text-sm">Recent Orders</h3>
                </div>
                <table className="w-[90%] text-center">
                    <thead className="border-b-2 border-gray-300 text-2xl opacity-40 max-lg:text-sm max-sm:text-[0.6rem]">
                        <tr className="h-20 flex justify-between items-center">
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Customer ID</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody className="w-[100%] flex flex-col-reverse">
                        {
                            orderDetails.map((datas)=>(
                                <tr key={datas.data._id} className="border-b-2 border-gray-300 text-sm h-20 flex justify-between items-center max-lg:text-xs max-md:text-[0.5rem] max-sm:text-[0.4rem]">
                                    <td className='flex justify-center items-center '>
                                        <img className='w-15 h-15 object-contain max-sm:w-7 max-sm:h-7' src={datas.item.image} alt="" />
                                        <p className='w-30 h-10 text-wrap truncate text-left max-sm:w-10 max-md:w-15 max-lg:h-8 max-sm:h-13'>{datas.item.title}</p>
                                    </td>
                                    <td className=' -ml-25 max-md:-ml-15 max-sm:-ml-10'><p className='max-sm:h-fit'>{datas.data.quantity}</p></td>
                                    <td className='-ml-5 max-sm:-ml-5'><p className='w-20 h-10 text-wrap truncate max-sm:w-10 max-sm:h-fit'>#{datas.data._id}</p></td>
                                    <td className='-ml-10'><p className='w-20 h-10 text-wrap truncate max-sm:w-10 max-sm:h-fit'>{datas.data.createdAt}</p></td>
                                    <td className='-ml-10'><p className='w-20 h-10 text-wrap truncate max-sm:w-10 max-sm:h-fit'>#{datas.data.user_id}</p></td>
                                    <td>₹{datas.item.price*datas.data.quantity}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        
        </>
    )
}

export default Dashboard