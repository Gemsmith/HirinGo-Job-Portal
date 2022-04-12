import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signupUser } from '../redux/actions/userActions';
import { DefaultLayout, SpinnerLoader } from '../components';

const Signup = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loaderReducer);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (password !== cPassword) {
      toast('Passwords do not match');
      return;
    }

    dispatch(signupUser({ username, password }));
  };

  return (
    <DefaultLayout pageHasSider={false}>
      <section className="w-full p-8 xl:px-8 bg-gradient-to-tl from-green-400 to-indigo-900">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center md:flex-row">
            {/* Text Div */}
            <div className="w-full md:w-3/5 md:pr-16">
              <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl pr-32 md:pr-0">
                Where Passion Meets Profession.
              </h2>
              <p className="text-xl text-white md:pr-16">
                Learn how to engage with employers and get your dream job.
              </p>
            </div>

            {/* Login Input Container */}
            <div className="w-full mt-4 md:mt-0 md:w-2/5">
              <div className="relative z-10 h-auto p-8 py-8 overflow-hidden bg-white border-b-2 border-gray-300 rounded-lg shadow-2xl px-7">
                <h3 className="mb-6 text-2xl font-medium text-center">
                  Create your Account
                </h3>
                {/* Input Div */}
                <form onSubmit={handleFormSubmit}>
                  <label
                    className="font-semibold text-lg"
                    htmlFor="usernameField"
                  >
                    Username
                  </label>{' '}
                  <span className="text-red-500 required-dot text-xl">*</span>
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    minLength={3}
                    type="text"
                    name="username"
                    className="block w-full px-4 py-2 mb-4 mt-1 border border-2  border-gray-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none text-lg bg-gray-200"
                    placeholder="John123"
                    required
                  />
                  <label
                    className="font-semibold text-lg mt-3"
                    htmlFor="passwordField"
                  >
                    Password
                  </label>{' '}
                  <span className="text-red-500 required-dot text-xl">*</span>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    minLength={3}
                    type="password"
                    name="password"
                    className="block w-full px-4 py-2 mt-1 mb-4 border border-2  border-gray-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none text-lg bg-gray-200"
                    placeholder="Password"
                    required
                  />
                  <label
                    className="font-semibold text-lg mt-3"
                    htmlFor="passwordField"
                  >
                    Confirm Password
                  </label>{' '}
                  <span className="text-red-500 required-dot text-xl">*</span>
                  <input
                    onChange={(e) => setCPassword(e.target.value)}
                    value={cPassword}
                    minLength={3}
                    type="password"
                    name="cpassword"
                    className="block w-full px-4 py-2 mt-1 border border-2  border-gray-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none text-lg bg-gray-200"
                    placeholder="Confirm Password"
                    required
                  />
                  {/* Button */}
                  <button className="w-full px-3 py-3 mt-10 text-lg font-medium text-white rounded-lg border-b-4 border-b-blue-900 bg-blue-600 hover:bg-blue-700 active:translate-y-[0.125rem] active:border-b-blue-700 relative">
                    <p className="m-0">Create my account</p>
                    <p className="m-0 absolute right-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      {loading && <SpinnerLoader />}
                    </p>
                  </button>
                </form>

                <p className="w-full mt-4 text-sm text-center text-gray-500">
                  Already have an account?{' '}
                  <Link to="/login" className="text-blue-500 underline">
                    Login here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
};
export default Signup;
