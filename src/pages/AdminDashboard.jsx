import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import Table from "../components/Table";
import { getApi } from "../ApiServices";
import LoadingSpinnerComponent from "react-spinners-components";

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [usersData, setUsersData] = useState([]);
  const [usersDataCopy, setUsersDataCopy] = useState(null);
  const [isError, setIsError] = useState({
    type: false,
    message: "",
  });
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalPagesCopy, setTotalPagesCopy] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [deleteAllChecked, setDeleteAllChecked] = useState(false);

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

  useEffect(() => {
    setTotalPages(Math.ceil(usersData?.length / 10));
    console.log("USERS DATA", usersData);
    return () => {
      setTotalPages(0);
    };
  }, [usersData.length]);

  useEffect(() => {
    if (usersDataCopy !== null) {
      setTotalPagesCopy(Math.ceil(usersDataCopy?.length / 10));
    } else {
      setTotalPagesCopy(null);
    }

    return () => {
      setTotalPagesCopy(null);
    };
  }, [usersDataCopy?.length]);

  const goToPage = (num) => {
    if (num >= 0 && num < totalPages) setPage(num);
  };

  const deleteItem = (id) => {
    const temp = usersData.filter((item) => item.id != id);
    setUsersData(temp);
    if (usersDataCopy != null) {
      setUsersDataCopy(usersDataCopy.filter((item) => item.id != id));
    }
  };

  const editItem = (item) => {
    const updatedData = usersData.map((data) =>
      data.id == item.id ? item : data
    );
    setUsersData(updatedData);
    if (usersDataCopy != null) {
      setUsersDataCopy(
        usersDataCopy.map((data) => (data.id == item.id ? item : data))
      );
    }
  };

  const addRemoveSelectedId = (id, isCheckedValue) => {
    if (isCheckedValue) {
      console.log("HERE ID:", id);
      // setSelectedIds([...selectedIds, id]);
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev?.filter((itemId) => itemId !== id));
    }
  };

  const deleteAllSelected = () => {
    console.log(selectedIds);
    setUsersData((prev) =>
      prev.filter((item) => !selectedIds.includes(item.id))
    );
    if (usersDataCopy != null) {
      setUsersDataCopy((prev) =>
        prev.filter((item) => !selectedIds.includes(item.id))
      );
    }

    setSelectedIds([]);
  };

  const seachUser = (searchValue) => {
    const regex = new RegExp(searchValue, "i");
    setUsersDataCopy(
      usersData.filter(
        (item) =>
          regex.test(item.name) ||
          regex.test(item.email) ||
          regex.test(item.role)
      )
    );
  };

  const resetSearch = () => {
    setUsersDataCopy(null);
    setTotalPagesCopy(null);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4 ">
      {!isLoading ? (
        <>
          <SearchBar
            deleteAllSelected={deleteAllSelected}
            seachUser={seachUser}
            resetSearch={resetSearch}
          />
          <Table
            data={usersData}
            searchData={usersDataCopy}
            page={page}
            deleteItem={deleteItem}
            editItem={editItem}
            addRemoveSelectedId={addRemoveSelectedId}
          />
          <Pagination
            totalData={
              usersDataCopy !== null ? usersDataCopy?.length : usersData?.length
            }
            currPage={page}
            totalPages={totalPagesCopy !== null ? totalPagesCopy : totalPages}
            goToPage={goToPage}
          />
        </>
      ) : (
        <div className="h-screen flex items-center justify-center">
          <LoadingSpinnerComponent
            type={"Rolling"}
            color={"#3b81f6"}
            size={"100px"}
          />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
