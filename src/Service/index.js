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

export const GetData = async ({ dispatch, setData, urlApi }) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${urlApi}`);
        dispatch(setData(response.data));
    } catch (error) {
        console.error('Failed to fetch invoices', error);
        throw error;
    }
};

export const postData = async ({ urlApi, payload }) => {
    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/${urlApi}`, payload);
        toast.success('Invoice Data Added Successfully');
    } catch (error) {
        console.error(`Failed to post data to ${urlApi}`, error);
        throw error;
    }
};


export const deleteData = async ({ dispatch, setData, invoiceId, urlApi }) => {
    try {
        const response = await axios.delete(`/${urlApi}`, {
            data: { id: invoiceId } 
        });
        dispatch(setData(response.data));
        toast.success('Data deleted successfully');
    } catch (error) {
        toast.error('Invoice data has been successfully deleted');
        console.error('Failed to delete invoice', error);
    }
};

