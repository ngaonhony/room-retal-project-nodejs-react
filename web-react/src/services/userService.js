import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}api/users`;

// Validate API URL
if (!process.env.REACT_APP_API_URL) {
    console.error('REACT_APP_API_URL is not defined. Please check your .env file.');
}

export const getUserById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data.data.user;
};

export const updateUser = async (id, userData) => {
  const token = localStorage.getItem('accessToken'); // Lấy token từ localStorage
  console.log(token); // Kiểm tra token trong console

  // Cấu hình header yêu cầu
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    // Gửi yêu cầu PATCH tới API để cập nhật người dùng
    const response = await axios.patch(`${API_URL}/${id}`, userData, config);
    return response.data.data.user; // Trả về dữ liệu người dùng đã cập nhật
  } catch (error) {
    // Xử lý lỗi và trả về thông điệp
    throw error.response?.data?.message || error.message;
  }
};
