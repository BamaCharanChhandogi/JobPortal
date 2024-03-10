import React, { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { RxCrossCircled } from "react-icons/rx";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose, AiOutlineLogout } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";
import { useSelector, useDispatch } from "react-redux";
import { Logout } from "../redux/userSlice";
import Header from "./Header";
import { apiRequest, updateURL } from "../utils";
import JobCard from "./JobCard";

function MenuList({ user, onClick }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(Logout());
    window.location.replace("/");
  };

  return (
    <div>
      <Menu as="div" className="inline-block text-left">
        <div className="flex">
          <Menu.Button className="">
            <img
              src={user?.profileUrl}
              alt="user profile"
              className="w-10 h-10 rounded-full object-center"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-50 right-2 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg focus:outline-none">
            <div className="p-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={`${
                      user?.accountType ? "user-profile" : "company-profile"
                    }`}
                    className={`${
                      active ? "bg-blue-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md p-2 text-sm`}
                    onClick={onClick}
                  >
                    <CgProfile
                      className={`${
                        active ? "text-white" : "text-gray-600"
                      } mr-2 h-5 w-5`}
                      aria-hidden="true"
                    />
                    {user?.accountType ? "My Profile" : "My Profile"}
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleLogout()}
                    className={`${
                      active ? "bg-blue-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <AiOutlineLogout
                      className={`${
                        active ? "text-white" : "text-gray-600"
                      } mr-2 h-5 w-5`}
                      aria-hidden="true"
                    />
                    Log Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
const FilteredJobs = ({ filteredJobs }) => {
  return (
    <div className="flex flex-col justify-center ">
      <h2 className="text-xl font-semibold mb-2 mx-auto border-b-2 border-pink-500 rounded-md w-fit">Filtered Jobs</h2>
      <div className="flex justify-end mr-10 cursor-pointer" onClick={()=>{
        window.location.reload();
      }}><RxCrossCircled style={{ fontSize: '34px' }} /></div>
      <ul>
      <div className="w-full flex flex-wrap gap-4 items-center pb-4">
            {filteredJobs?.map((job, index) => {
              const data = {
                name: job?.company?.name,
                email: job?.company?.email,
                logo: job?.company?.profileUrl,
                ...job,
              };
              return <JobCard job={data} key={index} />;
            })}
          </div>
      </ul>
    </div>
  );
};

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [filterJobTypes, setFilterJobTypes] = useState([]);
  const [filterExp, setFilterExp] = useState([]);
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState(1);
  const [recordCount, setRecordCount] = useState(0);
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const navigate = useNavigate();
  const handleCloseNavbar = () => {
    setIsOpen((prev) => !prev);
  };

  
  const fetchJobs = async () => {
    setIsFetching(true);
    try {
      const res = await apiRequest({
        url: `/jobs/find-jobs`,
        token:user?.token,
        method: "GET",
      });
      setData(res?.data);
      setIsFetching(false);
    } catch (err) {
      setIsFetching(false);
      console.log(err);
    }
  };
  useEffect(() => {
    fetchJobs();
  },[])
  const handelSearch = async(e) => {
    e.preventDefault();
    const filteredJobs = data.filter(job => job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()));
    if(filteredJobs.length === 0 || searchQuery=='') return alert("No job found");
    setFilteredJobs(filteredJobs);
  };

  return (
    <>
      <div className="relative bg-pink-500 text-white z-50">
        <nav className="container mx-auto flex items-center justify-between p-2">
          <div>
            <Link to="/" className="font-bold text-xl">
              Job<span className="">Portal</span>
            </Link>
          </div>

          <div className="lg:hidden">
            <button
              className="text-slate-900"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {isOpen ? <AiOutlineClose size={26} /> : <HiMenuAlt3 size={26} />}
            </button>
          </div>

          {user?.token && <div className="hidden lg:block">
            <Header
              handleClick={handelSearch}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>}

          <ul className="hidden lg:flex gap-10 text-base justify-center items-center">
            <li>
              <Link to="/" className="hover:text-slate-900">
                View Jobs
              </Link>
            </li>
            <li>
              <Link to="/companies" className="hover:text-slate-900">
                Companies
              </Link>
            </li>
            <li>
              {user?.accountType === "seeker" ? (
                <Link to="/applications" className="hover:text-slate-900">
                  Applications
                </Link>
              ) : (
                <Link to="/post-job" className="hover:text-slate-900">
                  Post Job
                </Link>
              )}
            </li>
            <li>
              <Link to="/about-us" className="hover:text-slate-900">
                About Us
              </Link>
            </li>
          </ul>

          <div className="hidden lg:block">
            {!user?.token ? (
              <Link to="/user-auth">
                <CustomButton
                  title="Sign In"
                  containerStyles="text-white py-1.5 px-5 focus:outline-none hover:bg-black hover:text-white rounded-full text-base border border-blue-600"
                />
              </Link>
            ) : (
              <div>
                <MenuList user={user} />
              </div>
            )}
          </div>
        </nav>

        {/* MOBILE MENU */}
        <div
          className={`${
            isOpen ? "absolute flex bg-[#f7fdfd] " : "hidden"
          } container mx-auto lg:hidden flex-col pl-8 gap-3 py-5 text-black`}
        >
          <Link to="/" className="hover:text-slate-900" onClick={handleCloseNavbar}>
            View Jobs
          </Link>
          <Link to="/companies" className="hover:text-slate-900" onClick={handleCloseNavbar}>
            Companies
          </Link>
          <Link
            onClick={handleCloseNavbar}
            to={user?.accountType === "seeker" ? "applications" : "post-job"}
          >
            {user?.accountType === "seeker" ? "Applications" : "Post Job"}
          </Link>
          <Link to="/about-us" className="hover:text-slate-900" onClick={handleCloseNavbar}>
            About
          </Link>

          <div className="w-full py-10">
            {!user?.token ? (
              <a href="/user-auth" className="hover:text-slate-900">
                <CustomButton
                  title="Sign In"
                  containerStyles="text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600"
                />
              </a>
            ) : (
              <div>
                <MenuList user={user} onClick={handleCloseNavbar} />
              </div>
            )}
          </div>
        </div>
      </div>
      {filteredJobs.length > 0 && (
          <div className="container mx-auto mt-4">
            <FilteredJobs filteredJobs={filteredJobs} />
          </div>
        )}
    </>
  );
};

export default Navbar;
