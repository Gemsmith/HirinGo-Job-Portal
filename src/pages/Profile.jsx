import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SpinnerLoader } from '../components';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/actions/userActions';
import { toast } from 'react-toastify';

import { v4 } from 'uuid';
import { storage } from '../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

const PersonalInfoFormTemplate = ({
  register,
  handleSubmit,
  trigger,
  errors,
  formValues,
  setFormValues,
  loggedInUser,
}) => {
  const onSubmit = (data) => {
    data.profilePicLink = url;
    setFormValues(data);
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
    var storageRef = ref(storage, `/userProfilePics/${fileName}`);
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 p-4 bg-blue-100  rounded-md ">
          <div className="relative">
            <label className="text-gray-700" htmlFor="firstName">
              First name
              <span className="text-red-500 required-dot text-lg"> *</span>
            </label>
            <input
              onKeyUp={() => {
                trigger(`personal_info.firstName`);
              }}
              id="firstName"
              type="text"
              className={`
              w-full px-4 py-2 border rounded-md focus:outline-none   ${
                errors.personal_info?.firstName
                  ? 'border-red-500'
                  : 'border-gray-500 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring'
              }`}
              {...register('personal_info.firstName', {
                required: 'First name is required',
                minLength: { value: 3, message: 'Minimum length should be 3' },
              })}
            />
            {errors.personal_info?.firstName && (
              <small className="absolute right-0 top-0 text-red-600">
                {errors.personal_info.firstName.message}
              </small>
            )}
          </div>

          <div className="relative">
            <label className="text-gray-700" htmlFor="lastName">
              Last name
              <span className="text-red-500 required-dot text-lg"> *</span>
            </label>
            <input
              onKeyUp={() => {
                trigger(`personal_info.lastName`);
              }}
              id="lastName"
              name="lastName"
              type="text"
              className={`
              w-full px-4 py-2 border rounded-md focus:outline-none   ${
                errors.personal_info?.lastName
                  ? 'border-red-500'
                  : 'border-gray-500 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring'
              }`}
              {...register('personal_info.lastName', {
                required: 'Last name is required',
              })}
            />
            {errors.personal_info?.lastName && (
              <small className="absolute right-0 top-0 text-red-600">
                {errors.personal_info.lastName.message}
              </small>
            )}
          </div>

          <div className="relative">
            <label className="text-gray-700" htmlFor="email">
              Email Address
              <span className="text-red-500 required-dot text-lg"> *</span>
            </label>
            <input
              onKeyUp={() => {
                trigger(`personal_info.email`);
              }}
              id="email"
              type="email"
              {...register('personal_info.email', {
                required: 'Email is required',
              })}
              className={`
              w-full px-4 py-2 border rounded-md focus:outline-none   ${
                errors.personal_info?.email
                  ? 'border-red-500'
                  : 'border-gray-500 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring'
              }`}
            />
            {errors.personal_info?.email && (
              <small className="absolute right-0 top-0 text-red-600">
                {errors.personal_info.email.message}
              </small>
            )}
          </div>

          <div>
            <label className="text-gray-700" htmlFor="mobileNumber">
              Mobile Number
            </label>
            <input
              onKeyUp={() => {
                trigger(`personal_info.mobileNumber`);
              }}
              id="mobileNumber"
              type="text"
              className=" w-full px-4 py-2 border border-gray-500 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              {...register('personal_info.mobileNumber')}
            />
          </div>

          <div>
            <label className="text-gray-700" htmlFor="portfolio">
              Portfolio
            </label>
            <input
              id="portfolio"
              type="text"
              className=" w-full px-4 py-2 border border-gray-500 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              {...register('personal_info.portfolio')}
            />
          </div>

          <div>
            <label className="text-gray-700" htmlFor="emailAddress">
              About
            </label>
            <input
              id="about"
              type="text"
              className=" w-full px-4 py-2 border border-gray-500 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              {...register('personal_info.about')}
            />
          </div>

          <div className="col-span-full">
            <label className="text-gray-700" htmlFor="address">
              Address
            </label>
            <textarea
              className="border-gray-500 block w-full px-4 py-2 text-gray-700 bg-white border rounded-md  focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              placeholder="Leave a comment..."
              {...register('personal_info.address')}
            ></textarea>
          </div>

          {/* Profile Image Pic */}
          <div>
            <label className="text-gray-700" htmlFor="user-image">
              Profile Image
            </label>

            {/* Image Upload */}
            <div className="w-full flex-col justify-center items-center gap-6 text-sm">
              <input
                type="file"
                id="user-image"
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
                src={url || loggedInUser.profilePicLink}
                alt="user_image"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-6 py-2 text-white transition-colors duration-300 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

const SkillsFormTemplate = ({
  handleSubmit,
  trigger,
  errors,
  control,
  formValues,
  setFormValues,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
  });

  const onSubmit = (data) => {
    setFormValues(data);
  };

  // As soon as this template loads, 1 skill input should get created by default
  useEffect(() => {
    if (fields.length === 0) {
      append({ skill: '', level: '' });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <button
          className="px-6 py-2 text-white transition-colors duration-300 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 flex items-center"
          type="button"
          onClick={() => append({ skill: '', level: '' })}
        >
          <span>Add Skill</span>

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
              className="my-4 px-4 p-4 bg-blue-100 rounded-md flex flex-row items-end flex-wrap sm:flex-nowrap gap-3  "
            >
              <div className="relative flex flex-col w-full">
                <label className="text-gray-700" htmlFor={`skill-${index}`}>
                  Skill
                  {/* <span className="text-red-500 required-dot text-lg"> *</span> */}
                </label>

                <Controller
                  render={({ field }) => (
                    <input
                      onKeyUp={() => {
                        trigger(`skills.${index}.skill`);
                      }}
                      id={`skill-${index}`}
                      placeholder="Enter a skill"
                      className={`px-4 py-2 border rounded-md  grow
                      focus:outline-none   ${
                        errors.skills?.[index]?.skill
                          ? 'border-red-500'
                          : 'border-gray-500 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring'
                      }
                      `}
                      {...field}
                    />
                  )}
                  name={`skills.${index}.skill`}
                  control={control}
                  defaultValue={field.skill}
                  rules={
                    {
                      // required: 'Required',
                    }
                  }
                />
                {errors.skills?.[index]?.skill && (
                  <small className="absolute right-0 text-red-600">
                    {errors.skills[index].skill.message}
                  </small>
                )}
              </div>

              <div className="relative flex flex-col">
                <label className="text-gray-700" htmlFor={`level-${index}`}>
                  Level
                  {/* <span className="text-red-500 required-dot text-lg"> *</span> */}
                </label>

                <Controller
                  render={({ field }) => (
                    <select
                      onKeyUp={() => {
                        trigger(`skills.${index}.level`);
                      }}
                      id={`level-${index}`}
                      className={`px-4 py-2 border rounded-md  grow
                      focus:outline-none   ${
                        errors.skills?.[index]?.level
                          ? 'border-red-500'
                          : 'border-gray-500 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring'
                      }
                      `}
                      {...field}
                    >
                      <option value="" disabled>
                        Select a level
                      </option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="proficient">Proficient</option>
                      <option value="expert">Expert</option>
                    </select>
                  )}
                  name={`skills.${index}.level`}
                  control={control}
                  defaultValue={field.level}
                  rules={
                    {
                      //  required: 'Required'
                    }
                  }
                />
                {errors.skills?.[index]?.level && (
                  <small className="absolute right-0 text-red-600">
                    {errors.skills[index].level.message}
                  </small>
                )}
              </div>

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

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-6 py-2 text-white transition-colors duration-300 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

const ProjectsFormTemplate = ({
  handleSubmit,
  trigger,
  errors,
  control,
  formValues,
  setFormValues,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projects',
  });

  const onSubmit = (data) => {
    setFormValues(data);
  };

  useEffect(() => {
    if (fields.length === 0) {
      append({ name: '', repo_url: '', deployed_url: '', tech_stack: '' });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <button
          className="px-6 py-2 text-white transition-colors duration-300 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 flex items-center"
          type="button"
          onClick={() =>
            append({ name: '', repo_url: '', deployed_url: '', tech_stack: '' })
          }
        >
          <span>Add More Projects</span>
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
              className="mt-4 mb-8 p-4 bg-blue-100  rounded-md flex flex-col md:flex-row gap-4 md:gap-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grow sm:mr-3 gap-3 sm:mb-0 w-full">
                {/* Project Name */}
                <div className=" relative flex flex-col">
                  <label className="text-gray-700" htmlFor="project-name">
                    Project Name
                    {/* <span className="text-red-500 required-dot text-lg"> *</span> */}
                  </label>
                  <Controller
                    render={({ field }) => (
                      <input
                        onKeyUp={() => {
                          trigger(`projects.${index}.name`);
                        }}
                        placeholder="Project Name"
                        className={`px-4 py-2 border rounded-md focus:outline-none   ${
                          errors.projects
                            ? 'border-red-500'
                            : 'border-gray-500 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring'
                        }`}
                        {...field}
                      />
                    )}
                    name={`projects.${index}.name`}
                    control={control}
                    defaultValue={field.name}
                    rules={
                      {
                        // required: 'Project name is required'
                      }
                    }
                  />
                  {errors.projects?.[index]?.name && (
                    <small className="absolute right-0 text-red-600">
                      {errors.projects[index].name.message}
                    </small>
                  )}
                </div>

                {/* Repo URL */}
                <div className="flex flex-col">
                  <label className="text-gray-700" htmlFor="repo-url">
                    Enter Repo-URL
                  </label>
                  <Controller
                    render={({ field }) => (
                      <input
                        type={`url`}
                        placeholder="https://github.com/my-project"
                        pattern="https://.*"
                        className={`px-4 py-2 border border-gray-500 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring`}
                        {...field}
                      />
                    )}
                    name={`projects.${index}.repo_url`}
                    control={control}
                    defaultValue={field.repo_url}
                  />
                </div>

                {/* Deployed URL */}
                <div className="flex flex-col">
                  <label className="text-gray-700" htmlFor="deployed-url">
                    Deployed URL
                  </label>
                  <Controller
                    render={({ field }) => (
                      <input
                        type={`url`}
                        placeholder="https://my-project.vercel.app/"
                        pattern="https://.*"
                        className={`px-4 py-2 border border-gray-500 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring`}
                        {...field}
                      />
                    )}
                    name={`projects.${index}.deployed_url`}
                    control={control}
                    defaultValue={field.deployed_url}
                  />
                </div>

                {/* Tech Stack */}
                <div className="flex flex-col">
                  <label className="text-gray-700" htmlFor="tech-stack">
                    Tech Stack (Separated by Comma)
                  </label>
                  <Controller
                    render={({ field }) => (
                      <input
                        placeholder="Enter Tech Stack (Comma Seprated)"
                        className={`px-4 py-2 border border-gray-500 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring`}
                        {...field}
                      />
                    )}
                    name={`projects.${index}.tech_stack`}
                    control={control}
                    defaultValue={field.tech_stack}
                  />
                </div>
              </div>

              <button
                className="lg:h-10 lg:self-end px-6 py-2 text-white transition-colors duration-300 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                type="button"
                onClick={() => remove(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mx-auto"
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

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-6 py-2 text-white transition-colors duration-300 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

const EducationFormTemplate = ({
  handleSubmit,
  trigger,
  errors,
  control,
  formValues,
  setFormValues,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education',
  });

  const onSubmit = (data) => {
    setFormValues(data);
  };

  useEffect(() => {
    if (fields.length === 0) {
      append({
        title: '',
        institute: '',
        university: '',
        year_from: '',
        year_to: '',
        scoring: {
          score: '',
          type: '',
        },
      });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button
        className="px-6 py-2 text-white transition-colors duration-300 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 flex items-center"
        type="button"
        onClick={() =>
          append({
            title: '',
            institute: '',
            university: '',
            year_from: '',
            year_to: '',
            scoring: {
              score: '',
              type: '',
            },
          })
        }
      >
        <span>Add Education</span>
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
            className="mt-4 mb-10 p-4 flex gap-3 flex-col md:flex-row bg-blue-100  rounded-md"
          >
            <div className="flex flex-col gap-6 grow">
              <div className="flex flex-col md:flex-row gap-4 grow">
                {/* Title */}
                <div className="relative flex flex-col grow">
                  <label className="text-gray-700 truncate" htmlFor={`title-${index}`}>
                    Education Title
                    {/* <span className="text-red-500 required-dot text-lg"> *</span> */}
                  </label>

                  <Controller
                    render={({ field }) => (
                      <input
                        onKeyUp={() => {
                          trigger(`education.${index}.title`);
                        }}
                        placeholder='Ex. "B.S. in Computer Science"'
                        id={`title-${index}`}
                        className={` px-4 py-2 border rounded-md focus:outline-none grow ${
                          errors.education?.[index]?.title
                            ? 'border-red-500'
                            : 'border-gray-500 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring'
                        }`}
                        {...field}
                      />
                    )}
                    name={`education.${index}.title`}
                    control={control}
                    defaultValue={field.title}
                    rules={
                      {
                        // required: 'Title is required'
                      }
                    }
                  />
                  {errors.education?.[index]?.title && (
                    <small className="absolute right-0 text-red-600">
                      {errors.education[index].title.message}
                    </small>
                  )}
                </div>

                {/* College/Institute */}
                <div className="relative flex flex-col grow">
                  <label
                    className="text-gray-700 truncate"
                    htmlFor={`institute-${index}`}
                  >
                    College/Institute Name
                    {/* <span className="text-red-500 required-dot text-lg"> *</span> */}
                  </label>

                  <Controller
                    render={({ field }) => (
                      <input
                        onKeyUp={() => {
                          trigger(`education.${index}.institute`);
                        }}
                        id={`institute-${index}`}
                        placeholder="Ex. SVITS"
                        className={` px-4 py-2 border rounded-md focus:outline-none grow ${
                          errors.education?.[index]?.institute
                            ? 'border-red-500'
                            : 'border-gray-500 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring'
                        }`}
                        {...field}
                      />
                    )}
                    name={`education.${index}.institute`}
                    control={control}
                    defaultValue={field.institute}
                    rules={
                      {
                        // required: 'College/Institute Name is required'
                      }
                    }
                  />
                  {errors.education?.[index]?.institute && (
                    <small className="absolute right-0 text-red-600">
                      {errors.education[index].institute.message}
                    </small>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 grow">
                {/* Board/University */}
                <div className="flex flex-col grow">
                  <label
                    className="text-gray-700 truncate"
                    htmlFor={`university-${index}`}
                  >
                    Board/University Name
                  </label>

                  <Controller
                    render={({ field }) => (
                      <input
                        id={`university-${index}`}
                        placeholder="Ex. CBSE, RGPV"
                        className={`px-4 py-2 border border-gray-500 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring grow`}
                        {...field}
                      />
                    )}
                    name={`education.${index}.university`}
                    control={control}
                    defaultValue={field.university}
                  />
                </div>

                {/* Year From */}
                <div className="flex flex-col w-32">
                  <label className="text-gray-700" htmlFor={`year-from-${index}`}>
                    From Year
                  </label>

                  <Controller
                    render={({ field }) => (
                      <input
                        type={'number'}
                        id={`year-from-${index}`}
                        placeholder="Ex. 2022"
                        className={`px-2 py-2 border border-gray-500 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring grow`}
                        {...field}
                      />
                    )}
                    name={`education.${index}.year_from`}
                    control={control}
                    defaultValue={field.year_from}
                  />
                </div>

                {/* Year To */}
                <div className="flex flex-col w-32">
                  <label className="text-gray-700" htmlFor={`year-to-${index}`}>
                    To Year
                  </label>

                  <Controller
                    render={({ field }) => (
                      <input
                        type={'number'}
                        id={`year-to-${index}`}
                        placeholder="Ex. 2022"
                        className={`px-4 py-2 border border-gray-500 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring grow`}
                        {...field}
                      />
                    )}
                    name={`education.${index}.year_to`}
                    control={control}
                    defaultValue={field.year_to}
                  />
                </div>

                {/* Scoring: Type */}
                <div className="relative flex flex-col w-48">
                  <label className="text-gray-700" htmlFor={`ranking-system-${index}`}>
                    Scoring Type
                    {/* <span className="text-red-500 required-dot text-lg"> *</span> */}
                  </label>

                  <Controller
                    render={({ field }) => (
                      <select
                        onKeyUp={() => {
                          trigger(`education.${index}.scoring.type`);
                        }}
                        id={`ranking-system-${index}`}
                        className={` px-4 py-2 border rounded-md focus:outline-none grow ${
                          errors.education?.[index]?.scoring?.type
                            ? 'border-red-500'
                            : 'border-gray-500 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring'
                        }`}
                        {...field}
                      >
                        <option value="">Select Type</option>
                        <option value="percentage">Percentage</option>
                        <option value="grade">Grade</option>
                        <option value="gpa">GPA</option>
                      </select>
                    )}
                    name={`education.${index}.scoring.type`}
                    control={control}
                    defaultValue={field.scoring?.type}
                    rules={
                      {
                        // required: 'Required'
                      }
                    }
                  />
                  {errors.education?.[index]?.scoring?.type && (
                    <small className="absolute right-0 text-red-600">
                      {errors.education[index].scoring.type.message}
                    </small>
                  )}
                </div>

                {/* Scoring: Score */}
                <div className="relative flex flex-col w-48">
                  <label className="text-gray-700" htmlFor={`score-${index}`}>
                    Score
                    {/* <span className="text-red-500 required-dot text-lg"> *</span> */}
                  </label>

                  <Controller
                    render={({ field }) => (
                      <input
                        onKeyUp={() => {
                          trigger(`education.${index}.scoring.score`);
                        }}
                        id={`score-${index}`}
                        placeholder="Ex. 75% / A / 4.0"
                        className={` px-4 py-2 border rounded-md focus:outline-none grow ${
                          errors.education?.[index]?.scoring?.score
                            ? 'border-red-500'
                            : 'border-gray-500 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring'
                        }`}
                        {...field}
                      />
                    )}
                    name={`education.${index}.scoring.score`}
                    control={control}
                    defaultValue={field.scoring?.score}
                    rules={
                      {
                        // required: 'Score is required'
                      }
                    }
                  />
                  {errors.education?.[index]?.scoring?.score && (
                    <small className="absolute right-0 text-red-600">
                      {errors.education[index].scoring.score.message}
                    </small>
                  )}
                </div>
              </div>
            </div>

            <button
              className="self-end px-6 py-2 text-white transition-colors duration-300 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 w-full md:w-auto h-12 md:h-32"
              type="button"
              onClick={() => remove(index)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mx-auto"
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

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="px-6 py-2 text-white transition-colors duration-300 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};

const ExperienceFormTemplate = ({
  handleSubmit,
  trigger,
  errors,
  control,
  formValues,
  setFormValues,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experience',
  });

  const onSubmit = (data) => {
    setFormValues(data);
  };

  useEffect(() => {
    if (fields.length === 0) {
      append({
        designation: '',
        company: '',
        date_from: '',
        date_till: '',
        description: '',
      });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button
        className="px-6 py-2 text-white transition-colors duration-300 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 flex items-center"
        type="button"
        onClick={() =>
          append({
            designation: '',
            company: '',
            date_from: '',
            date_till: '',
            description: '',
          })
        }
      >
        <span>Add Experience</span>
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
            className="mt-4 py-4 px-4 flex flex-col md:flex-row gap-3 bg-blue-100  rounded-md"
          >
            {/* Title, Designation, Date from, Date to */}
            <div className="flex flex-col grow gap-6">
              <div className="flex gap-3 flex-col sm:flex-row">
                {/* Designation */}
                <div className="relative flex flex-col grow">
                  <label className="text-gray-700" htmlFor={`designation-${index}`}>
                    Designation
                    {/* <span className="text-red-500 required-dot text-lg"> *</span> */}
                  </label>

                  <Controller
                    render={({ field }) => (
                      <input
                        onKeyUp={() => {
                          trigger(`experience.${index}.designation`);
                        }}
                        placeholder="Ex. Jr. Developer"
                        id={`designation-${index}`}
                        className={`px-4 py-2 border rounded-md focus:outline-none grow ${
                          errors.experience?.[index]?.designation
                            ? 'border-red-500'
                            : 'border-gray-500 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring'
                        }`}
                        {...field}
                      />
                    )}
                    name={`experience.${index}.designation`}
                    control={control}
                    defaultValue={field.designation}
                    rules={
                      {
                        // required: 'Designation is required'
                      }
                    }
                  />
                  {errors.experience?.[index]?.designation && (
                    <small className="absolute right-0 text-red-600">
                      {errors.experience[index].designation.message}
                    </small>
                  )}
                </div>

                {/* Year From */}
                <div className="relative flex flex-col">
                  <label className="text-gray-700" htmlFor={`date_from-${index}`}>
                    From Date
                    {/* <span className="text-red-500 required-dot text-lg"> *</span> */}
                  </label>

                  <Controller
                    render={({ field }) => (
                      <input
                        onKeyUp={() => {
                          trigger(`experience.${index}.date_from`);
                        }}
                        type="date"
                        id={`date_from-${index}`}
                        className={`px-4 py-2 border rounded-md focus:outline-none  ${
                          errors.experience?.[index]?.date_from
                            ? 'border-red-500'
                            : 'border-gray-500 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring'
                        }`}
                        {...field}
                      />
                    )}
                    name={`experience.${index}.date_from`}
                    control={control}
                    defaultValue={field.date_from}
                    rules={
                      {
                        // required: 'Required'
                      }
                    }
                  />
                  {errors.experience?.[index]?.date_from && (
                    <small className="absolute right-0 text-red-600">
                      {errors.experience[index].date_from.message}
                    </small>
                  )}
                </div>
              </div>

              <div className="flex gap-3  flex-col sm:flex-row">
                {/* Company */}
                <div className="relative flex flex-col grow">
                  <label className="text-gray-700" htmlFor={`company-${index}`}>
                    Company Name
                    {/* <span className="text-red-500 required-dot text-lg"> *</span> */}
                  </label>

                  <Controller
                    render={({ field }) => (
                      <input
                        onKeyUp={() => {
                          trigger(`experience.${index}.company`);
                        }}
                        id={`company-${index}`}
                        placeholder="Ex. Uber"
                        className={`px-4 py-2 border rounded-md focus:outline-none grow ${
                          errors.experience?.[index]?.company
                            ? 'border-red-500'
                            : 'border-gray-500 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring'
                        }`}
                        {...field}
                      />
                    )}
                    name={`experience.${index}.company`}
                    control={control}
                    defaultValue={field.company}
                    rules={
                      {
                        // required: 'Company name is required'
                      }
                    }
                  />
                  {errors.experience?.[index]?.company && (
                    <small className="absolute right-0 text-red-600">
                      {errors.experience[index].company.message}
                    </small>
                  )}
                </div>

                {/* Year To */}
                <div className="relative flex flex-col ">
                  <label className="text-gray-700" htmlFor={`date_till-${index}`}>
                    To Date
                    {/* <span className="text-red-500 required-dot text-lg"> *</span> */}
                  </label>

                  <Controller
                    render={({ field }) => (
                      <input
                        onKeyUp={() => {
                          trigger(`experience.${index}.date_till`);
                        }}
                        type="date"
                        id={`date_till-${index}`}
                        className={`px-4 py-2 border rounded-md focus:outline-none  ${
                          errors.experience?.[index]?.date_till
                            ? 'border-red-500'
                            : 'border-gray-500 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring'
                        }`}
                        {...field}
                      />
                    )}
                    name={`experience.${index}.date_till`}
                    control={control}
                    defaultValue={field.date_till}
                    rules={
                      {
                        // required: 'Required'
                      }
                    }
                  />
                  {errors.experience?.[index]?.date_till && (
                    <small className="absolute right-0 text-red-600">
                      {errors.experience[index].date_till.message}
                    </small>
                  )}
                </div>
              </div>
            </div>

            {/* Work Details/Description, Delete Button */}
            <div className="flex gap-3 grow flex-col md:flex-row">
              {/* Work Details/Description */}
              <div className="flex flex-col grow">
                <label className="text-gray-700" htmlFor={`description-${index}`}>
                  Work Details/Description
                </label>

                <Controller
                  render={({ field }) => (
                    <textarea
                      id={`description-${index}`}
                      placeholder={`Ex. Developed a new feature for the website. \n Worked on the frontend and backend of the website.`}
                      className={`px-4 py-2 border border-gray-500 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring grow h-48 md:h-32`}
                      {...field}
                    ></textarea>
                  )}
                  name={`experience.${index}.description`}
                  control={control}
                  defaultValue={field.description}
                />
              </div>

              <button
                className="self-end px-6 py-2 text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 w-full md:w-auto h-12 md:h-32"
                type="button"
                onClick={() => remove(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mx-auto"
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
          </div>
        );
      })}

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="px-6 py-2 text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 "
        >
          Save
        </button>
      </div>
    </form>
  );
};

const Profile = () => {
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  const tabs = ['Personal Info', 'Skills', 'Projects', 'Education', 'Experience'];

  const [activeTab, setActiveTab] = useState(1);
  const [formValues, setFormValues] = useState();

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loaderReducer);

  // Form's Data Handling Functionality Setup
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    control,
    reset,
  } = useForm();

  // Form's UI functionality:
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

  const onSubmitAllButtonClick = () => {
    if (!formValues) {
      toast('Please click the "Save" button to save the data before submitting!');
    }

    try {
      const { personal_info } = formValues;
      const data = { ...formValues };
      delete data.personal_info;
      const allFormsData = { ...personal_info, ...data };

      dispatch(updateUser(allFormsData));
    } catch (error) {
      toast('Error occured! Have you filled all the tabs?');
    }
  };

  const resetForm = () => {
    // Fetching all data for the user from the local storage
    const userData = JSON.parse(localStorage.getItem('user'));

    // We need to create a structure similar to what the form looks like, so creating a personal_info object. And destructuring the rest from userData.
    if (userData) {
      const personal_info = {
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        email: userData?.email,
        mobileNumber: userData?.mobileNumber,
        portfolio: userData?.portfolio,
        about: userData?.about,
        address: userData?.address,
      };
      const { education, experience, projects, skills } = userData;
      // And this is what we need to pass in the reset method to repopulate the form with
      const userDataForFormPrepopulation = {
        personal_info,
        education,
        experience,
        projects,
        skills,
      };

      reset(userDataForFormPrepopulation);
    }
  };

  useEffect(() => {
    // Just to see the data from each Form Tabs
    formValues && console.log('formValues', formValues);
  }, [formValues]);

  useEffect(() => {
    // Actual Data prepopulation when page loads and on each refresh
    // Either with empty values or the values from fetched user data
    resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loggedInUser ? (
        // <div className="container p-8 ">
        <div className="p-4 md:p-8 ">
          <p
            tabIndex="0"
            className="focus:outline-none text-lg sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800 mb-5"
          >
            Profile Update{' '}
            <Link
              to={`/user/view/${loggedInUser?._id}`}
              className="text-blue-600 text-base block"
            >
              Click here to View Profile
            </Link>
          </p>

          <div className="pb-4 rounded-lg overflow-scroll">
            {/* Tabs Container */}
            <ul className="nav w-[86vw] md:w-full  flex flex-row flex-nowrap justify-start overflow-auto no-scrollbar list-none mb-0">
              {tabs.map((tab, index) => (
                <li className="nav-item" key={index}>
                  <button
                    className={`inline-block nav-link px-4 py-2 border-b-2 whitespace-nowrap   transition  ${
                      activeTab === index + 1
                        ? `border-blue-600 text-blue-600 bg-blue-500/10 rounded-t`
                        : 'hover:border-gray-400 hover:bg-gray-100'
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
              {/* Tab 1 */}
              {activeTab === 1 && (
                <PersonalInfoFormTemplate
                  {...{
                    register,
                    handleSubmit,
                    trigger,
                    errors,
                    formValues,
                    setFormValues,
                    loggedInUser,
                  }}
                />
              )}

              {/* Tab 2 */}
              {activeTab === 2 && (
                <SkillsFormTemplate
                  {...{
                    handleSubmit,
                    trigger,
                    errors,
                    control,
                    setFormValues,
                  }}
                />
              )}

              {/* Tab 3 */}
              {activeTab === 3 && (
                <ProjectsFormTemplate
                  {...{
                    handleSubmit,
                    trigger,
                    errors,
                    control,
                    setFormValues,
                  }}
                />
              )}

              {/* Tab 4 */}
              {activeTab === 4 && (
                <EducationFormTemplate
                  {...{
                    handleSubmit,
                    trigger,
                    errors,
                    control,
                    setFormValues,
                  }}
                />
              )}

              {/* Tab 5 */}
              {activeTab === 5 && (
                <ExperienceFormTemplate
                  {...{
                    handleSubmit,
                    trigger,
                    errors,
                    control,
                    setFormValues,
                  }}
                />
              )}
            </div>

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
                <p className="m-0">Submit All Forms</p>
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
      ) : (
        <>
          <p className="text-base pl-5 pt-5 ">
            Please <Link to="/login">Login</Link> to view or update your <b>Profile</b>
          </p>
        </>
      )}
    </>
  );
};

export default Profile;
