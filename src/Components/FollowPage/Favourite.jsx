import React from 'react'
import Navbar from '../Navbar/Navbar';
import { useState , useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Favourite = () => {
 

  const [imageDetails,setImageDetails] = useState([]);
  let token = useSelector((state) => state.token.token);
 
  let navigateToOrgPage = useNavigate();

 

useEffect(()=>{
  const fetchImages = async ()=>{
     

      await fetch('http://localhost:8080/user/showAllFavImages',{
           method: 'GET',
           headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`,
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

      console.log(imageDetails);
      
}

fetchImages();
},[])



const handleViewOrg = (imageId) => {
    // Send the imageId to another page
    navigateToOrgPage("/view-org", { state: { imageId } });
};




return (
      <div className='bg-black h-screen'>
          <div className='w-full fixed'>
          <Navbar />
          </div>
          
          <div className="flex flex-wrap flex-row justify-center">
              <div className='flex flex-wrap flex-row mt-20 justify-evenly'>


                    {imageDetails.map((image, index) => (
                          <div key={index} className="relative flex flex-col items-center">
                              <img
                                  src={`data:${image.contentType};base64,${image.data}`}
                                  alt={image.filename}
                                  className="h-48 w-48 object-cover"
                              />


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


export default Favourite;
