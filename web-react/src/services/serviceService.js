import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/services`;

export const getAllServices = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // Return the data directly from the response
    } catch (error) {
        // Handle the error
        console.error('Error fetching services:', error.message);
        throw new Error(error.response ? error.response.data : error.message); // Throw a new error with a descriptive message
    }
};