function AdminOrder({props}) {

    const {totalOrderDetails}=props


    return (
        <div className="pb-10 mt-10 flex flex-col items-center ">
            <h3 className=" self-start p-5  -mt-7 font-bold  text-3xl max-lg:text-lg">
                Total Orders List
            </h3>
                    <div className="bg-white w-[93%] pb-6 rounded-2xl flex flex-col items-center">
                        <div className=" border-b-2 border-gray-300 w-[90%] py-4">
                            <h3 className="text-2xl font-bold max-lg:text-lg">All Recent Purchases</h3>
                        </div>
                        <div className="w-[90%] text-center">
                            <div className="border-b-2 border-gray-300 text-xl opacity-40 w-[100%] max-lg:text-sm max-sm:text-[0.5rem]">
                                <div className="h-20 flex justify-between items-center max-sm:p-2 max-lg:w-[100%]">
                                    <p>Product</p>
                                    <p>Quantity</p>
                                    <p>Order ID</p>
                                    <p>Date</p>
                                    <p>Customer ID</p>
                                    <p>Amount</p>
                                </div>
                            </div>
                            <div className="w-[100%] flex flex-col">
                                {
                                    totalOrderDetails.map((datas)=>(
                                        <div key={datas.data._id} className="w-[100%] border-b-2 border-gray-300 text-sm h-20 flex justify-between items-center max-lg:text-xs max-sm:text-[0.4rem]">
                                            <div className="flex w-[20%]">
                                                <img className="w-10 h-10 object-contain max-sm:w-6 max-sm:h-6" src={datas.item.image} alt="" />
                                                <p className=' h-10 text-wrap truncate text-left ml-2 max-sm:ml-1 w-full'>{datas.item.title}</p>
                                            </div>
                                            <div className="-ml-2 w-[15%]"><p className="w-[90%]">{datas.data.quantity}</p></div>
                                            <div className="w-[20%]"><p className='w-20 h-10 text-wrap truncate max-sm:w-[90%] max-sm:h-fit'>#{datas.data._id}</p></div>
                                            <div className="w-[15%]"><p className='w-20 h-10 text-wrap truncate max-sm:w-[90%] max-sm:h-fit'>{datas.data.createdAt}</p></div>
                                            <div className="w-[20%]"><p className='w-20 h-10 text-wrap truncate max-sm:w-[90%] max-sm:h-fit'>#{datas.data.user_id}</p></div>
                                            <div className="w-[15%]">₹{datas.item.price*datas.data.quantity}</div>
                                         </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
            </div>
    )
}

export default AdminOrder;