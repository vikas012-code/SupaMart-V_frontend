import CryptoJS from "crypto-js"
import { useContext, useState } from "react";
import { UserContext } from "./context";
import cancel_img from "../assets/cancel.png"
import Cookies from 'js-cookie'

function LoginPage(){

    let _key = "secret_key"

    const [passCorrect,setPassCorrect]=useState(null)

    const [OTPCorrect,setOTPCorrect]=useState(null)

    
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
                Password:"",
                otp:""
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
            setFormData({...formData,
                    UserName:"",
                    Email:"",
                    Password:""
                })
                setPassCorrect(false)
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

    async function sendOTP(){
        try {
            const response = await fetch("https://supamart-v-backend.onrender.com/user/sendotp", {
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
                console.log(res)
                setFormType("sendotp")
                setOTPCorrect(null)
                }
                else{
                    setOTPCorrect(true)
                }
        } catch (error) {
            console.log("error", error)
        }
    }

    async function verifyOTP(){
        try {
            const response = await fetch("https://supamart-v-backend.onrender.com/user/verifyotp", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email:formData.Email,
                    otp:formData.otp,
                }),
              });
              if(response.ok){
                const res=await response.json()
                console.log(res)
                setFormType("newpassword")
                setOTPCorrect(null)

                }
                else{
                    setOTPCorrect(false)
                }
        } catch (error) {
            console.log("error", error)
        }
    }

    async function SaveNewPassword(){
        let encryptPassword=encrypt(formData.Password);
        const response = await fetch("https://supamart-v-backend.onrender.com/user/resetpassword", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                email:formData.Email,
                password:encryptPassword 
            }),
          });
          if(response.ok){
            //console.log(response.json())
            setUserExit(false)
            setFormData({...formData,
                Email:"",
                Password:""
            })
            setFormType("login")
          }
          else{
            //console.log(response.json())
            setUserExit(true)
            setFormData({...formData,
                Email:"",
                Password:"",
                otp:""
            })
          }
    }

    return(
    <>
    {Auth==null &&
        <div className="flex justify-center items-center bg-white ">
            <div className="bg-white pb-5 w-[40vh] flex flex-col items-center rounded-2xl  shadow-gray-300 mt-10 mb-10  z-10 fixed top-50">
                <button className="w-8 h-8 absolute top-1 right-0.5 cursor-pointer" onClick={()=>{
                    setAuth("")
                }}><img className="w-7" src={cancel_img} alt="" />
                </button>
                <h3 className="text-3xl font-bold mt-10 mb-4">{formType=="login"?"Login":formType=="forgetpassword"?"ForgetPassword":"Register"}</h3>
                <form onSubmit={(e)=>{
                    e.preventDefault()
                    setFormData({...formData})
                    }} className="flex flex-col"
                >
                    {   formType==="sign up" 
                        &&
                        <>
                        <label className=" ml-2" htmlFor="Name">Name</label>
                        <input type="text" className="border rounded-lg pl-1 p-1" name="Name" value={formData.UserName}  onChange={(e)=>{
                            setFormData({...formData ,UserName:e.target.value})

                        }} />
                        </>
                    }

                    {
                    (formType==="sign up" || formType==="login"||formType==="forgetpassword")
                    &&
                    <>
                        <label className=" ml-2" htmlFor="Name">Email</label>
                    <input type="email" className="border rounded-lg pl-1 p-1" name="Name" value={formData.Email}  onChange={(e)=>{
                        setFormData({...formData ,Email:e.target.value})

                    }} />
                    </>
                    }

                    
                    {
                    (formType==="sign up" || formType==="login" || formType==="newpassword")
                    &&
                    <>
                    <label className="mt-5 ml-2 " htmlFor="Password">{formType==="newpassword"&& "New"} Password</label>
                    <input type="password" className=" border rounded-lg pl-1 p-1" name="Password" value={formData.Password} onChange={(e)=>{
                        setFormData({...formData ,Password:e.target.value})

                    }} />
                    </>
                    }

                    {
                    formType=="sendotp"
                    &&
                    <>
                    <label className="mt-5 ml-2 " >OTP</label>
                    <input type="number" className=" border rounded-lg pl-1 p-1"  value={formData.otp} onChange={(e)=>{
                        setFormData({...formData ,otp:e.target.value})

                    }} />
                    </>
                    }

                    <p className="ml-2 text-sm text-gray-300 w-60">Username and Password must be more the 4 characters and unique </p>
                    
                    <div className="flex justify-around">
                    {
                        formType=="login" 
                        && 
                        <div className="flex flex-col items-center gap-2 relative">
                            <button className=" mt-6 rounded-sm bg-blue-400 text-white  hover:bg-green-400 duration-300 w-23" onClick={(e)=>{   
                            formData.Email===import.meta.env.VITE_Admin_Name && formData.Password===import.meta.env.VITE_Admin_Password?setUser({...user,UserName:"admin"}) || setAuth("admin") 
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
        
                        <button className=" absolute -top-1 -right-6 flex justify-end text-cyan-600 cursor-pointer hover:underline" onClick={()=>{
                            setFormType("forgetpassword")
                        }}>
                            ForgetPassword
                        </button>
                        
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
                    {
                        formType=="forgetpassword" 
                        &&
                        <div className="flex flex-col items-center gap-2">
                            <button className=" mt-4 rounded-sm bg-blue-400 text-white hover:bg-green-400 duration-300 w-23" onClick={()=>{
                            formData.Email.length>0 && sendOTP() && setOTPCorrect(null)
                            }}>send OTP</button>

                            <a className=" cursor-pointer text-green-600 hover:underline " onClick={()=>{
                            setFormType("login") && setOTPCorrect(null)
                            }}>Login</a>
                        </div>

                    }

                    {
                        formType=="sendotp" 
                        &&
                        <div className="flex flex-col items-center gap-2">
                            <button className=" mt-4 rounded-sm bg-blue-400 text-white hover:bg-green-400 duration-300 w-23" onClick={()=>{
                            formData.Email.length>0 && sendOTP() && setOTPCorrect(null)
                            }}>resnd OTP</button>
                            <button className=" mt-4 rounded-sm bg-blue-400 text-white hover:bg-green-400 duration-300 w-23" onClick={()=>{
                            formData.otp.length>0 && verifyOTP() && setOTPCorrect(null)
                            }}>verify OTP</button>
                        </div>

                    }

                    {
                        formType=="newpassword" 
                        &&
                        <div className="flex flex-col items-center gap-2">
                            <button className=" mt-4 rounded-sm bg-blue-400 text-white hover:bg-green-400 duration-300 w-23" onClick={()=>{
                            formData.Password.length>4 && SaveNewPassword()
                            }}>save</button>
                        </div>
                    }
                    
                    </div>
                </form>
                {OTPCorrect===false && <h3 className="mt-4 text-red-500">invalid OTP</h3>}
                {OTPCorrect===true && <h3 className="mt-4 text-red-500">invalid Email</h3>}
                {passCorrect===false && <h3 className="mt-4 text-red-500">Password incorrect</h3>}
                {userExit===true && <h3 className="mt-4 text-red-500">User Already Exit</h3>}
                {userExit===false && <h3 className="mt-4 text-green-500">Succesfully Registered</h3>}
            </div>
        
        </div>
    }
    </>)
}

export default LoginPage