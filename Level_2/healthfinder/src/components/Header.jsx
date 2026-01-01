import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartbeat } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row md:justify-between items-center gap-4">
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faHeartbeat}
            className="text-blue-600 text-3xl mr-3"
          />
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">
              Rwanda Health Center Finder
            </h1>
            <div className="text-sm text-gray-500">
              Find hospitals, clinics and vaccination centers in Rwanda
            </div>
          </div>
        </div>

        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-md"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/saved"
                className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-md"
              >
                Saved
              </Link>
            </li>
            <li>
              <Link
                to="/districts"
                className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-md"
              >
                Districts
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-md"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-md"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
