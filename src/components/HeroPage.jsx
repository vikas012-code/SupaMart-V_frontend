import { Link } from "react-router-dom"
import hero_img from "../assets/homepage.jpg"
import audio_device from "../assets/audio_device.jpg"
import electronic_devices from "../assets/electronics_devices2.jpeg"
import { Carousel } from "@material-tailwind/react";


function HeroPage() {
    return (
      <>
      <Carousel className="w-[100vw] h-[50vw] overflow-hidden max-lg:" navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div> 
      )}
      autoplay={true}
      autoplayDelay={2000}
      loop={true}
      >

      <div className="">
        <img className="h-full w-full object-cover" src={electronic_devices} alt="" />
        <div className=" absolute top-[15vw] text-center ml-10 ">
          <h3 className="text-lg  sm:text-4xl font-extrabold text-blue-600 text-start max-lg:text-[0.7rem]">Best Place <br />For Buying Gadget</h3>
          <p className="text-xs sm:text-lg mb-4 max-lg:text-[0.5rem]">best place to buy smartphones , Speaker ,<br />headphone , earphone and TV in budget</p>
          <Link to={"/ProductCards"} className="text-xs sm:text-sm bg-blue-500 rounded-2xl p-2 text-white mr-5 max-lg:text-[0.5rem]">Shop Now</Link>
        </div>
      </div>


      <div className=" ">
        <img className="h-full  w-full object-cover " src={hero_img} alt="" />
        <div className=" absolute top-[15vw] text-center ml-10">
          <h3 className="text-lg  sm:text-4xl font-extrabold text-blue-600 text-start max-lg:text-[0.7rem]">Best SmartPhone <br />With Great Deals</h3>
          <p className="text-xs sm:text-lg mb-4 max-lg:text-[0.5rem]">best place to buy smartphones , Iphones<br /> with great deals and offer</p>
          <Link to={"/ProductCards/mobile"} className="text-xs sm:text-sm bg-blue-500 rounded-2xl p-2 text-white mr-5 max-lg:text-[0.5rem]">Shop Now</Link>
        </div>
      </div>


      <div className=" ">
        <img className="h-full  w-full object-cover" src={audio_device} alt="" />
        <div className=" absolute top-[15vw] text-center ml-10">
          <h3 className="text-lg  sm:text-4xl font-extrabold text-blue-600 text-start max-lg:text-[0.7rem]">Best Audio Products<br />With Best Experience</h3>
          <p className="text-xs sm:text-lg mb-4 max-lg:text-[0.5rem]">best place to buy HeadPhone , Speaker ,<br />Earphone For best Music Experience</p>
          <Link to={"/ProductCards/audio"} className="text-xs sm:text-sm bg-blue-500 rounded-2xl p-2 text-white mr-5 max-lg:text-[0.5rem]">Shop Now</Link>
        </div>
      </div>

      </Carousel>
      
      </>
    )
  }
  
  export default HeroPage