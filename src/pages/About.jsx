import React from 'react';
import logoText from '../assets/images/logo-text.png';

const About = () => {
  return (
    <main
      className="relative p-4 md:p-8 w-full h-full bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
      }}
    >
      {/* BG */}
      {/* <section className="relative block">
          <div
            className="  w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
        </section> */}

      {/* Content */}
      <section className="relative py-12 mt-16">
        {/* <div className="container mx-auto px-4"> */}
        <div className="mx-auto px-4 ">
          <div className="relative flex flex-col  break-words bg-white  w-full mb-6 shadow-xl rounded-lg">
            <div className="px-6">
              {/* Heading */}
              <div className="text-center mt-16 mb-12">
                <img
                  src={logoText}
                  alt=""
                  className="object-contain h-12 w-auto mx-auto"
                />
                <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                  HQ | Los Angeles, California
                </div>
                <div className="mb-2 text-gray-700 mt-10 text-base text-gray-500">
                  For Employers & Seekers for Roles in Management, Creative, Computer
                  Science, IT, Digital Marketing, Etc.
                </div>
              </div>

              <hr />

              {/* Middle Row - Stats */}
              <div className="flex flex-wrap justify-center">
                {/* <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src={
                          'https://www.tailwind-kit.com//images/person/4.jpg'
                        }
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                        style={{ maxWidth: '150px' }}
                      />
                    </div>
                  </div> */}
                {/* <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center"> */}
                {/* <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md  transition shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                        type="button"
                        style={{ transition: 'all .15s ease' }}
                      >
                        Connect
                      </button>
                    </div> */}
                {/* </div> */}
                <div className="w-full h-full lg:w-4/12 px-4 py-4">
                  <div className="flex flex-col sm:flex-row sm:gap-12 lg:gap-24 xl:gap-48 justify-center py-4 lg:pt-4 pt-8">
                    <div className="p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                        Since
                      </span>
                      <span className="text-sm text-gray-500"> 2022</span>
                    </div>
                    <div className="p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                        1000+
                      </span>
                      <span className="text-sm text-gray-500 whitespace-nowrap">
                        Jobs Posted Everyday
                      </span>
                    </div>
                    <div className="p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                        89
                      </span>
                      <span className="text-sm text-gray-500">Countries</span>
                    </div>
                  </div>
                </div>
              </div>

              <hr />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
