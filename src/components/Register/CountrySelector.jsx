import React from "react";

const CountrySelector = (props) => {
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

  return (
    <div>
      <label htmlFor="country-select">Select a country:</label>
      <select
        id="country-select"
        name="country" // Added name attribute to match state key in parent component
        onChange={props.onChange}
        value={props.value} // Controlled component with value prop
        className="bg-black bg-opacity-45 outline-none"
      >
        {/* Added a default placeholder option */}
        <option value="" disabled>
          Choose a country
        </option>
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelector;
