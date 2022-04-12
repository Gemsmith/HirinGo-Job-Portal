import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useDispatch, useSelector } from 'react-redux';
import LoadingJobsLoader from '../components/LoadingJobsLoader';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { applyJob } from '../redux/actions/jobActions';
import { toast } from 'react-toastify';

const Home = () => {
  const dummyImage = `https://www.tailwind-kit.com//images/person/4.jpg`;

  const { jobs } = useSelector((state) => state.jobsReducer);
  const { loading } = useSelector((state) => state.loaderReducer);

  let count = 0;
  const pillColors = [
    'font-semibold text-white bg-gradient-to-br from-pink-500 to-orange-400',
    'font-semibold text-gray-900 bg-gradient-to-r from-red-200 to-red-300',
    'font-semibold text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200',
    'font-semibold text-white bg-gradient-to-br from-green-400 to-blue-600',
    'font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500',
    'font-semibold text-white bg-gradient-to-br from-purple-600 to-blue-500',
  ];

  // const pillColors2 = [
  //   'text-purple-600 font-semibold bg-purple-600/20',
  //   'text-sky-600 font-semibold bg-sky-600/20',
  //   'text-green-600 font-semibold bg-green-600/20',
  //   'text-cyan-600 font-semibold bg-cyan-200/50',
  // ];

  const skillsRequiredPills = (skillsRequired) => {
    const arr = skillsRequired.map((skill, index) => {
      if (count >= pillColors.length) {
        count = 0;
      }
      count++;
      return (
        <span
          key={index}
          className={`px-4 py-1 rounded-full ${pillColors[count - 1]}`}
        >
          {skill}
        </span>
      );
    });

    return (
      <div className="flex gap-4 my-3 whitespace-nowrap overflow-scroll no-scrollbar">
        {arr}
      </div>
    );
  };

  const dispatch = useDispatch();
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  let userId;
  let user_name;
  let alreadyApplied;
  if (
    loggedInUser !== null &&
    loggedInUser !== undefined &&
    loggedInUser !== ''
  ) {
    userId = loggedInUser._id;
    user_name = loggedInUser.username;
    console.log(userId, user_name);
  }

  const applyNowClick = (jobId, userId) => {
    if (
      loggedInUser == null ||
      loggedInUser == undefined ||
      loggedInUser == ''
    ) {
      return toast('Please login to apply for the job');
    }
    dispatch(applyJob(jobId, userId));
  };

  useEffect(() => {}, [jobs]);

  return (
    <>
      <DefaultLayout>
        {loading ? (
          <LoadingJobsLoader />
        ) : (
          <div className="h-full p-4">
            {/* Search Bar */}
            <SearchBar searchData={jobs} />

            {jobs.length > 0 && (
              <div className="my-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                  {jobs.map((job) => {
                    // Find if current user has already applied to this job inside the job.appliedCandidates array
                    if (job !== null && job !== undefined && job !== '') {
                      let appliedCandidates = job.appliedCandidates;
                      console.log(
                        'appliedCandidates ',
                        job.title,
                        appliedCandidates
                      );
                      alreadyApplied = appliedCandidates.find((candidate) => {
                        if (candidate.userId === userId) {
                          return true;
                        }
                      });
                      console.log('alreadyApplied', alreadyApplied);
                    }

                    return (
                      <div
                        className=" w-full flex flex-col justify-between shadow-xl hover:bg-gradient-to-br hover:from-blue-200/50 hover:to-red-200/50 p-5 rounded-xl sm:min-w-[18rem]
                      bg-gradient-to-br from-blue-200/30 to-red-200/30 
                      "
                      >
                        <div>
                          {/* 1st row */}
                          <div className="flex justify-between items-center mb-5">
                            <img
                              src={job.image || dummyImage}
                              alt=""
                              className="h-20 w-20 rounded-full"
                            />
                            <div className="flex flex-col items-end">
                              <span className="font-semibold text-gray-600/70 whitespace-nowrap">
                                {job.jobPostDate}
                              </span>
                              <span className="text-base font-semibold text-gray-600 whitespace-nowrap">
                                {job.experience}
                              </span>
                            </div>
                          </div>

                          {/* 2nd row */}
                          <div>
                            <span className="text-lg font-bold">
                              {' '}
                              {job.title}
                            </span>
                          </div>

                          {/* 3rd row */}
                          <span> {job.company_name}</span>
                          {job !== null &&
                            job !== undefined &&
                            job !== '' &&
                            skillsRequiredPills(job.skillsRequired)}
                          {/* 4rth row */}
                          <p className="text-base font-semibold m-0 mb-2">
                            {job.location}
                          </p>

                          {/* 5th row */}
                          <p
                            className="  text-gray-500 m-0 mb-3 max-h-28 overflow-auto lg:overflow-hidden lg:text-ellipsis"
                            style={{ whiteSpace: 'pre-line' }}
                          >
                            {job.smallDescription}
                          </p>
                          {/* 
                          <p className="leading-relaxed mb-3 w-full h-16 overflow-hidden">
                 {!job.smallDescription
                   ? 'No description available'
                   : job.smallDescription.length > 126
                   ? job.smallDescription.slice(0, 126) + '...'
                   : job.smallDescription}
               </p> */}
                        </div>

                        {/* 6th row */}
                        <div className="flex flex-col sm:flex-row justify-between sm:gap-6 text-center font-semibold justify-self-end">
                          {job.postedBy.username === user_name ? (
                            <button className="w-full py-2 text-base font-bold text-white bg-blue-600 rounded-full ring-2 ring-blue-600 hover:bg-blue-700">
                              <Link
                                to={`/jobs/edit/${job._id}`}
                                className="text-white hover:text-white "
                              >
                                Edit Now
                              </Link>
                            </button>
                          ) : alreadyApplied?.userId ? (
                            <button className="w-full py-2 text-base font-bold text-white bg-green-600 rounded-full whitespace-nowrap ring-2 ring-green-600">
                              Applied
                            </button>
                          ) : (
                            <button
                              onClick={() => applyNowClick(job._id, userId)}
                              className="w-full py-2 text-base font-bold text-white bg-blue-600 rounded-full ring-2 ring-blue-600 hover:bg-blue-700 hover:text-white"
                            >
                              Apply
                            </button>
                          )}

                          <hr className="sm:hidden mt-3 mb-1 " />

                          <Link
                            to={`/jobs/view/${job._id}`}
                            className="w-full py-2 text-base font-bold text-white rounded-full text-gray-600 bg-white ring-1 ring-gray-600/70 hover:bg-gray-600/70 hover:text-white "
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </DefaultLayout>
    </>
  );
};

export default Home;
