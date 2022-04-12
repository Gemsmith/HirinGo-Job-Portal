import './App.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
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
} from './pages';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobs } from './redux/actions/jobActions';
import TestComp from './components/TestComp';
import Templates from './components/Templates';
import TestComp2 from './components/TestComp2';

function App() {
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.jobsReducer);
  console.log('All Jobs from App.js - 1st Fetch Every Reload', jobs);
  useEffect(() => {
    // Earlier jobs were being fetched in the Home component, but because Redux goes back to initialValues after a reload,
    // we now fetch the jobs here. And now the Redux store persists the state even on a reload.
    // Why? Because earlier, if we loaded some other page and reloaded, jobs array was set back to initialValues (empty array)
    //  because jobs were only being fetched in useState of the Home component & only when it was rendered. But now since app component will always be rendered first, whatever we put in useState of App component will sort of be persisted, not technically because it is being re-fetched on every reload. But this way, our data is always there, instead of being loaded on only certain component's render.
    dispatch(getAllJobs());
  }, []);

  return (
    <>
      {jobs && (
        <Router>
          <Routes>
            {/* Auth */}
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Job's Routes */}
            <Route path="/appliedjobs" element={<AppliedJobs />} />
            <Route path="/jobs/view/:id" element={<JobView />} />
            <Route path="/jobs/edit/:id" element={<JobEdit />} />
            <Route path="/jobs/post" element={<JobPost />} />
            <Route path="/postedjobs" element={<PostedJobs />} />
            <Route path="/search/:searchterm" element={<SearchPage />} />

            {/* User's Routes */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/user/view/:id" element={<UserView />} />
            {/* <Route path="/user/view/:id" element={<UserInfoView />} /> */}

            {/* Templates Component */}
            <Route path="/templates" element={<Templates />} />

            {/* Test Component */}
            <Route path="/test1" element={<TestComp />} />
            <Route path="/test2" element={<TestComp2 />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
