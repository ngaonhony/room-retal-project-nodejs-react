import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}api/payments`; // Địa chỉ API của bạn

export const getPostsAndPaymentsByUserId = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user._id) {
            throw new Error('User ID not found in localStorage'); 
        }

        const response = await axios.get(`${API_URL}/${user._id}`);
        return response.data; 
    } catch (error) {
        throw error.response?.data?.message || error.message;
    }
};