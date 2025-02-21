import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const GalleryPage = () => {

    const [imageDetails,setImageDetails] = useState([]);
    let token = useSelector((state) => state.token.token);
    let role = useSelector((state) => state.role.role);

    let profile = useSelector((state) => state.profile.profile);
    
    
    let imageIds = profile.favourite.map((fav) => fav.id);
  
   
    // console.log("profile from gallery : "+profile.favourite.timestamp);
    // console.log("image id's "+imageIds);
    

    console.log(role);
    

    let navigateToLoginForm = useNavigate();
    let navigateToOrgPage = useNavigate();
   

  useEffect(()=>{
    const fetchImages = async ()=>{
       
 
        await fetch('http://localhost:8080/public/GetAllImages',{
             method: 'GET',
             headers: {
                 'Content-Type': 'application/json',
             },
            
        }).then((response)=>{
           
           if(response.status!=302) {

           return response.text();
           
           } else {
         
           console.log(response.status);
           return response.json();
           
           }
           
        })
        .then((data)=>{
         if(data) {
           console.log("data",data);         
           setImageDetails(data);
         }
         
        })

        // console.log(imageDetails);
        
 }

 fetchImages();
  },[])


  const handleFavClick = async (image, heartElement) => {
    console.log(token);
    console.log(role);
  
    if (token !== '' && role === "User") {
      // Check if the image is already favorited
      const isFavored = imageIds.some(favId => favId === image);
  
      try {
        let url = '';
        let method = '';
        
        // If already favorited, send a request to "unlike"
        if (isFavored) {
          heartElement.style.color = 'white'; // Change the color back to default (unliked)
          url = 'http://localhost:8080/user/deleteFavourite';
          method = 'POST';
        } else {
          // If not favorited, send a request to "like"
          heartElement.style.color = 'red'; // Change the color to red (liked)
          url = 'http://localhost:8080/user/addFavouriteImage';
          method = 'POST';
        }
  
        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            "id": `${image}`
            })
        });
  
        if (!response.ok) {
          console.log(`Failed with status: ${response.status}`);
          return;
        }
  
        // const data = await response.json();
        console.log("url :", url);
  
        // Update the list of favorite image IDs dynamically after the operation
        if (isFavored) {
          imageIds = imageIds.filter(favId => favId !== image); // Remove from favorites
        } else {
          imageIds.push(image); // Add to favorites
        }
  
      } catch (error) {
        console.error('Error occurred while updating favorites:', error);
      }
    } else {
      // If user is not logged in or not a user role, navigate to login form
      navigateToLoginForm("/LoginForm");
    }
  };
  

 let isUsernameMatch = false;

  const handleViewOrg = (imageId) => {

    if(token===''){
      navigateToLoginForm("/LoginForm");
    }
    else{
    // Send the imageId to another page
    navigateToOrgPage("/view-org", { state: { imageId } });
    }
};

  return (
        <div className=' bg-black h-screen'>
            <div className='w-full fixed'>
            <Navbar />
            </div>
            
            <div className="flex flex-wrap flex-row justify-center">
                <div className='flex flex-wrap flex-row mt-20 justify-evenly'>


                      {imageDetails.map((image) => (
                            <div key={image.id} className="relative flex flex-col items-center">
                                <img
                                    src={`data:${image.contentType};base64,${image.data}`}
                                    alt={image.filename}
                                    className="h-48 w-48 object-cover"
                                />

                                {/* Like Symbol */}
                                     {/* Like Symbol */}
                                     {
                                        role=="User" ?
                                        <div className="absolute bottom-2 left-2"
                                       
                                        onClick={(e)=>handleFavClick(image.id,e.target)}
                                        >
                                          { 
                                           
                                           isUsernameMatch = imageIds.some(name => name === image.id) 
                                           
                                           }
                                          <button
                                        //    className='text-white p-1 text-2xl heart'
                                        className={`p-1 text-2xl ${isUsernameMatch ? "text-red-600" : "text-white"}`}

                                          >
                                            &#9829;
                                            
                                          </button>
                                      </div>:
                                      <></>
                                     }
                                       

                                {/* View Button */}
                                <div className="absolute bottom-2 right-2">
                                    <button className="text-white bg-blue-500 rounded px-3 py-1 hover:bg-blue-600"
                                       onClick={()=>handleViewOrg(image.id)} >
                                        View
                                    </button>
                                </div>
                            </div>
                        ))}

                </div>
            </div>
            
        </div>
  );
}

export default GalleryPage
