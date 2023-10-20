import { Button, Box } from "@mui/material";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

const DeleteSelectedUsers = () => {
  return (
    <Box display="flex" justifyContent="center" marginTop={2}>
      <Button
        variant="outlined"
        color="error"
        startIcon={<DeleteTwoToneIcon />}
      >
        Delete Selected
      </Button>
    </Box>
  );
};
export default DeleteSelectedUsers;
