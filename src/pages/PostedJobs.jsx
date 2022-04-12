import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { Link } from 'react-router-dom';
import LoadingJobsLoader from '../components/LoadingJobsLoader';
import Modal from '../components/Modal';
import Table, { DefaultColumnFilter } from '../components/Table';
import { storeCurrentJobsAppliedUsers } from '../redux/actions/jobActions';
import { useDispatch } from 'react-redux';

function PostedJobs(props) {
  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  const username = loggedInUser.username;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [postedJobs, setPostedJobs] = useState([]);
  const [appliedUsers, setAppliedUsers] = useState([]);

  const dispatch = useDispatch();

  // This column Array is for this Components "Posted Jobs" Table
  const columns = [
    {
      Header: 'Title',
      accessor: 'title',
      Filter: DefaultColumnFilter,
      Cell: ({ row }) => {
        return (
          <span className="font-medium text-gray-700">{row.values.title}</span>
        );
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
      Filter: '',
      Cell: ({ row }) => {
        return `${row.values.jobPostDate}`;
      },
    },
    {
      Header: 'Applicants',
      accessor: 'appliedCandidates',
      Filter: '',
      Cell: ({ row }) => {
        return (
          <p className=" my-0 p-0">{row.values.appliedCandidates.length}</p>
        );
      },
    },
    {
      Header: 'Actions',
      accessor: 'action',
      Filter: '',
      Cell: ({ row }) => {
        return (
          <div className=" flex flex-col lg:flex-row gap-3  text-gray-600 pr-3 xl:pr-0 shrink">
            <div className="flex flex-row gap-3 self-stretch">
              {/* Eye */}
              <Link to={`/jobs/view/${row.original._id}`}>
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
              </Link>

              {/* Edit */}
              <Link to={`/jobs/edit/${row.original._id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="LimeGreen"
                >
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path
                    fillRule="evenodd"
                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>

            <div className="flex flex-row gap-3 ">
              {/* List */}
              <button
                onClick={() => {
                  fetchAppliedUsers(row.original._id);
                  setIsModalVisible(!isModalVisible);
                  // In the applied candidates table (opens on clicking the list icon in any jobs' row), we need to keep the clicked job in a state var,
                  // so that it can be used to match job from the user's appliedJobs array, which we'll load in the table. Because we need the date
                  // on which this candidate applied for this job, and for that we need the jobId so amongst all his applied jobs we can match the
                  // current job whose row we clicked.

                  // This is another way of getting candidated who applied, directly from the job object, currently being renedered in the table.
                  // However we've also done the same thing in fetchAppliedUsers() function, which is finding the job in postedJobs array, and for the
                  // job we're currently rendering, we're finding the applied candidates in it's appliedCandidates array. So we'll use that for now.
                  // setClickedJobsAppliedCandidates(
                  //   row.values.appliedCandidates
                  // );
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Delete */}

              <button onClick={() => fetchAppliedUsers(row.original._id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="OrangeRed"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        );
      },
    },
  ];

  // This column Array is for the "Applied Candidates" table (opens via the Modal)
  const appliedUsersColumns = [
    {
      Header: 'First Name',
      accessor: 'firstName',
      Filter: DefaultColumnFilter,
      Cell: ({ row }) => {
        return (
          <span className="font-bold text-gray-700">
            {row.values.firstName}
          </span>
        );
      },
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
      Filter: DefaultColumnFilter,
      Cell: ({ row }) => {
        return (
          <span className="font-bold text-gray-700">{row.values.lastName}</span>
        );
      },
    },
    {
      Header: 'Email',
      accessor: 'email',
      Filter: DefaultColumnFilter,
    },
    {
      Header: 'Username',
      accessor: 'username',
      Filter: DefaultColumnFilter,
      Cell: ({ row }) => {
        return (
          <Link to={`/user/view/${row.original._id}`}>
            {' '}
            {row.values.username}
          </Link>
        );
      },
    },
    {
      Header: 'Phone',
      accessor: 'mobileNumber',
      Filter: DefaultColumnFilter,
    },
    {
      Header: 'Apply Date',
      accessor: 'applyDate',
      Filter: DefaultColumnFilter,
    },
  ];

  const fetchAppliedUsers = async (jobId) => {
    // Thing is sometimes the 1st method fails when the component loads before the data is fetched. So 2nd method is a better one.
    // 1st way: Since the user has postedJobs and is trying to see who have applied to his jobs. Those users are stored in each job's
    // "appliedCandidates" object. Thus accessing appliedCandidates in postedJobs array, will give list of users who have applied to this job.
    // const job = postedJobs.find((job) => job._id === jobId);
    // console.log(job);
    // setAppliedUsers(job.appliedCandidates);

    // 2nd way: Send a request to the DB and query each User in thier User.appliedJobs array and see if the jobId matches. If it does, then
    // the this user has applied to this jobId that was sent to the BE.
    const response = await axios.post('/api/jobs/getappliedusers', {
      jobId: jobId,
    });

    // Was trying to transform the userObjects inside the  array to be passed into columnProp, but transforming it into a new array
    // here, was just not working. It rendered the 1st row and then next rows would be empty.
    // So had to take that whole logic and created a new array in the Be, from there we receive it here and then the table renders all rows
    // correctly. NO IDEA WHY IT WAS NOT WORING when we were doing this (created new array here in the FE):
    //     setAppliedUsers(appliedUsersArray);
    // and worked when we the same data came from the BE:
    //     setAppliedUsers(response.data.appliedUsersArray);

    let appliedUsersArray = [];
    response.data.users.forEach((user) => {
      const applyDate = user.appliedJobs.find(
        (job) => job.jobId === jobId
      ).applyDate;

      const applyDateFormatted = new Date(applyDate).toLocaleString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      user.applyDate = applyDateFormatted;

      appliedUsersArray.push(user);
    });
    // console.log('appliedUsersArraysdasdsads', appliedUsersArray);

    setAppliedUsers(appliedUsersArray);
  };

  useEffect(() => {
    const fetchPostedJobs = async () => {
      const response = await axios.post('api/jobs/getpostedjobs', { username });
      if (response) {
        const postedJobsArr = response.data.jobs;
        setPostedJobs(postedJobsArr);
      }
    };

    fetchPostedJobs();

    // We can send this dispatch right here itself. No need to look for some button click or anything. And also since in here
    // when appliedUsers is logged, it always has the data, because the component has been re-rendered (as appliedUsers is a dependency)
    // So appliedUsers is fetched only on the click of a job row's buttons. Thus we can send this dispatch here.
    dispatch(storeCurrentJobsAppliedUsers(appliedUsers));

    console.log('appliedUsers', appliedUsers);
  }, [appliedUsers]);

  if (!postedJobs) {
    return (
      <DefaultLayout>
        <LoadingJobsLoader />
      </DefaultLayout>
    );
  }

  return (
    <>
      <DefaultLayout>
        <div className="relative">
          {isModalVisible && (
            <Modal
              {...{
                setIsModalVisible,
                hideModalTitle: true,
                modalTitle: 'Applied Users',
                modalContent: (
                  <Table
                    columnsArrayProp={appliedUsersColumns}
                    dataArrayProp={appliedUsers}
                    headingProp={`Applied Users`}
                    noDataMessageProp={'No users have applied to this job yet'}
                  />
                ),
              }}
            />
          )}
        </div>

        <Table
          columnsArrayProp={columns}
          dataArrayProp={postedJobs}
          headingProp={`Posted Jobs`}
          noDataMessageProp={'No have not posted any jobs yet'}
        />
      </DefaultLayout>
    </>
  );
}

export default PostedJobs;
