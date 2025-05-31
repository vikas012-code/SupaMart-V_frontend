import { Link } from "react-router-dom";
import smartphone from "../assets/smartphone.png";


function Footer(){
    return (
        <>
        <footer className="mt-2 bg-blue-500 text-white p-6">
            <div className="flex justify-between p-3 pb-10">
            <div>
                <Link className="ml-2 flex items-center gap-2 hover:scale-105 duration-300" to={"/"}> 
                    <img className="w-15 h-15" src={smartphone} alt="mobileshop"/> 
                    <h3 className="text-2xl font-extrabold text-white">SupaMart-V</h3>
                </Link>
                <p className="mb-3">Contact Us</p>
                <div>
                    <p className="flex items-center"><img className="w-5" src="https://cdn-user-icons.flaticon.com/192011/192011013/1742224426646.svg?token=exp=1742225382~hmac=345ba5a5a4f5ce03d64fd710a18c2282" alt="" /> Whats App</p>
                    <p className="ml-5 mb-2">7788996655</p>
                    <p className="flex items-center"><img className="w-5" src="https://cdn-user-icons.flaticon.com/192011/192011013/1742224666106.svg?token=exp=1742225566~hmac=9fa0a8bc1fe89e5e55047fda2b26fe1f" alt="" /> Call Us</p>
                    <p className="ml-5">7788996655</p>
                </div>
            </div>

            <div>
                <h2  className="text-xl">Popular Products Category</h2>
                <hr className=" opacity-60" />
                <ul className=" list-disc p-5">
                    <li className=" hover:text-amber-400 duration-300"><Link to={"/body/audio"}>HeadPhones</Link></li>
                    <li className=" hover:text-amber-400 duration-300"><Link to={"/body/mobile"}>Mobiles</Link></li>
                    <li className=" hover:text-amber-400 duration-300"><Link to={"/body/gaming"}>Gamespad</Link></li>
                    <li className=" hover:text-amber-400 duration-300"><Link to={"/body/tv"}>TV</Link></li>
                    <li className=" hover:text-amber-400 duration-300"><Link to={"/body/audio"}>Speakers</Link></li>
                </ul>
            </div>
            

            <div className="mr-20">
                <h2 className="text-xl">Services</h2>
                <hr className=" opacity-60" />
                <ul className=" list-disc p-5">
                    <li className=" hover:text-amber-400 duration-300"><Link to={"/aboutus"}>About Us</Link></li>
                    <li className=" hover:text-amber-400 duration-300"><Link to={"/termsandcondition"}>Terms & Conditions</Link></li>
                    <li className=" hover:text-amber-400 duration-300"><Link to={"/privacyandpolicy"}>Privacy & Policy</Link></li>
                    <li className=" hover:text-amber-400 duration-300"><Link to={"/cancellation"}>Cancellation & Return Policy</Link></li>

                </ul>
            </div>

            </div>
            <hr className=" opacity-60"  />
            <div className="flex h-20 justify-evenly">
                <div className="flex p-4 gap-4">
                    <div className="flex items-center">
                        <img className="w-6 mr-3" src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63eb0ed6e927bdf5bc4309e0_briefcase.svg" loading="lazy" alt=""/>
                        <p>Become <br /> Seller</p>
                    </div>
                    <div className="flex items-center">
                        <img className="w-6 mr-3" src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63eb0ed6c4510c256356f4cd_gift.svg" loading="lazy" alt=""/>
                        <p>Gift <br /> Cards</p>
                    </div>
                    <div className="flex items-center">
                        <img className="w-6 mr-3" src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63eb0ed6ae57fd74e0402aa4_help-circle.svg" loading="lazy" alt=""/>
                        <p>
                            Help <br /> Canter
                        </p>
                    </div>
                </div>
                <div className="flex items-center">
                    
                    <div>All Right reserved by vikas 
                        <a href="/" > ui/ux design </a>
                         | 2022
                    </div>
                </div>
            </div>
        </footer>
        </>
    )

}
export default Footer