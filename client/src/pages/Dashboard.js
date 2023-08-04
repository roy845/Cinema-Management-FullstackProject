import React from "react";
import Layout from "../components/Layout";
import { Box, Container, Grid } from "@material-ui/core";
import FancyBox from "../components/FancyBox";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import MovieIcon from "@mui/icons-material/Movie";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { useAuth } from "../contex/auth";

const Dashboard = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const menuItems = [
    {
      name: "Movies",
      icon: <MovieIcon />,
      onClick: () => {
        navigate("/movies");
      },
    },
    {
      name: "Subscriptions",
      icon: <SubscriptionsIcon />,
      onClick: () => {
        navigate("/members");
      },
    },
    {
      name: "Users Management",
      icon: <PeopleIcon />,
      onClick: () => {
        navigate("/users");
      },
    },
    {
      name: "Logout",
      icon: <LogoutIcon />,
      onClick: () => {
        setAuth(null);
        localStorage.removeItem("auth");
        navigate("/");
        toast.success("Logout Successfully");
        document.title = "Cinema Management App";
      },
    },
  ];

  const filteredMenu = menuItems.filter(
    (mi) => !(mi.name === "Users Management" && !auth?.user?.isAdmin)
  );

  return (
    <Layout title="Dashboard">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ textAlign: "center" }}> Dashboard</h1>
        <Container maxWidth="sm">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            {auth?.user?.isAdmin ? (
              <Grid container spacing={3}>
                {filteredMenu.map((box, index) => (
                  <Grid item xs={6} key={index}>
                    <FancyBox onClick={box.onClick}>{box.name}</FancyBox>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box display="flex" justifyContent="center">
                {filteredMenu.map((box, index) => (
                  <Box key={index} m={1}>
                    <FancyBox
                      onClick={box.onClick}
                      width="200px"
                      height="200px"
                    >
                      {box.name}
                    </FancyBox>
                  </Box>
                ))}
              </Box>
            )}
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

export default Dashboard;
