import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import Table from "../components/Table";
import { getApi } from "../ApiServices";

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [usersData, setUsersData] = useState([]);
  const [isError, setIsError] = useState({
    type: false,
    message: "",
  });
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await getApi("/adminui-problem/members.json");
      if (response?.success === true) {
        setUsersData(response?.data);
        setIsError({
          type: false,
          message: "",
        });
        setTotalPages(Math.ceil(response?.data.length / 10));
      } else {
        setUsersData([]);
        setIsError({
          type: true,
          message: response?.message,
        });
        console.log("Error Code: 1x01", response?.error);
      }
    } catch (error) {
      console.log("Error Code: 1x02", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();

    return () => {
      setUsersData([]);
    };
  }, []);

  const goToPage = (num) => {
    if (num >= 0 && num < totalPages) setPage(num);
  };

  const deleteItem = (id) => {
    const temp = usersData.filter((item)=>item.id!=id)
    setUsersData(temp)
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4 ">
      {!isLoading && (
        <>
          <SearchBar />
          <Table data={usersData} page={page} deleteItem={deleteItem} />
          <Pagination
            totalData={usersData.length}
            currPage={page}
            totalPages={totalPages}
            goToPage={goToPage}
          />
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
