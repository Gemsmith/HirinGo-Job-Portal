import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  usePagination,
  useAsyncDebounce,
} from 'react-table';
import DefaultLayout from '../components/DefaultLayout';
import { Link } from 'react-router-dom';
import LoadingJobsLoader from '../components/LoadingJobsLoader';
import { useSelector } from 'react-redux';
import mockJson from '../components/TestJSON.json';

const DefaultColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;

  return (
    <span>
      <input
        value={filterValue || ''}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
        className="mt-1 px-2 py-1 border rounded-md focus:outline-none border-gray-300 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring
      "
        placeholder={`Search ${column.Header}`}
      />
    </span>
  );
};

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 300);

  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <button
          type="submit"
          title="Search"
          className="p-1 focus:outline-none focus:ring"
        >
          <svg fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4">
            <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
          </svg>
        </button>
      </span>

      <input
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Globally Search ${count} records...`}
        className="w-auto py-2 px-10 border border-gray-400 text-sm rounded-md sm:w-auto focus:outline-none focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring"
      />
    </div>
  );
}

function Pagination({
  gotoPage,
  nextPage,
  previousPage,
  pageCount,
  setPageSize,
  pageIndex,
  pageSize,
}) {
  return (
    <div className="grid md:grid-cols-3 grid-cols-2  justify-between items-center my-3 px-3">
      {/* <div className="flex justify-between items-center mt-3"> */}
      {/* Left Pagination */}
      <div className="flex flex-nowrap gap-2">
        <button
          onClick={() => gotoPage(0)}
          className="py-2 px-4 flex items-center
                text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer
                rounded"
        >
          {' '}
          ⯬
        </button>
        <button
          onClick={previousPage}
          className="py-2 px-4 flex items-center  text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded"
        >
          🠜
        </button>
      </div>
      {/* <div className="flex flex-col sm:flex-row  gap-2 justify-center items-center"> */}
      <div className="flex grow order-last md:order-none col-span-full md:col-span-1 gap-2 justify-center items-center">
        {/* <div className="flex flex-col sm:flex-row gap-2 justify-center items-center"> */}
        <div className="flex gap-2 justify-center items-center">
          {/* Middle */}
          <div className="flex flex-nowrap gap-2 whitespace-nowrap">
            <span>
              Page <b>{pageIndex + 1}</b> of <b>{pageCount}</b>
            </span>
          </div>

          <input
            type="number"
            name=""
            id=""
            className="py-2 px-3 flex items-center text-gray-600 border bg-gray-100 hover:bg-gray-300 rounded"
            min={1}
            max={pageCount}
            onChange={(e) => {
              gotoPage(+e.target.value - 1);
            }}
            defaultValue={pageIndex + 1}
          />
        </div>

        <select
          className="py-2 px-4 flex items-center text-gray-600 bg-gray-100 hover:bg-gray-300 cursor-pointer rounded"
          value={pageSize}
          onChange={(e) => {
            setPageSize(+e.target.value);
          }}
        >
          {[1, 5, 10, 15, 20, 25].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
      {/* Right Pagination */}
      <div onClick={nextPage} className="flex flex-nowrap gap-2 justify-end">
        <button className="py-2 px-4 flex items-center text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
          🠞
        </button>
        <button
          onClick={() => gotoPage(pageCount - 1)}
          className="py-2 px-4 flex items-center text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded"
        >
          ⯮
        </button>
      </div>
    </div>
  );
}

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
  const username = loggedInUser.username;

  let usersAppliedJobs = [];

  const appliedJobs = loggedInUser.appliedJobs;

  // Since we already have the IDs of all the jobs that the user has applied to. We just need to fetch each of those jobs' details to display
  //  in our table on the AppliedJobs page. And since we also already have latest jobs array, we can just find appliedJobs from it, instead
  // of making API requests for each applied job.
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
        const applyDateFormatted = new Date(
          appliedJob.applyDate
        ).toLocaleString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
        appliedjobObj.applyDate = applyDateFormatted;
        usersAppliedJobs.push(appliedjobObj);
      }
    });
  });

  const columns = useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
        Filter: DefaultColumnFilter,
        Cell: ({ row }) => {
          return (
            <span className="font-medium text-gray-700">
              {row.values.title}
            </span>
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
          return (
            <p className=" my-0 p-0">{row.values.appliedCandidates.length}</p>
          );
        },
      },
    ],
    []
  );

  const data = useMemo(() => [...usersAppliedJobs], [jobs]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    gotoPage,
    nextPage,
    previousPage,
    pageCount,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns: columns,
      data: data,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const isEven = (idx) => idx % 2 === 0;

  if (!usersAppliedJobs) {
    return (
      <DefaultLayout>
        <LoadingJobsLoader />
      </DefaultLayout>
    );
  }

  return (
    <>
      <DefaultLayout>
        <div className="w-full p-4">
          <p
            tabIndex="0"
            className="focus:outline-none text-lg sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"
          >
            Applied Jobs ({username})
          </p>

          {usersAppliedJobs.length === 0 ? (
            <p className="text-base">You haven't applied to any jobs yet.</p>
          ) : (
            <>
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                setGlobalFilter={setGlobalFilter}
                globalFilter={globalFilter}
              />

              <div className="mt-2 overflow-scroll xl:overflow-hidden shadow-lg  rounded-lg border-4 border-blue-200">
                <table {...getTableProps()} className="w-full ">
                  <thead className="text-left rounded-lg w-auto uppercase text-gray-600 bg-blue-200 truncate">
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th className="pl-3 py-2 text-sm font-semibold">
                            <div
                              {...column.getHeaderProps(
                                column.getSortByToggleProps()
                              )}
                            >
                              {column.render('Header')}
                              {column.isSorted
                                ? column.isSortedDesc
                                  ? ' ▼'
                                  : ' ▲'
                                : ''}
                            </div>
                            <div className="">
                              {column.canFilter
                                ? column.render('Filter')
                                : null}
                            </div>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {page.map((row, idx) => {
                      prepareRow(row);

                      return (
                        <tr
                          {...row.getRowProps()}
                          className={` focus:outline-none h-20 lg:h-16 border-b border-gray-200
                    ${isEven(idx) ? 'bg-blue-300/30' : ''}
                  `}
                        >
                          {row.cells.map((cell, idx) => (
                            <td className="pl-3" {...cell.getCellProps()}>
                              {cell.render('Cell')}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Pagination */}
                <Pagination
                  {...{
                    gotoPage,
                    nextPage,
                    previousPage,
                    pageCount,
                    setPageSize,
                    pageIndex,
                    pageSize,
                  }}
                />
              </div>
            </>
          )}
        </div>
      </DefaultLayout>
    </>
  );
};

export default AppliedJobs;
