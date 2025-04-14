import axios from 'axios';

// Define API endpoint with port and fallback URL
const API_URL = process.env.REACT_APP_API_URL
  ? `${process.env.REACT_APP_API_URL}/api/auth`
  : 'http://localhost:3000/api/auth';

// Validate API URL
if (!API_URL) {
  console.error('API URL is not properly configured. Using fallback URL.');
}


export const login = async (account, password) => {
  try {
    const isEmail = /\S+@\S+\.\S+/.test(account);
    const response = await axios.post(`${API_URL}/login`, 
      { 
        [isEmail ? 'email' : 'phone']: account,
        password 
      }, 
      { headers: { 'Content-Type': 'application/json' } }
    );
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Đăng nhập thất bại';
    throw new Error(errorMessage);
  }
};


export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data; 
  } catch (error) {
    console.error('Registration error:', error.response?.data);
    const errorMessage = error.response?.data?.message || 'Đăng ký thất bại';
    throw new Error(errorMessage); 
  }
};

export const verifyCode = async (email, verificationCode) => {
  try {
    const response = await axios.post(`${API_URL}/verify`, {
      email, // Bao gồm email trong yêu cầu
      verificationCode, // Bao gồm mã xác thực
    });
    return response.data; // Trả về dữ liệu từ server
  } catch (error) {
    // Xử lý lỗi và trả về thông báo phù hợp
    console.error('Verification error:', error.response?.data); // Log chi tiết lỗi
    const errorMessage = error.response?.data?.message || 'Xác thực thất bại';
    throw new Error(errorMessage); // Ném lỗi với thông điệp cụ thể
  }
};

export const resendVerificationCode = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/resend`, {
      email, // Gửi email để gửi lại mã
    });
    return response.data; // Trả về phản hồi từ server
  } catch (error) {
    console.error('Resend code error:', error.response?.data); // Log lỗi
    const errorMessage = error.response?.data?.message || 'Gửi mã xác thực thất bại';
    throw new Error(errorMessage); // Ném lỗi với thông điệp cụ thể
  }
};
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    return response.data; 
  } catch (error) {
    console.error('Forgot password error:', error.response?.data);
    const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra khi gửi yêu cầu quên mật khẩu';
    throw new Error(errorMessage);
  }
};
export const resetPassword = async (verificationCode, password) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, {
      verificationCode,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Reset password error:', error.response?.data);
    const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra khi đặt lại mật khẩu';
    throw new Error(errorMessage);
  }
};