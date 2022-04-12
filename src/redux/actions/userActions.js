import axios from 'axios';
import { toast } from 'react-toastify';

export const signupUser = (userInputData) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });
  console.log('userInputData', userInputData);
  try {
    const response = await axios.post('/api/users/signup', userInputData);
    console.log('response', response);
    toast('User signed up successfully!');
    dispatch({ type: 'LOADING', payload: false });
    setTimeout(() => {
      window.location.href = '/login';
    }, 1000);
  } catch (error) {
    console.log(error);
    toast('Error signing up user! Please try again.');
    dispatch({ type: 'LOADING', payload: false });
  }
};

export const loginUser = (userInputData) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });
  try {
    const response = await axios.post('/api/users/login', userInputData);
    const user = response.data.user;
    // Saving the latest User object in localStorage.

    localStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: 'LOADING', payload: false });
    window.location.href = '/';
    toast('Logged in successfully!');
  } catch (error) {
    console.log(error);
    toast('Error logging in! Please try again.');
    dispatch({ type: 'LOADING', payload: false });
  }
};

export const updateUser = (formData) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });
  const userId = JSON.parse(localStorage.getItem('user'))._id;
  formData.id = userId;

  try {
    const response = await axios.post('/api/users/updateuserinfo', formData);
    // Updating the updated User object in localStorage too.
    localStorage.setItem('user', JSON.stringify(response.data.user));
    toast('User info updated successfully!');
    dispatch({ type: 'LOADING', payload: false });
  } catch (error) {
    console.log(error);
    toast('Error while updating the user data! Please try again.');
    dispatch({ type: 'LOADING', payload: false });
  }
};
