import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/posts`;
const getToken = () => {
    return localStorage.getItem('accessToken'); // Adjust this to your token storage method
};
// Hàm lấy tất cả bài viết
export const getPosts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // Trả về dữ liệu bài viết
    } catch (error) {
        console.error('Error fetching posts:', error); // Log lỗi ra console
        throw new Error('Error fetching posts: ' + error.message);
    }
};

export const getPostById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data; 
    } catch (error) {
        console.error('Error fetching post by ID:', error);
        throw new Error('Error fetching post: ' + error.message);
    }
};

export const createPost = async (postData) => {
    const token = getToken();
    try {
        const response = await axios.post(API_URL, postData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data; // Return the newly created post
    } catch (error) {
        console.error('Error creating post:', error);
        throw new Error('Error creating post: ' + error.message);
    }
};

// Function to update a post with token authentication
export const updatePost = async (postId, postData) => {
    const token = getToken(); 
    console.log("Received postIds:", postId);
    try {
        const response = await axios.put(`${API_URL}/${postId}`, postData, {
            headers: {
                Authorization: `Bearer ${token}`,'Content-Type': 'multipart/form-data',
            },
        });
        return response.data; 
    } catch (error) {
        console.error('Error updating post:', error);
        throw new Error('Error updating post: ' + error.message);
    }
};

// Function to delete a post with token authentication
export const deletePost = async (id) => {
    const token = getToken(); // Retrieve the token
    try {
        await axios.delete(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Set the Authorization header with the token
            },
        });
        return id; // Return the id of the deleted post
    } catch (error) {
        console.error('Error deleting post:', error);
        throw new Error('Error deleting post: ' + error.message);
    }
};