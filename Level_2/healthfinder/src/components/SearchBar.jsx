import React, { useState, useEffect } from "react";
import { getCities, getTypes } from "../api/healthService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ onSearch }) => {
  const [cities, setCities] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedType, setSelectedType] = useState("All Types");
  const [searchTerm, setSearchTerm] = useState("");
  const [usingMyLocation, setUsingMyLocation] = useState(false);
  const [myCoords, setMyCoords] = useState(null);

  useEffect(() => {
    getCities().then(setCities);
    getTypes().then(setTypes);
  }, []);

  // Trigger a search only when user explicitly submits or uses Near Me
  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    onSearch({
      city: selectedCity,
      type: selectedType,
      term: searchTerm,
      near: myCoords,
    });
  };

  const handleNearMe = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported in your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lon: pos.coords.longitude };
        setMyCoords(coords);
        setUsingMyLocation(true);
        onSearch({
          city: selectedCity,
          type: selectedType,
          term: searchTerm,
          near: coords,
        });
      },
      (err) => {
        console.error(err);
        alert("Unable to retrieve your location");
      }
    );
  };

  return (
    <div>
      <div className="relative">
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search clinic name or service..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit(e);
          }}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-left text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-left text-sm font-medium text-gray-700 mb-1">
            Facility Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-6 text-left flex items-center">
        <span className="bg-green-500 w-3 h-3 rounded-full mr-2"></span>
        <span className="text-sm text-gray-600">
          Live search - results update automatically
        </span>
        <div className="ml-4 flex items-center">
          <button
            onClick={handleNearMe}
            className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-3"
          >
            {usingMyLocation ? "Using my location" : "Near Me"}
          </button>
          <button
            onClick={handleSubmit}
            className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
