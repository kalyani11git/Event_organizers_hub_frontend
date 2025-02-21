import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToken } from '../../tokenSlice/TokenSlice';
import { addRole } from '../../tokenSlice/RoleSlice';
import { addProfile } from '../../tokenSlice/ProfileSlice';
import Home from '../Home/Home';

const Login = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [rolehere, setRole] = useState('User'); // Local state for role
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const dispatch = useDispatch();

    const closeModal = () => {
        setIsOpen(false);
        navigate("/");
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous error messages

        const url = rolehere == 'Organizer'
            ? 'http://localhost:8080/public/login'
            : 'http://localhost:8080/public/loginUser';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.text();
                dispatch(addToken(data)); // Add token to Redux
                dispatch(addRole(rolehere)); // Add role to Redux
                setUsername('');
                setPassword('');
                // setRole(''); // Reset role to default (or desired state)
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
            console.error('Login error:', error);
        }
    };

    const token = useSelector((state) => state.token.token);
    const role = useSelector((state) => state.role.role);
    const profile = useSelector((state) => state.profile.profile); // Now pulled from Redux
    

    useEffect(() => {
        console.log("Token: ", token);
        console.log("Role: ", role);
        // console.log("Profile from slice: ", profile);

        const fetchProfile = async () => {
            try {
                let url = rolehere === 'Organizer'
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

                // Dispatch the profile data to Redux store

            if(rolehere=="User"){
                dispatch(addProfile({
                    _id: data.id.timestamp,
                    username: data.username,
                    password: data.password,
                    name: data.name,
                    email: data.email,
                    city: data.city,
                    dist: data.dist,
                    mob: data.mob,
                    role: data.role,
                    state: data.state,
                    following:data.following,
                    favourite: data.favourite
                }));

                
                console.log("Profile data: ", data);
            }

            } catch (error) {
                console.error("Error fetching profile:", error.message);
            }
        };

        if (token) {
            fetchProfile();
           
            
        }

        
        if (profile) {
            console.log("profile from slice :"+profile.username);
        }
       
       

    }, [token, rolehere]);

    return (
        <div>
            <Home />
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-8 rounded-lg shadow-lg relative z-10 max-w-lg w-full">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                        >
                            &times;
                        </button>

                        <div className="flex justify-center mb-6">
                            <button
                                type="button"
                                className={`px-4 py-2 rounded-l-lg font-bold ${rolehere === 'User' ? 'bg-gradient-to-r from-red-500 to-gray-900 text-white' : 'bg-gray-200 text-gray-600'}`}
                                onClick={() => setRole('User')}
                            >
                                User
                            </button>
                            <button
                                type="button"
                                className={`px-4 py-2 rounded-r-lg font-bold ${rolehere === 'Organizer' ? 'bg-gradient-to-r from-red-500 to-gray-900 text-white' : 'bg-gray-200 text-gray-600'}`}
                                onClick={() => setRole('Organizer')}
                            >
                                Organizer
                            </button>
                        </div>

                        <form onSubmit={handleLogin} method="post">
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                                    Username:
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-red-500"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                                    Password:
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-gray-900"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-gradient-to-r from-red-500 to-gray-900 text-white font-bold rounded-lg shadow-md hover:from-red-400 hover:to-gray-900 transition duration-300"
                            >
                                Submit
                            </button>
                            <div className="flex justify-center items-center py-2 text-base font-semibold">
                                {token ? (
                                    <h1>Login successful!</h1>
                                ) : (
                                    <h1>{error}</h1>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
