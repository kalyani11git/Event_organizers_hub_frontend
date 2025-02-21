import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import MyProfile from '../Home/MyProfile';
import { useSelector } from 'react-redux';
import UploadImage from '../Gallery/UploadImage';

const Navbar = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.token.token);
  const role = useSelector((state) => state.role.role);

  // Function for navigating to login form
  const handleLogin = () => {
    navigate('/LoginForm');
  };

  const handleUplaodImageButton = () =>{
    navigate('/uploadImage')
  }

  // Function for navigating to sign-up form
  const handleSignup = () => {
    navigate('/SignUpForm');
  };

  return (
    <div>
      <div className="relative bg-[#171717] text-white font-serif flex flex-row flex-wrap justify-evenly items-center h-20">
        <div className="text-2xl font-bold">Orna<span className="text-[#DA0037]">Vista</span></div>
        <div>
          <nav className="flex gap-7">
            <NavLink to="/" className="rounded-md" style={({ isActive }) => isActive ? { border: '0.1px #444444 solid', paddingLeft: 10, paddingRight: 10 } : { color: 'white' }}>Home</NavLink>
            <NavLink to="/gallery" className="rounded-md" style={({ isActive }) => isActive ? { border: '0.1px #444444 solid', paddingLeft: 10, paddingRight: 10 } : { color: 'white' }}>Gallery</NavLink>
            {
              role==="Organizer" ? <NavLink to="/followers" className="rounded-md" style={({ isActive }) => isActive ? { border: '0.1px #444444 solid', paddingLeft: 10, paddingRight: 10 } : { color: 'white' }}>Followers</NavLink>
              : role==='User'?
                <> <NavLink to="/following" className="rounded-md" style={({ isActive }) => isActive ? { border: '0.1px #444444 solid', paddingLeft: 10, paddingRight: 10 } : { color: 'white' }}>Following</NavLink>
                    <NavLink to="/favourite" className="rounded-md" style={({ isActive }) => isActive ? { border: '0.1px #444444 solid', paddingLeft: 10, paddingRight: 10 } : { color: 'white' }}>Favourite</NavLink>
                 </> :
                 <></>
              
            }
           <NavLink to="/contact" className="rounded-md" style={({ isActive }) => isActive ? { border: '0.1px #444444 solid', paddingLeft: 10, paddingRight: 10 } : { color: 'white' }}>Contact Us</NavLink>
          </nav>
        </div>
        <div className="flex flex-row justify-center items-center gap-3">
          {
            token !== '' ?

              <div className='absolute flex items-center justify-center gap-2'>
              <MyProfile />

              {
                role=="Organizer" ? 
                <>
                 <NavLink to='/uploadImage'>
              <button type='button'
              className="px-2 py-1 border-2 border-red-700 text-white rounded-md hover:bg-red-700 transition duration-300"
              onClick={handleUplaodImageButton}
              >Upload Decoration</button>
              </NavLink>
                
                </>:<></>
              }
             
              </div>
              :
              <>
                <NavLink to="/LoginForm">
                  <button type="button" className="px-5 py-1 rounded-md border-[0.1px] border-[#DA0037] my-5 text-white text-sm font-normal" onClick={handleLogin}>
                    Login
                  </button>
                </NavLink>
                <NavLink to="/SignUpForm">
                  <button type="button" className="px-5 py-1 rounded-md border-[0.1px] border-[#DA0037] my-5 text-white text-sm font-normal" onClick={handleSignup}>
                    Sign Up
                  </button>
                </NavLink>
              </>
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
