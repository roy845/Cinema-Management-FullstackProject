import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Outlet, useNavigate } from "react-router";
import { Box, Button, Container } from "@mui/material";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import MovieIcon from "@mui/icons-material/Movie";
import { getPermissions } from "../Api/serverAPI";
import { useAuth } from "../contex/auth";
import { toast } from "react-hot-toast";

const MoviesDashboard = () => {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState([]);

  const { auth, setAuth } = useAuth();
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const { data } = await getPermissions(auth?.user?._id);
        setPermissions(
          data.permissions
            .filter((permission) => permission.checked)
            .map((permission) => permission.name)
        );
      } catch (error) {
        toast.error(error);
      }
    };

    fetchPermissions();
  }, []);

  return (
    <Layout title="Movies Dashboard">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Movies</h1>
        <Container maxWidth="sm">
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            {permissions?.includes("View Movies") && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/movies/allMovies")}
                startIcon={<MovieIcon />}
              >
                All Movies
              </Button>
            )}
            {permissions?.includes("Create Movies") && (
              <Button
                variant="contained"
                style={{ backgroundColor: "green", color: "white" }}
                onClick={() => navigate("/movies/addMovie")}
                startIcon={<MovieCreationIcon />}
              >
                Add Movie
              </Button>
            )}
          </Box>
          <Box sx={{ marginTop: "30px" }}>
            <Outlet />
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default MoviesDashboard;
