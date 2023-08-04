const {
  getAllMovies,
  getMovie,
  updateMovie,
  createMovie,
  deleteMovie,
} = require("../Api/serverAPI");

const getAllMoviesController = async (req, res) => {
  try {
    const { data } = await getAllMovies();

    res.status(200).send(data);
  } catch (error) {
    res.send({
      success: false,
      message: "Error in getting all movies",
      error,
    });
  }
};

const getMovieController = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { data } = await getMovie(movieId);

    res.status(200).send(data);
  } catch (error) {
    res.send({
      success: false,
      message: "Error in getting movie",
      error,
    });
  }
};

const createMovieController = async (req, res) => {
  try {
    const { movie } = req.body;
    const { data } = await createMovie(movie);

    res.status(200).send(data);
  } catch (error) {
    res.send({
      success: false,
      message: "Error in creating movie",
      error,
    });
  }
};

const updateMovieController = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { updatedMovie } = req.body;
    const { data } = await updateMovie(movieId, updatedMovie);

    res.status(200).send(data);
  } catch (error) {
    res.send({
      success: false,
      message: "Error in updating movie",
      error,
    });
  }
};

const deleteMovieController = async (req, res) => {
  try {
    const { movieId } = req.params;

    const { data } = await deleteMovie(movieId);

    res.status(200).send(data);
  } catch (error) {
    res.send({
      success: false,
      message: "Error in deleting movie",
      error,
    });
  }
};

module.exports = {
  getAllMoviesController,
  getMovieController,
  deleteMovieController,
  createMovieController,
  updateMovieController,
};
