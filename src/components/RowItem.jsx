import React, { useEffect, useState } from "react";
import { FaEdit, FaCheck } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";

const RowItem = ({
  item,
  deleteItem,
  editItem,
  isChecked,
  addRemoveSelectedId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: item.id,
    name: item.name,
    email: item.email,
    role: item.role,
  });
  const [isCheckedValue, setIsCheckedValue] = useState(isChecked);

  useEffect(() => {
    setIsCheckedValue(isChecked);

    return () => {
      setIsCheckedValue(false);
    };
  }, [isChecked]);

  useEffect(() => {
    if(isCheckedValue)
      console.log("ID checked: ", item.id);
    addRemoveSelectedId(item.id, isCheckedValue);
  }, [isCheckedValue]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="w-4 p-4">
          <div className="flex items-center">
            <input
              id="checkbox-table-search-1"
              type="checkbox"
              onChange={() => setIsCheckedValue(!isCheckedValue)}
              checked={isCheckedValue}
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
          {isEditing ? (
            <input
              className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-50 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          ) : (
            item?.name
          )}
        </th>
        <td className="px-6 py-4">
          {isEditing ? (
            <input
              className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-50 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          ) : (
            item?.email
          )}
        </td>
        <td className="px-6 py-4">
          {isEditing ? (
            <input
              className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-50 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
            />
          ) : (
            item?.role
          )}
        </td>
        <td className="px-6 py-4 space-x-4">
          {isEditing ? (
            <button
              className="flex gap-2 font-medium text-blue-600 dark:text-blue-500 hover:underline"
              onClick={() => {
                editItem(formData);
                setIsEditing(false);
              }}
            >
              <FaCheck size={18} />
              <p>SAVE</p>
            </button>
          ) : (
            <>
              <button
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                onClick={() => setIsEditing(true)}
              >
                <FaEdit size={18} />
              </button>
              <button
                className="font-medium text-red-600 dark:text-red-500 hover:underline"
                onClick={() =>
                  confirmAlert({
                    title: "Confirm to submit",
                    message: "Are you sure to do this.",
                    buttons: [
                      {
                        label: "Yes",
                        onClick: () => deleteItem(item.id),
                      },
                      {
                        label: "No",
                      },
                    ],
                    overlayClassName: "bg-[rgba(0,0,0,0.6)]",
                  })
                }
              >
                <MdDeleteOutline size={20} />
              </button>
            </>
          )}
        </td>
      </tr>
    </>
  );
};

export default RowItem;
