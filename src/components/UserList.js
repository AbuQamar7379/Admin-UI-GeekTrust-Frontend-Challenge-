import "../css/userList.css";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

const UserList = ({
  userList,
  deleteUser,
  updateUser: inputChange,
  setCheckedUsers,
  isCheckboxClick,
  setIsCheckboxClick
}) => {
  let [editMode, setEditMode] = useState(userList.map(() => false));
  let [checkedUserIndices, setCheckedUserIndices] = useState([]);


  /******** handle Edit and Save Icon ********/
  const handleEditMode = (index) => {
    let updateMode = [...editMode];
    updateMode[index] = !updateMode[index];
    setEditMode(updateMode);
  };


  /******** handle header checkbox click ********/
  const handleCheckClick = () => {
    setIsCheckboxClick(!isCheckboxClick)
    if (!isCheckboxClick) {
      // If not all checkboxes are checked, set all user indices as checked
      setCheckedUserIndices(userList.map((user) => user.id));
      setCheckedUsers(userList.map((user) => user.id));
    } else {
      // If all checkboxes are checked, clear the checked user indices
      setCheckedUserIndices([]);
    }
  };


  /******** handle individual body checkbox click ********/
  const handleIndividualCheckbox = (id) => {
    const updatedIndices = [...checkedUserIndices];
    if (updatedIndices.includes(id)) {
      // If the id is in the array, remove it to uncheck the box
      updatedIndices.splice(updatedIndices.indexOf(id), 1);
    } else {
      // If the id is not in the array, add it to check the box
      updatedIndices.push(id);
    }
    setIsCheckboxClick(updatedIndices.length === userList.length);
    setCheckedUserIndices(updatedIndices);
    setCheckedUsers(updatedIndices);
  };


  return (
    <div>
      <TableContainer
        sx={{
          maxHeight: {
            xs: 550,
            sm: 850,
          },
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow className="tableHeader">
              <TableCell>
                <input
                  type="checkbox"
                  checked={isCheckboxClick}
                  onChange={handleCheckClick}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((list, index) => {
              let isChecked = checkedUserIndices.includes(list.id);
              let rowClassName = isChecked ? "checked-row" : "unchecked-row";
              return (
                <TableRow key={list.id} className={rowClassName}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={checkedUserIndices.includes(list.id)}
                      onChange={() => handleIndividualCheckbox(list.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="text"
                      value={list.name}
                      disabled={!editMode[index]}
                      onChange={(event) => inputChange(event, index, "name")}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="email"
                      value={list.email}
                      disabled={!editMode[index]}
                      onChange={(event) => inputChange(event, index, "email")}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="text"
                      value={list.role}
                      disabled={!editMode[index]}
                      onChange={(event) => inputChange(event, index, "role")}
                    />
                  </TableCell>
                  <TableCell>
                    {editMode[index] ? (
                      <IconButton
                        aria-label="edit"
                        onClick={() => {
                          handleEditMode(index);
                        }}
                      >
                        <SaveIcon color="info" />
                      </IconButton>
                    ) : (
                      <IconButton
                        aria-label="edit"
                        onClick={() => {
                          handleEditMode(index);
                        }}
                      >
                        <BorderColorTwoToneIcon color="info" />
                      </IconButton>
                    )}

                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteUser(list.id)}
                    >
                      <DeleteTwoToneIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {userList.length === 0 ? <h1>No User Found (Empty User)</h1> : null}
    </div>
  );
};

export default UserList;
