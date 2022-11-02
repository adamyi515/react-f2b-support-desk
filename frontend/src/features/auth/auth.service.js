import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

// Register method
const register = async (userData) => {

    // const response = await axios.post(API_URL, userData );
    const response = await axios({
        method: 'POST',
        url: API_URL,
        data: userData
    });

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data;
}

// Login user
const login = async (userData) => {
    const response = await axios({
        method: 'POST',
        url: `${API_URL}/login`,
        data: userData
    });

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data;
}

// Logout user
const logout = async () => localStorage.removeItem('user');


const authService = {
    register,
    login,
    logout
} 

export default authService;