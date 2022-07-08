import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SpinnerLoader } from '../components';
import { postJob } from '../redux/actions/jobActions';
import { v4 } from 'uuid';
import { storage } from '../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

const JobDetailsFormComponent = ({
  register,
  handleSubmit,
  trigger,
  control,
  errors,
  newJobDetails,
  setNewJobDetails,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'minimumQualifications',
  });

  const onSubmit = (data) => {
    setNewJobDetails(data);
    if (
      !newJobDetails?.hasOwnProperty('company_name') &&
      !newJobDetails?.hasOwnProperty('company_email')
    ) {
      return toast('Company details are required before submitting the new job');
    }
  };

  useEffect(() => {
    if (fields.length === 0) {
      append({ name: '', score: '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4 p-4 bg-blue-100 flex-col rounded-md ">
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
          <div className="relative bg-blue-200 p-3 rounded-md col-span-2 ">
            <button
              className="px-6 py-2 text-white transition-colors duration-300 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 flex items-center"
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
                  className="relative flex flex-row items-end flex-wrap lg:flex-nowrap gap-3 mt-4"
                >
                  {/* Minimum Qualification Field */}
                  <div className="relative flex flex-col w-80">
                    <label
                      className="text-gray-700"
                      htmlFor={`qualification_name-${index}`}
                    >
                      Minimum Qualification
                      <span className="text-red-500 required-dot text-lg"> *</span>
                    </label>

                    <Controller
                      render={({ field }) => (
                        <select
                          id={`qualification_name-${index}`}
                          className={`px-4 py-2 border rounded-md text-xs  w-full
                    focus:outline-none  ${
                      errors.minimumQualifications?.[index]?.name
                        ? 'border-red-500'
                        : 'border-gray-500 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring'
                    }
                    `}
                          {...field}
                          onKeyUp={() => {
                            trigger(`minimumQualifications.${index}.name`);
                          }}
                        >
                          <option value="" disabled>
                            Select a level
                          </option>
                          <option value="ug">UG</option>
                          <option value="pg">PG</option>
                          <option value="phd">PhD</option>
                        </select>
                      )}
                      name={`minimumQualifications.${index}.name`}
                      control={control}
                      defaultValue={field.name}
                      rules={{
                        required: 'Required',
                      }}
                    />
                    {errors.minimumQualifications?.[index]?.name && (
                      <small className="absolute right-0 text-red-600">
                        {errors.minimumQualifications[index].name.message}
                      </small>
                    )}
                  </div>

                  {/* Minimum Marks Field */}
                  <div className="relative flex flex-col ">
                    <label
                      className="text-gray-700"
                      htmlFor={`qualification_score-${index}`}
                    >
                      Minimum Marks
                      <span className="text-red-500 required-dot text-lg"> *</span>
                    </label>

                    <Controller
                      render={({ field }) => (
                        <input
                          onKeyUp={() => {
                            trigger(`minimumQualifications.${index}.score`);
                          }}
                          id={`qualification_score-${index}`}
                          placeholder="Ex. 75% / A / 4.0"
                          className={`px-4 py-2 border rounded-md  text-xs  w-full
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
                    className="h-10 px-6 py-2 text-white transition-colors duration-300 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
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
                placeholder="Ex. 6m+, 1y+, 2y+, 3y+"
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
              <div className="relative overflow-hidden w-full md:w-32">
                <label className="text-gray-700 whitespace-nowrap" htmlFor="salaryFrom">
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
              <div className="relative overflow-hidden w-full md:w-32">
                <label className="text-gray-700 whitespace-nowrap" htmlFor="salaryTo">
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
              className="px-6 py-2 text-white transition-colors duration-300 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
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
  newJobDetails,
  setNewJobDetails,
}) => {
  const onSubmit = (data) => {
    data.companyPicLink = url;
    setNewJobDetails(data);

    if (
      newJobDetails?.hasOwnProperty('company_name') &&
      newJobDetails?.hasOwnProperty('company_email')
    ) {
      toast(
        <p>
          Form saved. Please click <strong>Post New Job </strong>
          to add the new job.
        </p>
      );
    }
  };

  const [pickedFile, setPickedFile] = useState(null);
  const [url, setUrl] = useState('');
  // const [progresspercent, setProgresspercent] = useState(0);

  const fileChangeHandler = (event) => {
    setPickedFile(event.target.files[0]);
  };

  const fileUploadHandler = (e) => {
    e.preventDefault();
    if (pickedFile === null) {
      return alert('Please pick a file first');
    }

    const fileName = pickedFile.name + v4();

    // Sending File to Firebase Storage
    var storageRef = ref(storage, `/companyPics/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, pickedFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // const progress = Math.round(
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        // );
        // setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);
        });
      }
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4 flex-col p-4 bg-blue-100  rounded-md">
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

          {/* Comapny Image Pic */}
          <div>
            <label className="text-gray-700" htmlFor="company_image">
              Company Image
            </label>

            {/* Image Upload */}
            <div className="w-full flex-col justify-center items-center gap-6 text-sm">
              <input
                type="file"
                id="company_image"
                className="bg-blue-100 px-4 py-3 rounded-md w-full sm:w-[65%]"
                onChange={fileChangeHandler}
              />

              <button
                className="bg-blue-600 text-gray-100 rounded-full px-6 py-2 w-fit font-bold"
                onClick={fileUploadHandler}
              >
                Upload Image
              </button>

              <img
                className="w-32 h-32 bg-blue-50 object-cover rounded-lg mt-5"
                src={url}
                alt="company_image"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-2 text-white transition-colors duration-300 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

const JobPost = () => {
  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  const { loading } = useSelector((state) => state.loaderReducer);
  const dispatch = useDispatch();

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
  const [newJobDetails, setNewJobDetails] = useState();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    control,
  } = useForm();

  const onSubmitAllButtonClick = async () => {
    if (!newJobDetails) {
      return toast('Please click the "Save" button to save the data before submitting!');
    } else if (
      !newJobDetails.company_name ||
      newJobDetails.company_name === '' ||
      !newJobDetails.company_email ||
      newJobDetails.company_email === ''
    ) {
      return toast(
        <p>
          <strong> Company Details </strong> is not entered/saved. Please fill before
          submitting!
        </p>
      );
    }

    // Data format creation for backend according to Job model
    let finalJobDetails = { ...newJobDetails };
    // Adding postedBy
    finalJobDetails.postedBy = {
      username: loggedInUser.username,
      name: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };
    // Adding skillsRequired as an array
    delete finalJobDetails.skillsRequired;
    finalJobDetails.skillsRequired = newJobDetails.skillsRequired.split(',');
    // Add current date in proper format
    // (monogoose model has timestamps for this, but we need to maunally enter date for table sorting, otherwise sorting by date happens on the "2022-04-02T18:40:13.745Z" and not on the formatted date, 4 Apr 2022, as displayed in the table)
    const jobPostDate = new Date(new Date()).toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    finalJobDetails.jobPostDate = jobPostDate;
    // console.log(finalJobDetails);
    dispatch(postJob(finalJobDetails));
  };

  return (
    <>
      {loggedInUser ? (
        // <div className="container p-8">
        <div className="p-4 md:p-8">
          <div className="pb-4 ">
            <p
              tabIndex="0"
              className="focus:outline-none text-lg sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800 mb-4"
            >
              New Job Post
            </p>
            {/* Tabs Container */}
            <ul className="nav  w-[84vw] md:w-full   flex flex-row flex-nowrap justify-start overflow-auto no-scrollbar list-none mb-0">
              {tabs.map((tab, index) => (
                <li className="nav-item" key={index}>
                  <button
                    className={`inline-block nav-link px-4 py-2 border-b-2 whitespace-nowrap  ${
                      activeTab === index + 1
                        ? `border-blue-600 text-blue-600 bg-blue-500/10 rounded-t`
                        : 'hover:border-gray-500 hover:bg-gray-100 transition '
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
                    newJobDetails,
                    setNewJobDetails,
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
                    newJobDetails,
                    setNewJobDetails,
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
                transition-colors duration-300 transform bg-blue-700 rounded-md
                hover:bg-blue-600 focus:outline-none focus:bg-blue-600`}
                >
                  <p className="m-0">Post New Job</p>
                  <p className="m-0 absolute right-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {loading && <SpinnerLoader />}
                  </p>
                </button>

                {/* Next Button */}
                <button
                  onClick={onNextButtonClick}
                  type="button"
                  className="px-6 py-2 text-white
                transition-colors duration-300 transform bg-gray-700 rounded-md
                hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                >
                  Next Tab
                </button>

                {/* Reset Button */}
                {/* <button
                  onClick={resetForm}
                  type="button"
                  className="px-6 py-2 text-white
                transition-colors duration-200 transform bg-gray-700 rounded-md
                hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                >
                  Reset All Fields
                </button> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <p className="text-base pl-5 pt-5 ">
            Please <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link> to
            post a <b>New Job Listing.</b>
          </p>
        </>
      )}
    </>
  );
};

export default JobPost;
