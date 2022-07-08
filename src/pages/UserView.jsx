import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const UserView = () => {
  // const { jobs } = useSelector((state) => state.jobsReducer);
  // console.log('jasassdasdobs', jobs);
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  const userId = useParams().id;

  const { appliedUsers } = useSelector((state) => state.jobsReducer);

  let user;
  // Means user is trying to view his own profile, and not trying to view someone else's profile. And if he's trying to
  // view a profile that is not his own, he can only view it if it exists in the appliedUsers, means he can only view
  // a person's profile if they have applied to user's posted jobs.
  if (appliedUsers.length < 1 && userId === loggedInUser._id) {
    user = loggedInUser;
  } else {
    // Means user is coming from applied candidates page with a userId, and thus appliedUsers would have been stored at state,
    // and thus this block will be executed
    user = appliedUsers.find((user) => user._id === userId);
  }

  let count = 0;
  const pillColors = [
    'text-white bg-gradient-to-br from-pink-500 to-orange-400',
    'text-gray-900 bg-gradient-to-r from-red-200 to-red-300',
    'text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200',
    'text-white bg-gradient-to-br from-green-400 to-blue-600',
    'text-white bg-gradient-to-r from-purple-500 to-pink-500',
    'text-white bg-gradient-to-br from-purple-600 to-blue-500',
  ];
  // const headings = [
  //   { title: 'First Name', value: user.firstName },
  //   { title: 'Last Name', value: user.lastName },
  //   { title: 'Username', value: user.username },
  //   { title: 'Email', value: user.email },

  //   { title: 'Mobile Number', value: user.mobileNumber },
  //   { title: 'Portfolio', value: user.portfolio },
  //   { title: 'About', value: user.about },
  //   { title: 'Address', value: user.address },
  // ];

  // console.log(appliedUsers);
  // const simpleElements = headings.map((element) => {
  //   return (
  //     <div className="mr-6">
  //       <span className="mb-1">
  //         <b>{element.title}: </b>
  //       </span>
  //       <p className="">{element.value}</p>
  //     </div>
  //   );
  // });
  useEffect(() => {}, [user]);

  return (
    user && (
      // <div className="container p-8  text-base leading-snug ">
      <div className="p-4 md:p-8  text-base leading-snug ">
        {/* Heading */}
        <h1 className="text-2xl font-bold mb-5">Personal Info</h1>

        <div className="flex flex-col gap-6">
          {/* https://demo.themesberg.com/windster-pro/users/profile/ */}
          <div className="rounded-2xl ">
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              {/* Image & Name Block */}
              <div className="w-full p-6 border-x bg-white border-b border-gray-200 rounded-2xl shadow">
                {/* Image, Name Details Block */}
                <div className="flex flex-col lg:flex-row gap-4">
                  <img
                    className="h-24 w-24 rounded-lg object-cover"
                    src={
                      user.profilePicLink ||
                      'https://demo.themesberg.com/windster-pro/images/users/jese-leos-2x.png'
                    }
                    alt=""
                  />

                  {/* Block - Name, User's Job, User's Location */}
                  <div className="flex flex-col">
                    <h2 className="text-xl font-bold mb-3">
                      {user.firstName + ' ' + user.lastName}
                    </h2>
                    <ul className="flex flex-col gap-1">
                      {/* Username */}
                      <li className="flex gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <p className="m-0 text-gray-800/70 font-medium">Username: </p>

                        <span className="text-black font-semibold">{user.username}</span>
                      </li>
                      {/* Join Date */}
                      <li className="flex gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="m-0 text-gray-800/70 font-medium">
                          Join Date:{' '}
                        </span>
                        <span className="text-black font-semibold">
                          {new Date(user.createdAt).toLocaleString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Block - Email, address, number */}
                <div className="mt-4">
                  {/* To remove default italic styles in address tag we need to change via inLine CSS  */}
                  <address className="" style={{ fontStyle: 'normal' }}>
                    <div className="text-gray-700/80 ">Email address</div>
                    <a
                      className="font-medium text-black text-sm md:text-base"
                      href="mailto:webmaster@windster.com"
                    >
                      {user.email}
                    </a>

                    <div className="text-gray-700/80 mt-3 ">Home address</div>
                    <div className="font-medium text-black text-sm md:text-base">
                      {user.address}
                    </div>

                    <div className="text-gray-700/80 mt-3 ">Phone number</div>
                    <div className="font-medium text-black text-sm md:text-base">
                      {user.mobileNumber}
                    </div>
                  </address>
                </div>
              </div>

              {/* Skills Container */}
              <div className="w-full p-6 flex flex-col justify-between bg-white border-x border-b border-gray-200 rounded-2xl shadow whitespace-nowrap">
                <div className="mb-6">
                  <h3 className="text-xl font-bold">Skills</h3>

                  {user && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {user.skills.map((item, index) => {
                        if (count >= pillColors.length) {
                          count = 0;
                        }
                        count++;

                        // To display skill level in skill pills
                        let skillValue = 0;
                        switch (item.level) {
                          case 'beginner':
                            skillValue = '10 rounded-l-full';
                            break;
                          case 'intermediate':
                            skillValue = '20 rounded-l-full';
                            break;
                          case 'proficient':
                            skillValue = '32 rounded-l-full';
                            break;
                          case 'expert':
                            skillValue = 'full rounded-full';
                            break;

                          default:
                            break;
                        }

                        return (
                          <div
                            key={index}
                            className="relative flex items-center rounded-full "
                          >
                            {/* Skill Level Bar - Top 3D Look Position */}
                            {/* <div
                          key={index}
                          className={`absolute top-[-6px] rounded-t-full left-0 w-full h-6 bg-gray-600
                          text-xs text-white overflow-hidden`}
                        >
                          <div
                            className={`w-${skillValue}  bg-cyan-600 h-6`}
                          ></div>
                        </div> */}

                            <div className="relative flex items-center rounded-full overflow-hidden">
                              <span
                                className={`px-4 py-1 rounded-full h-full ${
                                  pillColors[count - 1]
                                }`}
                              >
                                {item.skill}
                              </span>

                              {/* Skill Level Bar - As Border */}
                              <div
                                className={`absolute border-b-4 border-pink-600 bottom-0 left-0 w-${skillValue} 
                            `}
                              ></div>
                            </div>

                            {/* Skill Level Bar - Halo Position */}
                            {/* <div
                          key={index}
                          className={`absolute top-[-10px] rounded-full left-0 w-full h-2 bg-gray-600
                          text-xs text-white overflow-hidden`}
                        >
                          <div
                            className={`w-${skillValue}  bg-cyan-600 h-2`}
                          ></div>
                        </div> */}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-1">Resume Link</h3>
                  <a
                    href={user?.resumeLink}
                    className="text-blue-700 font-semibold flex gap-2 items-center "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 animate-pulse"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    {user?.firstName || user?.username}'s Resume Link
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* General Information */}
          <div className="p-6 bg-white border-x border-b border-gray-200 rounded-2xl shadow">
            <h3 className="mb-4 text-xl font-bold">General Information</h3>
            <div className="">
              <div className="">
                <p className="m-0 mb-1 text-lg font-medium">About me</p>
                <span className="text-black text-gray-900/70 ">
                  <p className=" w-9/12" style={{ whiteSpace: 'pre-line' }}>
                    {user.about}
                  </p>
                </span>
              </div>

              <div className="flex flex-col gap-8 mt-8">
                {/* Projects */}
                <div>
                  <p className="m-0 mb-2 text-lg font-medium">Projects</p>
                  <ul className="flex flex-wrap gap-3">
                    {/* Card */}
                    {user.projects.map((project, index) => {
                      return (
                        <div
                          key={index}
                          className="p-6 relative  rounded-2xl bg-blue-800 overflow-hidden"
                        >
                          <div className="flex flex-col mb-8">
                            {/* Project index */}
                            <p className="px-4 py-1 rounded-full text-sm text-white bg-blue-500 whitespace-nowrap w-min mb-1">
                              Project {index + 1}
                            </p>

                            {/* Name */}
                            <p className="text-md text-white font-semibold mb-5">
                              {project.name}
                            </p>

                            {/* Links Row */}
                            <div className="flex flex-wrap gap-x-3">
                              <a
                                href={`${project.repo_url}`}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-3 px-4 py-1  rounded-full bg-white text-sm font-semibold whitespace-nowrap "
                              >
                                Github
                              </a>
                              <a
                                href={`${project.deployed_url}`}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-3 px-4  py-1  rounded-full bg-white text-sm font-semibold whitespace-nowrap "
                              >
                                Live
                              </a>
                            </div>

                            <div className="absolute bottom-0 left-0 px-8 py-2 flex flex-wrap justify-between gap-2 bg-slate-300 w-full">
                              <svg
                                className="h-5 w-5"
                                viewBox="0 0 17 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15.1558 0.559692H1.51087C0.676432 0.559692 0 1.23742 0 2.07346V15.7446C0 16.5806 0.676432 17.2583 1.51087 17.2583H15.1558C15.9902 17.2583 16.6667 16.5806 16.6667 15.7446V2.07346C16.6667 1.23742 15.9902 0.559692 15.1558 0.559692Z"
                                  fill="#DC395F"
                                ></path>
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M6.58437 4.80783C6.58437 5.37806 6.12024 5.81314 5.56621 5.81314C5.01217 5.81314 4.54817 5.378 4.54817 4.80783C4.54817 4.23799 5.01217 3.80298 5.56621 3.80298C6.12024 3.80298 6.58437 4.23799 6.58437 4.80783ZM3.36574 11.9506C3.36574 11.726 3.39575 11.4506 3.45558 11.1956H3.45565L4.21913 8.07017H3.03638L3.39575 6.74185H6.24055L5.1175 11.2051C5.04263 11.4903 5.01268 11.7269 5.01268 11.8916C5.01268 12.1771 5.15292 12.2605 5.37219 12.3101C5.50572 12.34 6.56971 12.3191 7.14895 11.029L7.88658 8.07017H6.68872L7.0481 6.74185H9.60826L9.27896 8.24995C9.72805 7.40973 10.6265 6.61139 11.5098 6.61139C12.4531 6.61139 13.2317 7.28469 13.2317 8.57479C13.2317 8.90471 13.1867 9.2638 13.067 9.66874L12.5878 11.3933C12.543 11.5737 12.5129 11.7235 12.5129 11.8585C12.5129 12.1584 12.6327 12.3083 12.8573 12.3083C13.0819 12.3083 13.3664 12.1429 13.6958 11.2284L14.3546 11.4832C13.9652 12.8483 13.2616 13.4181 12.3782 13.4181C11.345 13.4181 10.8511 12.8035 10.8511 11.9631C10.8511 11.7233 10.8809 11.4681 10.9558 11.213L11.4499 9.44292C11.5098 9.24782 11.5248 9.06798 11.5248 8.90289C11.5248 8.33305 11.1805 7.98786 10.6265 7.98786C9.92271 7.98786 9.45858 8.49397 9.219 9.46901L8.26067 13.3201H6.58391L6.88488 12.1099C6.39198 12.9211 5.70741 13.4235 4.86301 13.4235C3.84484 13.4235 3.36574 12.8359 3.36574 11.9506Z"
                                  fill="white"
                                ></path>
                              </svg>
                              <svg
                                className="h-5 w-5"
                                viewBox="0 0 18 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4.297 0.762876L8.9845 0.259155L13.672 0.762876L17.301 5.71471L8.9845 15.5586L0.667969 5.71471L4.297 0.762876Z"
                                  fill="#FDB300"
                                ></path>
                                <path
                                  d="M4.03524 5.71497L8.98317 15.5589L0.666626 5.71497H4.03524Z"
                                  fill="#EA6C00"
                                ></path>
                                <path
                                  d="M13.929 5.71497L8.98107 15.5589L17.2976 5.71497H13.929Z"
                                  fill="#EA6C00"
                                ></path>
                                <path
                                  d="M4.03467 5.71497H13.9305L8.9826 15.5589L4.03467 5.71497Z"
                                  fill="#FDAD00"
                                ></path>
                                <path
                                  d="M8.98272 0.259277L4.2952 0.762992L4.03479 5.71483L8.98272 0.259277Z"
                                  fill="#FDD231"
                                ></path>
                                <path
                                  d="M8.98164 0.259277L13.6692 0.762992L13.9296 5.71483L8.98164 0.259277Z"
                                  fill="#FDD231"
                                ></path>
                                <path
                                  d="M17.2987 5.71453L13.6696 0.762695L13.9301 5.71453H17.2987Z"
                                  fill="#FDAD00"
                                ></path>
                                <path
                                  d="M0.666626 5.71453L4.29565 0.762695L4.03524 5.71453H0.666626Z"
                                  fill="#FDAD00"
                                ></path>
                                <path
                                  d="M8.98272 0.259277L4.03479 5.71483H13.9306L8.98272 0.259277Z"
                                  fill="#FEEEB7"
                                ></path>
                              </svg>
                              <svg
                                className="h-5 w-5"
                                viewBox="0 0 12 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M3.07892 17.2564C4.61226 17.2564 5.8567 16.0098 5.8567 14.4738V11.6913H3.07892C1.54559 11.6913 0.301147 12.9379 0.301147 14.4738C0.301147 16.0098 1.54559 17.2564 3.07892 17.2564Z"
                                  fill="#0ACF83"
                                ></path>
                                <path
                                  d="M0.301147 8.90901C0.301147 7.37305 1.54559 6.12646 3.07892 6.12646H5.8567V11.6916H3.07892C1.54559 11.6916 0.301147 10.445 0.301147 8.90901Z"
                                  fill="#A259FF"
                                ></path>
                                <path
                                  d="M0.301025 3.34407C0.301025 1.8081 1.54547 0.561523 3.0788 0.561523H5.85658V6.12662H3.0788C1.54547 6.12662 0.301025 4.88004 0.301025 3.34407Z"
                                  fill="#F24E1E"
                                ></path>
                                <path
                                  d="M5.85718 0.561523H8.63495C10.1683 0.561523 11.4127 1.8081 11.4127 3.34407C11.4127 4.88003 10.1683 6.12661 8.63495 6.12661H5.85718V0.561523Z"
                                  fill="#FF7262"
                                ></path>
                                <path
                                  d="M11.4127 8.90901C11.4127 10.445 10.1683 11.6916 8.63495 11.6916C7.10162 11.6916 5.85718 10.445 5.85718 8.90901C5.85718 7.37305 7.10162 6.12646 8.63495 6.12646C10.1683 6.12646 11.4127 7.37305 11.4127 8.90901Z"
                                  fill="#1ABCFE"
                                ></path>
                              </svg>
                              <svg
                                className="h-5 w-5"
                                viewBox="0 0 13 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M4.12203 1.09285H4.79923V2.63598H5.5665V1.09285H6.24703V0.321289H4.12203V1.09285ZM2.30926 0.321317H1.54199V2.63602H2.31593V1.86445H3.01648V2.63602H3.78375V0.321317H3.01648V1.08618H2.30926V0.321317ZM6.58222 0.321289H7.38618L7.8799 1.13646L8.37362 0.321289H9.17759V2.63598H8.41032V1.4887L7.87323 2.32065L7.33614 1.4887V2.63598H6.58222V0.321289ZM10.3271 0.321289H9.5598V2.63598H11.4146V1.87113H10.3271V0.321289Z"
                                  fill="black"
                                ></path>
                                <path
                                  d="M1.51371 16.1212L0.412842 3.69568H12.5157L11.4148 16.1145L6.45425 17.4966"
                                  fill="#E44D26"
                                ></path>
                                <path
                                  d="M6.46338 16.4406V4.71619H11.4106L10.4665 15.3168"
                                  fill="#F16529"
                                ></path>
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M6.4651 6.23572H2.66211L3.07577 10.8383H6.4651V9.31863H4.46353L4.32342 7.75872H6.4651V6.23572ZM4.66104 11.6036H3.13985L3.35335 13.9955L6.46245 14.8677V13.2776L4.76779 12.8214L4.66104 11.6036Z"
                                  fill="#EBEBEB"
                                ></path>
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M6.45831 6.23572H10.2546L10.1145 7.75872H6.45831V6.23572ZM6.45654 9.31902H9.97597L9.55897 13.9954L6.45654 14.8609V13.2775L8.14787 12.8213L8.32467 10.842H6.45654V9.31902Z"
                                  fill="white"
                                ></path>
                              </svg>
                              <svg
                                className="h-5 w-5"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M13.2726 15.2265H3.03646C1.64757 15.2265 0.515625 14.1118 0.515625 12.744V3.07392C0.515625 1.70616 1.64757 0.591431 3.03646 0.591431H13.2656C14.6615 0.591431 15.7865 1.70616 15.7865 3.07392V12.7372C15.7934 14.1118 14.6615 15.2265 13.2726 15.2265Z"
                                  fill="#2E001F"
                                ></path>
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M6.4111 7.39617L8.35555 11.0755C8.39027 11.1302 8.36943 11.1849 8.31388 11.1849H7.10554C7.02916 11.1849 6.99443 11.1644 6.95971 11.096C6.84486 10.8627 6.72954 10.6294 6.61364 10.395L6.61349 10.3946C6.28094 9.72192 5.94359 9.03947 5.5986 8.31941H5.58471C5.16804 9.23582 4.70971 10.2001 4.26526 11.1028C4.23054 11.1575 4.19582 11.178 4.14026 11.178H2.99443C2.92499 11.178 2.91804 11.1233 2.95276 11.0823L4.85554 7.51243L3.01526 3.90153C2.9736 3.84682 3.01526 3.80579 3.05693 3.80579H4.25138C4.32082 3.80579 4.3486 3.81947 4.37638 3.88102C4.81388 4.78374 5.25832 5.71382 5.67499 6.62339H5.68888C6.09165 5.72066 6.5361 4.78374 6.96666 3.88785L6.96793 3.88585C7.0019 3.83231 7.02306 3.79895 7.09166 3.79895H8.20971C8.26527 3.79895 8.2861 3.83998 8.25138 3.89469L6.4111 7.39617ZM8.69629 8.51069C8.69629 6.91725 9.77268 5.67258 11.481 5.67258C11.6268 5.67258 11.7032 5.67258 11.8421 5.68626V3.87397C11.8421 3.83293 11.8768 3.80558 11.9116 3.80558H13.0088C13.0643 3.80558 13.0782 3.8261 13.0782 3.86029V10.1383C13.0782 10.323 13.0782 10.5555 13.113 10.8085C13.113 10.8496 13.0991 10.8632 13.0574 10.8838C12.4741 11.1573 11.863 11.2804 11.2796 11.2804C9.77268 11.2873 8.69629 10.3709 8.69629 8.51069ZM11.4393 6.69151C11.6059 6.69151 11.7448 6.71886 11.842 6.75989V10.1451C11.7101 10.1998 11.5295 10.2203 11.3629 10.2203C10.5781 10.2203 9.95315 9.71427 9.95315 8.45592C9.95315 7.35487 10.5643 6.69151 11.4393 6.69151Z"
                                  fill="#FFD9F2"
                                ></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </ul>
                </div>

                {/* Education */}
                <div className="">
                  <p className="m-0 mb-2 text-lg font-medium">Education</p>
                  <ul className="flex flex-wrap gap-3 text-white">
                    {user.education.map((education, index) => {
                      return (
                        <div
                          key={index}
                          className="relative bg-pink-800 rounded-xl px-4 pt-11 pb-4 flex flex-col gap-4  overflow-hidden"
                        >
                          <div className="">
                            {/* Period, Marks */}
                            <div className="absolute top-0 left-0 px-4 py-2 flex flex-wrap justify-between items-center gap-2 bg-slate-300 w-full text-black">
                              <span className="text-xs font-medium">
                                {education.year_from} - {education.year_to}
                              </span>

                              <span className="text-xs font-medium px-3 py-1 rounded-full bg-yellow-100 whitespace-nowrap w-min">
                                {education?.scoring?.score} (
                                {education?.scoring?.type.toUpperCase()})
                              </span>
                            </div>

                            {/* Title */}
                            <p className="font-semibold m-0 mt-1 text-base">
                              {education.title}
                            </p>
                          </div>

                          {/* Uni, Instt */}
                          <div className="flex justify-between items-start flex-col lg:flex-row gap-3 lg:gap-6 text-white w-min-[1rem]">
                            <div className="grow">
                              <p className="m-0 text-slate-300">University: </p>
                              <span className="font-semibold">
                                {education.university}
                              </span>
                            </div>
                            <div className="grow">
                              <p className="m-0 text-slate-300">Institute: </p>
                              <span className="font-semibold">{education.institute}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </ul>
                </div>

                {/* Experience */}
                <div className="">
                  <p className="m-0 mb-2 text-lg font-medium">Experience</p>
                  <ul className="flex flex-col sm:flex-row flex-wrap gap-3">
                    {user.experience.map((experience, index) => {
                      return (
                        <li
                          key={index}
                          className="relative flex flex-col px-4 pt-12 pb-6 rounded-2xl bg-amber-300 overflow-hidden "
                        >
                          {/* Period */}
                          <div className="absolute top-0 left-0 px-4 py-2 flex flex-wrap justify-between items-center gap-2 bg-amber-400 w-full text-black ">
                            <span className="text-xs font-medium px-3 py-1 rounded-full bg-yellow-100 whitespace-nowrap w-min">
                              <span className="">
                                {new Date(experience.date_from).toLocaleString('en-GB', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                })}{' '}
                              </span>
                              <span className="text-xs font-normal">to </span>
                              <span className="">
                                {new Date(experience.date_till).toLocaleString('en-GB', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                })}
                              </span>
                            </span>
                          </div>

                          <div className="flex gap-6 w-full">
                            {/* Company Logo */}
                            <div className="h-12 w-12 rounded-lg overflow-hidden">
                              <img
                                className="bg-white p-2 object-cover"
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/225px-Google_%22G%22_Logo.svg.png"
                                alt=""
                              />
                            </div>

                            {/* whitespace-nowrap overflow-scroll no-scrollbar  */}
                            <div className="flex flex-col overflow-auto">
                              {/* Company name */}
                              <span className="font-bold text-base overflow-scroll no-scrollbar h-12 mb-3 xs:mb-0">
                                {experience.company}
                              </span>

                              {/* Designation */}
                              <span className="overflow-scroll no-scrollbar h-12">
                                {experience.designation}
                              </span>
                            </div>
                          </div>

                          {/* Description */}
                          <div className="mt-6 px-4 py-3 rounded-lg bg-amber-400 ">
                            <span className=" " style={{ whiteSpace: 'pre-line' }}>
                              {experience.description}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* <div>
              <p className="m-0 text-gray-800/70 font-medium">Languages</p>
              <span className="text-black font-semibold">
                English, German, Italian, Spanish{' '}
              </span>
            </div>
            <div>
              <p className="m-0 text-gray-800/70 font-medium">Organization</p>
              <span className="text-black font-semibold">Themesberg LLC </span>
            </div>
            <div>
              <p className="m-0 text-gray-800/70 font-medium">Role</p>
              <span className="text-black font-semibold">Graphic Designer</span>
            </div>
            <div>
              <p className="m-0 text-gray-800/70 font-medium">Department</p>
              <span className="text-black font-semibold">Marketing</span>
            </div>
            <div>
              <p className="m-0 text-gray-800/70 font-medium">Birthday</p>
              <span className="text-black font-semibold">15-08-1990 </span>
            </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default UserView;
