import React, { useState, useEffect } from 'react';
import { useActionData, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const OrganizerView = () => {
  let token = useSelector((state) => state.token.token);
  let profile = useSelector((state)=>state.profile.profile);
  let role = useSelector((state)=>state.role.role);
  const [disable,setDisable] = useState('disable');
  const location = useLocation(); 
  const { imageId } = location.state || {}; // Access the imageId from the state

  const [orgDetails, setOrgDetails] = useState({
    profileImage: [],
    companyName: '',
    description: '',
    contactNumber: '',
    email:'',
    dist: '',
    city: '',
    state: '',
    username:'',
    images: [],
    followers: [], // Initialize followers as an array
  });
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // To store the selected file

  // Update `isFollowing` based on profile.following and orgDetails.username
  useEffect(() => {
    if (profile.following && orgDetails.username) {
      const isMatch = profile.following.some(name => name === orgDetails.username);
      setIsFollowing(isMatch);
    }
  }, [profile.following, orgDetails.username]);

  useEffect(() => {
    if (imageId) {
      console.log("Attempting to fetch organizer data for imageId:", imageId);
      fetchOrganizerData(imageId);
    }
  }, [imageId]);

  const fetchOrganizerData = async (imageId) => {
    try {
      const response = await fetch(`http://localhost:8080/user/showOrganizerByImage?id=${imageId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
  
      if (!response.ok) {
        console.error('Fetch failed with status:', response.status);
        throw new Error('Failed to fetch organizer details');
      }
  
      const data = await response.json();
      console.log("Organizer details:", data);
     
      
      setOrgDetails(data);
      console.log("orga profile",orgDetails.profileImage);
      
    } catch (error) {
      console.error('Error fetching organizer details:', error);
    }
  };

  // Handle Profile Image Upload
  const handleProfileImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);

      const formData = new FormData();
      formData.append('profileImage', file);

      try {
        const response = await fetch('http://localhost:8080/user/updateProfileImage', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData, // Send the image file using FormData
        });

        if (!response.ok) {
          throw new Error('Failed to upload profile image');
        }

        const data = await response.json();
        setOrgDetails({ ...orgDetails, profileImage: data.profileImage }); // Assuming the response contains the updated profile image URL
        console.log('Profile image updated successfully!');
      } catch (error) {
        console.error('Error uploading profile image:', error);
      }
    }
  };

  const handleFollow = async () => {
    const url = isFollowing
      ? 'http://localhost:8080/organizer/deleteFollowers' // URL for unfollow
      : 'http://localhost:8080/user/followOrganizer'; // URL for follow
  
    try {
      const response = await fetch(url, {
        method: 'POST', // Use POST for both follow and unfollow
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body:orgDetails.username, // Send organizer's username
      });
  
      if (!response.ok) {
        throw new Error(isFollowing ? 'Failed to unfollow organizer' : 'Failed to follow organizer');
      }
  
      // Update the following state and toggle isFollowing
      setIsFollowing(!isFollowing);
      console.log(isFollowing ? 'Unfollowed successfully' : 'Followed successfully');
      
    } catch (error) {
      console.error('Error updating follow status:', error);
    }
  };
  

  // const handleMessage = () => {
  //   console.log('Message button clicked');
  // };


  const handleMessage = (toEmail) => {
    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${toEmail}&su=Hello&body=I%20am%20contacting%20you%20about...`;
    console.log("mail: "+toEmail);
    
    window.open(gmailURL, '_blank');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white md:mx-48">
      <div className="flex items-center space-x-8 ">
        {/* Profile Photo */}
        <div className="relative md:mr-16 md:mt-10">
        <img
        src={orgDetails.profile && orgDetails.profile.data
          ? `data:${orgDetails.profile.contentType};base64,${orgDetails.profile.data}`
          : 'https://via.placeholder.com/150' // Fallback if no image is available
        }
        alt={orgDetails.profile && orgDetails.profile.filename
          ? orgDetails.profile.filename
          : 'Profile Picture'
        }
        className="rounded-full border-4 border-red-500 h-52 w-52 object-cover"
      />
          {/* Option to Edit */}
          {/* <label className="absolute bottom-0 right-0 bg-red-600 p-2 rounded-full cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfileImageChange}
            />
            &#9998;
          </label> */}
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <h2 className="text-2xl font-bold">{orgDetails.companyName}</h2>
          <p className="text-lg italic w-96">{orgDetails.description}</p> 
          <div className='flex flex-row'><img src="mail1.png" className='h-7 w-7'/><p>{orgDetails.email}</p></div>
          <div className='flex flex-row'><p>{orgDetails.dist},</p><p>{orgDetails.state}</p></div>
        </div>

        {/* Company Name, Description, Contact Info */}
        <div className="flex space-x-8">
          <div className="text-center">
            <span className="text-xl font-bold">{orgDetails.images.length || 0}</span>
            <p>Posts</p>
          </div>
          <div className="text-center">
            <span className="text-xl font-bold">{orgDetails.followers.length || 0}</span>
            <p>Followers</p>
          </div>
        </div>
      </div>

      {/* Follow and Message Buttons */}
     {/* Follow and Message Buttons */}
      {}
        <div className="mt-4 flex space-x-4">
          <button
            onClick={handleFollow}
            className={`px-4 py-2 rounded ${role === "User" ? "bg-red-500" : "bg-gray-400 cursor-not-allowed"}`}
            disabled={role !== "User"} // Disable the button if role is not "User"
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>

          {isFollowing && (
            <button className="bg-red-500 px-4 py-2 rounded" onClick={() => handleMessage(orgDetails.email)}>
              Message
            </button>
          )}
        </div>



      {/* Uploaded Images */}
      <div className="mt-10 w-full">
        <h3 className="text-3xl font-bold text-center mb-4"></h3>
        <hr className='m-3'/>
        {orgDetails.images.length === 0 ? (
          <p className="text-center text-gray-500">No images uploaded yet</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {orgDetails.images.map((image, index) => (
              <img
                key={index}
                src={`data:${image.contentType};base64,${image.data}`}
                alt={image.filename}
                className="h-full w-full object-cover"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizerView;
