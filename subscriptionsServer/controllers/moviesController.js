const Movie = require("../models/Movie");
const Subscription = require("../models/Subscription");

module.exports = {
  getAllMoviesController: async (req, res) => {
    try {
      const movies = await Movie.find({});

      res.status(200).send(movies);
    } catch (error) {
      res.status(500).json({ message: err.message });
    }
  },

  getMovieController: async (req, res) => {
    try {
      const { movieId } = req.params;
      const movie = await Movie.findById({ _id: movieId });

      res.status(200).send(movie);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  createMovieController: async (req, res) => {
    try {
      const { movie } = req.body;

      const newMovie = await new Movie(movie).save();

      res.status(200).send(newMovie);
    } catch (error) {
      res.send({
        success: false,
        message: "Error in updating movie",
        error,
      });
    }
  },

  updateMovieController: async (req, res) => {
    try {
      const { movieId } = req.params;
      const { updatedMovie } = req.body;

      const movie = await Movie.findByIdAndUpdate(movieId, updatedMovie, {
        new: true,
      });

      if (!movie) {
        return res.status(404).send({
          success: false,
          message: "Movie not found",
        });
      }

      res.status(200).send(movie);
    } catch (error) {
      res.send({
        success: false,
        message: "Error in updating movie",
        error,
      });
    }
  },

  deleteMovieController: async (req, res) => {
    try {
      const { movieId } = req.params;

      const deleteMovie = await Movie.findByIdAndDelete({ _id: movieId });

      if (!deleteMovie) {
        return res.status(404).json({
          success: false,
          message: "Movie not found",
        });
      }

      await Subscription.updateMany(
        {},
        { $pull: { Movies: { movieId: movieId } } }
      );

      res.send({
        success: true,
        message: "Movie deleted successfully",
      });
    } catch (error) {
      res.send({
        success: false,
        message: "Error in deleting movie",
        error,
      });
    }
  },
};
