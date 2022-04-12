import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { DefaultLayout } from '../components';

const UserView = () => {
  // const { jobs } = useSelector((state) => state.jobsReducer);
  // console.log('jasassdasdobs', jobs);

  const userId = useParams().id;

  const { appliedUsers } = useSelector((state) => state.jobsReducer);
  const user = appliedUsers.find((item) => item._id === userId);

  const headings = [
    { title: 'First Name', value: user.firstName },
    { title: 'Last Name', value: user.lastName },
    { title: 'Username', value: user.username },
    { title: 'Email', value: user.email },

    { title: 'Mobile Number', value: user.mobileNumber },
    { title: 'Portfolio', value: user.portfolio },
    { title: 'About', value: user.about },
    { title: 'Address', value: user.address },
  ];

  const simpleElements = headings.map((element) => {
    return (
      <div className="mr-6">
        <span className="mb-1">
          <b>{element.title}: </b>
        </span>
        <p className="">{element.value}</p>
      </div>
    );
  });

  return (
    <DefaultLayout>
      {user && (
        <div className="container p-4 mt-4 text-base leading-snug ">
          {/* Heading */}
          <h1 className="text-2xl font-bold mb-6">Personal Info</h1>

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 py-4 rounded-md bg-teal-300/50">
            {simpleElements}
          </div>

          <hr className="my-6" />

          <h3>
            <b>Skills</b>
          </h3>
          <ul className="flex flex-wrap gap-3">
            {user.skills.map((item) => {
              return (
                <li className="flex flex-col gap-3 px-4 py-4 rounded-md bg-teal-300/50">
                  <div className="">
                    <span className="font-bold">Skill: </span>{' '}
                    <span className="whitespace-nowrap ml-2">
                      {item?.skill}
                    </span>{' '}
                  </div>

                  <div className="">
                    <span className="font-bold">Skill Level: </span>{' '}
                    <span className="whitespace-nowrap ml-2">
                      {item?.level}
                    </span>{' '}
                  </div>
                </li>
              );
            })}
          </ul>

          <hr className="my-6" />

          <h3>
            <b>Education:</b>
          </h3>
          <ul className="flex flex-wrap gap-3">
            {user.education.map((education) => {
              return (
                <li className="flex flex-col gap-3 px-4 py-4 rounded-md bg-blue-300/40">
                  <div className="">
                    <span className="font-bold">Title: </span>{' '}
                    <span className="whitespace-nowrap ml-2">
                      {education?.title}
                    </span>{' '}
                  </div>

                  <div className="">
                    <span className="font-bold">Institute: </span>{' '}
                    <span className="whitespace-nowrap ml-2">
                      {education?.institute}
                    </span>{' '}
                  </div>

                  <div className="">
                    <span className="font-bold">University: </span>{' '}
                    <span className="whitespace-nowrap ml-2">
                      {education?.university}
                    </span>{' '}
                  </div>

                  <div className="">
                    <span className="font-bold">Start Year: </span>{' '}
                    <span className="whitespace-nowrap ml-2">
                      {education?.year_from}
                    </span>{' '}
                  </div>

                  <div className="">
                    <span className="font-bold">Finish Year: </span>{' '}
                    <span className="whitespace-nowrap ml-2">
                      {education?.year_to}
                    </span>{' '}
                  </div>

                  <div className="">
                    <span className="font-bold">Marking: </span>{' '}
                    <span className="whitespace-nowrap ml-2">
                      {education?.scoring?.score} (
                      {education?.scoring?.type.toUpperCase()})
                    </span>{' '}
                  </div>
                </li>
              );
            })}
          </ul>

          <hr className="my-6" />

          <h3>
            <b>Projects</b>
          </h3>
          <ul className="flex flex-wrap gap-3">
            {/* Card */}
            {user.projects.map((project) => {
              return (
                <li className="flex flex-col gap-3 px-4 py-4 rounded-md bg-green-300/50">
                  <div className="">
                    <span className="font-bold">Project Name: </span>{' '}
                    <span className="whitespace-nowrap ml-2">
                      {project.name}
                    </span>{' '}
                  </div>
                  <div className="">
                    <span className="font-bold">Repo Url: </span>{' '}
                    <span className="whitespace-nowrap ml-2">
                      <Link to={project?.repo_url || ''}>
                        {project?.repo_url}
                      </Link>
                    </span>{' '}
                  </div>
                  <div className="">
                    <span className="font-bold">Deployed Url: </span>{' '}
                    <span className="whitespace-nowrap ml-2">
                      <Link to={project?.deployed_url || ''}>
                        {project?.deployed_url}
                      </Link>
                    </span>{' '}
                  </div>
                  <div className="">
                    <span className="font-bold">Tech Stack: </span>{' '}
                    <span className="whitespace-nowrap ml-2">
                      {project.tech_stack}
                    </span>{' '}
                  </div>
                </li>
              );
            })}
          </ul>

          <hr className="my-6" />

          <h3>
            <b>Experience</b>
          </h3>
          <ul className="flex flex-wrap gap-3">
            {user.experience.map((experience) => {
              return (
                <li className="flex flex-col gap-3 px-4 py-4 rounded-md bg-yellow-300/50">
                  <div className="">
                    <span className="font-bold">Designation: </span>{' '}
                    <span className="whitespace-nowrap ml-2">
                      {experience.designation}
                    </span>{' '}
                  </div>
                  <div className="">
                    <span className="font-bold">Company Name: </span>{' '}
                    <span className="whitespace-nowrap ml-2">
                      {experience.company}
                    </span>{' '}
                  </div>
                  <div className="">
                    <span className="font-bold">Starting Date: </span>{' '}
                    <span className="whitespace-nowrap ml-2">
                      {experience.date_from}
                    </span>{' '}
                  </div>
                  <div className="">
                    <span className="font-bold">Ending Date: </span>{' '}
                    <span className="whitespace-nowrap ml-2">
                      {experience.date_till}
                    </span>{' '}
                  </div>

                  <div className="">
                    <span className="font-bold">Description: </span>{' '}
                    <span className=" ml-2" style={{ whiteSpace: 'pre-line' }}>
                      {experience.description}
                    </span>{' '}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </DefaultLayout>
  );
};

export default UserView;
