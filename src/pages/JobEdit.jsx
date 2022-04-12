import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SpinnerLoader } from '../components';
import DefaultLayout from '../components/DefaultLayout';
import { editJob, postJob } from '../redux/actions/jobActions';

const JobDetailsFormComponent = ({
  register,
  handleSubmit,
  trigger,
  control,
  errors,
  updatedJobDetails,
  setUpdatedJobDetails,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'minimumQualifications',
  });

  const onSaveClick = (data) => {
    setUpdatedJobDetails(data);
  };

  useEffect(() => {
    if (fields.length === 0) {
      append({ name: '', score: '' });
    }
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSaveClick)}>
        <div className="flex gap-4 p-4 bg-gray-200 flex-col rounded-md ">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Title */}
            <div className="relative grow ">
              <label className="text-gray-700" htmlFor="title">
                Job Title
                <span className="text-red-500 required-dot text-lg"> *</span>
              </label>
              <input
                onKeyUp={() => {
                  trigger('title');
                }}
                id="title"
                type="text"
                placeholder="Ex. Jr. Web Developer"
                className={`
              w-full px-4 py-2 border rounded-md focus:outline-none   ${
                errors?.title
                  ? 'border-red-500'
                  : 'border-gray-500 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring'
              }`}
                {...register('title', {
                  required: 'Required',
                  minLength: {
                    value: 3,
                    message: 'Minimum length should be 3',
                  },
                })}
              />
              {errors?.title && (
                <small className="absolute right-0 top-0 text-red-600">
                  {errors.title.message}
                </small>
              )}
            </div>

            {/* Department */}
            <div className="relative grow">
              <label className="text-gray-700" htmlFor="department">
                Department
                <span className="text-red-500 required-dot text-lg"> *</span>
              </label>
              <input
                onKeyUp={() => {
                  trigger('department');
                }}
                id="department"
                type="text"
                placeholder="Ex. IT, HR, Marketing"
                className={`
              w-full px-4 py-2 border rounded-md focus:outline-none   ${
                errors?.department
                  ? 'border-red-500'
                  : 'border-gray-500 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring'
              }`}
                {...register('department', {
                  required: 'Required',
                })}
              />
              {errors?.department && (
                <small className="absolute right-0 top-0 text-red-600">
                  {errors.department.message}
                </small>
              )}
            </div>
          </div>

          {/* Minimum Qualifications */}
          <div className="relative bg-gray-300 p-3 rounded-md col-span-2 ">
            <button
              className="px-6 py-2 text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 flex items-center"
              type="button"
              onClick={() => append({ name: '', score: '' })}
            >
              <span>Add Qualification</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 inline-block ml-2 m-0 p-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {fields.map((field, index) => {
              return (
                <div
                  key={field.id}
                  className="relative flex flex-row items-end flex-wrap sm:flex-nowrap gap-3 mt-4"
                >
                  {/* Name Field */}
                  <div className="relative flex flex-col grow">
                    <label
                      className="text-gray-700"
                      htmlFor={`qualification_name-${index}`}
                    >
                      Minimum Qualification
                      <span className="text-red-500 required-dot text-lg">
                        {' '}
                        *
                      </span>
                    </label>

                    <Controller
                      render={({ field }) => (
                        <input
                          onKeyUp={() => {
                            trigger(`minimumQualifications.${index}.name`);
                          }}
                          id={`qualification_name-${index}`}
                          placeholder="Ex. 10th , 12th, UG, PG, PhD, etc."
                          className={`px-4 py-2 border rounded-md  grow
                      focus:outline-none  ${
                        errors.minimumQualifications?.[index]?.name
                          ? 'border-red-500'
                          : 'border-gray-500 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring'
                      }
                      `}
                          {...field}
                        />
                      )}
                      name={`minimumQualifications.${index}.name`}
                      control={control}
                      defaultValue={field.name}
                      rules={{
                        required:
                          'Please enter a qualification / delete this field',
                      }}
                    />
                    {errors.minimumQualifications?.[index]?.name && (
                      <small className="absolute right-0 text-red-600">
                        {errors.minimumQualifications[index].name.message}
                      </small>
                    )}
                  </div>

                  {/* Value Field */}
                  <div className="relative flex flex-col grow">
                    <label
                      className="text-gray-700"
                      htmlFor={`qualification_score-${index}`}
                    >
                      Minimum Marks
                      <span className="text-red-500 required-dot text-lg">
                        {' '}
                        *
                      </span>
                    </label>

                    <Controller
                      render={({ field }) => (
                        <input
                          onKeyUp={() => {
                            trigger(`minimumQualifications.${index}.score`);
                          }}
                          id={`qualification_score-${index}`}
                          placeholder="Ex. 75% / A / 4.0"
                          className={`px-4 py-2 border rounded-md  grow
                      focus:outline-none ${
                        errors.minimumQualifications?.[index]?.score
                          ? 'border-red-500'
                          : 'border-gray-500 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring'
                      } 
                      `}
                          {...field}
                        />
                      )}
                      name={`minimumQualifications.${index}.score`}
                      control={control}
                      defaultValue={field.score}
                      rules={{
                        required: 'Required',
                      }}
                    />
                    {errors.minimumQualifications?.[index]?.score && (
                      <small className="absolute right-0 text-red-600">
                        {errors.minimumQualifications[index].score.message}
                      </small>
                    )}
                  </div>

                  {/* Delete Row Button */}
                  <button
                    className="h-10 px-6 py-2 text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            {/* Experience */}
            <div className="relative grow">
              <label className="text-gray-700" htmlFor="experience">
                Experience
                <span className="text-red-500 required-dot text-lg"> *</span>
              </label>
              <input
                onKeyUp={() => {
                  trigger('experience');
                }}
                id="experience"
                type="text"
                placeholder="Ex. 6m+"
                className={`
              w-full px-4 py-2 border rounded-md focus:outline-none   ${
                errors?.experience
                  ? 'border-red-500'
                  : 'border-gray-500 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring'
              }`}
                {...register('experience', {
                  required: 'Required',
                })}
              />
              {errors?.experience && (
                <small className="absolute right-0 top-0 text-red-600">
                  {errors.experience.message}
                </small>
              )}
            </div>

            {/* Location */}
            <div className="relative grow">
              <label className="text-gray-700" htmlFor="location">
                Location
                <span className="text-red-500 required-dot text-lg"> *</span>
              </label>
              <input
                onKeyUp={() => {
                  trigger('location');
                }}
                id="location"
                type="text"
                placeholder="Ex. Bangalore, Remote (Anywhere), Remote (California)"
                className={`
              w-full px-4 py-2 border rounded-md focus:outline-none   ${
                errors?.location
                  ? 'border-red-500'
                  : 'border-gray-500 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring'
              }`}
                {...register('location', {
                  required: 'Required',
                })}
              />
              {errors?.location && (
                <small className="absolute right-0 top-0 text-red-600">
                  {errors.location.message}
                </small>
              )}
            </div>

            <div className="flex gap-4 flex-col sm:flex-row">
              {/* Salary From */}
              <div className="relative overflow-hidden w-48 md:w-32">
                <label
                  className="text-gray-700 whitespace-nowrap"
                  htmlFor="salaryFrom"
                >
                  Salary from
                  <span className="text-red-500 required-dot text-lg"> *</span>
                </label>
                <input
                  onKeyUp={() => {
                    trigger('salaryFrom');
                  }}
                  id="salaryFrom"
                  type="number"
                  placeholder="800000"
                  className={`
              w-full px-4 py-2 border rounded-md focus:outline-none   ${
                errors?.salaryFrom
                  ? 'border-red-500'
                  : 'border-gray-500 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring'
              }`}
                  {...register('salaryFrom', {
                    required: 'Required',
                  })}
                />
                {errors?.salaryFrom && (
                  <small className="absolute right-0 top-0 text-red-600">
                    {errors.salaryFrom.message}
                  </small>
                )}
              </div>

              {/* Salary To */}
              <div className="relative overflow-hidden w-48 md:w-32">
                <label
                  className="text-gray-700 whitespace-nowrap"
                  htmlFor="salaryTo"
                >
                  Salary upto
                  <span className="text-red-500 required-dot text-lg"> *</span>
                </label>
                <input
                  onKeyUp={() => {
                    trigger('salaryTo');
                  }}
                  id="salaryTo"
                  type="number"
                  placeholder="1000000"
                  className={`
              w-full px-4 py-2 border rounded-md focus:outline-none   ${
                errors?.salaryTo
                  ? 'border-red-500'
                  : 'border-gray-500 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring'
              }`}
                  {...register('salaryTo', {
                    required: 'Required',
                  })}
                />
                {errors?.salaryTo && (
                  <small className="absolute right-0 top-0 text-red-600">
                    {errors.salaryTo.message}
                  </small>
                )}
              </div>
            </div>
          </div>

          {/* Skills Required */}
          <div className="relative ">
            <label className="text-gray-700" htmlFor="skillsRequired">
              Skills Required (Comma seprated)
              <span className="text-red-500 required-dot text-lg"> *</span>
            </label>
            <input
              onKeyUp={() => {
                trigger('skillsRequired');
              }}
              id="skillsRequired"
              type="text"
              placeholder="Ex. HTML, CSS, JS, NodeJs, MongoDB, React"
              className={`
              w-full px-4 py-2 border rounded-md focus:outline-none   ${
                errors?.skillsRequired
                  ? 'border-red-500'
                  : 'border-gray-500 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring'
              }`}
              {...register('skillsRequired', {
                required: 'Required',
              })}
            />
            {errors?.skillsRequired && (
              <small className="absolute right-0 top-0 text-red-600">
                {errors.skillsRequired.message}
              </small>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            {/* Small Description */}
            <div className="relative grow">
              <label className="text-gray-700" htmlFor="smallDescription">
                Small Description
                <span className="text-red-500 required-dot text-lg"> *</span>
              </label>
              <textarea
                onKeyUp={() => {
                  trigger(`smallDescription`);
                }}
                id="smallDescription"
                className={`px-4 py-2 border rounded-md block w-full grow
              focus:outline-none   ${
                errors.smallDescription
                  ? 'border-red-500'
                  : 'border-gray-500 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring'
              }
              `}
                placeholder="Leave a comment..."
                {...register('smallDescription', {
                  required: 'Required',
                })}
              ></textarea>
              {errors?.smallDescription && (
                <small className="absolute right-0 top-0 text-red-600">
                  {errors.smallDescription.message}
                </small>
              )}
            </div>

            {/* Full Description */}
            <div className="relative grow">
              <label className="text-gray-700" htmlFor="fullDescription">
                Full Description
                <span className="text-red-500 required-dot text-lg"> *</span>
              </label>
              <textarea
                onKeyUp={() => {
                  trigger(`fullDescription`);
                }}
                id="fullDescription"
                className={`px-4 py-2 border rounded-md block w-full grow
              focus:outline-none   ${
                errors.fullDescription
                  ? 'border-red-500'
                  : 'border-gray-500 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring'
              }
              `}
                placeholder="Leave a comment..."
                {...register('fullDescription', {
                  required: 'Required',
                })}
              ></textarea>
              {errors?.fullDescription && (
                <small className="absolute right-0 top-0 text-red-600">
                  {errors.fullDescription.message}
                </small>
              )}
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-2 self-end">
            <button
              type="submit"
              className="px-6 py-2 text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

const CompanyDetailsFormComponent = ({
  register,
  handleSubmit,
  trigger,
  errors,
  updatedJobDetails,
  setUpdatedJobDetails,
}) => {
  const onSaveClick = (data) => {
    console.log(data);
    setUpdatedJobDetails(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSaveClick)}>
        <div className="flex gap-4 flex-col p-4 bg-gray-200  rounded-md">
          <div className="flex gap-4 flex-col md:flex-row ">
            {/* Company Name  */}
            <div className="relative grow">
              <label className="text-gray-700" htmlFor="company_name">
                Company Name
                <span className="text-red-500 required-dot text-lg"> *</span>
              </label>
              <input
                onKeyUp={() => trigger(`company_name`)}
                id="company_name"
                type="text"
                placeholder="Ex. Microsoft"
                className={`
              w-full px-4 py-2 border rounded-md focus:outline-none   ${
                errors?.company_name
                  ? 'border-red-500'
                  : 'border-gray-500 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring'
              }`}
                {...register('company_name', {
                  required: 'Required',
                })}
              />
              {errors?.company_name && (
                <small className="absolute right-0 top-0 text-red-600">
                  {errors.company_name.message}
                </small>
              )}
            </div>

            {/* Company Email  */}
            <div className="relative ">
              <label className="text-gray-700" htmlFor="company_email">
                Company Email
                <span className="text-red-500 required-dot text-lg"> *</span>
              </label>
              <input
                onKeyUp={() => {
                  trigger(`company_email`);
                }}
                id="company_email"
                type="email"
                placeholder="Ex. john@microsoft.com"
                className={`
              w-full px-4 py-2 border rounded-md focus:outline-none   ${
                errors?.company_email
                  ? 'border-red-500'
                  : 'border-gray-500 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring'
              }`}
                {...register('company_email', {
                  required: 'Required',
                })}
              />
              {errors?.company_email && (
                <small className="absolute right-0 top-0 text-red-600">
                  {errors.company_email.message}
                </small>
              )}
            </div>

            {/* Company Contact Number  */}
            <div className="relative ">
              <label className="text-gray-700" htmlFor="company_phone">
                Company Contact
              </label>
              <input
                id="company_phone"
                type="text"
                placeholder="Ex. +1-123-456-7890"
                className={`
              w-full px-4 py-2 border rounded-md focus:outline-none   ${
                errors?.company_phone
                  ? 'border-red-500'
                  : 'border-gray-500 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring'
              }`}
                {...register('company_phone')}
              />
              {errors?.company_phone && (
                <small className="absolute right-0 top-0 text-red-600">
                  {errors.company_phone.message}
                </small>
              )}
            </div>
          </div>

          {/* Company Description */}
          <div className="relative col-span-2">
            <label className="text-gray-700" htmlFor="company_description">
              Company Description
            </label>
            <textarea
              id="company_description"
              placeholder="Enter company description"
              className={`
              w-full px-4 py-2 border rounded-md focus:outline-none   ${
                errors?.company_description
                  ? 'border-red-500'
                  : 'border-gray-500 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring'
              }`}
              {...register('company_description')}
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-2 text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

const JobEdit = () => {
  // const loggedInUser = JSON.parse(localStorage.getItem('user'));
  const { loading } = useSelector((state) => state.loaderReducer);
  const { jobs } = useSelector((state) => state.jobsReducer);

  const dispatch = useDispatch();

  const jobId = useParams().id;

  const data = jobs.filter((job) => job._id === jobId);
  const job = data[0];

  // Tabs Functionality
  const tabs = ['Job Details', 'Company Details'];
  const [activeTab, setActiveTab] = useState(1);

  const toggleTab = (index) => {
    setActiveTab(index);
  };

  const onNextButtonClick = () => {
    if (activeTab >= tabs.length) {
      setActiveTab(1);
    } else {
      setActiveTab(activeTab + 1);
    }
  };

  // React Hook Form - Functionality
  const [updatedJobDetails, setUpdatedJobDetails] = useState();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const onSubmitAllButtonClick = async () => {
    if (!updatedJobDetails) {
      return toast(
        'Please click the "Save" button to save the data before submitting!'
      );
    }

    // If we want to only send the data that has been updated, we can use the below code. Otherwise since it is small amount of data, we can send the whole object and update the entire job data at the DB.
    // let differences = {};
    // Object.keys(updatedJobDetails).forEach((key) => {
    //   if (updatedJobDetails[key] !== job[key]) {
    //     differences[key] = updatedJobDetails[key];
    //   }
    // });
    // console.log('differences', differences);

    // Data format creation for backend according to Job model
    let finalJobDetails = { ...updatedJobDetails };
    // console.log(updatedJobDetails);

    // Adding skillsRequired back in as an array
    delete finalJobDetails.skillsRequired;
    finalJobDetails.skillsRequired =
      updatedJobDetails.skillsRequired.split(',');

    // Add update date in proper format, after the comparison is done, or comparison would have had this key as well
    // (monogoose model has timestamps for this, but we need to maunally enter date for table sorting, otherwise sorting by date happens on the "2022-04-02T18:40:13.745Z" and not on the formatted date, 4 Apr 2022, as displayed in the table)
    const jobUpdateDate = new Date(new Date()).toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    finalJobDetails.jobUpdateDate = jobUpdateDate;

    console.log(finalJobDetails);
    dispatch(editJob(finalJobDetails));
  };

  const resetForm = () => {
    // Need to transform skillsRequired back to String to properly reset the form, because our react hook form is supposed to handle it
    // as a string only, or we'd need to change that piece of code to handle arrays instead of string
    job.skillsRequired = job.skillsRequired.toString();
    reset(job);
  };

  useEffect(() => {
    resetForm();
  }, [jobs]);

  return (
    <>
      <DefaultLayout>
        <div className="container p-4">
          <div className="pb-4 ">
            <p
              tabIndex="0"
              className="focus:outline-none text-lg sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"
            >
              Update Posted Job
            </p>

            {/* Tabs Container */}
            <ul className="nav nav-tabs flex flex-row flex-nowrap justify-start overflow-auto list-none mb-0">
              {tabs.map((tab, index) => (
                <li className="nav-item" key={index}>
                  <button
                    className={`inline-block nav-link px-4 py-2 border-b-2 whitespace-nowrap  ${
                      activeTab === index + 1
                        ? `border-blue-600 text-blue-600 bg-blue-500/10 rounded-t`
                        : 'hover:border-gray-500 hover:bg-gray-100'
                    } `}
                    onClick={() => toggleTab(index + 1)}
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>

            {/* Corresponding Tab's Content */}
            <div className=" py-3 mx-auto">
              {activeTab === 1 && (
                <JobDetailsFormComponent
                  {...{
                    register,
                    handleSubmit,
                    trigger,
                    control,
                    errors,
                    updatedJobDetails,
                    setUpdatedJobDetails,
                  }}
                />
              )}
              {activeTab === 2 && (
                <CompanyDetailsFormComponent
                  {...{
                    register,
                    handleSubmit,
                    trigger,
                    errors,
                    updatedJobDetails,
                    setUpdatedJobDetails,
                  }}
                />
              )}

              {/* Bottom-most Buttons */}
              <div className="flex flex-col-reverse md:flex-row justify-end mt-6 gap-3">
                {/* Submit Button */}
                <button
                  onClick={onSubmitAllButtonClick}
                  type="submit"
                  className={`relative md:w-48 px-3 py-2 text-white
                transition-colors duration-200 transform bg-blue-700 rounded-md
                hover:bg-blue-600 focus:outline-none focus:bg-blue-600`}
                >
                  <p className="m-0">Update Job</p>
                  <p className="m-0 absolute right-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {loading && <SpinnerLoader />}
                  </p>
                </button>

                {/* Next Button */}
                <button
                  onClick={onNextButtonClick}
                  type="button"
                  className="px-6 py-2 text-white
                transition-colors duration-200 transform bg-gray-700 rounded-md
                hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                >
                  Next Tab
                </button>

                {/* Reset Button */}
                <button
                  onClick={resetForm}
                  type="button"
                  className="px-6 py-2 text-white
                transition-colors duration-200 transform bg-gray-700 rounded-md
                hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                >
                  Reset All Fields
                </button>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default JobEdit;
