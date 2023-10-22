import { Box, Stack, Pagination, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Pagination_ = ({ usersPerPage, totalUsers, paginate, currentPage }) => {
  let totalPage = Math.ceil(totalUsers / usersPerPage);

  const handleChangePage = (event, value) => {
    paginate(value);
  };

  let theme = useTheme();
  let isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      margin="20px 0 50px 0"
    >
      <Stack>
        <Pagination
          count={totalPage}
          page={currentPage}
          onChange={handleChangePage}
          color="primary"
          showFirstButton
          showLastButton
          size={isSmallScreen ? "medium" : "large"}
        />
      </Stack>
    </Box>
  );
};

export default Pagination_;
