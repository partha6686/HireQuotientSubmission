import React, { useState } from "react";
import RowItem from "./RowItem";

const Table = ({
  data,
  searchData,
  page,
  deleteItem,
  editItem,
  addRemoveSelectedId,
}) => {
  const [allChecked, setAllChecked] = useState(false);

  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="p-4">
            <div className="flex items-center">
              <input
                id="checkbox-all-search"
                type="checkbox"
                onChange={() => setAllChecked(!allChecked)}
                checked={allChecked}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="checkbox-all-search" className="sr-only">
                checkbox
              </label>
            </div>
          </th>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            Email
          </th>
          <th scope="col" className="px-6 py-3">
            Role
          </th>
          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {searchData === null
          ? data
              ?.slice(page * 10, page * 10 + 10)
              ?.map((item) => (
                <RowItem
                  key={item?.id}
                  item={item}
                  deleteItem={deleteItem}
                  editItem={editItem}
                  isChecked={allChecked}
                  addRemoveSelectedId={addRemoveSelectedId}
                />
              ))
          : searchData
              ?.slice(page * 10, page * 10 + 10)
              ?.map((item) => (
                <RowItem
                  key={item?.id}
                  item={item}
                  deleteItem={deleteItem}
                  editItem={editItem}
                  isChecked={allChecked}
                  addRemoveSelectedId={addRemoveSelectedId}
                />
              ))}
      </tbody>
    </table>
  );
};

export default Table;
