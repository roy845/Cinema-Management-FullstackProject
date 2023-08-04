const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/dbConn");
const routes = require("./routes");

const morgan = require("morgan");
const cors = require("cors");

dotenv.config();

const PORT = process.env.PORT || 8800;

//database connection
connectDB();

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use(routes);

// const axios = require("axios");
// const Member = require("./models/Member");
// const Movie = require("./models/Movie");
// fetchDataAndPopulate = async () => {
//   try {
//     // Fetch members data
//     const membersResponse = await axios.get(
//       "https://jsonplaceholder.typicode.com/users"
//     );
//     const members = membersResponse.data.map((user) => ({
//       Name: user.name,
//       Email: user.email,
//       City: user.address.city,
//     }));

//     // Insert members data into Members collection
//     await Member.insertMany(members);

//     // Fetch movies data
//     const moviesResponse = await axios.get("https://api.tvmaze.com/shows");
//     const movies = moviesResponse.data.map((movie) => ({
//       Name: movie.name,
//       Genres: movie.genres,
//       Image: movie.image.medium,
//       Premiered: new Date(movie.premiered),
//     }));

//     // Insert movies data into Movies collection
//     await Movie.insertMany(movies);

//     console.log("Data has been fetched and populated successfully.");
//   } catch (err) {
//     console.error(err.message);
//   }
// };

// // Run the function when the server starts
// fetchDataAndPopulate();

app.listen(PORT, () =>
  console.log(`Backend server is running on PORT ${PORT}`)
);
