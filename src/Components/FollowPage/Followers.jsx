import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';
// import { useNavigate } from 'react-router-dom';

const Followers = () => {
  const [users, setUsers] = useState([]);
  const token = useSelector((state) => state.token.token);
  const [isFollowing,setIsFollowing] = useState(true);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchOrganizers = async () => {
      try {
        const response = await fetch('http://localhost:8080/organizer/getAllFollowers', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch organizers');
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching organizers:', error);
      }
    };

    fetchOrganizers();
  }, [token]);

  // const handleMessage = (username) => {
  //   // Implement message functionality or navigation here
  //   console.log(`Message button clicked for ${username}`);
  // };


  // const handleUnfollow = async (orgname) => {
  
  //   try {
  //     const response = await fetch("http://localhost:8080/organizer/deleteFollowers", {
  //       method: 'POST', // Use POST for both follow and unfollow
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`,
  //       },
  //       body:orgname, // Send organizer's username
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(isFollowing ? 'Failed to unfollow organizer' : 'Failed to follow organizer');
  //     }
  
  //     // Update the following state and toggle isFollowing
  //     setIsFollowing(!isFollowing);
  //     console.log(isFollowing ? 'Unfollowed successfully' : 'Followed successfully');
      
  //   } catch (error) {
  //     console.error('Error updating follow status:', error);
  //   }
  // };
  


  const openGmail = (toEmail) => {
    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${toEmail}&su=Hello&body=I%20am%20contacting%20you%20about...`;
    console.log("mail: "+toEmail);
    
    window.open(gmailURL, '_blank');
  };
  
  // Usage in a component
  // <a href="#" onClick={() => openGmail('organizer@example.com')}>
  //   Send Email via Gmail
  // </a>
  


  return (
    <>
    
    <div className='h-screen bg-black'>
    <Navbar/>
    <div className="flex flex-wrap gap-6 p-6 bg-black text-white">
      {users.map((org) => (
        <div key={org.username} className="flex flex-col items-center p-4 border border-gray-700 rounded-lg">
           <img
           className="rounded-full border-4 border-red-500 h-44 w-44 object-cover"
         src={org.profile && org.profile.data
          ? `data:${org.profile.contentType};base64,${org.profile.data}`
          : 'https://via.placeholder.com/150' // Fallback if no image is available
        }
        alt={org.profile && org.profile.filename
          ? org.profile.filename
          : 'Profile Picture'
          
        }/>
          <h3 className="text-xl font-semibold mt-2">{org.name}</h3>
          <p className="text-md mt-1">{org.mob}</p>
          <p className="text-md mt-1">{org.dist}</p>
          <div className='flex flex-row gap-2'>
            {/* {isFollowing &&   <button
            onClick={() => handleUnfollow(org.username)}
            className="mt-4 px-4 py-2 bg-red-500 rounded text-white hover:bg-red-600"
          >
            UnFollow
          </button> } */}
          <button
            onClick={() => openGmail(org.email)}
            className="mt-4 px-4 py-2 bg-red-500 rounded text-white hover:bg-red-600"
          >
            Message
          </button>
        
          </div>
        </div>
      ))}
    </div>
    </div>
    </>
  );
  
};

export default Followers;

