import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL || 'http://localhost:3000'}/api/categories`;

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