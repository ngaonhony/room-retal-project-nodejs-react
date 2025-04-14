import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL || 'http://localhost:3000'}/api/feedbacks`; 

export const createFeedback = async (feedbackData) => {
    try {
        const response = await axios.post(API_URL, feedbackData);
        return response.data;
    } catch (error) {
        throw new Error('Error creating feedback: ' + error.message);
    }
};
