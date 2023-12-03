import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";

const SearchBar = ({ deleteAllSelected, seachUser, resetSearch }) => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="pb-4 flex justify-between">
      <label htmlFor="table-search" className="sr-only">
        Search
      </label>
      <div className="flex gap-4 ">
        <div className="relative mt-1">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="block py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search "
          />
        </div>
        <button
          onClick={() => seachUser(searchValue)}
          className="font-medium text-sm text-blue-600 dark:text-blue-500 border border-blue-500 mt-1 px-3 rounded-md"
        >
          Search
        </button>
        <button
          onClick={() => {setSearchValue("");resetSearch()}}
          className="font-medium text-sm text-orange-400 dark:text-orange-300 mt-1 flex gap-1 items-center"
        >
          <FaInfoCircle size={18} />
         <p>Reset Search Filters</p> 
        </button>
      </div>
      <button
        onClick={() =>
          confirmAlert({
            title: "Confirm to submit",
            message: "Are you sure to do this.",
            buttons: [
              {
                label: "Yes",
                onClick: () => deleteAllSelected(),
              },
              {
                label: "No",
              },
            ],
            overlayClassName: "bg-[rgba(0,0,0,0.6)]",
          })
        }
        className="flex gap-2 font-medium text-red-600 dark:text-red-500 hover:underline mr-8 mt-1"
      >
        <MdDeleteOutline size={22} />
        <p>DELETE</p>
      </button>
    </div>
  );
};

export default SearchBar;
