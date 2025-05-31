import { useContext, useEffect } from "react";
import { useState } from "react";
// import datas from "./datas.js"
import Cards from "./Cards.jsx";
import { UserContext } from "./context.js";

function Category({props}){
    const {datas}=useContext(UserContext)
    
    const [search,setSearch]=useState("")

    props?" ":props=" ";

    useEffect(()=>{
        setSearch(props.category)
    },[props])

    const [Datas, setDatas]=useState([])

    useEffect(()=>{
        setDatas(datas)
    },[])

    let filterData = Datas?.filter((data)=> (data.category).toLowerCase().includes(search.toLocaleLowerCase()))
    return (<>

        <main>
            <div className="flex overflow-x-scroll overflow-y-hidden">

            {filterData?.map((data) => 
                <div key={data._id}>
                    <Cards data={data}/>
                </div>
            )}
            </div>
        </main>
        </>)
}

export default Category;