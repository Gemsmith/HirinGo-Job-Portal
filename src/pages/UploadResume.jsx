import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateResumeLink } from '../redux/actions/userActions';

import { storage } from '../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { v4 } from 'uuid';
import campaign from '../assets/images/campaign.svg';

const UploadResume = () => {
  const dispatch = useDispatch();

  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  const [pickedFile, setPickedFile] = useState(null);
  const [url, setUrl] = useState('');
  const [progresspercent, setProgresspercent] = useState(0);

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
    var storageRef = ref(storage, `/cv/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, pickedFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);
          dispatch(updateResumeLink(downloadURL));
        });
      }
    );
  };

  return (
    <div className="p-4 md:p-8">
      <p
        tabIndex="0"
        className="focus:outline-none text-lg sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800 mb-5"
      >
        Upload Resume
      </p>

      <div className="flex flex-col md:flex-row  items-center gap-10 md:gap-5 bg-white px-10 py-16 rounded-lg shadow-md">
        {/* Image */}
        <img
          src={campaign}
          className=" object-contain md:w-[50%] lg:w-[35%] mx-auto"
          alt="upload-resume"
        />

        <div className="flex flex-col w-full sm:w-[50%]">
          {/* Download already uploaded resume */}
          <a
            href={`${url !== '' ? url : loggedInUser?.resumeLink}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 text-base font-bold text-center block"
          >
            Download Your Resume
          </a>

          <span className="text-center my-6"> or </span>

          {/* File Upload */}
          <form
            action=""
            className="flex flex-col justify-center items-center gap-6 text-sm"
            onSubmit={fileUploadHandler}
          >
            <input
              type="file"
              className="bg-blue-100 px-4 py-3 rounded-md w-full sm:w-[65%]"
              onChange={fileChangeHandler}
            />

            {/* Uploaded File Progress Bar / Download Link after upload */}
            {!url ? (
              <div className="w-full text-center ">
                <div
                  className="text-blue-600 text-base font-semibold rounded-full"
                  // style={{
                  //   width: `${progresspercent}%`,
                  // }}
                >
                  {progresspercent}%
                </div>
              </div>
            ) : (
              <p>
                <a href={url} className="text-blue-600 font-semibold">
                  View Uploaded File
                </a>
              </p>
            )}

            <button
              type="submit"
              className="bg-blue-600 text-gray-100 rounded-full px-6 py-2 w-fit font-bold"
            >
              Upload
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadResume;
