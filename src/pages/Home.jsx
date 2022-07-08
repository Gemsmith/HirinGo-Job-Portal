import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LoadingJobsLoader from '../components/LoadingJobsLoader';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import dummyCompanyImage from '../assets/images/logo-image.png';

const Home = () => {
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
    const arr = skillsRequired?.map((skill, index) => {
      if (count >= pillColors.length) {
        count = 0;
      }
      count++;
      return (
        <span
          key={index}
          className={`px-3 py-1 text-xs rounded-full ${pillColors[count - 1]}`}
        >
          {skill}
        </span>
      );
    });

    return (
      <div className="flex gap-3 my-3 whitespace-nowrap overflow-scroll no-scrollbar ">
        {arr}
      </div>
    );
  };

  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  let userId;
  let user_name;
  let alreadyApplied;
  if (loggedInUser !== null && loggedInUser !== undefined && loggedInUser !== '') {
    userId = loggedInUser._id;
    user_name = loggedInUser.username;
  }

  // Filtering Component Functionality
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  let experienceFilterValuesArray = jobs.map((job) => {
    return job.experience;
  });
  experienceFilterValuesArray = ['All', ...new Set(experienceFilterValuesArray)];

  const handleExpFilter = (experience) => {
    let filteredArr;
    if (experience === 'All') {
      setFilteredJobs(jobs);
    } else {
      filteredArr = jobs.filter((job) => {
        return job.experience === experience;
      });
      setFilteredJobs(filteredArr);
    }
  };

  const handleSalaryFilter = (salaryFrom, salaryTo) => {
    const filteredArr = jobs.filter((job) => {
      // job's starting salary lies between the filter's range, then return true
      if (job.salaryFrom >= salaryFrom && job.salaryFrom <= salaryTo) {
        return job;
      }
      return false;
    });
    setFilteredJobs(filteredArr);
  };

  useEffect(() => {}, [jobs]);

  return (
    <>
      {loading ? (
        <LoadingJobsLoader />
      ) : (
        <>
          {jobs && (
            <div className="flex justify-center">
              {
                <FilterBar
                  expFilterValues={experienceFilterValuesArray}
                  onExpFilter={handleExpFilter}
                  onSalaryFilter={handleSalaryFilter}
                />
              }

              <div className="h-full p-4 md:p-8 grow">
                <div className="flex flex-col md:flex-row md:justify-between">
                  <span className="font-bold text-2xl mb-2 md:mb-0">
                    All Jobs ({filteredJobs?.length})
                  </span>

                  {/* Search Bar */}
                  <SearchBar searchData={jobs} />
                </div>

                {jobs.length > 0 && (
                  <div className="my-4">
                    <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
                      {/* <div className="flex flex-wrap gap-6"> */}
                      {filteredJobs.map((job, index) => {
                        // Find if current user has already applied to this job inside the job?.appliedCandidates array
                        if (job !== null && job !== undefined && job !== '') {
                          let appliedCandidates = job?.appliedCandidates;

                          alreadyApplied = appliedCandidates.find((candidate) => {
                            if (candidate.userId === userId) {
                              return true;
                            }
                            return false;
                          });
                        }

                        return (
                          <div
                            key={index}
                            className=" w-full p-5 rounded-xl sm:min-w-[18rem] flex flex-col justify-between bg-white transition shadow-md 
                   hover:shadow-xl    "
                          >
                            <div>
                              {/* 1st row */}
                              <div className="flex justify-between items-center mb-5">
                                <img
                                  src={job?.company_picture || dummyCompanyImage}
                                  alt=""
                                  className="h-20 w-20 object-contain rounded-full border-2 border-blue-200 "
                                />
                                <div className="flex flex-col items-end text-base">
                                  <span className="font-semibold text-gray-600/70 whitespace-nowrap">
                                    {job?.jobPostDate}
                                  </span>
                                  <span className="text-base font-semibold text-gray-600 whitespace-nowrap">
                                    {job?.experience}
                                  </span>
                                </div>
                              </div>

                              <p className="text-sm font-medium text-blue-500">
                                {job?.location}
                              </p>

                              {/* 2nd row */}
                              <p className="text-lg font-bold"> {job?.title}</p>

                              {/* 3rd row */}
                              <span className="text-gray-400 text-base font-medium">
                                {' '}
                                {job?.company_name}
                              </span>

                              <p className="text-gray-600 text-base font-bold mt-2">
                                ${job?.salaryFrom} - ${job?.salaryTo}
                              </p>

                              {/* 4rth row */}
                              {job !== null &&
                                job !== undefined &&
                                job !== '' &&
                                skillsRequiredPills(job?.skillsRequired)}

                              {/* 3rd row */}

                              <hr className="my-3" />

                              {/* 5th row */}
                              <p
                                className="text-base text-gray-500 m-0 mb-3 max-h-28 overflow-auto no-scrollbar lg:text-ellipsis"
                                style={{ whiteSpace: 'pre-line' }}
                              >
                                {job?.smallDescription}
                              </p>
                            </div>

                            {/* 6th row */}
                            <div className="flex flex-col sm:flex-row justify-between sm:gap-6 text-center font-semibold justify-self-end">
                              {job?.postedBy?.username === user_name ? (
                                <Link
                                  to={`/jobs/edit/${job?._id}`}
                                  className="w-full py-2 text-base  text-white bg-blue-600 rounded-full hover:bg-blue-700 transition"
                                >
                                  <button className="font-bold">Edit Now</button>
                                </Link>
                              ) : (
                                alreadyApplied?.userId && (
                                  <button className="w-full py-2 text-base font-bold text-white  rounded-full whitespace-nowrap ring-2 bg-green-600 ring-green-600 transition ">
                                    Applied
                                  </button>
                                )
                              )}

                              <hr className="sm:hidden mt-3 mb-1 " />

                              <Link
                                to={`/jobs/view/${job?._id}`}
                                className="w-full py-2 text-base font-bold  rounded-full text-gray-600 bg-gray-100  ring-gray-600/70 hover:bg-gray-600/70 hover:text-white  transition "
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
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;
