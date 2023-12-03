import React, { useEffect, useState } from "react";

const Pagination = ({ currPage, totalPages, goToPage }) => {
  const [tempArray, setTempArray] = useState([]);

  useEffect(() => {
    setTempArray(Array.from({ length: totalPages }, (_, index) => index));

    return () => {
      setTempArray([]);
    };
  }, [totalPages]);

  return (
    <nav
      className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          1-10
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          1000
        </span>
      </span>
      <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        <li>
          <button
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={() => goToPage(currPage - 1)}
          >
            Previous
          </button>
        </li>
        {tempArray.map((item) => (
          <li key={item}>
            <button
              onClick={() => goToPage(item)}
              // aria-current={item == 1 ? "page" : null}
              className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 ${currPage==item? "bg-gray-100 dark:bg-gray-700 ":"bg-white dark:bg-gray-800"} border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            >
              {item + 1}
            </button>
          </li>
        ))}

        <li>
          <button
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={() => goToPage(currPage + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
