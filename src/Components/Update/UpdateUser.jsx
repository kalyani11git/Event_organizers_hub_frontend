import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const UpdateUser = () => {
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        mob: '',
        city: '',
        dist: '',
        state: '',
        password: '',
        companyName: '', // Only for organizer
        description: '', // Only for organizer
    });
    const role = useSelector((state)=>state.role.role); // Track if it's a user or organizer
    const [loading, setLoading] = useState(true);
    const token = useSelector((state)=>state.token.token); // Assuming the token is stored in localStorage

    // Fetch the profile data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/user/getUserOrOrganizer', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                // setRole(data.role); // Set role based on response

                // Populate the form with existing profile data
                setProfileData({
                    name: data.name || '',
                    email: data.email || '',
                    mob: data.mob || '',
                    city: data.city || '',
                    dist: data.dist || '',
                    state: data.state || '',
                    password: '',
                    companyName: data.companyName || '', // For organizer
                    description: data.description || '', // For organizer
                });

                setLoading(false);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchData();
    }, [token]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData({
            ...profileData,
            [name]: value,
        });
    };

    // Submit form to update profile
    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = role === 'Organizer' ? '/organizer/UpdateOrg' : '/user/UpdateUser';

        try {
            const response = await fetch(`http://localhost:8080${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include token in the request
                },
                body: JSON.stringify(profileData),
            });

            if (response.ok) {
                alert('Profile updated successfully');
            } else {
                alert('Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="mob" className="block text-gray-700">Mobile</label>
                <input
                    type="text"
                    id="mob"
                    name="mob"
                    value={profileData.mob}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="city" className="block text-gray-700">City</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    value={profileData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="dist" className="block text-gray-700">District</label>
                <input
                    type="text"
                    id="dist"
                    name="dist"
                    value={profileData.dist}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="state" className="block text-gray-700">State</label>
                <input
                    type="text"
                    id="state"
                    name="state"
                    value={profileData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={profileData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                />
            </div>

            {/* Organizer-specific fields */}
            {role === 'ORGANIZER' && (
                <>
                    <div className="mb-4">
                        <label htmlFor="companyName" className="block text-gray-700">Company Name</label>
                        <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            value={profileData.companyName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={profileData.description}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                        />
                    </div>
                </>
            )}

            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                Update Profile
            </button>
        </form>
    );
};

export default UpdateUser;
