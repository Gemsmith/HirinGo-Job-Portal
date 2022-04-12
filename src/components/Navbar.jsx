import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import RenderCounter from './RenderCounter';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  // User Avatar Functionality
  const createUserAvatarData = () => {
    let user;
    let userNavigation;

    if (
      loggedInUser !== null &&
      loggedInUser !== undefined &&
      loggedInUser !== ''
    ) {
      const { _id, firstName, lastName, email } = loggedInUser;

      user = {
        id: _id,
        fullName: firstName + ' ' + lastName,
        email: email,
        imageUrl: 'https://www.tailwind-kit.com//images/person/4.jpg',
      };

      userNavigation = [
        { name: user.fullName, to: `/profile` },
        { name: 'Settings', to: '/user/settings' },
      ];
    }
    return { user, userNavigation };
  };
  const { user, userNavigation } = createUserAvatarData();

  // Complete Navigation Functionality
  const createNavLinks = () => {
    const pages = [
      { item: 'Find Jobs', to: '/' },
      { item: 'About', to: '/about' },
      { item: 'Test1', to: '/test1' },
      { item: 'Test2', to: '/test2' },
      { item: 'Templates', to: '/templates' },
    ];

    // Adding pages conditionally based on user login status
    if (
      loggedInUser == null ||
      loggedInUser == undefined ||
      loggedInUser == ''
    ) {
      pages.push(
        { item: 'Login', to: '/login' },
        { item: 'Signup', to: '/signup' }
      );
    } else {
      pages.push({ item: 'Logout', to: '' });
    }

    // Creating JSX with Link tags for the Navigation based on "pages" array
    const navigationLinks = pages.map((page, index) => {
      return (
        <>
          {page.item === 'Logout' ? (
            <Link
              onClick={() => logout()}
              key={index}
              className="text-gray-800 font-semibold hover:text-blue-600 mr-6 "
              to={`${page.to}`}
            >
              {page.item}
            </Link>
          ) : (
            <Link
              key={index}
              className="text-gray-800 font-semibold hover:text-blue-600 mr-6 "
              to={`${page.to}`}
            >
              {page.item}
            </Link>
          )}
        </>
      );
    });

    // Logout Functionality
    const logout = () => {
      localStorage.removeItem('user');
      window.location.href = '/';
    };

    return navigationLinks;
  };
  const navLinks = createNavLinks();

  // Menu Toggle Functionality:
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
        setMenuOpen(false);
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
      <div className="mx-7 flex items-center justify-between p-4 h-16">
        {/* Site Logo */}
        <Link
          to="/"
          className="text-xl font-bold no-underline text-blue-600 hover:text-blue-700 transition"
        >
          Indeed
        </Link>

        {/* Render Counter */}
        {/* <div className="">
          <RenderCounter />
        </div> */}

        {/* Navbar - Desktop */}
        <nav className="hidden md:flex items-center">
          {/* Desktop View - Nav Links */}
          {navLinks}

          {/* Desktop View - User Avatar */}
          <span>
            {loggedInUser !== null &&
              loggedInUser !== undefined &&
              loggedInUser !== '' && (
                <span className="relative">
                  <button
                    ref={avatarBtnElRef}
                    className="bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-400 focus:ring-white"
                    onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
                  >
                    <img
                      className="h-8 w-8 object-contain rounded-full"
                      src={user.imageUrl}
                      alt=""
                    />
                  </button>

                  {avatarMenuOpen && (
                    <span
                      className={`  origin-center absolute -right-8 mt-2 w-auto rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
                      ref={avatarMenuElRef}
                    >
                      {userNavigation.map((item, index) => (
                        <span key={index}>
                          {
                            <Link
                              to={item.to}
                              className={
                                'block px-6 py-2 text-sm text-gray-700 hover:bg-blue-100 truncate'
                              }
                            >
                              <>
                                {item.name === user.fullName ? (
                                  <strong>{item.name}</strong>
                                ) : (
                                  item.name
                                )}
                              </>
                            </Link>
                          }
                        </span>
                      ))}
                    </span>
                  )}
                </span>
              )}
          </span>
        </nav>

        {/* Hamburger Button */}
        <button
          ref={hamburgerBtnElRef}
          type="button"
          aria-label="Toggle mobile menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className={`rounded md:hidden focus:outline-none hover:text-blue-600 ${
            !menuOpen ? 'text-black-600' : 'text-blue-600'
          } `}
        >
          <svg
            className={`transition duration-300 h-6 w-6   ${
              menuOpen ? 'fill fill-red-400' : ''
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

      {/* Navbar - Mobile */}
      {menuOpen && (
        <nav
          className="mx-7 px-4 py-5 flex justify-between  border-t border-blue-600 md:hidden "
          ref={hamburgerMenuElRef}
        >
          {/* Mobile View - Nav Links */}
          <div className="flex flex-col gap-2">{navLinks}</div>

          {/* Mobile View - User Avatar */}
          {
            <span>
              {loggedInUser !== null &&
                loggedInUser !== undefined &&
                loggedInUser !== '' && (
                  <span className="relative">
                    <button
                      ref={avatarBtnElRef}
                      className="bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-400 focus:ring-white"
                      onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
                    >
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </button>

                    {avatarMenuOpen && (
                      <span
                        className={`  origin-center absolute -right-8 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
                        ref={avatarMenuElRef}
                      >
                        {userNavigation.map((item, index) => (
                          <span key={index}>
                            {
                              <Link
                                to={item.to}
                                className={
                                  'block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100'
                                }
                              >
                                <>
                                  {item.name === user.fullName ? (
                                    <strong>{item.name}</strong>
                                  ) : (
                                    item.name
                                  )}
                                </>
                              </Link>
                            }
                          </span>
                        ))}
                      </span>
                    )}
                  </span>
                )}
            </span>
          }
        </nav>
      )}
    </div>
  );
};

export default Navbar;
