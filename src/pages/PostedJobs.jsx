import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingJobsLoader from '../components/LoadingJobsLoader';
import Modal from '../components/Modal';
import Table, { DefaultColumnFilter } from '../components/Table';
import {
  removeJob,
  getUsersPostedJobs,
  getAppliedUsers,
} from '../redux/actions/jobActions';
import { useDispatch, useSelector } from 'react-redux';

function PostedJobs() {
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  const usersPostedJobs = useSelector((state) => state.jobsReducer?.usersPostedJobs);

  const username = loggedInUser?.username;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [jobId, setJobId] = useState('');
  // console.log('appliedUsersWithDate', appliedUsersWithDate);

  const appliedUsers = useSelector((state) => state.jobsReducer?.appliedUsers);
  const dispatch = useDispatch();

  // This column Array is for this Components "Posted Jobs" Table
  const columns = [
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
        return <p className=" my-0 p-0">{row.values.appliedCandidates.length}</p>;
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
                  setJobId(row.original._id);
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

              <button onClick={() => deleteJob(row.original._id)}>
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
        return <span className="font-bold text-gray-700">{row.values.firstName}</span>;
      },
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
      Filter: DefaultColumnFilter,
      Cell: ({ row }) => {
        return <span className="font-bold text-gray-700">{row.values.lastName}</span>;
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
          <Link to={`/user/view/${row.original._id}`} className="text-blue-600">
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
      Cell: ({ row }) => {
        const applyDate = row.original.appliedJobs?.find(
          (job) => job.jobId === jobId
        )?.applyDate;
        const applyDateFormatted = new Date(applyDate).toLocaleString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
        return applyDateFormatted;
      },
    },
  ];

  const fetchAppliedUsers = async (jobId) => {
    dispatch(getAppliedUsers(jobId));

    // const newUsersArrayWithDate = appliedUsers.map((user) => {
    //   const applyDate = user.appliedJobs?.find((job) => job.jobId === jobId)?.applyDate;
    //   const applyDateFormatted = new Date(applyDate).toLocaleString('en-GB', {
    //     day: 'numeric',
    //     month: 'short',
    //     year: 'numeric',
    //   });
    //   user.applyDate = applyDateFormatted;
    //   return user;
    // });

    // appliedUsers.forEach((user) => {
    //   const applyDate = user.appliedJobs?.find((job) => job.jobId === jobId)?.applyDate;

    //   const applyDateFormatted = new Date(applyDate).toLocaleString('en-GB', {
    //     day: 'numeric',
    //     month: 'short',
    //     year: 'numeric',
    //   });
    //   user.applyDate = applyDateFormatted;

    //   appliedUsersArray.push(user);
    // });
    // setAppliedUsersWithDate(appliedUsersArray);
  };

  const deleteJob = async (jobId) => {
    // const response = await axios.post(
    //   '/api/jobs/deletejob',
    //   {
    //     jobId: jobId,
    //   },
    //   {
    //     headers: { 'x-access-token': loggedInUser.jwtToken },
    //   }
    // );

    // if (response.data.status === 'success') {
    //   toast('Job Deleted Successfully');
    // fetchPostedJobs();
    // }
    dispatch(removeJob(jobId));
    fetchPostedJobs();
  };

  const fetchPostedJobs = async () => {
    // try {
    //   const response = await axios.post(
    //     'api/jobs/getpostedjobs',
    //     { username },
    //     { headers: { 'x-access-token': loggedInUser.jwtToken } }
    //   );
    //   if (response) {
    //     const postedJobsArr = response.data.jobs;
    //     setPostedJobs(postedJobsArr);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   toast(error);
    // }
    dispatch(getUsersPostedJobs(username)); // saves usersPostedJobs in the redux store, which we'll fetch in this component.
  };

  useEffect(() => {
    fetchPostedJobs();

    // We need these appliedUsers in UserView comp. In this component we can click on a job row and then we can select to view
    // the profile of any person who has applied to this job. But to do that, we'll 1st go to userview comp, and need to find the
    // selected user from inside the appliedUsers array.
    //  So since applied users are being updated in this comp., we can just create a redux state for them via
    // sending this dispatch right here itself. And also since in here when appliedUsers is console logged, it always has the data,
    // because the component has been re-rendered (as appliedUsers is a dependency)
    // Thus we can send this dispatch here.
    // dispatch(storeCurrentJobsAppliedUsers(appliedUsers));

    // console.log('appliedUsers', appliedUsers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedUsers]);

  if (!usersPostedJobs) {
    return <LoadingJobsLoader />;
  }

  return (
    <>
      <div className="p-4 md:p-8 overflow-hidden w-screen">
        {loggedInUser ? (
          <>
            {/* Modal Overlay Hidden Table - Applicants Table */}
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

            {/* Main Table - Posted Jobs */}
            <Table
              columnsArrayProp={columns}
              dataArrayProp={usersPostedJobs}
              headingProp={`Posted Jobs`}
              noDataMessageProp={'No have not posted any jobs yet'}
            />
          </>
        ) : (
          <>
            <p className="text-base pl-5 pt-5 ">
              Please <Link to="/login">Login</Link> to view or update your{' '}
              <b>Posted Job Listings.</b>
            </p>
          </>
        )}
      </div>
    </>
  );
}

export default PostedJobs;
