import "../css/userList.css";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { useState } from "react";


const UserList = ({
  userList,
  deleteUser,
  updateUser: inputChange,
  setCheckedUsers,
}) => {
  let [editMode, setEditMode] = useState(userList.map(() => false));
  let [isClicked, setIsClick] = useState(false); // for header checkbox
  let [checkedUserIndices, setCheckedUserIndices] = useState([]);

  
  // handle Edit and Save Icon
  const handleEditMode = (index) => {
    let updateMode = [...editMode];
    updateMode[index] = !updateMode[index];
    setEditMode(updateMode);
  };


  // handle header checkbox click
  const handleCheckClick = () => {
    setIsClick(!isClicked);
    if (!isClicked) {
      // If not all checkboxes are checked, set all user indices as checked
      setCheckedUserIndices(userList.map((user) => user.id));
      setCheckedUsers(userList.map((user) => user.id));
    } else {
      // If all checkboxes are checked, clear the checked user indices
      setCheckedUserIndices([]);
    }
  };


  // handle individual body checkbox click
  const handleIndividualCheckbox = (id) => {
    const updatedIndices = [...checkedUserIndices];
    if (updatedIndices.includes(id)) {
      // If the id is in the array, remove it to uncheck the box
      updatedIndices.splice(updatedIndices.indexOf(id), 1);
    } else {
      // If the id is not in the array, add it to check the box
      updatedIndices.push(id);
    }
    userList.length === updatedIndices.length
      ? setIsClick(true)
      : setIsClick(false);
    setCheckedUserIndices(updatedIndices);
    setCheckedUsers(updatedIndices);
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={isClicked}
                onChange={handleCheckClick}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((list, index) => {
            let isChecked = checkedUserIndices.includes(list.id);
            let rowClassName = isChecked ? "checked-row" : "unchecked-row";
            return (
              <tr key={list.id} className={rowClassName}>
                <td>
                  <input
                    type="checkbox"
                    checked={checkedUserIndices.includes(list.id)}
                    onChange={() => handleIndividualCheckbox(list.id)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={list.name}
                    disabled={!editMode[index]}
                    onChange={(event) => inputChange(event, index, "name")}
                  />
                </td>
                <td>
                  <input
                    type="email"
                    value={list.email}
                    disabled={!editMode[index]}
                    onChange={(event) => inputChange(event, index, "email")}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={list.role}
                    disabled={!editMode[index]}
                    onChange={(event) => inputChange(event, index, "role")}
                  />
                </td>
                <td>
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
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {userList.length === 0 ? (
        <h1 style={{ textAlign: "center" }}>No User Found (Empty User)</h1>
      ) : null}
    </div>
  );
};

export default UserList;
