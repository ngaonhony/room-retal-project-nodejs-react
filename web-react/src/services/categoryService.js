import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}api/categories`;
if (!process.env.REACT_APP_API_URL) {
    console.error('REACT_APP_API_URL is not defined. Please check your .env file.');
}

// Hàm lấy tất cả danh mục
export const getCategories = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching categories: ' + error.message);
    }
};

// Hàm lấy danh mục theo ID
export const getCategoryById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching category: ' + error.message);
    }
};