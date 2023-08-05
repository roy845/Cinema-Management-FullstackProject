import { Box, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { DatePicker } from "@mui/x-date-pickers";
import { createMovie } from "../Api/serverAPI";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";

const EditMovie = () => {
  const [movie, setMovie] = useState({
    Name: "",
    Genres: [],
    Image: "",
    Premiered: "",
  });

  const [date, setDate] = useState(null);
  const navigate = useNavigate();

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

      await createMovie(movie);
      toast.success(`Movie ${movie.Name} is created successfully!`);
      navigate("/movies/allMovies");
    } catch (error) {
      toast.error(error);
    }
  };

  console.log(movie);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Add Movie</h1>

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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<SaveIcon />}
            disabled={
              !movie.Name ||
              movie.Genres.length === 0 ||
              !movie.Image ||
              !movie.Premiered
            }
          >
            Save
          </Button>
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: "red", color: "white" }}
            onClick={() => navigate("/movies/allMovies")}
            endIcon={<CancelIcon />}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditMovie;
