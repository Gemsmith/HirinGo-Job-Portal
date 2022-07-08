import axios from 'axios';
import { toast } from 'react-toastify';

const loggedInUser = JSON.parse(localStorage.getItem('user'));

export const getAllJobs = () => async (dispatch) => {
  try {
    dispatch({ type: 'LOADING', payload: true });
    const response = await axios.get(`/api/jobs/getalljobs`);
    dispatch({ type: 'GET_ALL_JOBS', payload: response.data.jobs });
    dispatch({ type: 'LOADING', payload: false });
  } catch (error) {
    console.log(error);
    toast('Error fetching jobs');
    dispatch({ type: 'LOADING', payload: false });
  }
};

export const getUsersPostedJobs = (username) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });
  try {
    const response = await axios.post(
      'api/jobs/getpostedjobs',
      { username },
      { headers: { 'x-access-token': loggedInUser.jwtToken } }
    );
    if (response) {
      dispatch({ type: 'GET_USERS_POSTED_JOBS', payload: response.data.jobs });
    }

    dispatch({ type: 'LOADING', payload: false });
  } catch (error) {
    console.log(error);
    toast('Error fetching your posted jobs. Please try logging in again.');
    dispatch({ type: 'LOADING', payload: false });
  }
};

export const postJob = (jobData) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });
  try {
    const response = await axios.post('/api/jobs/postjob', jobData, {
      headers: { 'x-access-token': loggedInUser.jwtToken },
    });
    if (response.data.status === 'success') {
      toast('Job posted successfully');
    }
    dispatch({ type: 'LOADING', payload: false });

    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (error) {
    console.log(error);
    toast('Job couldnt be posted');
    dispatch({ type: 'LOADING', payload: false });
  }
};

export const editJob = (updatedJobData) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });
  try {
    const response = await axios.post('/api/jobs/editjob', updatedJobData, {
      headers: { 'x-access-token': loggedInUser.jwtToken },
    });
    if (response.data.status === 'success') {
      toast('Job updated successfully');
    }
    dispatch({ type: 'LOADING', payload: false });
  } catch (error) {
    console.log(error);
    toast('Error in updating the job details. Please try logging in again.');
    dispatch({ type: 'LOADING', payload: false });
  }
};

export const applyJob = (jobId, userId, applyDate) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });

  const jobApplicationData = { jobId, userId, applyDate };

  try {
    const response = await axios.post('/api/jobs/applyjob', jobApplicationData, {
      headers: { 'x-access-token': loggedInUser.jwtToken },
    });
    if (response.data.status === 'success') {
      // Updating the updated User object in localStorage too.
      // if (response.data.updatedUserData) {
      //   localStorage.setItem('user', JSON.stringify(response.data.updatedUserData));
      //   window.location.reload();
      // } else {
      //   toast('INCORRECT FORMAT: User data will not be saved in LocalStorage.');
      // }
      // Since as soon as we login, we add some of our own data to the user object, before saving it to localStorage.
      // Which means we can't overwrite the data we have in localStorage with the data we get in the response. Because
      // then those custom properties would get lost.
      // So we only need to update the appliedJobs array in the user object. And then push the updated user object to localStorage.
      // So that we retain the custom values and add the updated values.

      const userClone = localStorage.getItem('user');
      const tempUser = JSON.parse(JSON.parse(JSON.stringify(userClone)));

      tempUser.appliedJobs = response.data.updatedUserData.appliedJobs;

      // This is the user with recenlty applied job in its appliedJobs array.
      localStorage.setItem('user', JSON.stringify(tempUser));
      window.location.reload();
      dispatch({ type: 'LOADING', payload: false });
    }
  } catch (error) {
    console.log(error);
    toast('Error occurred while appplying for the job.');
    dispatch({ type: 'LOADING', payload: false });
  }
};

export const getAppliedUsers = (jobId) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    const response = await axios.post(
      '/api/jobs/getappliedusers',
      { jobId: jobId },
      {
        headers: { 'x-access-token': loggedInUser.jwtToken },
      }
    );

    if (response.data.status === 'success') {
      dispatch({ type: 'GET_APPLIED_USERS', payload: response.data.users });
      dispatch({ type: 'LOADING', payload: false });
    }
  } catch (error) {
    console.log(error);
    toast('Error occurred while appplying for the job.');
    dispatch({ type: 'LOADING', payload: false });
  }
};

export const removeJob = (jobId) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });
  try {
    const response = await axios.post(
      '/api/jobs/deletejob',
      {
        jobId: jobId,
      },
      {
        headers: { 'x-access-token': loggedInUser.jwtToken },
      }
    );
    if (response.data.status === 'success') {
      toast('Job Deleted successfully');
    }
    dispatch({ type: 'LOADING', payload: false });
  } catch (error) {
    console.log(error);
    toast('Error in deleting the job. Please try logging in again.');
    dispatch({ type: 'LOADING', payload: false });
  }
};

// export const storeCurrentJobsAppliedUsers = (appliedUsers) => {
//   return { type: 'STORE_APPLIED_USERS', payload: appliedUsers };
// };

export const storeSearchedData = (searchedData) => {
  return { type: 'STORE_SEARCHED_DATA', payload: searchedData };
};
