import { Box, Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { getMovie, updateMovie } from "../Api/serverAPI";
import { toast } from "react-hot-toast";
import { DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns";

const EditMovie = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({
    Name: "",
    Genres: [],
    Image: "",
    Premiered: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await getMovie(movieId);
        setMovie(data);

        setDate(new Date(data?.Premiered));
        setIsLoading(false);
      } catch (error) {
        toast.error(error);
        setIsLoading(false);
      }
    };
    fetchMovie();
  }, []);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "Genres") {
      setMovie({ ...movie, [name]: value.split(", ") });
    } else {
      setMovie({ ...movie, [name]: value });
    }
  };

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();

      await updateMovie(movieId, movie);
      toast.success(`Movie ${movie.Name} is updated successfully!`);
      navigate("/movies/allMovies");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Layout title="Edit Movie">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Edit Movie - {movie?.Name}</h1>
        {movie && (
          <form
            onSubmit={handleFormSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              justifyContent: "center",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <img src={movie?.Image} />
              <TextField
                label="Movie Name"
                name="Name"
                variant="outlined"
                value={movie.Name}
                onChange={handleInputChange}
              />
              <TextField
                label="Genres"
                name="Genres"
                variant="outlined"
                value={movie?.Genres?.join(", ")}
                onChange={handleInputChange}
              />
              <TextField
                label="Image Url"
                name="Image"
                variant="outlined"
                value={movie.Image}
                onChange={handleInputChange}
              />
              <DatePicker
                value={date}
                label="Date"
                onChange={(date) => {
                  setDate(date);
                  setMovie({
                    ...movie,
                    Premiered: date,
                  });
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <Button type="submit" variant="contained" color="primary">
                Update
              </Button>
              <Button
                type="submit"
                variant="contained"
                style={{ backgroundColor: "red", color: "white" }}
                onClick={() => navigate("/movies/allMovies")}
              >
                Cancel
              </Button>
            </Box>
          </form>
        )}
      </Box>
    </Layout>
  );
};

export default EditMovie;
