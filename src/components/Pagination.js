import { Box, Stack, Pagination } from "@mui/material";

const Pagination_ = ({ usersPerPage, totalUsers, paginate, currentPage }) => {
  const totalPage = Math.ceil(totalUsers / usersPerPage);

  const handleChangePage = (event, value) => {
    paginate(value);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      margin="20px 0 50px 0"
    >
      <Stack spacing={2}>
        <Pagination
          count={totalPage}
          page={currentPage}
          onChange={handleChangePage}
          color="primary"
          showFirstButton
          showLastButton
          size="large"
        />
      </Stack>
    </Box>
  );
};

export default Pagination_;
