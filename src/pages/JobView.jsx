import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoadingJobsLoader } from '../components';
import DefaultLayout from '../components/DefaultLayout';
import { applyJob, getAJob } from '../redux/actions/jobActions';

const JobView = () => {
  // Hiding all company details, until we create company model is added at the server.
  // const companyLogo =
  //   'https://d2q79iu7y748jz.cloudfront.net/s/_logo/39da0e1eca44b43eb294ae2e4c132bd0';

  let count = 0;
  const pillColors = [
    'text-white bg-gradient-to-br from-pink-500 to-orange-400',
    'text-gray-900 bg-gradient-to-r from-red-200 via-red-300',
    'text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200',
    'text-white bg-gradient-to-br from-green-400 to-blue-600',
    'text-white bg-gradient-to-r from-purple-500 to-pink-500',
    'text-white bg-gradient-to-br from-purple-600 to-blue-500',
  ];

  const dispatch = useDispatch();
  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  const jobId = useParams().id;

  // Since we also have job's _id floating around, we are explicitly creating seprate var's for userId as well as jobId
  // There is a problem and 2 solutions mentioned below.
  // But for now we're not making the API call just making it work by conditionally rendering the Job (by re-rendering this component as and whenever the jobs array gets fetched in the store). useSelector has subscribed to the store and as the jobs array in the store updates, we will destructure the jobs out.
  // 1. Get the job from the store || 2. make the API call
  // (1. In case where the page is loaded after the homepage is opened (there the Jobs API is called and results are awaited before render), the jobs array will have been fetched from the API and the any job's card can be clicked to load this component with corresponding job data.)
  // (2. But when the page is loaded directly from bookmarks or browser history, this JobView page will have rendered much faster before the jobs array has the time to be fetched, as it will still be fetching from the DB and then, console will throw not found errors. Thus we also need a fallback to the API to load the data in case store doesn't have it yet.)

  const { jobs } = useSelector((state) => state.jobsReducer);
  // console.log('JOBS', jobs);

  const job = jobs.find((job) => job._id === jobId);
  // console.log('JOB', job);

  let userId;
  let user_name;
  let appliedCandidates;
  let alreadyApplied;
  if (
    loggedInUser !== null &&
    loggedInUser !== undefined &&
    loggedInUser !== ''
  ) {
    userId = loggedInUser._id;
    user_name = loggedInUser.username;
  }
  console.log(user_name);

  // Find if currnet user has already applied to this job inside the job.appliedCandidates array
  if (job !== null && job !== undefined && job !== '') {
    appliedCandidates = job.appliedCandidates;
    alreadyApplied = appliedCandidates.find((candidate) => {
      return candidate.userId === userId;
    });
  }

  const applyNowClick = () => {
    if (
      loggedInUser == null ||
      loggedInUser == undefined ||
      loggedInUser == ''
    ) {
      return toast('Please login to apply for the job');
    }
    dispatch(applyJob(jobId, userId));
  };

  useEffect(() => {
    // If a user has some job bookmarked, and comes to it. Immediately this component will be loaded, but since every re-render/reload jobs are fetched from the API, this comp will throw errors, esp. it throws errors wherever .map is used. I don't know how to delay this compoenet until after all jobs' array has been fetched in the App component, which then can be used in the any components.
    // Therefore to delay this comp. we're creating a mock API, which returns a Promise resolved after specified time, meaning we can use aysnc
    // await in the useEffect and delay loading this comp by a specified time.
    // const mockApi = (success, timeout) => {
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       if (success) {
    //         console.log(jobs);
    //         //
    //         // console.log('job', job);
    //         resolve();
    //       } else {
    //         reject({
    //           message: 'Promise Rejected / Request Failed / Error / etc.',
    //         });
    //       }
    //     }, timeout);
    //   });
    // };
    // const callMockApi = async () => {
    //   await mockApi(true, 1000);
    // };
    // callMockApi();
  }, [jobs, job]);

  if (!job || job === null || job === undefined || job === '' || job === ' ') {
    return (
      <DefaultLayout>
        <LoadingJobsLoader />
      </DefaultLayout>
    );
  }

  return (
    <div className="min-h-screen ">
      <DefaultLayout>
        <div className="container px-12 py-4 mt-4 text-base leading-snug flex gap-10">
          {/* Left Div - Job Info */}
          <div className="lg:w-6/12">
            {/* 1st Para - Job Info.*/}
            <div>
              <div className="text-sm text-white font-semibold rounded-full px-3 bg-green-600 w-fit">
                {job.department}
              </div>
              {/* Job Title */}
              <h1 className="text-2xl font-bold mb-0">{job.title}</h1>

              {/* Sub Heading */}
              {/* Link for immediate description */}
              <div className="mb-3">{job.company_name}</div>
              <div>{job.location}</div>

              {/* Link for company additional info */}
              {/* If ratings available only then show this div */}
              {/* <div className="mt-3 mb-2 px-3 py-1 border-2 rounded-md bg-gray-100"> */}
              {/* <Link
                  to="/company/2321213123"
                  className="text-lg font-bold text-black"
                >
                  {job.company_name}
                </Link> */}

              {/* Stars */}
              {/* <div className="flex items-center mb-3">
                  <div className="flex items-center mr-3">
                    <svg
                      className="mx-1 w-4 h-4 fill-current text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      stroke="#2d2d2d"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg
                      className="mx-1 w-4 h-4 fill-current text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      stroke="#2d2d2d"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg
                      className="mx-1 w-4 h-4 fill-current text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      stroke="#2d2d2d"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg
                      className="mx-1 w-4 h-4 fill-current text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      stroke="#2d2d2d"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg
                      className="mx-1 w-4 h-4 fill-current text-gray-100"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      stroke="#2d2d2d"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  </div>
                  <p className="m-0">________ 14,000 reviews ________</p>
                </div> */}
              {/* </div> */}
            </div>

            {/* 2nd Para - Salary, Skills*/}
            <div className="mt-3">
              {/* Salary */}
              <span>
                ₹{job.salaryFrom} - ₹{job.salaryTo} per month
              </span>

              {/* Skills */}
              {/* Skills */}
              {/* Skills */}
              {/* Skills */}
              {/* Skills */}
              {/* Skills */}
              {job && (
                <div className="flex gap-2 mt-3">
                  {job.skillsRequired.map((skill, index) => {
                    if (count >= pillColors.length) {
                      count = 0;
                    }
                    count++;
                    return (
                      <span
                        key={index}
                        className={`px-4 py-1 rounded-full ${
                          pillColors[count - 1]
                        }`}
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Buttons become visible in mobile view */}
            <div className="block lg:hidden mt-5">
              {job.postedBy.username === user_name ? (
                <button className="transition w-36 py-2 text-lg font-bold text-white rounded-lg border-b-4 border-b-blue-900 bg-blue-600 hover:bg-blue-700 active:translate-y-[0.125rem] active:border-b-blue-700 ">
                  <Link to={`/editjob/${job._id}`} className="text-white">
                    Edit Now
                  </Link>
                </button>
              ) : alreadyApplied ? (
                <button className="text-white text-lg font-bold bg-green-600 rounded-full px-5 py-2 whitespace-nowrap shadow-lg border-b-green-900">
                  Applied
                </button>
              ) : (
                <button
                  onClick={applyNowClick}
                  className="transition w-36 md:w-80 py-2 text-lg font-bold text-white rounded-lg border-b-4 border-b-blue-900 bg-blue-600 hover:bg-blue-700 active:translate-y-[0.125rem] active:border-b-blue-700 "
                >
                  Apply now
                </button>
              )}
            </div>

            <hr className="my-6 bg-neutral-300" />

            {/* 3rd Para */}
            <div className="">
              {/* Job Description */}
              <div className="mb-6">
                <p className="mb-1">
                  <b>Job Description: </b>
                </p>
                <p style={{ whiteSpace: 'pre-line' }}>{job.fullDescription}</p>
              </div>

              {/* Minimum Requirements */}
              <div className="mb-6">
                <p className="mb-1">
                  <b>Minimum Requirements: </b>
                </p>
                <div>
                  {job &&
                    job.minimumQualifications.map((item, index) => {
                      return (
                        <ul key={index}>
                          <li>
                            {item.name} : {item.score}
                          </li>
                        </ul>
                      );
                    })}
                </div>
              </div>

              {/* Job Types, Salary, Schedule, Experience */}
              <div className="mb-6">
                {/* Job Types */}
                {/* <div className="mb-6">
                  <b className="mb-1">Job Types: </b>
                  <p>________ Full-time, Regular / Permanent ________</p>
                </div> */}

                {/* Salary */}
                <div className="mb-6">
                  <b className="mb-1">Salary: </b>
                  <p>
                    ₹{job.salaryFrom} - ₹{job.salaryTo} per month
                  </p>
                </div>

                {/* Schedule */}
                {/* <div className="mb-6">
                  <b>Schedule:</b>
                  <ul className="ml-2 px-2 mt-1 list-inside list-disc">
                    <li>________ Monday to Friday ________</li>
                    <li>________ Night shift ________</li>
                  </ul>
                </div> */}

                {/* Experience */}
                <div className="mb-6">
                  <b className="mb-1">Experience: </b>
                  {/* <ul className="ml-2 px-2 pt-1 list-inside list-disc">
                <li>iOS/Android Development: 5 years (Preferred)</li>
              </ul> */}
                  <p>{job.experience} yrs</p>
                </div>
              </div>

              <hr className="my-6 bg-neutral-300" />
            </div>

            {/* 4rth Para - Hiring Insights */}
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-1">Hiring Insights</h2>

              {/* General Stats */}
              {/* <div className="flex gap-1 flex-col mb-6">
                <div className="flex gap-2 m-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="DimGray"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <p className="m-0">
                    ________ Application response rate: <b>64%</b> ________
                  </p>
                </div>

                <div className="flex gap-2 m-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
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
                  <span>
                    ________ Hiring <b>1</b> candidate for this role ________
                  </span>
                </div>

                <p className="flex gap-2 m-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="DimGray"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="">________ Urgently hiring ________</span>
                </p>
              </div> */}

              {/* Job Activity */}
              <div>
                <b>Job activity</b>
                <ul className="ml-2 mt-0 px-2 pt-1 list-inside list-disc">
                  <li>
                    Posted: <b>{job.jobPostDate}</b>
                  </li>
                  <li>
                    Total Applications: <b>{appliedCandidates.length}</b>
                  </li>
                  <li>
                    Posted by: <b>{job.postedBy.name}</b>
                  </li>
                </ul>
              </div>
            </div>

            <hr className="my-6 bg-neutral-300" />

            {/* 5th Para - Actions (Report, Apply, Like) */}
            <div className="">
              {/* Report Button */}
              {/* <button className="transition w-40 py-2 mt-8 text-lg font-semibold text-black rounded-lg border-b-4 border-b-neutral-400 bg-neutral-200 hover:bg-neutral-300 active:translate-y-[0.125rem] active:border-b-neutral-300  flex justify-center  gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 mt-0.5"
                  fill="#2d2d2d"
                  viewBox="0 0 24 24"
                  stroke="#2d2d2d"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                  />
                </svg>
                <span className=""></span>
                Report job
              </button> */}

              {/* Apply Button */}
              <div className="flex items-center gap-8 mt-8">
                {job.postedBy.username === user_name ? (
                  <button className="transition w-36 md:w-80 py-2 text-lg font-bold text-white rounded-lg border-b-4 border-b-blue-900 bg-blue-600 hover:bg-blue-700 active:translate-y-[0.125rem] active:border-b-blue-700 ">
                    <Link to={`/jobs/edit/${job._id}`} className="text-white">
                      Edit Now
                    </Link>
                  </button>
                ) : alreadyApplied ? (
                  <button className="text-white text-lg font-bold bg-green-600 rounded-full px-5 py-2 whitespace-nowrap shadow-lg border-b-green-900">
                    Applied
                  </button>
                ) : (
                  <button
                    onClick={applyNowClick}
                    className="transition w-36 md:w-80 py-2 text-lg font-bold text-white rounded-lg border-b-4 border-b-blue-900 bg-blue-600 hover:bg-blue-700 active:translate-y-[0.125rem] active:border-b-blue-700 "
                  >
                    Apply now
                  </button>
                )}

                {/* Heart Button */}
                {/* <button className="h-6 w-6 ">
                  <svg
                    role="img"
                    aria-label="save-icon"
                    focusable="false"
                    viewBox="0 0 18 18"
                  >
                    <g>
                      <path d="M12.38,2.25A4.49,4.49,0,0,0,9,3.82,4.49,4.49,0,0,0,5.63,2.25,4.08,4.08,0,0,0,1.5,6.38c0,2.83,2.55,5.15,6.41,8.66L9,16l1.09-1C14,11.52,16.5,9.21,16.5,6.38A4.08,4.08,0,0,0,12.38,2.25ZM9.08,13.91L9,14l-0.08-.08C5.35,10.68,3,8.54,3,6.38A2.56,2.56,0,0,1,5.63,3.75,2.93,2.93,0,0,1,8.3,5.52H9.7a2.91,2.91,0,0,1,2.67-1.77A2.56,2.56,0,0,1,15,6.38C15,8.54,12.65,10.68,9.08,13.91Z"></path>
                    </g>
                  </svg>
                </button> */}
              </div>
            </div>

            <hr className="mt-10 mb-6" />

            {/* 6th Para - Related Links */}
            {/* <div className="flex flex-col gap-3 text-black">
              <a
                className="hover:underline"
                href="/jobs?from=vj&amp;q=Android+Developer&amp;l=Remote"
              >
                ________ Android Developer jobs in Remote ________
              </a>

              <a
                className="hover:underline"
                href="/jobs?from=vj&amp;q=Clerk-Tech&amp;l=Remote"
              >
                ________ Jobs at Clerk-Tech in Remote ________
              </a>

              <a
                className="hover:underline"
                href="/salary?from=vj&amp;q1=Android+Developer&amp;l1=Remote"
              >
                ________ Android Developer salaries in Remote ________
              </a>
            </div> */}
          </div>

          {/* Right Div - Company Info */}
          {/* <div className="hidden lg:block">
            <div className="flex flex-col border-2 lg:w-80 xl:96"> */}
          {/* Section Title */}
          {/* <p className="font-semibold border-b-2 py-3 px-4 whitespace-nowrap">
                Company Info
              </p> */}

          {/* Company Logo */}
          {/* <img
                src={job.company_image || companyLogo}
                alt="company_logo"
                className="w-24 object-cover mx-auto "
              /> */}

          {/* Follow Button */}
          {/* <button className="mx-auto w-2/5 py-2 px-4 mt-4 text-sm font-semibold text-black rounded-lg bg-neutral-200 hover:bg-neutral-300 active:border-b-neutral-300">
                Follow
              </button> */}

          {/* <div className="p-4"> */}
          {/* Link */}
          {/* <Link to="/company/2321213123" className="mt-8 underline">
                  {job.company_name}
                </Link> */}

          {/* Stars */}
          {/* <div className="flex items-center my-3">
                  <div className="flex items-center mr-3">
                    <svg
                      className="mx-1 w-4 h-4 fill-current text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      stroke="#2d2d2d"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg
                      className="mx-1 w-4 h-4 fill-current text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      stroke="#2d2d2d"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg
                      className="mx-1 w-4 h-4 fill-current text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      stroke="#2d2d2d"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg
                      className="mx-1 w-4 h-4 fill-current text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      stroke="#2d2d2d"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg
                      className="mx-1 w-4 h-4 fill-current text-gray-100"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      stroke="#2d2d2d"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  </div>
                  <p className="m-0 whitespace-nowrap">14,000 reviews</p>
                </div> */}

          {/* Company Description - Small */}
          {/* <p className="text-gray-500">
                  {job.company_description
                    ? job.company_description.length > 240
                      ? job.company_description.slice(0, 240) + '...'
                      : job.company_description
                    : 'No Company Description'}
                </p> */}

          {/* <div>
                  <p className="mb-2">Email: {job.company_email}</p>
                  <p>Phone: {job.company_phone}</p>
                </div> */}
          {/* </div> */}
          {/* </div> */}
          {/* </div> */}
        </div>
      </DefaultLayout>
    </div>
  );
};

export default JobView;
