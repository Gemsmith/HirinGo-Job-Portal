import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Table, { DefaultColumnFilter } from '../components/Table';
import { Link } from 'react-router-dom';

const AppliedJobs = () => {
  // const mock = (success, timeout) => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (success) {
  //         resolve(mockJson);
  //       } else {
  //         reject({
  //           message: 'Promise Rejected / Request Failed / Error / etc.',
  //         });
  //       }
  //     }, timeout);
  //   });
  // };

  const { jobs } = useSelector((state) => state.jobsReducer);
  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  const username = loggedInUser?.username;

  let usersAppliedJobs = [];

  const appliedJobs = loggedInUser?.appliedJobs;

  // Since we already have the IDs of all the jobs that the user has applied to. We just need to fetch each of those jobs' details to display
  //  in our table on the AppliedJobs page. And since we also already have latest jobs array, we can just find appliedJobs from it, instead
  // of making API requests for each applied job.
  if (appliedJobs) {
    appliedJobs.forEach((appliedJob) => {
      jobs.forEach((job) => {
        if (appliedJob.jobId === job._id) {
          const appliedjobObj = {
            company_name: job.company_name,
            title: job.title,
            location: job.location,
            jobPostDate: job.jobPostDate,
            appliedCandidates: job.appliedCandidates,
          };
          const applyDateFormatted = new Date(appliedJob.applyDate).toLocaleString(
            'en-GB',
            {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }
          );
          appliedjobObj.applyDate = applyDateFormatted;
          usersAppliedJobs.push(appliedjobObj);
        }
      });
    });
  }

  const columns = useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
        Filter: DefaultColumnFilter,
        Cell: ({ row }) => {
          return <span className="font-medium text-gray-700">{row.values.title}</span>;
        },
      },
      {
        Header: 'Company',
        accessor: 'company_name',
        Filter: DefaultColumnFilter,
      },
      {
        Header: 'Location',
        accessor: 'location',
        Filter: DefaultColumnFilter,
        Cell: ({ row }) => {
          return `${row.values.location}`;
        },
      },
      {
        Header: 'Posted On',
        accessor: 'jobPostDate',
        Filter: DefaultColumnFilter,
        Cell: ({ row }) => {
          return `${row.values.jobPostDate}`;
        },
      },
      {
        Header: 'Applied On',
        accessor: 'applyDate',
        Filter: DefaultColumnFilter,
        Cell: ({ row }) => {
          return `${row.values.applyDate}`;
        },
      },
      {
        Header: 'Applicants',
        accessor: 'appliedCandidates',
        Filter: '',
        Cell: ({ row }) => {
          return <p className=" my-0 p-0">{row.values.appliedCandidates.length}</p>;
        },
      },
    ],
    []
  );

  // eslint-disable-next-line
  const data = useMemo(() => [...usersAppliedJobs], [jobs]);

  return (
    <>
      <div className="p-4 md:p-8 overflow-hidden w-screen">
        {loggedInUser ? (
          <Table
            columnsArrayProp={columns}
            dataArrayProp={data}
            headingProp={`Applied Jobs (${username})`}
            noDataMessageProp={"You haven't applied to any jobs yet."}
          />
        ) : (
          <>
            <p className="text-base pl-5 pt-5 ">
              Please <Link to="/login">Login</Link> to view your <b>Applied Jobs</b>
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default AppliedJobs;
