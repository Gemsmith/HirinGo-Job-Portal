import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { storeSearchedData } from '../redux/actions/jobActions';

let SearchDataDropdownElement = ({ item, searchDropdownStructure }) => {
  return (
    <div className="px-4 py-2 flex flex-col text-black justify-center">
      {searchDropdownStructure.map((dropdownProperty) => {
        return (
          <>
            <span>
              <span className="font-bold">{dropdownProperty.name}:</span>{' '}
              {item[dropdownProperty.accessor]}
            </span>
          </>
        );
      })}
    </div>
  );
};

const SearchBar = ({ searchData }) => {
  const [inputText, setInputText] = useState('');
  const [data, setData] = useState([]);
  const [isHidden, setIsHidden] = useState(false);
  const dispatch = useDispatch();

  const filterData = (value) => {
    const inputInLowercase = value.toLowerCase().trim();
    if (!inputInLowercase) {
      setData([]);
    } else {
      const filterData = searchData.filter((item) => {
        return Object.keys(item).some((key) => {
          return item[key].toString().toLowerCase().includes(inputInLowercase);
        });
      });
      setData(filterData);
    }
  };

  const onSearchInput = (value) => {
    if (value.length < 1) {
      toast('Minimum 1 character needed to search');
    }
    setInputText(value);
    filterData(value);
    setIsHidden(false);
  };

  // Store the searched data in redux store for access in other components
  const onSubmitSearch = (e) => {
    e.preventDefault();
    dispatch(storeSearchedData(data));
    setIsHidden(true);
  };

  const searchDropdownStructure = [
    { name: 'Title', accessor: 'title' },
    { name: 'Company', accessor: 'company_name' },
    { name: 'Location', accessor: 'location' },
  ];

  return (
    <div className="relative">
      <form
        className="relative w-12/12 sm:w-48 md:w-96 flex items-center"
        onSubmit={(e) => onSubmitSearch(e)}
      >
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg
            fill="currentColor"
            viewBox="0 0 512 512"
            className="w-6 h-6 p-1 focus:outline-none focus:ring"
          >
            <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
          </svg>
        </span>

        <input
          value={inputText}
          onChange={(e) => {
            console.log(e.target.value.length, e.target.value);
            onSearchInput(e.target.value);
          }}
          minLength="1"
          placeholder={`Enter at least 1 character`}
          className="py-2 px-10 w-52 md:w-96 h-12 border border-gray-400 text-sm rounded-full focus:outline-none focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring rounded-r-none"
        />

        <button
          type="submit"
          className={`bg-blue-600 py-2 px-4 h-12 rounded-full text-white hover:bg-blue-700 focus:outline-none focus:shadow-outline
        rounded-l-none`}
        >
          <Link
            to={`/search/${inputText}`}
            className="text-white hover:text-white"
          >
            Search
          </Link>
        </button>
      </form>

      {/* Display below the form - And only upto 5 entries */}
      {data.length > 0 && (
        <div
          hidden={isHidden}
          className="ml-6 mt-14 bg-gradient-to-r from-cyan-200 to-blue-200 absolute top-0 left-0 rounded-lg overflow-hidden"
        >
          <div className="m-0 pl-4 pr-3 py-1 text-center bg-blue-300 flex justify-between">
            <span>Click "Search" to see complete list</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              onClick={() => setData([])}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="py-2 px-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {data.slice(0, 5).map((item) => {
              return (
                <Link
                  to={`/jobs/view/${item._id}`}
                  target="_blank"
                  className="block bg-neutral-100/70 rounded-lg"
                >
                  <SearchDataDropdownElement
                    item={item}
                    searchDropdownStructure={searchDropdownStructure}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
