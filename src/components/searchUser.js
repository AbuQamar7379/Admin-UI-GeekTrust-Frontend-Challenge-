import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchUser = ({ value, changeValue, search }) => {
  return (
    <TextField
      size="small"
      color="warning"
      placeholder="Search by name, email or role"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Search color="warning" />
          </InputAdornment>
        ),
      }}
      style={{ minWidth: 400 }}
      value={value}
      onChange={(e) => {
        changeValue(e.target.value);
        search(e.target.value);
      }}
    />
  );
};

export default SearchUser;
