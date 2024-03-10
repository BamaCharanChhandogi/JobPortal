import React from "react";
import { AiOutlineSearch, AiOutlineCloseCircle } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import CustomButton from "./CustomButton";
import { popularSearch } from "../utils/data";
import { HeroImage } from "../assets";

const SearchInput = ({ placeholder, icon, value, setValue, styles }) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const clearInput = () => setValue("");

  return (
    <div className={`flex w-full md:w-1/3 items-center ${styles}`}>
      {icon}

      <input
        value={value}
        onChange={(e) => handleChange(e)}
        type='text'
        className='w-full md:w-64 p-2 outline-none bg-transparent text-base'
        placeholder={placeholder}
      />

      <AiOutlineCloseCircle
        className='hidden md:flex text-gray-600 text-xl cursor-pointer'
        onClick={clearInput}
      />
    </div>
  );
};

const Header = ({
  title,
  type,
  handleClick,
  searchQuery,
  setSearchQuery,
  location,
  setLocation,
}) => {
  return (
    <div>
      <div
        className={`container mx-auto ${
          type ? "h-auto" : "h-auto"
        } flex items-center relative`}
      >
        <div className='w-full z-10'>
          {/* <div className='mb-8'>
            <p className='text-slate-700 font-bold text-4xl'>{title}</p>
          </div> */}

          <div className='w-full flex items-center justify-around bg-white py-2 shadow-2xl rounded-lg'>
            <SearchInput
              placeholder='Type Job Title'
              icon={<AiOutlineSearch className='text-xl' />}
              value={searchQuery}
              styles={"text-slate-900"}
              setValue={setSearchQuery}
            />
            {/* <SearchInput
              placeholder='Add Country or City'
              icon={<CiLocationOn className='text-gray-600 text-xl' />}
              value={location}
              setValue={setLocation}
              styles={"hidden md:flex"}
            /> */}

            <div>
              <CustomButton
                onClick={handleClick}
                title='Search'
                containerStyles={
                  "text-white py-2 md:py-2 px-2 md:px-4  focus:outline-none bg-blue-600 rounded-full md:rounded-md text-sm md:text-base"
                }
              />
            </div>
          </div>

          {/* {type && (
            <div className='w-full lg:1/2 flex flex-wrap gap-3 md:gap-6 py-10 md:py-14'>
              {popularSearch.map((search, index) => (
                <span
                  key={index}
                  className='bg-[#1d4fd826] text-[#1d4ed8] py-1 px-2 rounded-full text-sm md:text-base'
                >
                  {search}
                </span>
              ))}
            </div>
          )} */}
        </div>

        {/* <div className='w-1/3 h-full absolute top-24 md:-top-6 lg:-top-14 right-16 2xl:right-[18rem]'>
          <img src={HeroImage} className='object-contain' />
        </div> */}
      </div>
    </div>
  );
};

export default Header;
