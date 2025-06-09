function AdminOrder({props}) {

    const [totalOrderDetails]=props


    return (
        <div className="pb-10 mt-10 flex flex-col items-center">
            <h3 className=" self-start p-5 -mt-7 font-bold  text-3xl max-lg:text-lg">
                Total Orders List
            </h3>
                    <div className="bg-white w-[93%] pb-6 rounded-2xl flex flex-col items-center">
                        <div className=" border-b-2 border-gray-300 w-[90%] py-4">
                            <h3 className="text-2xl font-bold max-lg:text-lg">All Recent Purchases</h3>
                        </div>
                        <table className="w-[90%] text-center">
                            <thead className="border-b-2 border-gray-300 text-xl opacity-40 max-lg:text-sm max-sm:text-[0.5rem]">
                                <tr className="h-20 flex justify-between items-center max-sm:p-2">
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Order ID</th>
                                    <th>Date</th>
                                    <th>Customer ID</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody className="w-[100%] flex flex-col">
                                {
                                    totalOrderDetails.map((datas)=>(
                                        <tr key={datas.data._id} className="border-b-2 border-gray-300 text-sm h-20 flex justify-between items-center max-lg:text-xs max-sm:text-[0.4rem] w-[full]">
                                            <td className="flex w-[20%]">
                                                <img className="w-10 h-10 object-contain max-sm:w-6 max-sm:h-6" src={datas.item.image} alt="" />
                                                <p className=' h-10 text-wrap truncate text-left ml-2 max-sm:ml-1 w-full'>{datas.item.title}</p>
                                            </td>
                                            <td className="-ml-2 w-[15%]"><p className="w-[90%]">{datas.data.quantity}</p></td>
                                            <td className="w-[20%]"><p className='w-20 h-10 text-wrap truncate max-sm:w-[90%] max-sm:h-fit'>#{datas.data._id}</p></td>
                                            <td className="w-[15%]"><p className='w-20 h-10 text-wrap truncate max-sm:w-[90%] max-sm:h-fit'>{datas.data.createdAt}</p></td>
                                            <td className="w-[20%]"><p className='w-20 h-10 text-wrap truncate max-sm:w-[90%] max-sm:h-fit'>#{datas.data.user_id}</p></td>
                                            <td className="w-[15%]">₹{datas.item.price*datas.data.quantity}</td>
                                         </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
            </div>
    )
}

export default AdminOrder;