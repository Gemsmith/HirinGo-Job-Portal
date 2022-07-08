import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const locationIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="DimGray"
  >
    <path
      fillRule="evenodd"
      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
      clipRule="evenodd"
    />
  </svg>
);

const dummyImage = `https://www.tailwind-kit.com//images/person/4.jpg`;

const SearchPage = () => {
  const { searchedData } = useSelector((state) => state.jobsReducer);
  // console.log('searchedData', searchedData);
  return (
    <div className="p-8 overflow-hidden">
      <p
        tabIndex="0"
        className="focus:outline-none text-lg sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800 mb-5"
      >
        Search Results
      </p>

      <div className="flex flex-wrap gap-4 ">
        {searchedData.length === 0 ? (
          <p>No data available</p>
        ) : (
          <>
            {searchedData.map((job) => {
              return (
                <Link
                  to={`/jobs/view/${job._id}`}
                  className="flex flex-col p-4 w-full sm:w-auto bg-white  hover:border-blue-500/80 hover:bg-blue-300/10 rounded-xl transition "
                >
                  <div className="flex flex-row gap-10">
                    {/* 1st + 2nd Col */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* 1st col */}
                      <img
                        src={job?.company_picture || dummyImage}
                        alt=""
                        className="my-1 h-20 w-20 object-cover rounded-2xl"
                      />

                      {/* 2nd col */}
                      <div className="flex flex-col gap-1 self-stretch">
                        <div>
                          <div className="text-lg font-bold text-blue-700 self-stretch ">
                            {job.title}
                          </div>
                          <div className="text-sm font-medium text-gray-700 truncate mb-1 flex gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 "
                              viewBox="0 0 20 20"
                              fill="DimGray"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                                clipRule="evenodd"
                              />
                              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                            </svg>
                            {job.company_name}
                          </div>
                        </div>

                        <div className="text-sm font-medium text-gray-700 truncate mb-2 flex gap-2">
                          <div className="flex gap-2 ">
                            <span className="text-blue-900/70">{locationIcon}</span>
                            <span>{job.location}</span>
                          </div>
                        </div>

                        <div className="text-sm  text-blue-900 flex gap-1 sm:gap-3 flex-wrap ">
                          <span className="flex gap-1">
                            <span className="sm:hidden">&#9679;</span>{' '}
                            <span>{job.jobPostDate}</span>
                          </span>
                          <span className="flex gap-1">
                            <span className="text-blue-900/70">&#9679;</span>{' '}
                            <span>{job.experience}</span>
                          </span>
                          <span className="flex gap-1">
                            <span className="text-blue-900/70">&#9679;</span>{' '}
                            {job.appliedCandidates.length} <span>applied</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* <hr className="sm:hidden mt-3 mb-1 " /> */}
                  </div>

                  {/* sm:items-end content-end */}
                  {/* Bottom Row */}
                  <div className="flex flex-col  sm:flex-row justify-between items-center mt-0 sm:mt-3 gap-2 sm:gap-6">
                    {/* Bottom Row - 1st col */}
                    <div className=" text-gray-900/80 w-full sm:w-auto text-center mt-4 sm:mt-0 px-4 py-2 sm:whitespace-nowrap bg-sky-200 rounded-full">
                      <span className="text-blue-500 text-sm"> Team: </span>
                      <span className="font-medium text-sm whitespace-nowrap">
                        {job.department}
                      </span>
                    </div>

                    {/* Bottom Row - 2nd col */}
                    <div className="px-6 py-2 bg-amber-200 rounded-full text-center w-full sm:w-auto  self-end">
                      <span className="text-sm font-bold ">
                        {`$${job.salaryFrom}-${job.salaryTo}`} / year
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
