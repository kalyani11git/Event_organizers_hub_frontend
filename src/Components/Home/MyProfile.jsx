import React, { useState } from 'react';
import { FaChevronDown, FaUserEdit, FaTrashAlt, FaSignOutAlt } from 'react-icons/fa'; // Import icons from react-icons
import { useDispatch, useSelector } from 'react-redux';
import { deleteToken } from '../../tokenSlice/TokenSlice';
import { deleteRole } from '../../tokenSlice/RoleSlice';
import { deleteProfile } from '../../tokenSlice/ProfileSlice';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userDetails,setUserDetails] = useState([]);

  //let token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiW1JPTEVfVVNFUl0iLCJzdWIiOiJyaXlhIiwiaWF0IjoxNzI1NTYxNzgwLCJleHAiOjE3MjU1NjUzODB9.I4nR7pVPHW9jGbqJqL79RT38LdyISlkelGI2N3rTW8Q'  
  let token = useSelector((state) => state.token.token);
  let role = useSelector((state) => state.role.role);
  console.log('token',token);

  const dispatch = useDispatch();
 
  let navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };



  //Method will fetch organizer data
  const handleShowProfile = async(e)=>{
     e.preventDefault();
    
     if(role==="Organizer"){

      try {
        const response = await fetch('http://localhost:8080/organizer/GetOrganizer', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Add the JWT token to the Authorization header
          },
          // redirect: 'manual',
        });

        if (!response.ok) {
          console.error(`HTTP Error: ${response.status} - ${response.statusText}`);
           throw new Error('Failed to fetch');
        }

        const data = await response.json();
        setUserDetails(data);
        console.log("userDetails",userDetails);
        
      } catch (error) {
        console.error('Error occurred in fetching organizer:', error);
      }


     }
     else{
        try {
          const response = await fetch('http://localhost:8080/user/GetUser', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, // Add the JWT token to the Authorization header
            },
            // redirect: 'manual',
          });
  
          if (!response.ok) {
            console.error(`HTTP Error: ${response.status} - ${response.statusText}`);
             throw new Error('Failed to fetch');
          }
  
          const data = await response.json();
          setUserDetails(data);
          console.log("userDetails",userDetails);
          
        } catch (error) {
          console.error('Error occurred in fetching organizer:', error);
        }
      }
}
  

const deleteProfileFunc = async()=>{

  try {
    const response = await fetch('http://localhost:8080/organizer/DeleteOrganizer', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Add the JWT token to the Authorization header
      },
      // redirect: 'manual',
    });

    if (!response) {
      console.error(`HTTP Error: ${response.status} - ${response.statusText}`);
       throw new Error('Failed to fetch');
    }
    dispatch(deleteToken());
    dispatch(deleteRole());
    dispatch(deleteProfile());
    console.log("user deleted successfully");

    
  } catch (error) {
    console.error('Error occurred in fetching organizer:', error);
  }


}

const handleChangeProfile = ()=>{
  navigate('/UploadProfilePic');
}

const handleUpdate = () => {
  navigate('/UpdateUserOrg');
}
  
  return (
    <div className="relative text-left z-50">
  {/* Profile and Dropdown Arrow */}
  <div onClick={handleShowProfile} className="flex flex-row items-center space-x-2 cursor-pointer">
    <div  className="relative text-left z-50">
  <label className="absolute right-1 bottom-3 text-3xl h-2 w-2 rounded-full cursor-pointer text-red-700" 
   onClick={handleChangeProfile}  >
           
            &#9998;
      </label>
      <img
          className="rounded-full border-4 border-red-500 h-14 w-14 object-cover"
         src={userDetails.profile && userDetails.profile.data
          ? `data:${userDetails.profile.contentType};base64,${userDetails.profile.data}`
          : 'https://via.placeholder.com/150' // Fallback if no image is available
        }
        alt={userDetails.profile && userDetails.profile.filename
          ? userDetails.profile.filename
          : 'Profile Picture'
        }/>
   </div>
    <FaChevronDown className="text-gray-600" onClick={toggleDropdown} />
          
  </div>

  

  {/* Dropdown Menu */}
  {isOpen && (
    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
    style={{ zIndex: 9999 }} >
      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <button
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
          onClick={handleUpdate}
        >
          <FaUserEdit className="mr-2" /> Edit Profile
        </button>
        <button
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
          onClick={deleteProfile}
        >
          <FaTrashAlt className="mr-2" /> Delete Profile
        </button>
        <button
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
          onClick={() => {dispatch(deleteToken())
            dispatch(deleteRole());  
            dispatch(deleteProfile());
          }}
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>
    </div>
  )}
</div>

  );
};

export default MyProfile;