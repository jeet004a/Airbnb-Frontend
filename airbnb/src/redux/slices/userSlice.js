import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
export const fetchUser = () => async(dispatch) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.warn('No token found in localStorage');
            return;
        }

        const response = await axios.get('http://localhost:3001/api/v1/auth/profile', {
            headers: { Authorization: `Bearer ${token}` },
        });

        // console.log('Fetched user:', response.data.userDetails);
        dispatch(addUser(response.data.userDetails));
    } catch (error) {
        console.error('Error fetching user:', error.response.status)
        if (error.response && (error.response.status === 404 || error.response.status === 401)) {
            // clear token and redirect to login
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
    }
};

const userSlice = createSlice({
    name: 'user',
    initialState: { user: [] },
    reducers: {
        addUser: (state, action) => {
            state.user.push(action.payload)
        }
    }
})

export const { addUser } = userSlice.actions

export default userSlice.reducer