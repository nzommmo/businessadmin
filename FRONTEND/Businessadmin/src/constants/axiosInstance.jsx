import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://businessadmin-vbwe.onrender.com/', // Your API base URL
});

// Add a request interceptor to add the access token to headers
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('accessToken'); // Get the access token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle 401 errors and refresh the token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loops

      // Get the refresh token from local storage
      const refreshToken = localStorage.getItem('refreshToken');
      try {
        // Send a request to refresh the token
        const response = await axios.post('https://businessadmin-vbwe.onrender.com/token/refresh/', {
          refresh: refreshToken,
        });

        // Update the access token in local storage
        localStorage.setItem('accessToken', response.data.access);

        // Update the Authorization header for the original request
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;

        // Retry the original request with the new token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);

        // Handle token refresh failure (e.g., redirect to login page)
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/'; // Redirect to login page
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
