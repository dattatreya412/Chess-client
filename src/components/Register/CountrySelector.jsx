import React, { useState } from "react";

const CountrySelector = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  // List of 10 country names
  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "India",
    "Germany",
    "France",
    "Japan",
    "Brazil",
    "South Africa",
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (country) => {
    props.onChange({ target: { name: 'country', value: country } });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <label htmlFor="country-select" className="block mb-2 text-sm font-medium text-gray-300">
        Select a country:
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={toggleDropdown}
          className="w-full px-4 py-2 text-left bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-700 transition-colors duration-200"
        >
          {props.value || "Choose a country"}
        </button>
        {isOpen && (
          <ul className="absolute z-10 w-full mt-1 bg-gray-800 rounded-md shadow-lg max-h-60 overflow-auto">
            {countries.map((country, index) => (
              <li
                key={index}
                onClick={() => handleSelect(country)}
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-white"
              >
                {country}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CountrySelector;
