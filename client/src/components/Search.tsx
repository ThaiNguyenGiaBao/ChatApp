import React from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <div className="input input-bordered flex items-center gap-2 rounded-full bg-gray-600 pr-1 ">
      <input
        type="text"
        className="text-gray-50 font-semibold w-20 sm:w-32 "
        placeholder="Search"
      />
      <button className="hover:cursor-pointer hover:bg-gray-500 p-3 rounded-full">
        <FaSearch className="text-white" />
      </button>
    </div>
  );
};

export default Search;
