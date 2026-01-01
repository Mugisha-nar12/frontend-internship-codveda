import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHospital,
  faSyringe,
  faStethoscope,
} from "@fortawesome/free-solid-svg-icons";

const Categories = () => {
  const categories = [
    {
      name: "Hospitals",
      icon: faHospital,
      description: "Emergency & specialized care",
    },
    {
      name: "Vaccination Centers",
      icon: faSyringe,
      description: "Stay protected & healthy",
    },
    {
      name: "Health Clinics",
      icon: faStethoscope,
      description: "Primary care & check-ups",
    },
  ];

  return (
    <div className="mt-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div
            key={category.name}
            className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
          >
            <FontAwesomeIcon
              icon={category.icon}
              className="text-5xl text-blue-600 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-700">
              {category.name}
            </h3>
            <p className="text-gray-500 mt-2">{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
