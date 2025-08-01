import { useContext, useEffect } from "react";
import { useState } from "react";
// import datas from "./datas.js"

import Cards from "./Cards.jsx";
import { UserContext } from "./context.js";
import SkeletonLoading from "./skelatonloading.jsx";

function Category({props}){
    const {datas}=useContext(UserContext)
   
    const [bestOf,setBestOf]=useState("")
        
    useEffect(()=>{
        props? setBestOf(props):setBestOf(" ");
    },[props])

    let filterData = datas?.filter((data)=> data.category.toLowerCase().includes(bestOf.toLowerCase()))
    return (<>

        <main className=" bg-white w-[100vw]">
            <p  className=" flex justify-center text-3xl pt-4 font-bold text-cyan-800 max-lg:text-xl">
                BEST {bestOf.toUpperCase()}
            </p>
            <div className="flex overflow-x-scroll overflow-y-hidden pl-5 max-lg:pl-2">
            {
            datas.length==0?
            Array(10).fill(0).map((item,i)=>(
                <div key={i}>
                    <SkeletonLoading/>
                </div>
            ))
            :
            filterData?.map((data) => 
             <div className="" key={data._id}>
                <Cards key={data._id} data={data}/>
             </div>)
            
            }
            </div>
        </main>
        </>)
}

export default Category;