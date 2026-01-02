import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faMapMarkerAlt,
  faHeart,
  faStar,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const FeatureCard = ({ icon, title, children }) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
    <div className="flex items-start space-x-4">
      <div className="bg-blue-50 text-blue-600 rounded-lg p-3">
        <FontAwesomeIcon icon={icon} className="h-5 w-5" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-blue-950">{title}</h3>
        <p className="text-gray-600 mt-1 text-sm">{children}</p>
      </div>
    </div>
  </div>
);

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <section className="bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-2xl p-10 mb-10 shadow-lg">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
                HealthFinder — Find care, fast
              </h1>
              <p className="mt-4 text-blue-100 max-w-xl">
                Discover hospitals, clinics, vaccination centers and more across
                Rwanda. Search by name, type, city or use "Near Me" to find
                nearby services.
              </p>
              <div className="mt-6 flex items-center space-x-3">
                <Link
                  to="/"
                  className="bg-white text-blue-700 px-5 py-3 rounded-lg font-semibold hover:shadow-md"
                >
                  Start Searching
                </Link>
                <a
                  href="https://www.moh.gov.rw/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-100 hover:underline"
                >
                  Official Ministry resources →
                </a>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-2xl font-bold">30+</div>
                <div className="text-sm text-blue-100">Districts covered</div>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm text-blue-100">Facilities indexed</div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <FeatureCard icon={faSearch} title="Smart Search">
            Find facilities by name, type, city or district with smart
            suggestions.
          </FeatureCard>
          <FeatureCard icon={faMapMarkerAlt} title="Near Me">
            Quickly locate services near you using device location and map view.
          </FeatureCard>
          <FeatureCard icon={faHeart} title="Save Favorites">
            Bookmark important facilities for fast access during emergencies.
          </FeatureCard>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-md mb-10">
          <h2 className="text-2xl font-bold mb-4 text-green-800">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
            <div className="space-y-2">
              <div className="font-semibold">1. Search</div>
              <div className="text-sm">
                Enter facility name, pick a type, or select a city/district to
                narrow results.
              </div>
            </div>
            <div className="space-y-2">
              <div className="font-semibold">2. Locate</div>
              <div className="text-sm">
                Use "Near Me" to show an interactive map with facility locations
                and distances.
              </div>
            </div>
            <div className="space-y-2">
              <div className="font-semibold">3. Act</div>
              <div className="text-sm">
                View details, call emergency numbers, or save the facility to
                your list.
              </div>
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-blue-800">
              Our Impact
            </h3>
            <p className="text-gray-600">
              HealthFinder helps citizens locate nearby hospitals, clinics, and
              vaccination centers, provides essential contact and location
              information, and supports faster decision-making in emergencies
              and non-emergencies alike.
            </p>
            <div className="mt-4 flex items-center space-x-3 text-sm text-gray-500">
              <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
              <div>Trusted by local health workers and volunteers</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-blue-800">
              Contact & Support
            </h3>
            <p className="text-gray-600">
              For general enquiries contact{" "}
              <a href="mailto:info@healthfinder.rw" className="text-blue-600">
                info@healthfinder.rw
              </a>
              .
            </p>
            <div className="mt-4 text-sm text-gray-500 flex items-center space-x-2">
              <FontAwesomeIcon icon={faEnvelope} />
              <div>We aim to respond within 48 hours.</div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
