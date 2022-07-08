import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Home,
  About,
  AppliedJobs,
  JobEdit,
  JobView,
  JobPost,
  Login,
  PostedJobs,
  Profile,
  Signup,
  UserView,
  SearchPage,
  ContactUs,
  Terms,
  UploadResume,
} from './pages';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobs } from './redux/actions/jobActions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Footer, Navbar } from './components';

function App() {
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.jobsReducer);
  console.log('All Jobs from App.js - 1st Fetch Every Reload', jobs);

  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  // dispatch(getUser(loggedInUser?._id));
  // const loggedInUserFromServer = JSON.parse(localStorage.getItem('fetchedUser'));

  // console.log('loggedInUser from server', loggedInUserFromServer);

  useEffect(() => {
    // If current time becomes greater than token Expiry, means user needs to be logged out, because now the token won't work
    // for any requests protected/tokened to the server.
    if (loggedInUser && new Date().getTime() > loggedInUser?.tokenExpiry) {
      toast('Session Expired - Logging Out');
      localStorage.removeItem('user');
      window.location.href = '/';
    }

    // Earlier jobs were being fetched in the Home component, but because Redux goes back to initialValues after a reload,
    // we now fetch the jobs here. And now the Redux store persists the state even on a reload.
    // Why? Because earlier, if we loaded some other page and reloaded, jobs array was set back to initialValues (empty array)
    //  because jobs were only being fetched in useState of the Home component & only when it was rendered. But now since app component will always be rendered first, whatever we put in useState of App component will sort of be persisted, not technically because it is being re-fetched on every reload. But this way, our data is always there, instead of being loaded on only certain component's render.
    dispatch(getAllJobs());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Router>
        <Navbar />

        <div className="mt-16 ">
          {jobs && (
            <div
              className="grow"
              style={{
                backgroundColor: 'rgb(243, 248, 252)',
                margin: 0,
                minHeight: '100vh',
              }}
            >
              <Routes>
                {/* Auth */}
                <Route exact path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/termsandconditions" element={<Terms />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Job's Routes */}
                <Route path="/uploadresume" element={<UploadResume />} />
                <Route path="/appliedjobs" element={<AppliedJobs />} />
                <Route path="/jobs/view/:id" element={<JobView />} />
                <Route path="/jobs/edit/:id" element={<JobEdit />} />
                <Route path="/jobs/post" element={<JobPost />} />
                <Route path="/postedjobs" element={<PostedJobs />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/search/:searchterm" element={<SearchPage />} />

                {/* User's Routes */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/user/view/:id" element={<UserView />} />
                {/* <Route path="/user/view/:id" element={<UserInfoView />} /> */}
              </Routes>
            </div>
          )}
        </div>

        <Footer />
        <ToastContainer position="bottom-left" />
      </Router>
    </>
  );
}

export default App;
