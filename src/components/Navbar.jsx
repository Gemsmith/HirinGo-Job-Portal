import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logoText from '../assets/images/logo-text.png';
import logoImage from '../assets/images/logo-image.png';
import dummyImage from '../assets/images/dummy-user-image.jpg';

const Navbar = () => {
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  // User Avatar Functionality
  const fullName = loggedInUser?.firstName + ' ' + loggedInUser?.lastName;

  // Logout Functionality
  // We only need to remove from local storage, because we're not storing user in Redux store, rather just in localStorage.
  // And redux-persist keeps hydrating the user on refresh from localStorage. So only removing from localStorage and then reloading is enough.
  const logout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  // Menu's Toggle Functionality:
  const avatarMenuElRef = useRef();
  const avatarBtnElRef = useRef();
  const hamburgerMenuElRef = useRef();
  const hamburgerBtnElRef = useRef();

  useEffect(() => {
    let handler = (event) => {
      // Avatar Menu - Outside Click Toggle Logic
      if (
        !avatarMenuElRef.current?.contains(event.target) &&
        !avatarBtnElRef.current?.contains(event.target)
      ) {
        setAvatarMenuOpen(false);
      }

      // Hamburger Menu - Outside Click toggle Logic
      if (
        !hamburgerMenuElRef.current?.contains(event.target) &&
        !hamburgerBtnElRef.current?.contains(event.target)
      ) {
        setHamburgerMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);

    // This is a cleanup function, to prevent memory leaks
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  return (
    <div className=" bg-white fixed top-0 left-0 right-0 z-50 border-b border-gray-300 ">
      <div className="relative mx-0 md:mx-7 flex items-center justify-between p-4 h-16">
        {/* Site Logo */}
        <Link
          to="/"
          className="text-xl font-bold no-underline text-blue-600 hover:text-blue-700 transition flex gap-3 h-6"
        >
          <img
            src={logoImage}
            alt=""
            className="object-contain"
            style={{ color: 'red', fill: 'red' }}
          />
          <img src={logoText} alt="" className="object-contain" />
        </Link>

        {/* Desktop View - Nav Links */}
        <nav className="hidden sm:flex items-center">
          <span>
            <Link
              className="text-gray-800 font-semibold hover:text-blue-600 mr-6 transition"
              to="/"
            >
              Find Jobs
            </Link>
          </span>

          {loggedInUser && (
            <span>
              <Link
                className="text-gray-800 font-semibold hover:text-blue-600 mr-6 transition"
                to="/jobs/post"
              >
                Post A Job
              </Link>
            </span>
          )}

          {/* // Adding pages conditionally based on user login status */}
          {!loggedInUser ? (
            <>
              <button className="text-gray-800 font-semibold hover:text-blue-600 mr-6 transition">
                <Link to={'/login'}>Login</Link>
              </button>

              <button className="text-gray-800 font-semibold hover:text-blue-600 mr-6 transition">
                <Link to={'/signup'}>Sign Up</Link>
              </button>
            </>
          ) : (
            // {/* Desktop View - User Avatar */}
            <span className="relative">
              <button
                ref={avatarBtnElRef}
                className="bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-400 focus:ring-white transition"
                onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
              >
                <img
                  className="h-8 w-8 object-cover rounded-full"
                  src={loggedInUser.profilePicLink || dummyImage}
                  alt=""
                />
              </button>

              {avatarMenuOpen && (
                <>
                  <span
                    className={`transition  origin-center absolute right-1 mt-2 w-auto rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
                    ref={avatarMenuElRef}
                    onClick={() => setAvatarMenuOpen(false)}
                  >
                    <Link
                      to={'/profile'}
                      className={
                        'block px-6 py-2 text-sm text-gray-700 hover:bg-blue-100 font-semibold transition truncate'
                      }
                    >
                      Hi, {fullName.trim().length > 0 ? fullName : loggedInUser?.username}
                    </Link>

                    {/* My Posted Jobs */}
                    <Link
                      to={'/postedjobs'}
                      className={
                        'block px-6 py-2 text-sm text-gray-700 hover:bg-blue-100 font-semibold transition truncate'
                      }
                    >
                      Posted Jobs
                    </Link>

                    {/* Applied Jobs */}
                    <Link
                      to={'/appliedjobs'}
                      className={
                        'block px-6 py-2 text-sm text-gray-700 hover:bg-blue-100 font-semibold transition truncate'
                      }
                    >
                      Applied Jobs
                    </Link>

                    {/* Upload Resume */}
                    <Link
                      to={'/uploadresume'}
                      className={
                        'block px-6 py-2 text-sm text-gray-700 hover:bg-blue-100 font-semibold transition truncate'
                      }
                    >
                      View / Upload Resume
                    </Link>

                    {/* Logout Button */}
                    <button
                      onClick={() => logout()}
                      className="
                    block px-6 py-2 text-sm text-red-600 hover:bg-blue-100 font-semibold w-full transition text-left
                    "
                    >
                      Logout
                    </button>
                  </span>
                </>
              )}
            </span>
          )}
        </nav>

        {/* Hamburger Button */}
        <button
          ref={hamburgerBtnElRef}
          type="button"
          aria-label="Toggle mobile menu"
          onClick={() => setHamburgerMenuOpen(!hamburgerMenuOpen)}
          className={`rounded sm:hidden focus:outline-none hover:text-blue-600 transition ${
            !hamburgerMenuOpen ? 'text-black-600' : 'text-blue-600'
          } `}
        >
          <svg
            className={`transition duration-300 h-6 w-6   ${
              hamburgerMenuOpen ? 'fill fill-red-400' : ''
            }`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile View - Nav Links */}
      {hamburgerMenuOpen && (
        <nav
          className="mx-7 px-4 py-5 flex justify-between  border-t border-blue-600 md:hidden  transition "
          ref={hamburgerMenuElRef}
        >
          {/* Mobile View - Nav Links */}
          <div className="flex justify-between gap-3  grow ">
            <div className="flex flex-col gap-3">
              <span>
                <Link
                  className="text-gray-800 font-semibold hover:text-blue-600 mr-6  transition "
                  to="/"
                >
                  Find Jobs
                </Link>
              </span>

              {loggedInUser && (
                <span>
                  <Link
                    className="text-gray-800 font-semibold hover:text-blue-600 mr-6  transition "
                    to="/jobs/post"
                  >
                    Post A Job
                  </Link>
                </span>
              )}
            </div>

            {!loggedInUser ? (
              <div className="flex flex-col items-start gap-3">
                <button className="text-gray-800 font-semibold hover:text-blue-600 mr-6  transition ">
                  <Link to={'/login'}>Login</Link>
                </button>

                <button className="text-gray-800 font-semibold hover:text-blue-600 mr-6  transition ">
                  <Link to={'/signup'}>Sign Up</Link>
                </button>
              </div>
            ) : (
              // {/* Mobile View - User Avatar */}
              <span className="relative">
                <button
                  ref={avatarBtnElRef}
                  className="bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-400 focus:ring-white transition "
                  onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
                >
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={loggedInUser.profilePicLink || dummyImage}
                    alt=""
                  />
                </button>

                {avatarMenuOpen && (
                  <span
                    className={`  origin-center absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition `}
                    ref={avatarMenuElRef}
                  >
                    <Link
                      to={'/profile'}
                      className={
                        'block px-6 py-2 text-sm text-gray-700 hover:bg-blue-100 font-semibold  transition truncate'
                      }
                    >
                      Hi, {fullName.trim().length > 0 ? fullName : loggedInUser?.username}
                    </Link>

                    {/* My Posted Jobs */}
                    <Link
                      to={'/postedjobs'}
                      className={
                        'block px-6 py-2 text-sm text-gray-700 hover:bg-blue-100 font-semibold  transition truncate'
                      }
                    >
                      Posted Jobs
                    </Link>

                    {/* Applied Jobs */}
                    <Link
                      to={'/appliedjobs'}
                      className={
                        'block px-6 py-2 text-sm text-gray-700 hover:bg-blue-100 font-semibold  transition truncate'
                      }
                    >
                      Applied Jobs
                    </Link>

                    {/* Upload Resume */}
                    <Link
                      to={'/uploadresume'}
                      className={
                        'block px-6 py-2 text-sm text-gray-700 hover:bg-blue-100 font-semibold  transition truncate'
                      }
                    >
                      View / Upload Resume
                    </Link>

                    {/* Logout Button */}
                    <button
                      onClick={() => logout()}
                      className="
                    block px-6 py-2 text-sm text-red-600 hover:bg-blue-100 font-semibold  transition truncate
                    "
                    >
                      Logout
                    </button>
                  </span>
                )}
              </span>
            )}
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
