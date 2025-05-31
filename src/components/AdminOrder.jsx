function AdminOrder({props}) {

    const [totalOrder,totalOrderDetails,total]=props


    return (
        <div className="pb-10 mt-10 flex flex-col items-center  gap-5">
            <h3 className=" self-start p-5 -mt-7 font-bold  text-3xl">
                Total Orders List
            </h3>
                    <div className="bg-white w-[93%] pb-6 rounded-2xl flex flex-col items-center">
                        <div className=" border-b-2 border-gray-300 w-[90%] py-4">
                            <h3 className="text-2xl font-bold ">All Recent Purchases</h3>
                        </div>
                        <table className="w-[90%] text-center">
                            <thead className="border-b-2 border-gray-300 text-xl opacity-40">
                                <tr className="h-20 flex justify-between items-center">
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
                                        <tr key={datas.data._id} className="border-b-2 border-gray-300 text-sm h-20 flex justify-between items-center">
                                            <td className="flex">
                                                <img className="w-10 h-10 object-contain" src={datas.item.image} alt="" />
                                                <p className='w-30 h-10 text-wrap truncate text-left ml-2'>{datas.item.title}</p>
                                            </td>
                                            <td className="-ml-15"><p>{datas.data.quantity}</p></td>
                                            <td><p className='w-20 h-10 text-wrap truncate'>#{datas.data._id}</p></td>
                                            <td><p className='w-20 h-10 text-wrap truncate'>{datas.data.createdAt}</p></td>
                                            <td><p className='w-20 h-10 text-wrap truncate'>#{datas.data.user_id}</p></td>
                                            <td>₹{datas.item.price*datas.data.quantity}</td>
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