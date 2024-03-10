import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { footerLinks } from "../utils/data";
import { Link } from "react-router-dom";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";

const Footer = () => {
  return (
    <footer className="text-white">
      <div className="bg-pink-500">
        <div className="container px-5 py-5 mx-auto">
          <div className="flex flex-wrap gap-10 justify-between items-start lg:items-center">
            {footerLinks.map(({ id, title, links }) => (
              <div className="w-full lg:w-auto px-4 mb-8 lg:mb-0" key={id + title}>
                <h2 className="text-slate-900 font-bold tracking-widest text-md mb-3">
                  {title}
                </h2>

                <div className="flex flex-col gap-3">
                  {links.map((link, index) => (
                    <Link
                      key={link + index}
                      to="/"
                      className="text-gray-300 text-sm hover:text-white"
                    >
                      {link}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div className="w-full lg:w-1/3">
              <p className="text-white mb-4">
                Subscribe to our Newsletter
              </p>

              <div className="flex flex-col lg:flex-row items-center justify-center gap-2">
                <TextInput
                  styles="w-full bg-gray-100 sm:mr-4 md-2 mb-2"
                  type="email"
                  placeholder="Email Address"
                />

                <CustomButton
                  title="Subscribe"
                  containerStyles="block bg-[#001a36] text-white px-5 py-2 text-md rounded hover:bg-blue-800 focus:outline-none mt-2 lg:mt-0"
                />
              </div>
            </div>

            <div className="flex flex-col items-center lg:items-start">
              <p className="text-white mb-4">
                Follow Us
              </p>
              <div className="flex">
                <a className="text-white text-xl mr-3 hover:scale-125 ease-in-out duration-300">
                  <FaFacebookF />
                </a>
                <a className="text-white text-xl mr-3 hover:scale-125 ease-in-out duration-300">
                  <FaTwitter />
                </a>
                <a className="text-white text-xl mr-3 hover:scale-125 ease-in-out duration-300">
                  <FiInstagram />
                </a>
                <a className="text-white text-xl hover:scale-125 ease-in-out duration-300">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#001a36]">
          <div className="container mx-auto py-4 px-5 flex flex-wrap items-center justify-between">
            <p className="text-gray-300 text-sm mb-2 sm:mb-0">
              &copy; 2024 Job Portal —
              <a
                href="https://github.com/BamaCharanChhandogi"
                className="text-pink-500 font-bold ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                @BamaCharanChhandogi
              </a>
            </p>

            <span className="text-gray-300 text-sm">
              Designed by Bama
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
