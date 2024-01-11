import axios from 'axios';
import { toast } from 'react-toastify';

export const LoginUser = async ({ payload, dispatch, setData, navigate }) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, payload);
        dispatch(setData(response.data));
        toast.success('Welcome Back 😉');
        navigate('/')
    } catch (error) {
        if (error.response) {
            toast.error(` ${error.response.data.error} 🫤`);
        } else if (error.request) {
            toast.error(` ${error.response.data.error} 🫤`);
        } else {
            toast.error(` ${error.response.data.error} 🫤`);
        }
    }
};

export const logoutUser = async ({ dispatch, setData, navigate }) => {
    try {
        await axios.post(`/logout`);
        dispatch(setData(null));
        toast.success('Logout successful 😉');
        navigate('/login')
    } catch (error) {
        console.error('Failed to logout', error);
    }
};

export const GetData = async ({dispatch, setData }) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/invoice`);
        console.log(response)
        dispatch(setData(response.data));
    } catch (error) {
        console.error('Failed to fetch invoices', error);
        throw error;
    }
};
