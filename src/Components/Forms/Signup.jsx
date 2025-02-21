import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  
    
  const [username,setUsername] = useState();
  const [password,setPassword] = useState();
  const [email,setEmail] = useState('');
  const [mob,setMob] = useState();
  const [name,setName] = useState();
  const [city,setCity] = useState();
  const [dist,setDist] = useState();
  const [state,setState] = useState();
  const [description,setDescription] = useState('');
  const [company,setCompany] = useState('');

  const [newMail,setNewMail] = useState('');
  const [role,setRole] = useState('User');

  const navigate = useNavigate();



  


  //handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if(role=='Organizer'){

      try {
        // Send signup data
        const signupResponse = await fetch('http://localhost:8080/public/Signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "username": username,
            "password": password,
            "name": name,
            "email": email,
            "mob": mob,
            "city": city,
            "dist": dist,
            "state": state,
            "description":description,
            "companyName":company
          }),
        });
    
        if (!signupResponse.ok) {
          throw new Error('Signup failed');
        }
    
        console.log("User added");
    
        // Set newMail before resetting the form fields
        setNewMail(email);
        console.log("New mail set: ", email);
    
        // Send the confirmation email using the updated newMail state
        const mailResponse = await fetch('http://localhost:8080/mail/sendMail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(email),  // Send email properly as an object
        });
    
        if (!mailResponse.ok) {
          throw new Error('Failed to send confirmation email');
        }
    
        console.log("Confirmation mail sent");
    
        // Clear the form fields after both operations succeed
        setUsername("");
        setPassword("");
        setName("");
        setEmail("");
        setMob("");
        setCity("");
        setDist("");
        setState("");
        setCompany("");
        setDescription("");
    
      } catch (error) {
        console.error('Error:', error);
        window.alert("Error: " + error.message);
      }
    }else{
      try {
        // Send signup data
        const signupResponse = await fetch('http://localhost:8080/public/SignupUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "username": username,
            "password": password,
            "name": name,
            "email": email,
            "mob": mob,
            "city": city,
            "dist": dist,
            "state": state,
           
          }),
        });
    
        if (!signupResponse.ok) {
          throw new Error('Signup failed');
        }
    
        console.log("User added");
    
        // Set newMail before resetting the form fields
        setNewMail(email);
        console.log("New mail set: ", email);
    
        // Send the confirmation email using the updated newMail state
        const mailResponse = await fetch('http://localhost:8080/mail/sendMail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(email),  // Send email properly as an object
        });
    
        if (!mailResponse.ok) {
          throw new Error('Failed to send confirmation email');
        }
    
        console.log("Confirmation mail sent");
    
        // Clear the form fields after both operations succeed
        setUsername("");
        setPassword("");
        setName("");
        setEmail("");
        setMob("");
        setCity("");
        setDist("");
        setState("");
       
    
      } catch (error) {
        console.error('Error:', error);
        window.alert("Error: " + error.message);
      }
    }

   
  };
  


  


  //handling back button
  const handleBackButton = (e)=>{
      e.preventDefault();
      navigate('/');
  }


  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-400 to-gray-950 p-4">
    <form  onSubmit={handleSubmit} method="post" className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
    
    {/* setting role */}
    <div className="flex justify-center mb-6">
              <button
                type="button"
                className={`px-4 py-2 rounded-l-lg font-bold ${
                  role === 'User'
                    ? 'bg-gradient-to-r from-red-500 to-gray-900 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
                onClick={() => setRole('User')}
              >
                User
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-r-lg font-bold ${
                  role === 'Organizer'
                    ? 'bg-gradient-to-r from-red-500 to-gray-900 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
                onClick={() => setRole('Organizer')}
              >
                Organizer
              </button>
            </div>


    {/* input fields */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="mb-4">
        <label htmlFor="firstName" className="block text-gray-700 text-sm font-medium mb-2">
          UserName
        </label>
        <input
          type="text"
          id="firstName"
          className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-red-900"
          required
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="lastName" className="block text-gray-700 text-sm font-medium mb-2">
          Password
        </label>
        <input
          type="password"
          id="lastName"
          className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-gray-900"
          required
          name='password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-red-900"
          required
          name='name'
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="website" className="block text-gray-700 text-sm font-medium mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="website"
          className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-gray-900"
          required
          name='email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
      </div>

     {
      role=="Organizer" ?
      <>

<div className="mb-4">
        <label htmlFor="website" className="block text-gray-700 text-sm font-medium mb-2">
          Company Name
        </label>
        <input
          type="text"
          id="website"
          className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-gray-900"
          required
          name='company'
          value={company}
          onChange={(e)=>setCompany(e.target.value)}
        />
      </div>


      <div className="mb-4">
        <label htmlFor="website" className="block text-gray-700 text-sm font-medium mb-2">
          Description
        </label>
        <input
          type="text"
          id="website"
          className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-gray-900"
          required
          name='description'
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />
      </div>
      
      </>:
      <></>

     }
      



      
      <div className="mb-4">
        <label htmlFor="website" className="block text-gray-700 text-sm font-medium mb-2">
          MobNo.
        </label>
        <input
          type="text"
          id="website"
          className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-gray-900"
          required
          name='mob'
          value={mob}
          onChange={(e)=>setMob(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="website" className="block text-gray-700 text-sm font-medium mb-2">
          City
        </label>
        <input
          type="text"
          id="website"
          className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-gray-900"
          required
          name='city'
          value={city}
          onChange={(e)=>setCity(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="website" className="block text-gray-700 text-sm font-medium mb-2">
          District
        </label>
        <input
          type="text"
          id="website"
          className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-gray-900"
          required
          name='dist'
          value={dist}
          onChange={(e)=>setDist(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="website" className="block text-gray-700 text-sm font-medium mb-2">
          State
        </label>
        <input
          type="text"
          id="website"
          className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-gray-900"
          required
          name='state'
          value={state}
          onChange={(e)=>setState(e.target.value)}
        />
      </div>
    </div>

   
   <div className='flex flex-row gap-10'>
    <button
      type="button"
      className="w-full py-3 bg-gradient-to-r from-red-400 to-gray-950 text-white font-bold rounded-lg shadow-md hover:from-gray-900 hover:border-red-900 transition duration-300"
      onClick={handleBackButton}
    >
      Back
    </button>
    <button
      type="submit"
      className="w-full py-3 bg-gradient-to-r from-red-400 to-gray-950 text-white font-bold rounded-lg shadow-md hover:from-gray-900 hover:border-red-900 transition duration-300"
    >
      Submit
    </button>
    </div>
  </form>
  </div>
  )
}

export default Signup;
