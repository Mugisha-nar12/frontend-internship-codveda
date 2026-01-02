import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-3">
              <div className="bg-blue-100 text-blue-600 rounded-full p-3 mr-3">
                <FontAwesomeIcon icon={faHeart} />
              </div>
              <div>
                <div className="font-semibold text-black">
                  Rwanda Health Center Finder
                </div>
                <div className="text-sm text-gray-600">
                  Connecting all Rwandans to quality healthcare services across
                  30+ districts. Free, accessible, and always available.
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-black">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <Link to="/" className="hover:text-blue-600">
                  Find Health Facilities
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-600">
                  About Us
                </Link>
              </li>
              <li>
                <a
                  href="https://www.moh.gov.rw/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-600"
                >
                  Ministry of Health Rwanda
                </a>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-blue-600">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-black">
              Emergency Contacts
            </h4>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start">
                <div className="text-red-600 mr-3 mt-1">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div>
                  <div className="font-semibold">
                    Emergency:{" "}
                    <a href="tel:912" className="text-red-600">
                      912
                    </a>
                  </div>
                  <div className="text-gray-500">24/7 Emergency Services</div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-blue-600 mr-3 mt-1">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div>
                  <div className="font-semibold">
                    Health Info:{" "}
                    <a href="tel:114" className="text-blue-600">
                      114
                    </a>
                  </div>
                  <div className="text-gray-500">
                    Health Information Hotline
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-gray-600 mr-3 mt-1">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </div>
                <div>
                  <div className="font-semibold">
                    <a
                      href="https://www.moh.gov.rw/"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-blue-600"
                    >
                      Ministry of Health
                    </a>
                  </div>
                  <div className="text-gray-500">KN 4 Ave, Kigali, Rwanda</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-4 flex items-center justify-between text-sm text-gray-600">
          <div>
            © {new Date().getFullYear()} Rwanda Health Center Finder. All rights
            reserved.
          </div>
          <div className="flex items-center space-x-2">
            <div>Made with</div>
            <div className="text-red-500">
              <FontAwesomeIcon icon={faHeart} />
            </div>
            <div>for Rwanda</div>
          </div>
        </div>

        <div className="mt-4 flex justify-between text-sm text-gray-600">
          <a
            href="https://www.moh.gov.rw/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-600 hover:text-blue-600"
          >
            Ministry of Health (Rwanda)
          </a>
          <div className="space-x-4">
            <Link to="/privacy" className="text-gray-600 hover:text-blue-600">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-600 hover:text-blue-600">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
