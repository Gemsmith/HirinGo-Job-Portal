import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DefaultLayout } from '../components';
import SearchBar from '../components/SearchBar';

const locationIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
      clipRule="evenodd"
    />
  </svg>
);

const eyeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
    <path
      fillRule="evenodd"
      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
      clipRule="evenodd"
    />
  </svg>
);

const dummyImage = `https://www.tailwind-kit.com//images/person/4.jpg`;

const SearchPage = () => {
  const { searchedData } = useSelector((state) => state.jobsReducer);
  console.log('searchedData', searchedData);
  return (
    <DefaultLayout>
      <div className="p-4 overflow-hidden">
        <p
          tabIndex="0"
          className="focus:outline-none text-lg sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"
        >
          Search Results
        </p>

        {searchedData.length === 0 ? (
          <p>No data available</p>
        ) : (
          <div className="">
            {searchedData.map((job) => {
              return (
                <Link
                  to={`/jobs/view/${job._id}`}
                  className="text-xs flex justify-between flex-col sm:flex-row mt-4 p-4 border-2 hover:border-blue-500/80 hover:bg-blue-300/10 rounded-xl"
                >
                  <div className="flex gap-4 overflow-hidden ">
                    {/* 1st col */}
                    <img
                      src={job?.image || dummyImage}
                      alt=""
                      className="my-1 h-20 w-20 rounded-2xl"
                    />

                    {/* 2nd col */}
                    <div className="flex flex-col gap-1 self-stretch">
                      <div>
                        <div className="text-lg font-bold text-neutral-900/80 self-stretch ">
                          {job.title}
                        </div>
                        <div className="text-base font-semibold text-blue-900 truncate mb-1">
                          {job.company_name}
                        </div>
                      </div>

                      <div className="text-sm  text-blue-900 flex gap-1 sm:gap-4 flex-col sm:flex-row mb-1">
                        <div className="flex gap-2 ">
                          <span className="text-blue-900/70">
                            {locationIcon}
                          </span>
                          <span>{job.location}</span>
                        </div>
                        {/* <div className="flex gap-2 ">
                          <span className="text-blue-900/70">{eyeIcon}</span>
                          <span>__240 views__</span>
                        </div> */}
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

                  <hr className="sm:hidden mt-3 mb-1 " />

                  {/* 3rd col */}
                  <div className="flex flex-row sm:flex-col text-gray-900/80 justify-between sm:justify-end items-center sm:items-end gap-2 sm:whitespace-nowrap content-end">
                    <div className="pr-3 sm:pr-0 flex flex-col overflow-hidden">
                      <span className="text-blue-900 py-1 sm:self-end">
                        Team{' '}
                      </span>
                      <span className="max-h-12 max-w-[12rem] font-semibold text-ellipsis overflow-hidden sm:self-end">
                        {job.department}
                      </span>
                    </div>

                    <div className="border-r h-8 sm:hidden"> </div>

                    <div className=" pl-3 sm:pl-0   self-end sm:self-start">
                      <span className="text-xl font-bold ">
                        {`$${job.salaryFrom}-${job.salaryTo}`}
                      </span>{' '}
                      / year
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default SearchPage;
