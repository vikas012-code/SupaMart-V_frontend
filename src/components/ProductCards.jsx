import { useContext, useEffect } from "react";
import { useState } from "react";
// import datas from "./datas.js"
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "./context.js";
import Cards from "./Cards.jsx";


function ProductCards(){

    let {category} = useParams()

    const {searchItem,datas}=useContext(UserContext);

    
    const [Datas, setDatas]=useState([ ])

    useEffect(()=>{
        setDatas(datas)
    },[])


    const navigate=useNavigate()

    if(Datas.length<=0){
        navigate("/")
    }

    let filterData = Datas?.filter((data)=> category? data.category.includes(category) : (data.title).toLowerCase().includes(searchItem.toLowerCase()))
    return (<>

        <main className="flex flex-wrap justify-center bg-white">
            {filterData?.map((data) => 
            <Cards key={data._id} data={data}/>
            )}
        </main>
        </>)
}

export default ProductCards;