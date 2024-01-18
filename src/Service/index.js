import axios from 'axios';
import { toast } from 'react-toastify';

export const LoginUser = async ({ payload, dispatch, setData, navigate }) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, payload);
        dispatch(setData(response.data));
        const userLogin =  JSON.stringify(response.data);
        const token = response.data.token
        localStorage.setItem('Token', token);
        localStorage.setItem('userLogin', userLogin);
        navigate('/')
        // await window.location.reload()
        toast.success('Welcome Back 😉');

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
        console.error('Failed to fetch', error);
        throw error;
    }
};

export const GetShowData = async ({ dispatch, setData, urlApi, param }) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${urlApi}/${param}`);
        dispatch(setData(response.data));
    } catch (error) {
        console.error('Failed to fetch', error);
    }
};


export const GetDetail = async ({ dispatch, setData, urlApi }) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${urlApi}`);
        dispatch(setData(response.data));
    } catch (error) {
        console.error('Failed to fetch', error);
        throw error;
    }
};

export const postData = async ({ urlApi, payload }) => {
    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/${urlApi}`, payload);
        toast.success('Data Added Successfully');
    } catch (error) {
        console.error(`Failed to post data to ${urlApi}`, error);
        throw error;
    }
};

export const putData = async ({ dispatch, setData, urlApi, payload, param }) => {
    try {
        await axios.put(`${process.env.REACT_APP_API_URL}/${urlApi}/${param}`, payload);
        dispatch(setData(null));
        toast.success('updated successfully');
    } catch (error) {
        console.error(`Failed to post data to ${urlApi}`, error);
        toast.error('update failed');
    }
};


export const deleteData = async ({ dispatch, setData, Id, urlApi }) => {
    try {
        const response = await axios.delete(`/${urlApi}`, {
            data: { id: Id }
        });
        dispatch(setData(response.data));
        toast.success('Data deleted successfully');
    } catch (error) {
        toast.error('Failed to delete');
        console.error('Failed to delete', error);
    }
};

