import smartphone from "../assets/smartphone.png";
import account_icon from "../assets/account_icon.png";
import cart_icon from "../assets/cart_icon.png";
import search_icon from "../assets/search_icon.png";
import { useContext, useState, } from "react";
import { Link,useNavigate } from "react-router-dom";
import { UserContext } from "./context.js";
import heart from "../assets/heart.png";





function Navbar() {
    const {searchItem,setSearchItem,cartQuantity,Auth,setSection}=useContext(UserContext);
    const navigate=useNavigate()

    const handleSubmit=(e)=>{
        e.preventDefault()
        navigate("/body")
    }

    const [isOpen,setIsOpen]=useState(true)

    return (
      <>
      <nav className="w-[100vw] bg-white h-20 flex justify-evenly items-center drop-shadow-lg fixed top-0 z-50 max-lg:justify-between max-lg:fixed max-lg:top-0">
        <div className=" flex justify-center items-center">
            <Link className=" flex justify-center items-center gap-2 hover:scale-105 duration-300" to={"/"}> 
                <img className="w-16 h-16 " src={smartphone} alt="mobileshop"/> 
                <h3 className="text-3xl font-extrabold text-blue-600 ">SupaMart-V</h3>
            </Link>
        </div>

        <div className={`flex justify-between items-center max-lg:flex-col max-lg:bg-white max-lg:items-start max-lg:absolute max-lg:top-20 max-lg:right-0 max-lg:p-5 ${isOpen?"max-lg:hidden":"max-lg:block"}`}>
            <ul className="flex gap-10 max-lg:flex-col max-lg:mb-5">
            <button className="peer duration-300 h-20 border-b-2 border-transparent a hover:border-b-2 hover:text-blue-500 hover:scale-110 flex items-center focus:outline-none max-lg:h-0" >Category </button>
            <ul className=" invisible bg-white absolute top-20 p-1 rounded-b-lg peer-focus:visible active:visible ease-linear z-50 max-lg:top-10 max-lg:left-0">
                <Link className="border-b border-gray-300 block hover:scale-95 duration-200" to="/body/mobile" ><img className="w-20 inline" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGSWYehtNHc5FsdWJBLqfn_8hBC0kSqEymNg&s" alt="" />Mobiles</Link>
                <Link className="border-b border-gray-300 block hover:scale-95 duration-200" to="/body/audio"><img className="w-20 inline " src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MUW33_AV3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1712255584873" alt="" />Headphones</Link>
                <Link className="border-b border-gray-300 block hover:scale-95 duration-200" to="/body/tv"><img className="w-20 inline " src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk9cJPdKE_QpzvQvYUYdmT69WYq5VyGTNbxA&s" alt="" />TV</Link>
                <Link className="block hover:scale-95 duration-200 " to="/body/gaming"><img className="w-20 inline " src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjpkPv4DZbPXzKQrmtu8nxJSMeC1zGXAnIiA&s" alt="" />Gaming</Link>
            </ul>
            <li className="flex items-center hover:text-blue-500 hover:scale-110 duration-300" ><Link to="body">What's new</Link></li>
        </ul>

        <div >
            <form className="flex justify-center items-center" onSubmit={handleSubmit}>
                <input className=" border h-10 rounded-3xl w-80 focus:border-cyan-600 focus:border-2 focus:outline-hidden p-3 focus:scale-110 duration-300 border-gray-400 peer" type="text" placeholder="Search . . . ." value={searchItem} onChange={(e)=>{
                    setSearchItem(e.target.value)
                }} />
                <img className=" h-6 relative right-10 peer-focus:invisible  duration-100 ease-in-out" src={search_icon} alt="search" />
            </form>
        </div>

        <ul className="flex gap-5 justify-around items-center max-lg:flex-col max-lg:items-start max-lg:mt-5">
            <li><Link className="flex justify-center items-center gap-3 hover:text-blue-500 hover:scale-110 duration-300" to="/account" onClick={()=>{
                setSection("mywishlist")
            }}><img className="w-6 h-6" src={heart} alt="accont" /> <p>{"WishList"}</p></Link></li>
            <li><Link className="flex justify-center items-center gap-3 hover:text-blue-500 hover:scale-110 duration-300" to="/account"  onClick={()=>{
                setSection("myaccount")
            }}><img className="w-6 h-6" src={account_icon} alt="accont" /> <p>{Auth?Auth:"Account"}</p></Link></li>
            <li><Link className="flex justify-center items-center gap-3 hover:text-blue-500 hover:scale-110 duration-300 " to="/cart"><img className="w-6 h-6" src={cart_icon} alt="cart" /> <p>Cart{cartQuantity>0 &&`(${cartQuantity})`}</p></Link></li>
        </ul>
        </div>

        <button className="w-10 max-lg:block hidden" onClick={()=>{
            setIsOpen(!isOpen)
        }}><img className="w-full" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png" alt="icon" /></button>
      </nav>
      <div className="mt-20"></div>
      </> 
    )
  }
  
  export default Navbar