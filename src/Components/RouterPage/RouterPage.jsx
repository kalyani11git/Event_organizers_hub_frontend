import React from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Home from '../Home/Home'
import Signup from '../Forms/Signup'
import Login from '../Forms/Login'
import GalleryPage from '../Gallery/GalleryPage'
import UploadImage from '../Gallery/UploadImage'
import Favourite from '../FollowPage/Favourite'
import Followers from '../FollowPage/Followers'
import Following from '../FollowPage/Following'
import OrganizerView from '../OrganizerViewPage/OrganizerView'
import  FetchProfile  from '../Home/FetchProfiile'
import UpdateUser from '../Update/UpdateUser'
import UpdateProfilePic from '../Update/UpdateProfilePic'


const RouterPage = () => {
  return (
    <div>

        <Router>
          
        
            <Routes> 
            <Route path='/' element={<Home/>} />
            <Route path='/LoginForm' element={<Login />} />
            <Route path='/SignUpForm' element={<Signup />} />
            <Route path='/gallery' element={<GalleryPage/>} />
            <Route path='/uploadImage' element={<UploadImage/>}/>
            <Route path='/favourite' element={<Favourite/>} />
            <Route path='/followers' element={<Followers/>} />
            <Route path='/following' element={<Following/>} />
            <Route path='/view-org' element={<OrganizerView />} />
            <Route path='fetchProfile' element={<FetchProfile/>}/>
            <Route path='/UpdateUserOrg' element={<UpdateUser/>} />
            <Route path='/UploadProfilePic' element={<UpdateProfilePic/>}/>

            </Routes>
            
        </Router>

            
           
      
    </div>
  )
}

export default RouterPage
