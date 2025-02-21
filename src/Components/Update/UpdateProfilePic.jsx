import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';

const UpdateProfilePic = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  let token = useSelector((state) => state.token.token);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]); // Get the first file
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setUploadStatus('Please select a file before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // Adjust the API endpoint to match your backend
      const response = await fetch('http://localhost:8080/images/AddProfilePicture', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`, // Add the JWT token to the Authorization header
          },
        body: formData,
      });

      if (response.ok) {
        setUploadStatus('File uploaded successfully!');
        console.log("file uploaded successfully");
        
      } else {
        setUploadStatus('File upload failed.');
      }
    } catch (error) {
      console.error('Error during file upload:', error);
      setUploadStatus('Error during file upload.');
    }
  };

  return (
    <div>
        <Navbar />
      <form onSubmit={handleSubmit} className="p-4 border border-gray-300 rounded">
        <input
          type="file"
          name="image"
          accept="organizer/*"
          onChange={handleFileChange}
          className="block mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>

      {uploadStatus && (
        <div className="mt-4 text-red-600">
          {uploadStatus}
        </div>
      )}
    </div>
  );
};

export default UpdateProfilePic;
