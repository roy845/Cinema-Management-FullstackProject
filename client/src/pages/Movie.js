import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovie } from "../Api/serverAPI";
import { toast } from "react-hot-toast";
import { Box, Button, TextField } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const Movie = () => {
  let { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await getMovie(movieId);
        setMovie(data);
        setIsLoading(false);
      } catch (error) {
        toast.error(error);
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {isLoading ? (
        <Spinner text={"movie"} />
      ) : (
        <>
          <h1 style={{ textAlign: "center" }}>{movie?.Name}</h1>
          {movie && (
            <>
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
                  style={{ width: "300px" }}
                />
                <TextField
                  label="Genres"
                  name="Genres"
                  variant="outlined"
                  value={movie?.Genres?.join(", ")}
                  style={{ width: "300px" }}
                />
                <TextField
                  label="Image Url"
                  name="Image"
                  variant="outlined"
                  value={movie.Image}
                  style={{ width: "300px" }}
                />
                <TextField
                  label="Date Premiered"
                  name="Date Premiered"
                  variant="outlined"
                  value={new Date(movie.Premiered).toLocaleDateString()}
                  style={{ width: "300px" }}
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
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    marginTop: "20px",
                  }}
                  onClick={() => navigate("/movies/allMovies")}
                >
                  Back to movies
                </Button>
              </Box>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default Movie;
