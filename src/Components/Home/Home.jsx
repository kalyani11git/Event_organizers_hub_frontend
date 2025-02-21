import React from 'react';
import Navbar from '../Navbar/Navbar';

const Home = () => {
  return (
    <>
     <Navbar />
      <div className="relative flex min-h-screen bg-black text-white">
      
        <div className="relative flex items-center flex-col lg:flex-row lg:ml-32 px-4 lg:px-0">
          {/* Text Content */}
          <div className="lg:w-[40rem]">
            <h1 className="text-5xl font-bold text-red-600">
              Transform Your Events<br />
              with <span className="text-white">Orna</span>Vista
            </h1>
            <p className="mt-4 text-lg text-gray-400">
              Discover the art of celebration with OrnaVista, your ultimate platform for all things event decoration.
              Whether you're an event organizer looking to showcase your stunning creations or someone searching for the perfect decorator, you're in the right place.
            </p>
            <button className="mt-6 px-6 py-3 border-2 border-red-700 text-white font-bold rounded-md hover:bg-red-700 transition duration-300">
              GET STARTED
            </button>
          </div>

          {/* Image */}
          {/* <img src="redLights.png" className="lg:ml-24 mt-8 lg:mt-0 w-full lg:w-auto max-w-md" alt="Event Decoration" /> */}
        </div>
      </div>
    </>
  );
};

export default Home;
