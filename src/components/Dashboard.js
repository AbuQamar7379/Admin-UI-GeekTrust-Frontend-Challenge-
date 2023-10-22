import UserList from "./UserList";
import "../css/dashboard.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../App";
import SearchUser from "./searchUser";
import { useSnackbar } from "notistack";
import Pagination from "./Pagination";
import DeleteSelectedUsers from "./DeleteSelectedUsers";
import { CircularProgress, Box, Stack } from "@mui/material";

const Dashboard = () => {
  let { enqueueSnackbar } = useSnackbar();
  let [userList, setUserList] = useState([]);
  let [loading, setLoading] = useState(true);
  let [searchList, setSearchList] = useState([]);
  let [searchVal, setSearchVal] = useState("");
  let [isCheckboxClicked, setIsCheckboxClicked] = useState(false);
  let [currentPage, setCurrentPage] = useState(1);
  let [checkedUsers, setCheckedUsers] = useState([]);
  let [totalUsers, setTotalUsers] = useState(0);
  let usersPerPage = 10;

  
  /******** Fetch User List ********/
  const fetchUsers = () => {
    setTimeout(async () => {
      try {
        let { data } = await axios.get(config.endPoint);
        setUserList(data);
        setSearchList(data);
        setLoading(false);
      } catch (err) {
        enqueueSnackbar("Failed to Fecth user lists!", {
          variant: "error",
          autoHideDuration: 10000,
        });
      }
    }, 2000);
  };

  
  // Use Effect (Mount Phase)
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  //useEffect (mount + update phase) to set the initial totalUsers value when the user data is loaded
  useEffect(() => {
    setTotalUsers(userList.length);
  }, [userList]);


  /******** Handle Search User ********/
  const handleSearchUser = (e) => {
    let search = e.toLowerCase();
    if (searchVal.length > 0) {
      let filterUserBySearch = searchList.filter(
        (user) =>
          user.name.toLowerCase().includes(search) ||
          user.email.toLowerCase().includes(search) ||
          user.role.toLowerCase().includes(search)
      );
      setUserList(filterUserBySearch);
    } else {
      setUserList(searchList);
    }
  };


  /******** Handle Delete User ********/
  const handleDeleteUser = (userIds) => {
    const filteredUserList = userList.filter(
      (user) => !userIds.includes(user.id)
    );
    setUserList(filteredUserList);
    setTotalUsers(filteredUserList.length);
    enqueueSnackbar("Users Deleted Successfully!", {
      variant: "success",
      autoHideDuration: 1500,
    });
  };


  /******** Handle Delete Selected Users ********/
  const handleDeleteSelectedUsers = () => {
    if (checkedUsers.length === 0) {
      return enqueueSnackbar("No user selected, Please select user first!", {
        variant: "warning",
        autoHideDuration: 1500,
      });
    }
    const usersToDelete = userList.filter((user) =>
      checkedUsers.includes(user.id)
    );
    const userIdsToDelete = usersToDelete.map((user) => user.id);
    // Delete the selected users in one go
    handleDeleteUser(userIdsToDelete);
    // Clear the selection
    setCheckedUsers([]);
    // unChecked header checkbox
    setIsCheckboxClicked(false)
  };


  /******** Handle User Update ********/
  const handleInputChange = (event, index, field) => {
    const updatedUserList = [...userList];
    updatedUserList[index] = {
      ...updatedUserList[index],
      [field]: event.target.value,
    };
    setUserList(updatedUserList);
    setSearchList(updatedUserList);
  };


  /********  Paginate ********/
  const paginate = (pageNum) => {
    setCurrentPage(pageNum);
  };


  /******** get current page Users (users calculation) ********/
  let indexOfLastUser = currentPage * usersPerPage;
  let indexOfFirstUser = indexOfLastUser - usersPerPage;
  let currentUsers =
    searchVal.length === 0
      ? userList.slice(indexOfFirstUser, indexOfLastUser)
      : searchList.slice(indexOfFirstUser, indexOfLastUser);


  return (
    <div className="dashboard-container">
      <h1 className="heading">Admin UI</h1>
      <div className="search">
        <SearchUser
          value={searchVal}
          changeValue={setSearchVal}
          search={handleSearchUser}
        />
      </div>
      <div style={{ border: "1px solid black", width: "90vw" }}>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="150px"
          >
            <h1>Loading.....</h1>
            <CircularProgress />
          </Box>
        ) : (
          <UserList
            userList={searchVal.length === 0 ? currentUsers : userList}
            deleteUser={handleDeleteUser}
            updateUser={handleInputChange}
            setCheckedUsers={setCheckedUsers}
            isCheckboxClick={isCheckboxClicked}
            setIsCheckboxClick={setIsCheckboxClicked}
          />
        )}
      </div>
      <div>
        <Stack onClick={handleDeleteSelectedUsers}>
          <DeleteSelectedUsers />
        </Stack>
        <Pagination
          usersPerPage={usersPerPage}
          totalUsers={totalUsers}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Dashboard;
