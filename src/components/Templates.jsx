import React, { useEffect, useState } from 'react';
import DefaultLayout from './DefaultLayout';
import DividerHorizontal from './DividerHorizontal';

const Templates = () => {
  // --------------Templates-------------------------
  const [removeButtonDisable, setRemoveButtonDisable] = useState(false);
  const [formFields, setFormFields] = useState([{ name: '', email: '' }]);

  const handleInputChange = (e, index) => {
    let data = [...formFields];
    data[index][e.target.name] = e.target.value;
    setFormFields(data);
  };

  const addField = (e) => {
    setFormFields([...formFields, { name: '', email: '' }]);
  };

  const removeField = (index) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log(formFields);
    const fd = new FormData(e.target);

    // Try this to see all FORM-DATA
    // const data = new FormData(event.currentTarget);
    // const values = Object.fromEntries(data.entries())
    // ;
    // console.log('submitting', values);

    for (const pair of fd.entries()) {
      console.log(pair);
    }
  };
  // ----------------------------------------------

  // ------------Tab's Functions-------------------
  const tabs = ['Personal Info', 'Skills', 'Education', 'Experience'];
  const [activeTab, setActiveTab] = useState(1);

  const toggleTab = (index) => {
    setActiveTab(index);
  };
  // ----------------------------------------------
  useEffect(() => {
    if (formFields.length === 1) {
      setRemoveButtonDisable(true);
      return;
    } else {
      setRemoveButtonDisable(false);
    }
  }, [formFields]);

  return (
    <>
      <DefaultLayout>
        <form onSubmit={submitForm}>
          {formFields.map((formField, index) => {
            return (
              <div key={index}>
                <input
                  name="name"
                  type="text"
                  placeholder="enter name"
                  value={formField.name}
                  onChange={(e) => {
                    handleInputChange(e, index);
                  }}
                />
                <input
                  name="email"
                  type="text"
                  placeholder="enter email"
                  value={formField.email}
                  onChange={(e) => {
                    handleInputChange(e, index);
                  }}
                />
                <button
                  disabled={removeButtonDisable}
                  onClick={(e) => removeField(index)}
                >
                  -
                </button>
              </div>
            );
          })}
          <button onClick={(e) => addField(e)}>Add a field</button>
          <br />
          <button type="submit">Submit</button>
          <br />
        </form>
        <DividerHorizontal />

        <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"></div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  as="h3"
                  className="text-lg leading-6 font-medium text-gray-900"
                >
                  Deactivate account
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to deactivate your account? All of
                    your data will be permanently removed. This action cannot be
                    undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Deactivate
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>

        <DividerHorizontal />
        <div className="container p-4">
          <div className="bg-white border rounded px-3 pt-2 pb-4">
            {/* Tabs Container */}
            <ul className="nav nav-tabs flex flex-row flex-nowrap justify-start list-none mb-4">
              {tabs.map((tab, index) => (
                <li className="nav-item">
                  <button
                    className={`inline-block nav-link px-4 py-2 my-2 border-b-2  ${
                      activeTab === index
                        ? `border-blue-600 text-blue-600 bg-blue-500/10 rounded-t`
                        : 'hover:border-gray-300 hover:bg-gray-100'
                    } `}
                    onClick={() => toggleTab(index)}
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>

            {/* Corresponding Tab's Content */}
            <div className="">
              <div className={activeTab === 0 ? '' : 'hidden'}>
                <h2>Content 1</h2>
                <hr />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Obcaecati praesentium incidunt quia aspernatur quasi quidem
                  facilis quo nihil vel voluptatum?
                </p>
              </div>

              <div className={activeTab === 1 ? '' : 'hidden'}>
                <h2>Content 2</h2>
                <hr />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Sapiente voluptatum qui adipisci.
                </p>
              </div>

              <div className={activeTab === 2 ? '' : 'hidden'}>
                <h2>Content 3</h2>
                <hr />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos
                  sed nostrum rerum laudantium totam unde adipisci incidunt modi
                  alias! Accusamus in quia odit aspernatur provident et ad vel
                  distinctio recusandae totam quidem repudiandae omnis veritatis
                  nostrum laboriosam architecto optio rem, dignissimos
                  voluptatum beatae aperiam voluptatem atque. Beatae rerum
                  dolores sunt.
                </p>
              </div>
            </div>
          </div>
        </div>

        <DividerHorizontal />

        {/* https://www.tailwind-kit.com/components/data# */}
        <div class="shadow-lg rounded-xl max-w-xs p-4 bg-white relative overflow-hidden">
          <a href="#" class="w-full h-full block">
            <div class="w-full">
              <p class="text-gray-800 text-xl font-medium mb-2">
                Improve css design of the carousel
              </p>
              <p class="text-gray-400 text-xs font-medium mb-2">
                Sunday 13 october
              </p>
              <p class="text-gray-400 text-sm mb-4">
                You’ve been coding for a while now and know your way around a
                CSS file. You’re certainly no master, but with enough fiddling
                you can get where you want to go.
              </p>
              <div class="flex items-center justify-between">
                <p>Task progress</p>
                <p>33%</p>
              </div>
              <div class="w-full h-2 bg-gray-400 rounded-full mt-3 mb-6">
                <div class="w-1/3 h-full text-center text-xs text-white bg-green-400 rounded-full"></div>
              </div>
              <div class="flex items-center">
                <div class="flex -space-x-2">
                  <a href="#" class="">
                    <img
                      class="inline-block h-10 w-10 rounded-full object-cover ring-2 ring-white"
                      src="https://www.tailwind-kit.com//images/person/1.jpg"
                      alt="Guy"
                    />
                  </a>
                  <a href="#" class="">
                    <img
                      class="inline-block h-10 w-10 rounded-full object-cover ring-2 ring-white"
                      src="https://www.tailwind-kit.com//images/person/2.jpeg"
                      alt="Max"
                    />
                  </a>
                  <a href="#" class="">
                    <img
                      class="inline-block h-10 w-10 rounded-full object-cover ring-2 ring-white"
                      src="https://www.tailwind-kit.com//images/person/3.jpg"
                      alt="Charles"
                    />
                  </a>
                  <a href="#" class="">
                    <img
                      class="inline-block h-10 w-10 rounded-full object-cover ring-2 ring-white"
                      src="https://www.tailwind-kit.com//images/person/4.jpg"
                      alt="Jade"
                    />
                  </a>
                </div>
                <span class="text-gray-500 ml-2">+ 4 more</span>
              </div>
            </div>
          </a>
        </div>

        <DividerHorizontal />

        <div className="w-full p-2  ">
          <div className="p-2 shadow-lg rounded-lg border">
            {/* Outside Table - Tasks, Sort by*/}
            <div className="mb-2 flex items-center justify-between ">
              <p
                tabIndex="0"
                className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"
              >
                Tasks
              </p>
              <div className="py-2 px-4 flex items-center text-sm font-medium text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                <span>Sort By:</span>
                <select
                  aria-label="select"
                  className="focus:text-indigo-600 focus:outline-none bg-transparent ml-1"
                >
                  <option className="text-sm text-indigo-800">Latest</option>
                  <option className="text-sm text-indigo-800">Oldest</option>
                  <option className="text-sm text-indigo-800">Latest</option>
                </select>
              </div>
            </div>

            {/* Inside Table */}
            {/* 2nd Row */}
            <div className="flex items-center justify-between flex-nowrap">
              <div className="flex items-center justify-start">
                <a
                  className="px-3 py-2 bg-indigo-100 text-indigo-700 rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800"
                  href=" javascript:void(0)"
                >
                  All
                </a>
                <a
                  className="px-3 py-2 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800"
                  href="javascript:void(0)"
                >
                  Done
                </a>
                <a
                  className="px-3 py-2 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800"
                  href="javascript:void(0)"
                >
                  Pending
                </a>
              </div>

              <button
                onclick="popuphandler(true)"
                className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 px-5 py-2 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
              >
                <span className="text-sm font-medium leading-none text-white">
                  Add Task
                </span>
              </button>
            </div>

            {/* Table */}
            <div className="">
              <div className="my-3 overflow-scroll xl:overflow-hidden shadow-md  rounded-lg border">
                <table className="w-full ">
                  {/* Table Headings */}
                  <thead class="text-xs font-semibold uppercase text-gray-600 bg-teal-100 h-12 ">
                    <tr>
                      <th class="whitespace-nowrap">
                        <div class="ml-3 font-semibold text-left"></div>
                      </th>
                      <th class="whitespace-nowrap">
                        <div class="ml-3 font-semibold text-left flex">
                          <span>Title</span>

                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="w-4 h-4 ml-1.5 text-gray-700"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </span>
                        </div>
                      </th>
                      <th class="whitespace-nowrap">
                        <div class="ml-3 font-semibold text-left flex">
                          <span>Company</span>

                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="w-4 h-4 ml-1.5 text-gray-700"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </span>
                        </div>
                      </th>
                      <th class="whitespace-nowrap">
                        <div class="ml-3 font-semibold text-left flex">
                          <span>Location</span>

                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="w-4 h-4 ml-1.5 text-gray-700"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </span>
                        </div>
                      </th>
                      <th class="whitespace-nowrap">
                        <div class="ml-3 font-semibold text-left flex">
                          <span>Posted On</span>

                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="w-4 h-4 ml-1.5 text-gray-700"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </span>
                        </div>
                      </th>
                      <th class="whitespace-nowrap shrink">
                        <div class="ml-3 font-semibold text-left flex">
                          <span>Applicants</span>

                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="w-4 h-4 ml-1.5 text-gray-700"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </span>
                        </div>
                      </th>
                      <th class="whitespace-nowrap">
                        <div class="ml-6 font-semibold text-left">Actions</div>
                      </th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody>
                    <tr
                      tabIndex="0"
                      className="focus:outline-none h-24 lg:h-16 border-b border-gray-200 rounded"
                    >
                      {/* 1st col -  Checkbox */}
                      <td className="flex justify-center items-center h-24 lg:h-16  px-3">
                        <input
                          placeholder="checkbox"
                          type="checkbox"
                          className="cursor-pointer w-5 h-5 "
                        />
                      </td>

                      {/* 2nd col -  Title */}
                      <td className="pl-3">
                        <span className=" text-base font-medium text-gray-700">
                          Marketing Keynote Presentation
                        </span>
                      </td>

                      {/* 3rd col - Company */}
                      <td className="pl-3">
                        <span className=" text-base text-gray-600">
                          Microsoft LLC Pvt. Ltd.
                        </span>
                      </td>

                      {/* 4th col - Location */}
                      <td className="pl-3">
                        <span className=" text-base text-gray-600">
                          Mississippi, Switzerland
                        </span>
                      </td>

                      {/* 5th col - Posted on */}
                      <td className="pl-3">
                        <span className=" text-base text-gray-600">
                          027/Apr/2022
                        </span>
                      </td>

                      {/* 6th col - Total Applicants */}
                      <td className="pl-3">
                        <span className=" text-base text-gray-600">3</span>
                      </td>

                      {/* 7th col - Actions */}
                      <td className="pl-3">
                        <div className=" flex flex-col lg:flex-row gap-3 text-base text-gray-600 px-3">
                          <div className="flex flex-row gap-3">
                            {/* Eye */}
                            <span>
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
                            </span>

                            {/* Edit */}
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                <path
                                  fillRule="evenodd"
                                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          </div>

                          <div className="flex flex-row gap-3">
                            {/* List */}
                            <span>
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
                            </span>

                            {/* Delete */}
                            <span>
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
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Pagination */}
                {/* 1 */}
                <div class="pl-2 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
                  <div class="flex items-center">
                    <button
                      type="button"
                      class="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100"
                    >
                      <svg
                        width="9"
                        fill="currentColor"
                        height="8"
                        class=""
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
                      </svg>
                    </button>
                    <button
                      type="button"
                      class="w-full px-4 py-2 border-t border-b text-base text-indigo-500 bg-white hover:bg-gray-100 "
                    >
                      1
                    </button>
                    <button
                      type="button"
                      class="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100"
                    >
                      2
                    </button>
                    <button
                      type="button"
                      class="w-full px-4 py-2 border-t border-b text-base text-gray-600 bg-white hover:bg-gray-100"
                    >
                      3
                    </button>
                    <button
                      type="button"
                      class="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100"
                    >
                      4
                    </button>
                    <button
                      type="button"
                      class="w-full p-4 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100"
                    >
                      <svg
                        width="9"
                        fill="currentColor"
                        height="8"
                        class=""
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <hr />

                {/* 2 */}
                <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                  <span class="text-xs xs:text-sm text-gray-900">
                    Showing 1 to 4 of 50 Entries
                  </span>
                  <div class="inline-flex mt-2 xs:mt-0">
                    <button class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                      Prev
                    </button>
                    <button class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                      Next
                    </button>
                  </div>
                </div>

                <hr />

                {/* 3 */}
                <div>
                  <div>
                    <p class="text-sm leading-5 text-blue-700">
                      Showing
                      <span class="font-medium">1</span>
                      to
                      <span class="font-medium">200</span>
                      of
                      <span class="font-medium">2000</span>
                      results
                    </p>
                  </div>
                  <nav class="relative z-0 inline-flex shadow-sm">
                    <div>
                      <a
                        href="#"
                        class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                        aria-label="Previous"
                      >
                        <svg
                          class="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </a>
                    </div>
                    <div>
                      <a
                        href="#"
                        class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-700 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary"
                      >
                        1
                      </a>
                      <a
                        href="#"
                        class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-600 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary"
                      >
                        2
                      </a>
                      <a
                        href="#"
                        class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-600 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary"
                      >
                        3
                      </a>
                    </div>
                    <div v-if="pagination.current_page < pagination.last_page">
                      <a
                        href="#"
                        class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                        aria-label="Next"
                      >
                        <svg
                          class="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </a>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DividerHorizontal />

        <div className="w-full p-4">
          {/* 1st Row - Tasks, Sort by*/}
          <div className="flex items-center justify-between">
            <p
              tabIndex="0"
              className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"
            >
              Tasks
            </p>
            <div className="py-3 px-4 flex items-center text-sm font-medium text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
              <span>Sort By:</span>
              <select
                aria-label="select"
                className="focus:text-indigo-600 focus:outline-none bg-transparent ml-1"
              >
                <option className="text-sm text-indigo-800">Latest</option>
                <option className="text-sm text-indigo-800">Oldest</option>
                <option className="text-sm text-indigo-800">Latest</option>
              </select>
            </div>
          </div>

          <div className="py-2">
            {/* 2nd Row */}
            <div className="flex items-center justify-between flex-nowrap">
              <div className="flex items-center justify-start">
                <a
                  className="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800"
                  href=" javascript:void(0)"
                >
                  <span className="px-6 py-3 bg-indigo-100 text-indigo-700 rounded-full">
                    All
                  </span>
                </a>
                <a
                  className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800"
                  href="javascript:void(0)"
                >
                  <span className="px-6 py-3 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                    Done
                  </span>
                </a>
                <a
                  className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800"
                  href="javascript:void(0)"
                >
                  <span className="px-6 py-3 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                    Pending
                  </span>
                </a>
              </div>

              <button
                onclick="popuphandler(true)"
                className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 px-5 py-2 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
              >
                <span className="text-sm font-medium leading-none text-white">
                  Add Task
                </span>
              </button>
            </div>

            <div className="mt-7 overflow-scroll xl:overflow-hidden  shadow-lg rounded-lg border-4">
              <table className="w-full whitespace-nowrap">
                {/* Table Headings */}
                <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-100 h-12">
                  <tr>
                    <th class="whitespace-nowrap">
                      <div class="ml-3 font-semibold text-left"></div>
                    </th>
                    <th class="whitespace-nowrap">
                      <div class="ml-3 font-semibold text-left">Title</div>
                    </th>
                    <th class="whitespace-nowrap">
                      <div class="ml-3 font-semibold text-left">Company</div>
                    </th>
                    <th class="whitespace-nowrap">
                      <div class="ml-3 font-semibold text-left">Location</div>
                    </th>
                    <th class="whitespace-nowrap">
                      <div class="ml-3 font-semibold text-left">Posted On</div>
                    </th>
                    <th class="whitespace-nowrap shrink">
                      <div class="ml-3 font-semibold text-left">Applicants</div>
                    </th>
                    <th class="whitespace-nowrap">
                      <div class="ml-3 font-semibold text-left">Actions</div>
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  <tr
                    tabIndex="0"
                    className="focus:outline-none h-16 border border-gray-100 rounded"
                  >
                    {/* 1st col -  Checkbox */}
                    <td className="flex justify-center items-center h-16 mr-2 px-3">
                      <input
                        placeholder="checkbox"
                        type="checkbox"
                        className="cursor-pointer w-5 h-5 "
                      />
                    </td>

                    {/* 2nd col -  Title */}
                    <td className="">
                      <span className="ml-3 text-base font-medium text-gray-700">
                        Marketing Keynote Presentation
                      </span>
                    </td>

                    {/* 3rd col - Company */}
                    <td className="">
                      <span className="ml-3 text-base text-gray-600">
                        Microsoft LLC Pvt. Ltd.
                      </span>
                    </td>

                    {/* 4th col - Location */}
                    <td className="">
                      <span className="ml-3 text-base text-gray-600">
                        Mississippi, Switzerland
                      </span>
                    </td>

                    {/* 5th col - Posted on */}
                    <td className="">
                      <span className="ml-3 text-base text-gray-600">
                        027/Apr/2022
                      </span>
                    </td>

                    {/* 6th col - Total Applicants */}
                    <td className="">
                      <span className="ml-3 text-base text-gray-600">3</span>
                    </td>

                    {/* 7th col - Actions */}
                    <td className="flex gap-1 text-base text-gray-600">
                      {/* Eye */}
                      <span>
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
                      </span>

                      {/* Edit */}
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                          <path
                            fillRule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>

                      {/* List */}
                      <span>
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
                      </span>

                      {/* Delete */}
                      <span>
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
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <DividerHorizontal />

        {/* https://tailwindcomponents.com/component/testimonial-grid-section         */}
        <div class="bg-indigo-600 w-full h-screen">
          <div class="flex flex-col lg:grid lg:gap-4 2xl:gap-6 lg:grid-cols-4 2xl:row-span-2 2xl:pb-8 ml-2 pt-4 px-6">
            <div class="bg-indigo-600 lg:order-1 lg:row-span-1 2xl:row-span-1 lg:col-span-2 rounded-lg shadow-xl mb-5 lg:mb-0">
              <div class="mx-6 my-8 2xl:mx-10">
                <img
                  class="w-8 md:w-9 lg:w-10 2xl:w-20 h-8 md:h-9 lg:h-10 2xl:h-20 rounded-full border-2 ml-1 lg:ml-3 2xl:ml-0 md:-mt-1 2xl:-mt-4"
                  src="https://images.pexels.com/photos/3775534/pexels-photo-3775534.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                />
                <h1 class="text-white text-xs md:text-base 2xl:text-2xl pl-12 lg:pl-16 2xl:pl-20 -mt-8 md:-mt-10 lg:-mt-11 2xl:-mt-20 2xl:mx-8">
                  Daniel Clifford
                </h1>
                <h2 class="text-white text-opacity-50 text-xs md:text-base 2xl:text-2xl pl-12 lg:pl-16 2xl:pl-20 2xl:my-2 2xl:mx-8">
                  Verified Graduate
                </h2>
              </div>
              <div class="-mt-6 relative">
                <p class="text-white text-xl 2xl:text-4xl font-bold px-7 lg:px-9 2xl:pt-6 2xl:mx-2">
                  I received a job offer mid-course, and the subjects I learned
                  were current, if not more so, in the company I joined. I
                  honestly feel I got every penny’s worth.
                </p>
                <br />
                <p class="text-white text-opacity-50 font-medium md:text-sm 2xl:text-3xl px-7 lg:px-9 mb-3 2xl:pb-8 2xl:mx-2">
                  “ I was an EMT for many years before I joined the bootcamp.
                  I’ve been looking to make a transition and have heard some
                  people who had an amazing experience here. I signed up for the
                  free intro course and found it incredibly fun! I enrolled
                  shortly thereafter. The next 12 weeks was the best - and most
                  grueling - time of my life. Since completing the course, I’ve
                  successfully switched careers, working as a Software Engineer
                  at a VR startup. ”
                </p>
              </div>
            </div>

            <div class="bg-gray-900 lg:order-2 lg:row-span-1 2xl:row-span-1 lg:col-span-1 rounded-lg shadow-xl pb-4 mb-5 lg:mb-0">
              <div class="mx-8 2xl:mx-10 my-10">
                <img
                  class="w-8 md:w-9 2xl:w-20 h-8 md:h-9 2xl:h-20 rounded-full border-2 -ml-1 -mt-2 lg:-mt-4"
                  src="https://images.pexels.com/photos/634021/pexels-photo-634021.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                />
                <h1 class="text-white text-xs md:text-base 2xl:text-2xl pl-11 md:pl-12 2xl:pl-24 -mt-8 md:-mt-10 2xl:-mt-16">
                  Jonathan Walters
                </h1>
                <h2 class="text-white text-xs md:text-base 2xl:text-2xl text-opacity-50 pl-11 md:pl-12 2xl:pl-24">
                  Verified Graduate
                </h2>
              </div>
              <div class="-mt-8 mx-1 lg:mx-2">
                <p class="text-white text-lg lg:text-xl 2xl:text-4xl font-semibold pt-1 px-6 2xl:px-8 lg:pl-5 lg:pr-8">
                  The team was very supportive and kept me motivated
                </p>
                <br />
                <p class="text-white text-opacity-50 font-medium md:text-sm 2xl:text-3xl pl-6 lg:pl-5 pr-4 -mt-1 lg:mt-6 2xl:mt-2 2xl:px-8">
                  “ I started as a total newbie with virtually no coding skills.
                  I now work as a mobile engineer for a big company. This was
                  one of the best investments I’ve made in myself. ”
                </p>
              </div>
            </div>

            <div class="bg-primary-color-white lg:order-3 lg:row-span-2 2xl:row-span-1 lg:col-span-1 rounded-lg shadow-xl mb-5 lg:mb-0 2xl:mb-8">
              <div class="mx-8 my-10 lg:my-8">
                <img
                  class="w-8 md:w-9 lg:w-11 2xl:w-20 h-8 md:h-9 lg:h-11 2xl:h-20 rounded-full border-2 -mt-3 -ml-1 lg:-ml-0"
                  src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                />
                <h1 class="primary-color-blackish-blue text-xs md:text-base 2xl:text-2xl pl-11 md:pl-12 lg:pl-14 2xl:pl-24 -mt-8 md:-mt-10 lg:-mt-11 2xl:-mt-16">
                  Jeanette Harmon
                </h1>
                <h2 class="primary-color-blackish-blue-opacity text-xs md:text-base 2xl:text-2xl pl-11 md:pl-12 lg:pl-14 2xl:pl-24">
                  Verified Graduate
                </h2>
              </div>
              <div class="-mt-4 ml-5 mr-11">
                <p class="primary-color-blackish-blue text-xl 2xl:text-4xl font-bold px-2 lg:px-3 -mt-6 lg:-mt-5 2xl:mt-12 2xl:pb-6">
                  An overall wonderful and rewarding experience
                </p>
                <br />
                <p class="primary-color-blackish-blue-opacity font-medium md:text-sm 2xl:text-3xl pl-2 lg:pl-3 lg:pr-4 mb-6 2xl:pt-2 -mt-3">
                  “ Thank you for the wonderful experience! I now have a job I
                  really enjoy, and make a good living while doing something I
                  love. ”
                </p>
              </div>
            </div>

            <div class="bg-purple-800 lg:order-4 lg:row-span-2 2xl:row-span-1 col-span-2 rounded-lg shadow-xl mb-5 lg:mb-0 2xl:mb-8 lg:pb-14 2xl:pb-20">
              <div class="mx-8 my-8">
                <img
                  class="w-8 md:w-9 lg:w-10 2xl:w-20 h-8 md:h-9 lg:h-10 2xl:h-20 rounded-full border-2 lg:-mt-3"
                  src="https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                />
                <h1 class="text-white text-xs md:text-base 2xl:text-2xl pl-12 md:pl-14 2xl:pl-24 -mt-8 md:-mt-10 lg:-mt-11 2xl:-mt-16">
                  Patrick Abrams
                </h1>
                <h2 class="text-white text-xs md:text-base 2xl:text-2xl text-opacity-50 pl-12 md:pl-14 2xl:pl-24">
                  Verified Graduate
                </h2>
              </div>
              <div class="px-3 -mt-3 mb-5 lg:mb-0">
                <p class="text-white text-lg 2xl:text-4xl font-semibold px-4 -mt-3 lg:-mt-6 2xl:mt-8">
                  Awesome teaching support from TAs who did the bootcamp
                  themselves. Getting guidance from them and learning from their
                  experiences was easy.
                </p>
                <br />
                <p class="text-white text-opacity-50 font-medium md:text-sm 2xl:text-3xl px-4 mt-1 lg:-mt-3 2xl:mt-6">
                  “ The staff seem genuinely concerned about my progress which I
                  find really refreshing. The program gave me the confidence
                  necessary to be able to go out in the world and present myself
                  as a capable junior developer. The standard is above the rest.
                  You will get the personal attention you need from an
                  incredible community of lgart and amazing people. ”
                </p>
              </div>
            </div>

            <div class="bg-primary-color-white lg:order-2 lg:row-span-4 lg:col-span-1 rounded-lg shadow-xl mb-5 lg:pb-4 2xl:h-screen">
              <div class="mx-8 my-8 lg:pl-1">
                <img
                  class="w-8 md:w-9 lg:w-12 2xl:w-20 h-8 md:h-9 lg:h-12 2xl:h-20 rounded-full border-2 lg:-mt-4 -ml-1 lg:-ml-4"
                  src="https://images.pexels.com/photos/3762804/pexels-photo-3762804.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                />
                <h1 class="primary-color-blackish-blue text-xs md:text-base 2xl:text-2xl pl-10 md:pl-12 2xl:pl-24 -mt-8 md:-mt-10 lg:-mt-12 2xl:-mt-16">
                  Kira Whittle
                </h1>
                <h2 class="primary-color-blackish-blue-opacity text-xs md:text-base 2xl:text-2xl pl-10 md:pl-12 2xl:pl-24">
                  Verified Graduate
                </h2>
              </div>
              <div class="px-3 lg:px-5 lg:-mt-4 mb-5 lg:mb-0">
                <p class="primary-color-blackish-blue text-xl 2xl:text-4xl font-semibold px-4 lg:px-0 -mt-2 lg:-mt-0">
                  Such a life-changing experience. Highly recommended!
                </p>
                <br />
                <p class="primary-color-blackish-blue-opacity font-medium md:text-sm 2xl:text-3xl px-4 lg:px-0 2xl:px-4 lg:pr-3 mt-2 lg:-mt-1 2xl:mt-2 2xl:pb-64">
                  “ Before joining the bootcamp, I’ve never written a line of
                  code. I needed some structure from professionals who can help
                  me learn programming step by step. I was encouraged to enroll
                  by a former student of theirs who can only say wonderful
                  things about the program. The entire curriculum and staff did
                  not disappoint. They were very hands-on and I never had to
                  wait long for assistance. The agile team project, in
                  particular, was outstanding. It took my learning to the next
                  level in a way that no tutorial could ever have. In fact, I’ve
                  often referred to it during interviews as an example of my
                  developent experience. It certainly helped me land a job as a
                  full-stack developer after receiving multiple offers. 100%
                  recommend! ”
                </p>
              </div>
            </div>
          </div>
        </div>

        <DividerHorizontal />

        <section className="bg-white">
          <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
            <nav className="flex flex-wrap justify-center -mx-5 -my-2">
              <div className="px-5 py-2">
                <a
                  href="#"
                  className="text-base leading-6 text-gray-500 hover:text-gray-900"
                >
                  About
                </a>
              </div>
              <div className="px-5 py-2">
                <a
                  href="#"
                  className="text-base leading-6 text-gray-500 hover:text-gray-900"
                >
                  Blog
                </a>
              </div>
              <div className="px-5 py-2">
                <a
                  href="#"
                  className="text-base leading-6 text-gray-500 hover:text-gray-900"
                >
                  Team
                </a>
              </div>
              <div className="px-5 py-2">
                <a
                  href="#"
                  className="text-base leading-6 text-gray-500 hover:text-gray-900"
                >
                  Pricing
                </a>
              </div>
              <div className="px-5 py-2">
                <a
                  href="#"
                  className="text-base leading-6 text-gray-500 hover:text-gray-900"
                >
                  Contact
                </a>
              </div>
              <div className="px-5 py-2">
                <a
                  href="#"
                  className="text-base leading-6 text-gray-500 hover:text-gray-900"
                >
                  Terms
                </a>
              </div>
            </nav>
            <div className="flex justify-center mt-8 space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">GitHub</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Dribbble</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </section>

        <DividerHorizontal />

        <section className="text-gray-700 bg-white body-font">
          <div className="container flex flex-col items-center px-8 py-8 mx-auto max-w-7xl sm:flex-row">
            <a
              href="#_"
              className="text-xl font-black leading-none text-gray-900 select-none logo"
            >
              tails<span className="text-indigo-600">.</span>
            </a>
            <p className="mt-4 text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l sm:border-gray-200 sm:mt-0">
              © 2021 Tails - Tailwindcss Page Builder
            </p>
            <span className="inline-flex justify-center mt-4 space-x-5 sm:ml-auto sm:mt-0 sm:justify-start">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>

              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>

              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>

              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">GitHub</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>

              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Dribbble</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </span>
          </div>
        </section>

        <DividerHorizontal />

        <section className="w-full px-8 text-gray-700 bg-white">
          <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
            <div className="relative flex flex-col md:flex-row">
              <a
                href="#_"
                className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0"
              >
                <span className="mx-auto text-xl font-black leading-none text-gray-900 select-none">
                  tails<span className="text-indigo-600">.</span>
                </span>
              </a>
              <nav className="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200">
                <a
                  href="#_"
                  className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
                >
                  Home
                </a>
                <a
                  href="#_"
                  className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
                >
                  Features
                </a>
                <a
                  href="#_"
                  className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
                >
                  Pricing
                </a>
                <a
                  href="#_"
                  className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
                >
                  Blog
                </a>
              </nav>
            </div>

            <div className="inline-flex items-center ml-5 space-x-6 lg:justify-end">
              <a
                href="#"
                className="text-base font-medium leading-6 text-gray-600 whitespace-no-wrap transition duration-150 ease-in-out hover:text-gray-900"
              >
                Sign in
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              >
                Sign up
              </a>
            </div>
          </div>
        </section>

        <DividerHorizontal />

        <section className="w-full px-6 pb-12 antialiased bg-white">
          <div className="mx-auto max-w-7xl">
            <nav
              className="relative z-40 h-24 select-none"
              x-data="{ showMenu: false }"
            >
              <div className="container relative flex flex-wrap items-center justify-between h-24 mx-auto overflow-hidden font-medium border-b border-gray-200 md:overflow-visible lg:justify-center sm:px-4 md:px-2">
                <div className="flex items-center justify-start w-1/4 h-full pr-4">
                  <a href="#_" className="inline-block py-4 md:py-0">
                    <span className="p-1 text-xl font-black leading-none text-gray-900">
                      <span>tails</span>
                      <span className="text-indigo-600">.</span>
                    </span>
                  </a>
                </div>
                <div className="top-0 left-0 items-start hidden w-full h-full p-4 text-sm bg-gray-900 bg-opacity-50 md:items-center md:w-3/4 md:absolute lg:text-base md:bg-transparent md:p-0 md:relative md:flex">
                  <div className="flex-col w-full h-auto overflow-hidden bg-white rounded-lg md:bg-transparent md:overflow-visible md:rounded-none md:relative md:flex md:flex-row">
                    <a
                      href="#_"
                      className="inline-flex items-center block w-auto h-16 px-6 text-xl font-black leading-none text-gray-900 md:hidden"
                    >
                      tails<span className="text-indigo-600">.</span>
                    </a>
                    <div className="flex flex-col items-start justify-center w-full space-x-6 text-center lg:space-x-8 md:w-2/3 md:mt-0 md:flex-row md:items-center">
                      <a
                        href="#_"
                        className="inline-block w-full py-2 mx-0 ml-6 font-medium text-left text-indigo-600 md:ml-0 md:w-auto md:px-0 md:mx-2 lg:mx-3 md:text-center"
                      >
                        Home
                      </a>
                      <a
                        href="#_"
                        className="inline-block w-full py-2 mx-0 font-medium text-left text-gray-700 md:w-auto md:px-0 md:mx-2 hover:text-indigo-600 lg:mx-3 md:text-center"
                      >
                        Features
                      </a>
                      <a
                        href="#_"
                        className="inline-block w-full py-2 mx-0 font-medium text-left text-gray-700 md:w-auto md:px-0 md:mx-2 hover:text-indigo-600 lg:mx-3 md:text-center"
                      >
                        Blog
                      </a>
                      <a
                        href="#_"
                        className="inline-block w-full py-2 mx-0 font-medium text-left text-gray-700 md:w-auto md:px-0 md:mx-2 hover:text-indigo-600 lg:mx-3 md:text-center"
                      >
                        Contact
                      </a>
                      <a
                        href="#_"
                        className="absolute top-0 left-0 hidden py-2 mt-6 ml-10 mr-2 text-gray-600 lg:inline-block md:mt-0 md:ml-2 lg:mx-3 md:relative"
                      >
                        <svg
                          className="inline w-5 h-5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                      </a>
                    </div>
                    <div className="flex flex-col items-start justify-end w-full pt-4 md:items-center md:w-1/3 md:flex-row md:py-0">
                      <a
                        href="#"
                        className="w-full px-6 py-2 mr-0 text-gray-700 md:px-0 lg:pl-2 md:mr-4 lg:mr-5 md:w-auto"
                      >
                        Sign In
                      </a>
                      <a
                        href="#_"
                        className="inline-flex items-center w-full px-6 py-3 text-sm font-medium leading-4 text-white bg-indigo-600 md:px-3 md:w-auto md:rounded-full lg:px-5 hover:bg-indigo-500 focus:outline-none md:focus:ring-2 focus:ring-0 focus:ring-offset-2 focus:ring-indigo-600"
                      >
                        Sign Up
                      </a>
                    </div>
                  </div>
                </div>
                <div className="absolute right-0 flex flex-col items-center items-end justify-center w-10 h-10 bg-white rounded-full cursor-pointer md:hidden hover:bg-gray-100">
                  <svg
                    className="w-6 h-6 text-gray-700"
                    x-show="!showMenu"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    x-cloak=""
                  >
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                  <svg
                    className="w-6 h-6 text-gray-700"
                    x-show="showMenu"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    x-cloak=""
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </div>
              </div>
            </nav>

            <div className="container max-w-lg px-4 py-32 mx-auto text-left md:max-w-none md:text-center">
              <h1 className="text-5xl font-extrabold leading-10 tracking-tight text-left text-gray-900 md:text-center sm:leading-none md:text-6xl lg:text-7xl">
                <span className="inline md:block">Start Crafting Your</span>{' '}
                <span className="relative mt-2 text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-indigo-500 md:inline-block">
                  Next Great Idea
                </span>
              </h1>
              <div className="mx-auto mt-5 text-gray-500 md:mt-12 md:max-w-lg md:text-center lg:text-lg">
                Simplifying the creation of landing pages, blog pages,
                application pages and so much more!
              </div>
              <div className="flex flex-col items-center mt-12 text-center">
                <span className="relative inline-flex w-full md:w-auto">
                  <a
                    href="#_"
                    type="button"
                    className="inline-flex items-center justify-center w-full px-8 py-4 text-base font-bold leading-6 text-white bg-indigo-600 border border-transparent rounded-full md:w-auto hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                  >
                    Purchase Now
                  </a>
                  <span className="absolute top-0 right-0 px-2 py-1 -mt-3 -mr-6 text-xs font-medium leading-tight text-white bg-green-400 rounded-full">
                    only $15/mo
                  </span>
                </span>
                <a href="#" className="mt-3 text-sm text-indigo-500">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </section>

        <DividerHorizontal />

        <div className="max-w-2xl mx-auto overflow-hidden bg-white rounded-lg shadow-md">
          <img
            className="object-cover w-full h-64"
            src="https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            alt="Article"
          />

          <div className="p-6">
            <div>
              <span className="text-xs font-medium text-blue-600 uppercase ">
                Product
              </span>
              <a
                href="#"
                className="block mt-2 text-2xl font-semibold text-gray-800 transition-colors duration-200 transform hover:text-gray-600 hover:underline"
              >
                I Built A Successful Blog In One Year
              </a>
              <p className="mt-2 text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Molestie parturient et sem ipsum volutpat vel. Natoque sem et
                aliquam mauris egestas quam volutpat viverra. In pretium nec
                senectus erat. Et malesuada lobortis.
              </p>
            </div>

            <div className="mt-4">
              <div className="flex items-center">
                <div className="flex items-center">
                  <img
                    className="object-cover h-10 rounded-full"
                    src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60"
                    alt="Avatar"
                  />
                  <a href="#" className="mx-2 font-semibold text-gray-700">
                    Jone Doe
                  </a>
                </div>
                <span className="mx-1 text-xs text-gray-600">21 SEP 2015</span>
              </div>
            </div>
          </div>
        </div>

        <DividerHorizontal />

        <div className="max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
          <img
            className="object-cover object-center w-full h-56"
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
            alt="avatar"
          />

          <div className="flex items-center px-6 py-3 bg-gray-900">
            <svg
              className="w-6 h-6 text-white fill-current"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17 21C15.8954 21 15 20.1046 15 19V15C15 13.8954 15.8954 13 17 13H19V12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12V13H7C8.10457 13 9 13.8954 9 15V19C9 20.1046 8.10457 21 7 21H3V12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12V21H17ZM19 15H17V19H19V15ZM7 15H5V19H7V15Z"
              />
            </svg>

            <h1 className="mx-3 text-lg font-semibold text-white">Focusing</h1>
          </div>

          <div className="px-6 py-4">
            <h1 className="text-xl font-semibold text-gray-800">
              Patterson johnson
            </h1>

            <p className="py-2 text-gray-700">
              Full Stack maker & UI / UX Designer , love hip hop music Author of
              Building UI.
            </p>

            <div className="flex items-center mt-4 text-gray-700">
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14 11H10V13H14V11Z" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7 5V4C7 2.89545 7.89539 2 9 2H15C16.1046 2 17 2.89545 17 4V5H20C21.6569 5 23 6.34314 23 8V18C23 19.6569 21.6569 21 20 21H4C2.34314 21 1 19.6569 1 18V8C1 6.34314 2.34314 5 4 5H7ZM9 4H15V5H9V4ZM4 7C3.44775 7 3 7.44769 3 8V14H21V8C21 7.44769 20.5522 7 20 7H4ZM3 18V16H21V18C21 18.5523 20.5522 19 20 19H4C3.44775 19 3 18.5523 3 18Z"
                />
              </svg>

              <h1 className="px-2 text-sm">Meraki UI</h1>
            </div>

            <div className="flex items-center mt-4 text-gray-700">
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.063 10.063 6.27214 12.2721 6.27214C14.4813 6.27214 16.2721 8.063 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16757 11.1676 8.27214 12.2721 8.27214C13.3767 8.27214 14.2721 9.16757 14.2721 10.2721Z"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.3941 5.48178 3.79418C8.90918 0.194258 14.6059 0.0543983 18.2059 3.48179C21.8058 6.90919 21.9457 12.606 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.9732 6.93028 5.17326C9.59603 2.37332 14.0268 2.26454 16.8268 4.93029C19.6267 7.59604 19.7355 12.0269 17.0698 14.8268Z"
                />
              </svg>

              <h1 className="px-2 text-sm">California</h1>
            </div>

            <div className="flex items-center mt-4 text-gray-700">
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z"
                />
              </svg>

              <h1 className="px-2 text-sm">patterson@example.com</h1>
            </div>
          </div>
        </div>
        <DividerHorizontal />

        <footer className="flex justify-center px-4 text-gray-800 bg-white">
          <div className="container py-6">
            <h1 className="text-lg font-bold text-center lg:text-2xl">
              Join 31,000+ other and never miss <br /> out on new tips,
              tutorials, and more.
            </h1>

            <div className="flex justify-center mt-6">
              <div className="bg-white border rounded-md focus-within:ring focus-within:border-blue-400 focus-within:ring-blue-300 focus-within:ring-opacity-40 ">
                <div className="flex flex-wrap justify-between md:flex-row">
                  <input
                    type="email"
                    className="p-2 m-1 text-sm text-gray-700 bg-transparent appearance-none focus:outline-none focus:placeholder-transparent"
                    placeholder="Enter your email"
                    aria-label="Enter your email"
                  />
                  <button className="w-full px-3 py-2 m-1 text-sm font-medium tracking-wider text-white uppercase transition-colors duration-200 transform bg-gray-800 rounded-md  lg:w-auto hover:bg-gray-700">
                    subscribe
                  </button>
                </div>
              </div>
            </div>

            <hr className="h-px mt-6 border-gray-300 border-none" />

            <div className="flex flex-col items-center justify-between mt-6 md:flex-row">
              <div>
                <a
                  href="#"
                  className="text-xl font-bold text-gray-800 hover:text-gray-700 "
                >
                  Brand
                </a>
              </div>

              <div className="flex mt-4 md:m-0">
                <div className="-mx-4">
                  <a
                    href="#"
                    className="px-4 text-sm font-medium text-gray-800 hover:text-gray-700 hover:underline"
                  >
                    About
                  </a>
                  <a
                    href="#"
                    className="px-4 text-sm font-medium text-gray-800 hover:text-gray-700 hover:underline"
                  >
                    Blog
                  </a>
                  <a
                    href="#"
                    className="px-4 text-sm font-medium text-gray-800 hover:text-gray-700 hover:underline"
                  >
                    News
                  </a>
                  <a
                    href="#"
                    className="px-4 text-sm font-medium text-gray-800 hover:text-gray-700 hover:underline"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>

        <DividerHorizontal />

        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="grid gap-6 row-gap-10 lg:grid-cols-2">
            <div className="lg:py-6 lg:pr-16">
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                      <svg
                        className="w-4 text-gray-600"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <line
                          fill="none"
                          strokeMiterlimit="10"
                          x1="12"
                          y1="2"
                          x2="12"
                          y2="22"
                        />
                        <polyline
                          fill="none"
                          strokeMiterlimit="10"
                          points="19,15 12,22 5,15"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="w-px h-full bg-gray-300" />
                </div>
                <div className="pt-1 pb-8">
                  <p className="mb-2 text-lg font-bold">Step 1</p>
                  <p className="text-gray-700">
                    All recipes are written using certain conventions, which
                    define the characteristics of common ingredients. The rules
                    vary from place to place.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                      <svg
                        className="w-4 text-gray-600"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <line
                          fill="none"
                          strokeMiterlimit="10"
                          x1="12"
                          y1="2"
                          x2="12"
                          y2="22"
                        />
                        <polyline
                          fill="none"
                          strokeMiterlimit="10"
                          points="19,15 12,22 5,15"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="w-px h-full bg-gray-300" />
                </div>
                <div className="pt-1 pb-8">
                  <p className="mb-2 text-lg font-bold">Step 2</p>
                  <p className="text-gray-700">
                    The first mate and his Skipper too will do their very best
                    to make the others comfortable in their tropic island nest.
                    Michael Knight a young loner.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                      <svg
                        className="w-4 text-gray-600"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <line
                          fill="none"
                          strokeMiterlimit="10"
                          x1="12"
                          y1="2"
                          x2="12"
                          y2="22"
                        />
                        <polyline
                          fill="none"
                          strokeMiterlimit="10"
                          points="19,15 12,22 5,15"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="w-px h-full bg-gray-300" />
                </div>
                <div className="pt-1 pb-8">
                  <p className="mb-2 text-lg font-bold">Step 3</p>
                  <p className="text-gray-700">
                    Tell them I hate them. Is the Space Pope reptilian!? Tell
                    her she looks thin. Hello, little man. I will destroy you!
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                      <svg
                        className="w-4 text-gray-600"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <line
                          fill="none"
                          strokeMiterlimit="10"
                          x1="12"
                          y1="2"
                          x2="12"
                          y2="22"
                        />
                        <polyline
                          fill="none"
                          strokeMiterlimit="10"
                          points="19,15 12,22 5,15"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="w-px h-full bg-gray-300" />
                </div>
                <div className="pt-1 pb-8">
                  <p className="mb-2 text-lg font-bold">Step 4</p>
                  <p className="text-gray-700">
                    If one examines precultural libertarianism, one is faced
                    with a choice: either accept rationalism or conclude that
                    context is a product.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                      <svg
                        className="w-6 text-gray-600"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <polyline
                          fill="none"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit="10"
                          points="6,12 10,16 18,8"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="pt-1">
                  <p className="mb-2 text-lg font-bold">Success</p>
                  <p className="text-gray-700" />
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                className="inset-0 object-cover object-bottom w-full rounded shadow-lg h-96 lg:absolute lg:h-full"
                src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                alt=""
              />
            </div>
          </div>
        </div>
        <DividerHorizontal />
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
            <div className="p-8 bg-white border rounded shadow-sm">
              <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
                <a
                  href="/"
                  className="transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                  aria-label="Category"
                >
                  weekend
                </a>{' '}
                <span className="text-gray-600">— 1 Feb 2020</span>
              </p>
              <a
                href="/"
                aria-label="Article"
                title="Jingle Bells"
                className="inline-block mb-3 text-2xl font-bold leading-5 text-black transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                Jingle Bells
              </a>
              <p className="mb-5 text-gray-700">
                Some pilots get picked and become television programs. Some
                don't, become nothing.
              </p>
              <div className="flex items-center">
                <a href="/" aria-label="Author" title="Author" className="mr-3">
                  <img
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                    alt="avatar"
                    className="object-cover w-10 h-10 rounded-full shadow-sm"
                  />
                </a>
                <div>
                  <a
                    href="/"
                    aria-label="Author"
                    title="Author"
                    className="font-semibold text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-400"
                  >
                    Vasile Melinte
                  </a>
                  <p className="text-sm font-medium leading-4 text-gray-600">
                    Author
                  </p>
                </div>
              </div>
            </div>
            <div className="p-8 bg-white border rounded shadow-sm">
              <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
                <a
                  href="/"
                  className="transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                  aria-label="Category"
                >
                  holidays
                </a>{' '}
                <span className="text-gray-600">— 15 Nov 2020</span>
              </p>
              <a
                href="/"
                aria-label="Article"
                title="Happy new Year"
                className="inline-block mb-3 text-2xl font-bold leading-5 text-black transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                Happy new Year
              </a>
              <p className="mb-5 text-gray-700">
                Pommy ipsum smeg head whizz morris dancers come hither, bugger
                codswallop gob. Taking the mick middle class bog.
              </p>
              <div className="flex items-center">
                <a href="/" aria-label="Author" title="Author" className="mr-3">
                  <img
                    src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                    alt="avatar"
                    className="object-cover w-10 h-10 rounded-full shadow-sm"
                  />
                </a>
                <div>
                  <a
                    href="/"
                    aria-label="Author"
                    title="Author"
                    className="font-semibold text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-400"
                  >
                    John Doe
                  </a>
                  <p className="text-sm font-medium leading-4 text-gray-600">
                    Author
                  </p>
                </div>
              </div>
            </div>
            <div className="p-8 bg-white border rounded shadow-sm">
              <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
                <a
                  href="/"
                  className="transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                  aria-label="Category"
                >
                  programming
                </a>{' '}
                <span className="text-gray-600">— 28 Dec 2020</span>
              </p>
              <a
                href="/"
                aria-label="Article"
                title="Why i love C++"
                className="inline-block mb-3 text-2xl font-bold leading-5 text-black transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                Why i love C++
              </a>
              <p className="mb-5 text-gray-700">
                Sportacus andrew weatherall goose Refined gentlemen super mario
                des lynam alpha trion zap rowsdower.
              </p>
              <div className="flex items-center">
                <a href="/" aria-label="Author" title="Author" className="mr-3">
                  <img
                    src="https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260"
                    alt="avatar"
                    className="object-cover w-10 h-10 rounded-full shadow-sm"
                  />
                </a>
                <div>
                  <a
                    href="/"
                    aria-label="Author"
                    title="Author"
                    className="font-semibold text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-400"
                  >
                    Andrew Larkin
                  </a>
                  <p className="text-sm font-medium leading-4 text-gray-600">
                    Author
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DividerHorizontal />
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
            <div className="overflow-hidden transition-shadow duration-300 bg-white rounded shadow-sm">
              <img
                src="https://images.pexels.com/photos/2408666/pexels-photo-2408666.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;w=500"
                className="object-cover w-full h-64"
                alt=""
              />
              <div className="p-5 border border-t-0">
                <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
                  <a
                    href="/"
                    className="transition-colors duration-200 text-blue-gray-900 hover:text-deep-purple-accent-700"
                    aria-label="Category"
                    title="traveling"
                  >
                    traveling
                  </a>
                  <span className="text-gray-600">— 28 Dec 2020</span>
                </p>
                <a
                  href="/"
                  aria-label="Category"
                  title="Visit the East"
                  className="inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
                >
                  Visit the East
                </a>
                <p className="mb-2 text-gray-700">
                  Sed ut perspiciatis unde omnis iste natus error sit sed quia
                  consequuntur magni voluptatem doloremque.
                </p>
                <a
                  href="/"
                  aria-label=""
                  className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                >
                  Learn more
                </a>
              </div>
            </div>
            <div className="overflow-hidden transition-shadow duration-300 bg-white rounded shadow-sm">
              <img
                src="https://images.pexels.com/photos/447592/pexels-photo-447592.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                className="object-cover w-full h-64"
                alt=""
              />
              <div className="p-5 border border-t-0">
                <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
                  <a
                    href="/"
                    className="transition-colors duration-200 text-blue-gray-900 hover:text-deep-purple-accent-700"
                    aria-label="Category"
                    title="traveling"
                  >
                    traveling
                  </a>
                  <span className="text-gray-600">— 28 Dec 2020</span>
                </p>
                <a
                  href="/"
                  aria-label="Category"
                  title="Simple is better"
                  className="inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
                >
                  Simple is better
                </a>
                <p className="mb-2 text-gray-700">
                  Sed ut perspiciatis unde omnis iste natus error sit sed quia
                  consequuntur magni voluptatem doloremque.
                </p>
                <a
                  href="/"
                  aria-label=""
                  className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                >
                  Learn more
                </a>
              </div>
            </div>
            <div className="overflow-hidden transition-shadow duration-300 bg-white rounded shadow-sm">
              <img
                src="https://images.pexels.com/photos/139829/pexels-photo-139829.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                className="object-cover w-full h-64"
                alt=""
              />
              <div className="p-5 border border-t-0">
                <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
                  <a
                    href="/"
                    className="transition-colors duration-200 text-blue-gray-900 hover:text-deep-purple-accent-700"
                    aria-label="Category"
                    title="traveling"
                  >
                    traveling
                  </a>
                  <span className="text-gray-600">— 28 Dec 2020</span>
                </p>
                <a
                  href="/"
                  aria-label="Category"
                  title="Film It!"
                  className="inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
                >
                  Film It!
                </a>
                <p className="mb-2 text-gray-700">
                  Sed ut perspiciatis unde omnis iste natus error sit sed quia
                  consequuntur magni voluptatem doloremque.
                </p>
                <a
                  href="/"
                  aria-label=""
                  className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
        <DividerHorizontal />
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="grid gap-24 row-gap-8 lg:grid-cols-5">
            <div className="grid gap-8 lg:col-span-2">
              <div>
                <p className="mb-2 text-lg font-bold">Old man</p>
                <p className="text-gray-700">
                  An old man lived in the village. He was one of the most
                  unfortunate people in the world. The whole village was tired
                  of him, he was always gloomy, he constantly complained.
                </p>
              </div>
              <div>
                <p className="mb-2 text-lg font-bold">The Wise Man</p>
                <p className="text-gray-700">
                  People have been coming to the wise man, complaining about the
                  same problems every time. One day he told them a joke and
                  everyone roared in laughter.
                </p>
              </div>
            </div>
            <div className="grid border divide-y rounded lg:col-span-3 sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
              <div className="flex flex-col justify-between p-10">
                <div>
                  <p className="text-lg font-semibold text-gray-800 sm:text-base">
                    Funds Raised
                  </p>
                  <p className="text-2xl font-bold text-deep-purple-accent-400 sm:text-xl">
                    $84 000 000
                  </p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-800 sm:text-base">
                    Products
                  </p>
                  <p className="text-2xl font-bold text-deep-purple-accent-400 sm:text-xl">
                    52
                  </p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-800 sm:text-base">
                    Downloads
                  </p>
                  <p className="text-2xl font-bold text-deep-purple-accent-400 sm:text-xl">
                    186M
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-between p-10">
                <div>
                  <p className="text-lg font-semibold text-gray-800 sm:text-base">
                    Users
                  </p>
                  <p className="text-2xl font-bold text-deep-purple-accent-400 sm:text-xl">
                    86K
                  </p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-800 sm:text-base">
                    Installations
                  </p>
                  <p className="text-2xl font-bold text-deep-purple-accent-400 sm:text-xl">
                    917 000
                  </p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-800 sm:text-base">
                    Subscribers
                  </p>
                  <p className="text-2xl font-bold text-deep-purple-accent-400 sm:text-xl">
                    213K
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DividerHorizontal />
        <div className="bg-gray-900">
          <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
            <div className="grid row-gap-10 mb-8 lg:grid-cols-6">
              <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
                <div>
                  <p className="font-medium tracking-wide text-gray-300">
                    Category
                  </p>
                  <ul className="mt-2 space-y-2">
                    <li>
                      <a
                        href="/"
                        className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                      >
                        News
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                      >
                        World
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                      >
                        Games
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                      >
                        References
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium tracking-wide text-gray-300">
                    Apples
                  </p>
                  <ul className="mt-2 space-y-2">
                    <li>
                      <a
                        href="/"
                        className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                      >
                        Web
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                      >
                        eCommerce
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                      >
                        Business
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                      >
                        Entertainment
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                      >
                        Portfolio
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium tracking-wide text-gray-300">
                    Cherry
                  </p>
                  <ul className="mt-2 space-y-2">
                    <li>
                      <a
                        href="/"
                        className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                      >
                        Media
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                      >
                        Brochure
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                      >
                        Nonprofit
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                      >
                        Educational
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                      >
                        Projects
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium tracking-wide text-gray-300">
                    Business
                  </p>
                  <ul className="mt-2 space-y-2">
                    <li>
                      <a
                        href="/"
                        className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                      >
                        Infopreneur
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                      >
                        Personal
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                      >
                        Wiki
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                      >
                        Forum
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="md:max-w-md lg:col-span-2">
                <span className="text-base font-medium tracking-wide text-gray-300">
                  Subscribe for updates
                </span>
                <form className="flex flex-col mt-4 md:flex-row">
                  <input
                    placeholder="Email"
                    required
                    type="text"
                    className="flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                  >
                    Subscribe
                  </button>
                </form>
                <p className="mt-4 text-sm text-gray-500">
                  Bacon ipsum dolor amet short ribs pig sausage prosciuto
                  chicken spare ribs salami.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between pt-5 pb-10 border-t border-gray-800 sm:flex-row">
              <p className="text-sm text-gray-500">
                © Copyright 2020 Lorem Inc. All rights reserved.
              </p>
              <div className="flex items-center mt-4 space-x-4 sm:mt-0">
                <a
                  href="/"
                  className="text-gray-500 transition-colors duration-300 hover:text-teal-accent-400"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                    <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
                  </svg>
                </a>
                <a
                  href="/"
                  className="text-gray-500 transition-colors duration-300 hover:text-teal-accent-400"
                >
                  <svg viewBox="0 0 30 30" fill="currentColor" className="h-6">
                    <circle cx="15" cy="15" r="4" />
                    <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z" />
                  </svg>
                </a>
                <a
                  href="/"
                  className="text-gray-500 transition-colors duration-300 hover:text-teal-accent-400"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                    <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <DividerHorizontal />
        <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2">
              <a
                href="/"
                aria-label="Go home"
                title="Company"
                className="inline-flex items-center"
              >
                <svg
                  className="w-8 text-deep-purple-accent-400"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  stroke="currentColor"
                  fill="none"
                >
                  <rect x="3" y="1" width="7" height="12" />
                  <rect x="3" y="17" width="7" height="6" />
                  <rect x="14" y="1" width="7" height="6" />
                  <rect x="14" y="11" width="7" height="12" />
                </svg>
                <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                  Company
                </span>
              </a>
              <div className="mt-6 lg:max-w-sm">
                <p className="text-sm text-gray-800">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam.
                </p>
                <p className="mt-4 text-sm text-gray-800">
                  Eaque ipsa quae ab illo inventore veritatis et quasi
                  architecto beatae vitae dicta sunt explicabo.
                </p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-base font-bold tracking-wide text-gray-900">
                Contacts
              </p>
              <div className="flex">
                <p className="mr-1 text-gray-800">Phone:</p>
                <a
                  href="tel:850-123-5021"
                  aria-label="Our phone"
                  title="Our phone"
                  className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                >
                  850-123-5021
                </a>
              </div>
              <div className="flex">
                <p className="mr-1 text-gray-800">Email:</p>
                <a
                  href="mailto:info@lorem.mail"
                  aria-label="Our email"
                  title="Our email"
                  className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                >
                  info@lorem.mail
                </a>
              </div>
              <div className="flex">
                <p className="mr-1 text-gray-800">Address:</p>
                <a
                  href="https://www.google.com/maps"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Our address"
                  title="Our address"
                  className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                >
                  312 Lovely Street, NY
                </a>
              </div>
            </div>
            <div>
              <span className="text-base font-bold tracking-wide text-gray-900">
                Social
              </span>
              <div className="flex items-center mt-1 space-x-3">
                <a
                  href="/"
                  className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                    <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
                  </svg>
                </a>
                <a
                  href="/"
                  className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  <svg viewBox="0 0 30 30" fill="currentColor" className="h-6">
                    <circle cx="15" cy="15" r="4" />
                    <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z" />
                  </svg>
                </a>
                <a
                  href="/"
                  className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                    <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
                  </svg>
                </a>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Bacon ipsum dolor amet short ribs pig sausage prosciutto chicken
                spare ribs salami.
              </p>
            </div>
          </div>
          <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
            <p className="text-sm text-gray-600">
              © Copyright 2020 Lorem Inc. All rights reserved.
            </p>
            <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
              <li>
                <a
                  href="/"
                  className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  F.A.Q
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>
        <DividerHorizontal />
        <a
          className="relative block p-8 overflow-hidden border border-gray-100 rounded-lg"
          href=""
        >
          <span className="absolute inset-x-0 bottom-0 h-2  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

          <div className="justify-between sm:flex">
            <div>
              <h5 className="text-xl font-bold text-gray-900">
                Building a SaaS product as a software developer
              </h5>
              <p className="mt-1 text-xs font-medium text-gray-600">
                By John Doe
              </p>
            </div>

            <div className="flex-shrink-0 hidden ml-3 sm:block">
              <img
                className="object-cover w-16 h-16 rounded-lg shadow-sm"
                src="https://www.hyperui.dev/photos/man-5.jpeg"
                alt=""
              />
            </div>
          </div>

          <div className="mt-4 sm:pr-8">
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. At velit
              illum provident a, ipsa maiores deleniti consectetur nobis et
              eaque.
            </p>
          </div>

          <dl className="flex mt-6">
            <div className="flex flex-col-reverse">
              <dt className="text-sm font-medium text-gray-600">Published</dt>
              <dd className="text-xs text-gray-500">31st June, 2021</dd>
            </div>

            <div className="flex flex-col-reverse ml-3 sm:ml-6">
              <dt className="text-sm font-medium text-gray-600">
                Reading time
              </dt>
              <dd className="text-xs text-gray-500">3 minute</dd>
            </div>
          </dl>
        </a>
        <DividerHorizontal />
        <article className="p-4 bg-gray-800 border border-gray-700 rounded-xl">
          <div className="flex items-center">
            <img
              src="https://unavatar.now.sh/twitter/itsmarkmead"
              alt="Mark Mead"
              className="w-16 h-16 rounded-full"
            />

            <div className="ml-3">
              <h5 className="text-lg font-medium text-white">Mark Mead</h5>
              <div className="flow-root">
                <ul className="flex flex-wrap -m-1">
                  <li className="p-1 leading-none">
                    <a
                      href="https://twitter.com/itsmarkmead"
                      target="_blank"
                      className="text-xs font-medium text-gray-300"
                    >
                      Twitter
                    </a>
                  </li>

                  <li className="p-1 leading-none">
                    <a
                      href="https://github.com/markmead"
                      target="_blank"
                      className="text-xs font-medium text-gray-300"
                    >
                      GitHub
                    </a>
                  </li>

                  <li className="p-1 leading-none">
                    <a
                      href="https://markmead.dev/"
                      target="_blank"
                      className="text-xs font-medium text-gray-300"
                    >
                      Website
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <ul className="mt-4 space-y-2">
            <li>
              <a
                href="https://github.com/andrewmcodes/hyperui"
                target="_blank"
                className="block h-full p-4 border border-gray-700 rounded-lg hover:border-pink-600"
              >
                <h5 className="font-medium text-white">HyperUI</h5>

                <p className="mt-1 text-xs font-medium text-gray-300">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maxime consequuntur deleniti, unde ab ut in!
                </p>
              </a>
            </li>

            <li>
              <a
                href="https://github.com/markmead/hyperjs"
                target="_blank"
                className="block h-full p-4 border border-gray-700 rounded-lg hover:border-pink-600"
              >
                <h5 className="font-medium text-white">HyperJS</h5>

                <p className="mt-1 text-xs font-medium text-gray-300">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Sapiente cumque saepe sit.
                </p>
              </a>
            </li>
          </ul>
        </article>
        <DividerHorizontal />
        <article className="p-1 shadow-xl rounded-2xl bg-gradient-to-r from-red-400 to-red-600">
          <a
            href=""
            className="flex flex-col justify-end h-full p-6 bg-gray-900 sm:p-8 rounded-xl hover:bg-opacity-90"
          >
            <div className="mt-16">
              <p className="text-xs font-medium text-gray-500">26/05/2021</p>
              <h5 className="mt-2 text-xl font-bold text-white">
                Custom Helper to Improve the Rails phone_to Helper
              </h5>
              <div className="flex items-center justify-between mt-6">
                <p className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                  Rails
                </p>
                <ul className="flex space-x-1">
                  <li className="inline-block rounded-full text-white text-xs font-medium px-3 py-1.5 bg-gray-800">
                    Snippet
                  </li>
                  <li className="inline-block rounded-full text-white text-xs font-medium px-3 py-1.5 bg-gray-800">
                    Info
                  </li>
                  <li className="inline-block rounded-full text-white text-xs font-medium px-3 py-1.5 bg-gray-800">
                    Tip
                  </li>
                </ul>
              </div>
            </div>
          </a>
        </article>
        <DividerHorizontal />

        <header className="shadow-sm">
          <div className="flex items-center justify-between h-16 max-w-screen-xl px-4 mx-auto">
            <div className="flex flex-1 w-0 lg:hidden">
              <button
                className="p-2 text-gray-600 bg-gray-100 rounded-full"
                type="button"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewbox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <span className="w-20 h-10 bg-gray-200 rounded-lg"></span>

              <form className="hidden mb-0 lg:flex">
                <div className="relative">
                  <input
                    className="h-10 pr-10 text-sm placeholder-gray-300 border-gray-200 rounded-lg focus:z-10"
                    placeholder="Search..."
                    type="text"
                  />

                  <button
                    className="absolute inset-y-0 right-0 p-2 mr-px text-gray-600 rounded-r-lg"
                    type="submit"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewbox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </form>
            </div>

            <div className="flex justify-end flex-1 w-0 lg:hidden">
              <button
                className="p-2 text-gray-500 bg-gray-100 rounded-full"
                type="button"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewbox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>

            <nav className="items-center justify-center hidden space-x-8 text-sm font-medium lg:flex lg:flex-1 lg:w-0">
              <a className="text-gray-900" href="">
                About
              </a>
              <a className="text-gray-900" href="">
                Blog
              </a>
              <a className="text-gray-900" href="">
                Projects
              </a>
              <a className="text-gray-900" href="">
                Contact
              </a>
            </nav>

            <div className="items-center hidden space-x-4 lg:flex">
              <a
                className="px-5 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg"
                href=""
              >
                Log in
              </a>
              <a
                className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg"
                href=""
              >
                Sign up
              </a>
            </div>
          </div>

          <div className="border-t border-gray-100 lg:hidden">
            <nav className="flex items-center justify-center p-4 overflow-x-auto text-sm font-medium">
              <a className="flex-shrink-0 pl-4 text-gray-900" href="">
                About
              </a>
              <a className="flex-shrink-0 pl-4 text-gray-900" href="">
                Blog
              </a>
              <a className="flex-shrink-0 pl-4 text-gray-900" href="">
                Projects
              </a>
              <a className="flex-shrink-0 pl-4 text-gray-900" href="">
                Contact
              </a>
            </nav>
          </div>
        </header>
        <DividerHorizontal />

        <DividerHorizontal />
        <nav className="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-900 text-gray-200 shadow-lg navbar navbar-expand-lg navbar-light">
          <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
            <button
              className="navbar-toggler text-gray-200 border-0 hover:shadow-none hover:no-underline py-2 px-2.5 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent1"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="bars"
                className="w-6"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
                ></path>
              </svg>
            </button>
            <div
              className="collapse navbar-collapse flex-grow items-center"
              id="navbarSupportedContent1"
            >
              <a className="text-xl text-white pr-2 font-semibold" href="#">
                Navbar
              </a>

              <ul className="navbar-nav flex flex-col pl-0 list-style-none mr-auto">
                <li className="nav-item p-2">
                  <a className="nav-link text-white" href="#">
                    Dashboard
                  </a>
                </li>
                <li className="nav-item p-2">
                  <a
                    className="nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0"
                    href="#"
                  >
                    Team
                  </a>
                </li>
                <li className="nav-item p-2">
                  <a
                    className="nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0"
                    href="#"
                  >
                    Projects
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex items-center relative">
              <a
                className="text-white opacity-60 hover:opacity-80 focus:opacity-80 mr-4"
                href="#"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="shopping-cart"
                  className="w-4"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="currentColor"
                    d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"
                  ></path>
                </svg>
              </a>
              <div className="dropdown relative">
                <a
                  className="text-white opacity-60 hover:opacity-80 focus:opacity-80 mr-4 dropdown-toggle hidden-arrow flex items-center"
                  href="#"
                  id="dropdownMenuButton1"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="bell"
                    className="w-4"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="currentColor"
                      d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z"
                    ></path>
                  </svg>
                  <span className="text-white bg-red-700 absolute rounded-full text-xs -mt-2.5 ml-2 py-0 px-1.5">
                    1
                  </span>
                </a>
                <ul
                  className="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none left-auto right-0"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a
                      className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                      href="#"
                    >
                      Action
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                      href="#"
                    >
                      Another action
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                      href="#"
                    >
                      Something else here
                    </a>
                  </li>
                </ul>
              </div>
              <div className="dropdown relative">
                <a
                  className="dropdown-toggle flex items-center hidden-arrow"
                  href="#"
                  id="dropdownMenuButton2"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://mdbootstrap.com/img/new/avatars/2.jpg"
                    className="rounded-full"
                    style={{ height: '25px', width: '25px' }}
                    alt=""
                    loading="lazy"
                  />
                </a>
                <ul
                  className="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none left-auto right-0"
                  aria-labelledby="dropdownMenuButton2"
                >
                  <li>
                    <a
                      className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                      href="#"
                    >
                      Action
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                      href="#"
                    >
                      Another action
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                      href="#"
                    >
                      Something else here
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <DividerHorizontal />

        <DividerHorizontal />
        <header className="shadow-xl">
          <div className="flex items-center justify-between mx-auto">
            <nav className="items-center justify-center hidden space-x-8 text-sm font-medium lg:flex lg:flex-1 lg:w-0">
              <a className="text-gray-900" href="">
                About
              </a>
              <a className="text-gray-900" href="">
                Blog
              </a>
              <a className="text-gray-900" href="">
                Projects
              </a>
              <a className="text-gray-900" href="">
                Contact
              </a>
            </nav>

            <div className="items-center hidden space-x-4 lg:flex">
              <a
                className="px-5 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg"
                href=""
              >
                Log in
              </a>
              <a
                className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg"
                href=""
              >
                Sign up
              </a>
            </div>
          </div>

          <div className="border-t border-gray-100 lg:hidden">
            <nav className="flex items-center justify-center p-4 overflow-x-auto text-sm font-medium">
              <a className="flex-shrink-0 pl-4 text-gray-900" href="">
                About
              </a>
              <a className="flex-shrink-0 pl-4 text-gray-900" href="">
                Blog
              </a>
              <a className="flex-shrink-0 pl-4 text-gray-900" href="">
                Projects
              </a>
              <a className="flex-shrink-0 pl-4 text-gray-900" href="">
                Contact
              </a>
            </nav>
          </div>
        </header>

        <DividerHorizontal />
        <DividerHorizontal />
        <DividerHorizontal />
      </DefaultLayout>
    </>
  );
};

export default Templates;
