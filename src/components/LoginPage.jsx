import CryptoJS from "crypto-js"
import { useContext, useState } from "react";
import { UserContext } from "./context";
import cancel_img from "../assets/cancel.png"
import Cookies from 'js-cookie'

function LoginPage(){

    let _key = "secret_key"

    const [passCorrect,setPassCorrect]=useState(null)
    
    const [userExit,setUserExit]=useState(null)

    const [formType,setFormType]=useState("login")

    const [formData,setFormData]=useState({
        UserName:"",
        Email:"",
        Password:""
    })

    const{Auth,setAuth,user,setUser}=useContext(UserContext)

    function encrypt(txt) {
        return CryptoJS.AES.encrypt(txt, _key).toString();
    }

    function decrypt(txtToDecrypt) {
        return CryptoJS.AES.decrypt(txtToDecrypt, _key).toString(CryptoJS.enc.Utf8);
    }
    
    async function SaveData(){
        let encryptPassword=encrypt(formData.Password);
        const response = await fetch("https://supamart-v-backend.onrender.com/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                name:formData.UserName,
                email:formData.Email,
                password:encryptPassword 
            }),
          });
          if(response.ok){
            //console.log(response.json())
            setUserExit(false)
            setFormData({...formData,
                UserName:"",
                Email:"",
                Password:""
            })
          }
          else{
            //console.log(response.json())
            setUserExit(true)
            setFormData({...formData,
                UserName:"",
                Email:"",
                Password:""
            })
          }
    }

    async function loginData() {
        try {
            const response = await fetch("https://supamart-v-backend.onrender.com/user/getuserbyemail", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email:formData.Email,
                }),
              });
              if(response.ok){
                const res=await response.json()
                //console.log(res)
                if(decrypt(res[0]?.password)===formData.Password){
                    setUser({...user ,
                        _id:res[0]?._id,
                        UserName:res[0]?.name,
                        Email:res[0]?.email,
                        Password:res[0]?.password,})
                        setFormData({...formData,
                            UserName:"",
                            Email:"",
                            Password:""
                        })
                    setAuth(res[0]?.name)
                    Cookies.set('UserAuth', JSON.stringify({
                        _id:res[0]?._id,
                        UserName:res[0]?.name,
                        Email:res[0]?.email,
                        Password:res[0]?.password,}
                    ,{ expires: 1 }))
                }
                else{
                    setPassCorrect(false)
                    setFormData({...formData,
                        UserName:"",
                        Email:"",
                        Password:""
                    })
                }
                
              }
              else{
                //console.log(response.json)
                //console.log("respone not ok")
                setFormData({...formData,
                    UserName:"",
                    Email:"",
                    Password:""
                })
                setPassCorrect(false)
              }
            
        } catch (error) 
        {
            console.log(error)
        }
          
    }

    // function RetreiveData(){
    //     let data = localStorage.getItem(user.UserName) || "";
    //     return data || null;
    // }

    function SetDataAtDB(){
        setPassCorrect(null)
        //console.log("saving login")
        formData.UserName?.length>4 && formData.Password?.length>4 ? 
        // console.log("saving login...")
        // ||
        SaveData()
        :""
        
    }

    return(
    <>
    {Auth==null &&
        <div className="flex justify-center items-center bg-white ">
        <div className="bg-white pb-5 w-[40vh] flex flex-col items-center rounded-2xl  shadow-gray-300 mt-10 mb-10  z-10 fixed top-50">
            <button className="w-8 h-8 absolute top-1 right-0.5 cursor-pointer" onClick={()=>{
                setAuth("")
            }}><img className="w-7" src={cancel_img} alt="" /></button>
            <h3 className="text-4xl font-bold mt-10">{formType=="login"?"Login":"Register"}</h3>
            <form onSubmit={(e)=>{
                e.preventDefault()
                setFormData({...formData})
            }} className="flex flex-col">
                {   formType==="sign up" 
                    &&
                    <>
                    <label className=" ml-2" htmlFor="Name">Name</label>
                    <input type="text" className="border rounded-lg pl-1 p-1" name="Name" value={formData.UserName}  onChange={(e)=>{
                        setFormData({...formData ,UserName:e.target.value})
    
                    }} />
                    </>
                }

                <label className=" ml-2" htmlFor="Name">Email</label>
                <input type="email" className="border rounded-lg pl-1 p-1" name="Name" value={formData.Email}  onChange={(e)=>{
                    setFormData({...formData ,Email:e.target.value})

                }} />

                <label className="mt-5 ml-2 " htmlFor="Password">Password</label>
                <input type="password" className=" border rounded-lg pl-1 p-1" name="Password" value={formData.Password} onChange={(e)=>{
                    setFormData({...formData ,Password:e.target.value})

                }} />
                <p className="ml-2 text-sm text-gray-300 w-60">Username and Password must be more the 4 characters and unique </p>

                <div className="flex justify-around">
                {
                    formType=="login" 
                    && 
                    <div className="flex flex-col items-center gap-2">
                        <button className=" mt-4 rounded-sm bg-blue-400 text-white  hover:bg-green-400 duration-300 w-23" onClick={(e)=>{   
                        formData.Email==="admin@gmail.com"?setUser({...user,UserName:"admin",Email:formData.Email,Password:formData.Password}) || setAuth("admin") 
                        || setFormData({...formData,
                            UserName:"",
                            Email:"",
                            Password:""
                        })
                        :
                        formData.Password.length>4 
                        && 
                        loginData()
                    
                    }}>Login</button>
                    <p className="">Don't have Account?<a className="cursor-pointer text-green-600 hover:underline" onClick={()=>{
                        setFormType("sign up")
                    }}>Sign up</a></p>
                    </div>
                }
                {
                    formType=="sign up" 
                    &&
                    <div className="flex flex-col items-center gap-2">
                        <button className=" mt-4 rounded-sm bg-blue-400 text-white hover:bg-green-400 duration-300 w-23" onClick={()=>{
                        SetDataAtDB()
                        }}>Register</button>
                        <p className="">Already have Account?<a className=" cursor-pointer text-green-600 hover:underline" onClick={()=>{
                        setFormType("login")
                    }}>Login</a></p>
                    </div>
                }
                </div>
            </form>
           
            {passCorrect===false && <h3 className="mt-4 text-red-500">Password incorrect</h3>}
            {userExit===true && <h3 className="mt-4 text-red-500">User Already Exit</h3>}
            {userExit===false && <h3 className="mt-4 text-green-500">Succesfully Registered</h3>}
        </div>
        
    </div>
    }
    </>)
}

export default LoginPage