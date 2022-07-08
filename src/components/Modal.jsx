import React, { useEffect, useRef } from 'react';

const Modal = ({
  setIsModalVisible,
  modalTitle = 'Modal Title',
  modalContent = 'Modal Content',
  okText = 'Ok',
  cancelText = 'Close',
  hideModalTitle = false,
  hideOk = false,
  hideCancel = false,
}) => {
  const modalRef = useRef();
  const onCancelClick = () => {
    setIsModalVisible(false);
  };
  const onOkClick = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const handleClickOutsideModal = (e) => {
      if (e.target.contains(modalRef.current)) {
        setIsModalVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutsideModal);

    // This is a cleanup function, to prevent memory leaks
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideModal);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={modalRef}
      className="fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto"
      style={{
        display: 'block',
        zIndex: '99999999999999',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
      }}
      placeholder="https://tailwind-elements.com/docs/standard/components/modal/"
    >
      <div className="relative w-auto pointer-events-none mx-2 my-24 lg:mx-12 lg:my-24">
        <div className=" border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white  rounded-md outline-none p-6 md:p-8 ">
          {/* Heading */}
          <div
            className={`flex flex-shrink-0 content-center justify-between p-4 border-b border-gray-200 rounded-t-md ${
              hideModalTitle ? 'hidden' : ''
            }`}
          >
            <h5 className="text-xl font-medium m-0 text-gray-800">{modalTitle}</h5>
            <button
              onClick={() => onCancelClick()}
              type="button"
              className="w-4 h-4 text-black border-none rounded-none opacity-50 focus:outline-none focus:opacity-100 hover:opacity-75 hover:no-underline transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Main Content */}
          <div className="relative">{modalContent}</div>

          {/* Cancel Button */}
          <div className=" flex flex-shrink-0 flex-wrap gap-3 items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
            <button
              onClick={() => onCancelClick()}
              hidden={hideCancel}
              type="button"
              className="inline-block px-6 py-2.5 bg-neutral-200 text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-neutral-700 hover:text-white hover:shadow-lg focus:bg-neutral-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-neutral-800 active:shadow-lg transition duration-300 ease-in-out"
            >
              {cancelText}
            </button>
            <button
              onClick={() => onOkClick()}
              hidden={hideOk}
              type="button"
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-300 ease-in-out ml-1"
            >
              {okText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
