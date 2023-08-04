import React from "react";
import Layout from "../components/Layout";
import { Box, Button, Container } from "@material-ui/core";
import { Outlet, useNavigate } from "react-router";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PeopleIcon from "@mui/icons-material/People";

const UsersDashboard = () => {
  const navigate = useNavigate();
  return (
    <Layout title="Users Dashboard">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Users</h1>
        <Container maxWidth="sm">
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/users/allUsers")}
              startIcon={<PeopleIcon />}
            >
              All Users
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "green", color: "white" }}
              onClick={() => navigate("/users/addUser")}
              startIcon={<PersonAddIcon />}
            >
              Add User
            </Button>
          </Box>
          <Box sx={{ marginTop: "30px" }}>
            <Outlet />
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default UsersDashboard;
