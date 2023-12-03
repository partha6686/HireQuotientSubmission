import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const RowItem = ({item, deleteItem}) => {
  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="w-4 p-4">
          <div className="flex items-center">
            <input
              id="checkbox-table-search-1"
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="checkbox-table-search-1" className="sr-only">
              checkbox
            </label>
          </div>
        </td>
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {item?.name}
        </th>
        <td className="px-6 py-4">{item?.email}</td>
        <td className="px-6 py-4">{item?.role}</td>
        <td className="px-6 py-4 space-x-4">
          <button
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            <FaEdit size={18} />
          </button>
          <button
            className="font-medium text-red-600 dark:text-red-500 hover:underline"
            onClick={()=>deleteItem(item.id)}
          >
            <MdDeleteOutline size={20} />
          </button>
        </td>
      </tr>
    </>
  );
};

export default RowItem;
