import axios from 'axios';
import { toast } from 'react-toastify';

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

export const postJob = (jobData) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });
  try {
    const response = await axios.post('/api/jobs/postjob', jobData);
    if (response.data.status === 'success') {
      toast('Job posted successfully');
    }
    console.log(response.data);
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
    const response = await axios.post('/api/jobs/editjob', updatedJobData);
    console.log(response);
    if (response.data.status === 'success') {
      toast('Job updated successfully');
    }
    dispatch({ type: 'LOADING', payload: false });
  } catch (error) {
    console.log(error);
    toast('Error in updating the job details.');
    dispatch({ type: 'LOADING', payload: false });
  }
};

export const applyJob = (jobId, userId) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });

  const applyDate = new Date();
  const jobApplicationData = { jobId, userId };

  try {
    const response = await axios.post('/api/jobs/applyjob', jobApplicationData);
    if (response.data.status === 'success') {
      toast('Application sent successfully');

      // Updating the updated User object in localStorage too.
      localStorage.setItem(
        'user',
        JSON.stringify(response.data.updatedUserData)
      );
      window.location.reload();
    }

    dispatch({ type: 'LOADING', payload: false });
  } catch (error) {
    console.log(error);
    toast('Error occurred while appplying for the job.');
    dispatch({ type: 'LOADING', payload: false });
  }
};

export const storeCurrentJobsAppliedUsers = (appliedUsers) => {
  return { type: 'STORE_APPLIED_USERS', payload: appliedUsers };
};

export const storeSearchedData = (searchedData) => {
  return { type: 'STORE_SEARCHED_DATA', payload: searchedData };
};
