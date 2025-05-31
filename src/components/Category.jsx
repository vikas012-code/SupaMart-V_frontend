import { useContext, useEffect } from "react";
import { useState } from "react";
// import datas from "./datas.js"

import Cards from "./Cards.jsx";
import { UserContext } from "./context.js";

function Category({props}){

    const {datas}=useContext(UserContext)
   
    const [bestOf,setBestOf]=useState("")
        
    useEffect(()=>{
        props? setBestOf(props):setBestOf(" ");
    },[props])

    let filterData = datas?.filter((data)=> data.category.toLowerCase().includes(bestOf.toLowerCase()))
    return (<>

        <main className=" bg-white">
            <p  className=" flex justify-center text-3xl pt-4 font-bold text-cyan-800">
                BEST {bestOf.toUpperCase()}
            </p>
            <div className="flex overflow-x-scroll overflow-y-hidden">
            {filterData?.map((data) => 
             <div key={data._id}>
                <Cards key={data._id} data={data}/>
             </div>
            )}
            </div>
        </main>
        </>)
}

export default Category;