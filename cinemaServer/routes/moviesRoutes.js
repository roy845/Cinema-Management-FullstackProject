const express = require("express");
const {
  getAllMoviesController,
  getMovieController,
  createMovieController,
  updateMovieController,
  deleteMovieController,
} = require("../controllers/moviesController");

const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

//router object
const router = express.Router();

//routing

//GetAllMovies || METHOD GET
router.get("/getAllMovies", requireSignIn, getAllMoviesController);

//GetMovie || METHOD GET
router.get("/getMovie/:movieId", requireSignIn, getMovieController);

//UpdateMovie || METHOD POST
router.post("/createMovie", requireSignIn, createMovieController);

//UpdateMovie || METHOD PUT
router.put("/updateMovie/:movieId", requireSignIn, updateMovieController);

//UpdateMovie || METHOD DELETE
router.delete("/deleteMovie/:movieId", requireSignIn, deleteMovieController);

module.exports = router;
