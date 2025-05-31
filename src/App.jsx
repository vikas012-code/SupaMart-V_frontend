import Navbar from "./components/Navbar"

import Footer from "./components/Footer"

import { Outlet } from "react-router-dom"
import { UserContext } from "./components/context"
import { useEffect, useState } from "react"
import LoginPage from "./components/LoginPage"
import AdminPanel from "./components/AdminPanel"
import Cookies from 'js-cookie'


function App() {

  const [datas ,setDatas]=useState([])

  
  
  
  const [searchItem,setSearchItem]= useState("")

  const [cartItem ,setCartItem]=useState([])

  const [cartQuantity,setCartQuantity]=useState(0)

  const [total,setTotal]=useState(0)

  
const [ProgressBar,setProgressBar]=useState(1)

const [Auth,setAuth]=useState(null)

const[Ordered,setOrdered]=useState([])

const [section,setSection]=useState("myaccount")

const [WishListItem,setWishListItem]=useState([])

const [refresh,setRefresh]=useState(0)


const [user,setUser]=useState({
  UserName:"",
  Email:"",
  Password:"",
  _id:""
})
const cookie=Cookies.get("UserAuth")


//admin@gmail.com
//admin


useEffect(()=>{
  if(cookie){
    const CookieAuth=JSON.parse(cookie)
    setUser({
    ...user,
    UserName:CookieAuth.UserName,
    Email:CookieAuth.Email,
    Password:CookieAuth.Password,
    _id:CookieAuth._id
    })
  
    setAuth(CookieAuth.UserName)
  }
}
,[Auth])

//admin@gmail.com
//admin


const [ShippingAddress,setShippingAddress]=useState({
  fullName:"",
  StreetAddress:"",
  Floor:"",
  State:"",
  City:"",
  Pincode:null,
  Email:"",
  PhoneNumber:null,
})



  useEffect(()=>{
    fetch("https://supamart-v-backend.onrender.com/products")
    .then((res)=> res.json())
    .then((res)=>setDatas(res))
    .catch((err)=>{console.log(err)})
  },[Ordered,refresh])




useEffect(() =>{
  //console.log("wishlist calling..")
  if(user._id){
    try {
      fetch("https://supamart-v-backend.onrender.com/wishlists/byId",
        {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            _id: user._id 
        }),
      })
      .then((respone) => respone.json())
      .then((res)=> {
          //console.log(res) 
        return setWishListItem(res)})
      .catch((err)=>{console.log(err)})
    } catch (error) {
      console.log(error)
    }
  }
  if(user.UserName){
    setShippingAddress({
      ...ShippingAddress,
      fullName:user.UserName,
      Email:user.Email
    })
  }
},
[user,WishListItem.length])

useEffect(() =>{
  //console.log("order calling..")
  if(user._id){
  try {
    fetch("https://supamart-v-backend.onrender.com/orders/byId",
      {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
          _id: user._id 
      }),
    })
    .then((respone) => respone.json())
    .then((res)=> {
      //console.log(res) 
      return setOrdered(res)})
    .catch((err)=>{console.log(err)})
    //console.log(WishListItem.length)
  } catch (error) {
    console.log(error)
  }
}
},
[user,Ordered.length])

const cartData=JSON.parse(localStorage.getItem("cartData"))

useEffect(()=>{
        if(cartData)
            {
            setCartItem([...cartItem,...cartData])
            }
        if(cartItem.length>0){
            localStorage.setItem("cartData",JSON.stringify(cartItem))
        }
    },[])




const value={datas,searchItem,setSearchItem,cartItem ,setCartItem,cartQuantity,setCartQuantity,total,setTotal,ShippingAddress,setShippingAddress,ProgressBar,setProgressBar,
  Auth,setAuth,Ordered,setOrdered,WishListItem,setWishListItem,user,setUser,section,setSection,refresh,setRefresh}

  

  if(user.Email==="admin@gmail.com" && user.Password==="admin"){
    return (
        <UserContext.Provider value={value}>
        <div className={`${Auth===null?" pointer-events-none opacity-60":""}`}>
        <AdminPanel/>
        </div>
        <LoginPage/>
        </UserContext.Provider>
      )
  }
  else{
    return (
        <UserContext.Provider value={value}>
        <div className={`${Auth===null?" pointer-events-none opacity-60":""}`}>
          <Navbar/>
          <Outlet/>
          <Footer/>
        </div>
        <LoginPage/>
        </UserContext.Provider>
      )

  }
}

export default App
