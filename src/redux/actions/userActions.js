import axios from 'axios';
import { toast } from 'react-toastify';

const loggedInUser = JSON.parse(localStorage.getItem('user'));

export const signupUser = (userInputData) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });
  try {
    await axios.post('/api/users/signup', userInputData);
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

    // Saving the latest User object in localStorage.
    if (response.data.user) {
      dispatch({ type: 'LOADING', payload: false });
      toast('Logged in successfully!');
      localStorage.setItem('user', JSON.stringify(response.data.user));
      window.location.href = '/';
    } else {
      dispatch({ type: 'LOADING', payload: false });
      return toast('INCORRECT FORMAT: User data will not be saved in LocalStorage.');
    }
  } catch (error) {
    console.log(error);
    toast('Error logging in! Please enter correct credentials.');
    dispatch({ type: 'LOADING', payload: false });
  }
};

export const getUser = (userId) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    const response = await axios.post('/api/users/getuser', { userId });

    if (response.data.status === 'success' && response.data.user) {
      localStorage.setItem('fetchedUser', JSON.stringify(response.data.user));
      dispatch({ type: 'LOADING', payload: false });
    } else {
      toast('Error in fetching user profile! Please try logging in again.');
      dispatch({ type: 'LOADING', payload: false });
    }
  } catch (error) {
    console.log(error);
    toast('Error while updating the user data! Please try logging in again.');
    dispatch({ type: 'LOADING', payload: false });
  }
};

export const updateUser = (formData) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });
  const userId = JSON.parse(localStorage.getItem('user'))._id;
  formData.id = userId;

  try {
    const response = await axios.post('/api/users/updateuserinfo', formData, {
      headers: { 'x-access-token': loggedInUser.jwtToken },
    });

    if (response.data.status === 'success' && response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      toast('User info updated successfully!');
      dispatch({ type: 'LOADING', payload: false });
    } else {
      toast('Error in updating user info! Please try again.');
      dispatch({ type: 'LOADING', payload: false });
    }
  } catch (error) {
    console.log(error);
    toast('Error while updating the user data! Please try again.');
    dispatch({ type: 'LOADING', payload: false });
  }
};

export const updateResumeLink = (resumeLink) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });
  const userId = JSON.parse(localStorage.getItem('user'))._id;
  const data = { userId, resumeLink };

  try {
    const response = await axios.post('/api/users/uploadresumelink', data, {
      headers: { 'x-access-token': loggedInUser.jwtToken },
    });

    if (response.data.status === 'success' && response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      toast('Resume link updated successfully!');
      dispatch({ type: 'LOADING', payload: false });
    } else {
      toast('Error in updating resume link! Please try logging in again.');
      dispatch({ type: 'LOADING', payload: false });
    }
  } catch (error) {
    console.log(error);
    toast('Error while updating the resume link! Please try logging in again.');
    dispatch({ type: 'LOADING', payload: false });
  }
};
