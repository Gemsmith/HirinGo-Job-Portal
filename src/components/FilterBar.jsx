import React, { useRef, useState } from 'react';

const FilterBar = ({ expFilterValues, onExpFilter, onSalaryFilter }) => {
  const filterMenuRef = useRef();
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);

  const filterToggle = () => {
    setFilterMenuVisible(!filterMenuVisible);
  };

  const [filter, setFilter] = useState({
    exp: '',
    salaryFrom: 0,
    salaryTo: 100000000,
  });

  const handleInput = (field) => (e) => {
    switch (field) {
      case 'exp':
        const allSalariesButtonEl = document.getElementById('allSalaries');
        allSalariesButtonEl.checked = true;
        setFilter({ ...filter, exp: e.target.value });
        onExpFilter(e.target.value);
        break;

      case 'salary':
        const salaryFrom = e.target.value;
        const salaryTo = e.target.getAttribute('data-value2');
        const anyExpButtonEl = document.getElementById('exp-0');
        anyExpButtonEl.checked = true;
        setFilter({ ...filter, salaryFrom, salaryTo });
        onSalaryFilter(e.target.value, salaryTo);
        break;

      default:
        break;
    }
  };

  return (
    <div className="relative z-40">
      {/* Desktop-View Filter Panel - START */}
      <div
        className={`px-8 py-8 w-fit hidden sm:block bg-white min-h-screen h-full`}
        ref={filterMenuRef}
      >
        <div className="sticky top-24 left-0">
          <p className="font-bold text-2xl">Filters</p>

          <hr className="m-3" />

          {/* 1st Filter - Experience */}
          <p className="font-bold text-lg mb-2">Experience</p>
          <form className="flex flex-col items-start mb-8">
            {expFilterValues.map((exp, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-row-reverse items-center gap-2 mb-1 "
                >
                  <label
                    className="font-medium whitespace-nowrap"
                    htmlFor={`exp-${index}`}
                  >
                    {exp}
                  </label>
                  <input
                    type={'radio'}
                    className="font-medium text-sm"
                    name="experience"
                    value={exp}
                    id={`exp-${index}`}
                    onChange={handleInput('exp')}
                  />
                </div>
              );
            })}
          </form>

          {/* 2nd Filter - Salary */}
          <p className="font-bold text-lg mb-2">Salary Range</p>
          <form className="flex flex-col items-start mb-8">
            <div className="flex flex-row-reverse items-center gap-2 mb-1 ">
              <label className="font-medium whitespace-nowrap" htmlFor="allSalaries">
                All
              </label>
              <input
                type={'radio'}
                className="font-medium text-sm"
                name="salary"
                value="0"
                data-value2="100000000"
                id="allSalaries"
                onChange={handleInput('salary')}
              />
            </div>

            <div className="flex flex-row-reverse items-center gap-2 mb-1 ">
              <label className="font-medium whitespace-nowrap" htmlFor="fivekabove">
                $5000 - $50,000
              </label>
              <input
                type={'radio'}
                className="font-medium text-sm"
                name="salary"
                value="5000"
                data-value2="50000"
                id="fivekabove"
                onChange={handleInput('salary')}
              />
            </div>

            <div className="flex flex-row-reverse items-center gap-2 mb-1 ">
              <label className="font-medium whitespace-nowrap" htmlFor="fiftykabove">
                $50,000 - $100,000
              </label>
              <input
                type={'radio'}
                className="font-medium text-sm"
                name="salary"
                value="50000"
                data-value2="100000"
                id="fiftykabove"
                onChange={handleInput('salary')}
              />
            </div>

            <div className="flex flex-row-reverse items-center gap-2 mb-1 ">
              <label className="font-medium whitespace-nowrap" htmlFor="hundredkabove">
                $100,000 - $200,000
              </label>
              <input
                type={'radio'}
                className="font-medium text-sm"
                name="salary"
                value="100000"
                data-value2="200000"
                id="hundredkabove"
                onChange={handleInput('salary')}
              />
            </div>

            <div className="flex flex-row-reverse items-center gap-2 mb-1 ">
              <label className="font-medium whitespace-nowrap" htmlFor="twohundredkabove">
                $200,000 - $200,000+
              </label>
              <input
                type={'radio'}
                className="font-medium text-sm"
                name="salary"
                value="200000"
                data-value2="100000000"
                id="twohundredkabove"
                onChange={handleInput('salary')}
              />
            </div>
          </form>
        </div>
      </div>
      {/* Desktop-View Filter Panel - END */}

      {/* Mobile-View Filter Display Panel - START */}
      {/* Filter Panel Toggle Button */}
      <div
        className="block sm:hidden fixed top-[8rem] -left-1 z-50 sm:z-10 animate-pulse"
        onClick={() => filterToggle()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 ${
            filterMenuVisible ? 'rotate-180 text-blue-600 opacity-100' : 'opacity-40 '
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
          />
        </svg>
      </div>

      {filterMenuVisible && (
        <div
          className={`px-8 py-4 w-fit fixed sm:relative block sm:hidden bg-white min-h-screen h-full `}
          ref={filterMenuRef}
        >
          <div className="flex justify-between items-center">
            <p className="font-bold text-2xl">Filters</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              onClick={() => setFilterMenuVisible(false)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <hr className="m-3" />
          {/* 1st Filter - Experience */}
          <p className="font-bold text-lg mb-2">Experience</p>
          <form className="flex flex-col items-start mb-8">
            {expFilterValues.map((exp, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-row-reverse items-center gap-2 mb-1 "
                >
                  <label
                    className="font-medium whitespace-nowrap"
                    htmlFor={`exp-responsive-${index}`}
                  >
                    {exp}
                  </label>
                  <input
                    type={'radio'}
                    className="font-medium text-sm"
                    name="experience"
                    value={exp}
                    id={`exp-responsive-${index}`}
                    onChange={handleInput('exp')}
                  />
                </div>
              );
            })}
          </form>

          {/* 2nd Filter - Salary */}
          <p className="font-bold text-lg mb-2">Salary Range</p>
          <form className="flex flex-col items-start mb-8">
            <div className="flex flex-row-reverse items-center gap-2 mb-1 ">
              <label
                className="font-medium whitespace-nowrap"
                htmlFor="allSalaries-responsive"
              >
                All
              </label>
              <input
                type={'radio'}
                className="font-medium text-sm"
                name="salary"
                value="0"
                data-value2="100000000"
                id="allSalaries-responsive"
                onChange={handleInput('salary')}
              />
            </div>

            <div className="flex flex-row-reverse items-center gap-2 mb-1 ">
              <label
                className="font-medium whitespace-nowrap"
                htmlFor="fivekabove-responsive"
              >
                $5000 - $50,000
              </label>
              <input
                type={'radio'}
                className="font-medium text-sm"
                name="salary"
                value="5000"
                data-value2="50000"
                id="fivekabove-responsive"
                onChange={handleInput('salary')}
              />
            </div>

            <div className="flex flex-row-reverse items-center gap-2 mb-1 ">
              <label
                className="font-medium whitespace-nowrap"
                htmlFor="fiftykabove-responsive"
              >
                $50,000 - $100,000
              </label>
              <input
                type={'radio'}
                className="font-medium text-sm"
                name="salary"
                value="50000"
                data-value2="100000"
                id="fiftykabove-responsive"
                onChange={handleInput('salary')}
              />
            </div>

            <div className="flex flex-row-reverse items-center gap-2 mb-1 ">
              <label
                className="font-medium whitespace-nowrap"
                htmlFor="hundredkabove-responsive"
              >
                $100,000 - $200,000
              </label>
              <input
                type={'radio'}
                className="font-medium text-sm"
                name="salary"
                value="100000"
                data-value2="200000"
                id="hundredkabove-responsive"
                onChange={handleInput('salary')}
              />
            </div>

            <div className="flex flex-row-reverse items-center gap-2 mb-1 ">
              <label
                className="font-medium whitespace-nowrap"
                htmlFor="twohundredkabove-responsive"
              >
                $200,000 - $200,000+
              </label>
              <input
                type={'radio'}
                className="font-medium text-sm"
                name="salary"
                value="200000"
                data-value2="100000000"
                id="twohundredkabove-responsive"
                onChange={handleInput('salary')}
              />
            </div>
          </form>
        </div>
      )}
      {/* Mobile-View Filter Display Panel - END */}
    </div>
  );
};

export default FilterBar;
