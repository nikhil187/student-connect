import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const api = {
    // Get all profiles
    getAllProfiles: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/profiles`);
            return response.data;
        } catch (error) {
            console.error('Error fetching profiles:', error);
            throw error;
        }
    },

    // Get single profile
    getProfile: async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/profiles/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching profile:', error);
            throw error;
        }
    },

    // Create new profile
    createProfile: async (profileData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/profiles`, profileData);
            return response.data;
        } catch (error) {
            console.error('Error creating profile:', error);
            throw error;
        }
    },

    // Update profile
    updateProfile: async (id, profileData) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/profiles/${id}`, profileData);
            return response.data;
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    },

    // Partial update profile
    patchProfile: async (id, partialData) => {
        try {
            const response = await axios.patch(`${API_BASE_URL}/profiles/${id}`, partialData);
            return response.data;
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    },

    // Delete profile
    deleteProfile: async (id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/profiles/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting profile:', error);
            throw error;
        }
    }
};

export default api; 