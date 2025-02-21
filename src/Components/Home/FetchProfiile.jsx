import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProfile } from '../../tokenSlice/ProfileSlice';

const FetchProfile = () => {
    const token = useSelector((state) => state.token.token);  // Get token from the Redux store
    const role = useSelector((state) => state.role.role);  // Get role from the Redux store
    const dispatch = useDispatch();  // For dispatching actions to the Redux store

    useEffect(() => {
        // Debugging logs
        console.log("Token:", token);
        console.log("Role:", role);

        // Small delay to prevent too many rapid calls (optional)
        const fetchProfile = async () => {
            if (!token) {
                console.log("Token is missing, skipping profile fetch.");
                return;
            }
            try {
                let url = role === 'Organizer' 
                    ? 'http://localhost:8080/organizer/GetOrganizer' 
                    : 'http://localhost:8080/user/GetUser';

                const response = await fetch(url, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch profile');
                }

                const data = await response.json();
                dispatch(addProfile(data));  // Dispatch the profile data to Redux store
                console.log("Profile data:", data);
            } catch (error) {
                console.error("Error fetching profile:", error.message);
            }
        };

        fetchProfile();

    }, [token, role, dispatch]);  // Dependencies array should trigger re-fetch when token or role changes

    return (
        <>
            {/* Add any UI or components here if needed */}
            <div>hiiii</div>
        </>
    );
};


export default FetchProfile;