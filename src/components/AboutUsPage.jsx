function AboutUsPage() {
  return (
    <div className="bg-gray-100 ">
      
      <section className="bg-blue-500 text-white py-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">About SupaMart-V</h1>
          <p className="text-lg">
            Powering your lifestyle with the latest in phones, speakers, earphones, and gaming tech.
          </p>
        </div>
      </section>

      
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Who We Are</h2>
          <p className="text-lg text-gray-600">
            At <span className="font-semibold text-blue-500">SupaMart-V</span>, 
            we are dedicated to bringing you top-tier electronics
            that enhance your digital lifestyle. From smartphones to immersive gaming gear,
            we create the best products to meet your tech needs.
          </p>
        </div>

        
        <div className="flex justify-evenly gap-6 flex-wrap">
         
          <div className="bg-white rounded-2xl shadow-lg p-4 text-center w-60 max-lg:w-35 max-lg:h-50 max-lg:p-3">
            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80"
              alt="Smartphone"
              className="w-full h-40 object-cover rounded-xl mb-4 max-lg:h-25 max-lg:mb-2"
            />
            <h3 className="text-xl font-semibold max-lg:text-sm">Smartphones</h3>
            <p className="text-sm text-gray-600 max-lg:text-xs">Latest flagship and budget devices.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4 text-center w-60 max-lg:w-35 max-lg:h-50 max-lg:p-3">
            <img
              src="https://arcticfox.com/cdn/shop/files/8_b5937b5b-8c26-4450-a248-3162a20e83a3.jpg?v=1706020146"
              alt="Speakers"
              className="w-full h-40 object-cover rounded-xl mb-4 max-lg:h-25 max-lg:mb-2"
            />
            <h3 className="text-xl font-semibold max-lg:text-sm">Speakers</h3>
            <p className="text-sm text-gray-600 max-lg:text-xs">Powerful sound for every space.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4 text-center w-60 max-lg:w-35 max-lg:h-50 max-lg:p-3">
            <img
              src="https://plus.unsplash.com/premium_photo-1668418188837-d40b734ed6d2?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWFycGhvbmVzfGVufDB8fDB8fHww"
              alt="Earphones"
              className="w-full h-40 object-cover rounded-xl mb-4 max-lg:h-25 max-lg:mb-2"
            />
            <h3 className="text-xl font-semibold max-lg:text-sm">Earphones</h3>
            <p className="text-sm text-gray-600 max-lg:text-xs">Wireless and wired sound experience.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4 text-center w-60 max-lg:w-35 max-lg:h-50 max-lg:p-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuAQ_RQmI5Ucxw5uVqu5bGHU2d2mkvpkmejAPi2FVr72fpBV1Bbchilju353pkJRZ8CLU&usqp=CAU"
              alt="Gaming"
              className="w-full h-40 object-cover rounded-xl mb-4 max-lg:h-25 max-lg:mb-2"
            />
            <h3 className="text-xl font-semibold max-lg:text-sm">Gaming</h3>
            <p className="text-sm text-gray-600 max-lg:text-xs">Gear to level up your gameplay.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutUsPage