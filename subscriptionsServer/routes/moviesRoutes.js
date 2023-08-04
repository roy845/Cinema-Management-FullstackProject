const express = require("express");

const router = express.Router();

const {
  getAllMoviesController,
  getMovieController,
  updateMovieController,
  deleteMovieController,
  createMovieController,
} = require("../controllers/moviesController");

//getAllMovies || METHOD GET
router.get("/getAllMovies", getAllMoviesController);

//GetMovie || METHOD GET
router.get("/getMovie/:movieId", getMovieController);

//GetMovie || METHOD GET
router.get("/getMovie/:movieId", getMovieController);

//UpdateMovie || METHOD POST
router.post("/createMovie", createMovieController);

//deleteMovie || METHOD DELETE
router.delete("/deleteMovie/:movieId", deleteMovieController);

//UpdateMovie || METHOD PUT
router.put("/updateMovie/:movieId", updateMovieController);

module.exports = router;
