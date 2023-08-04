import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  TablePagination,
} from "@material-ui/core";
import { toast } from "react-hot-toast";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@mui/icons-material/Search";
import {
  getAllMembers,
  getAllMovies,
  getAllSubscriptions,
  getPermissions,
  deleteMovie,
} from "../Api/serverAPI";
import Spinner from "../components/Spinner";
import NoMoviesToShow from "../components/NoMoviesToShow";
import { useNavigate } from "react-router";
import { useAuth } from "../contex/auth";
import { Link } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [term, setTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [permissions, setPermissions] = useState([]);

  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();

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

  const fetchAllData = async () => {
    try {
      const [
        { data: moviesData },
        { data: subscriptionsData },
        { data: membersData },
      ] = await Promise.all([
        getAllMovies(),
        getAllSubscriptions(),
        getAllMembers(),
      ]);

      const membersById = membersData.reduce((acc, member) => {
        acc[member._id] = member;
        return acc;
      }, {});

      const moviesWithMembersAndDates = moviesData.map((movie) => {
        const relatedSubscriptions = subscriptionsData.filter((subscription) =>
          subscription.Movies.some(
            (movieObj) => movieObj.movieId._id === movie._id
          )
        );

        const membersWithDates = relatedSubscriptions.map((subscription) => {
          const member = membersById[subscription.MemberId._id];
          const dateWatched = subscription.Movies.find(
            (movieObj) => movieObj.movieId._id === movie._id
          ).date;
          return { member, dateWatched };
        });

        return {
          ...movie,
          membersWithDates,
        };
      });

      const sortedMovies = moviesWithMembersAndDates.sort(
        (a, b) => new Date(b.Premiered) - new Date(a.Premiered)
      );
      setMovies(sortedMovies);
      setIsLoading(false);
    } catch (error) {
      toast.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const navigateToEditMovie = (id) => {
    navigate(`/editMovie/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteMovie(id);
      await fetchAllData();
      toast.success("Movie deleted successfully!");
    } catch (error) {
      toast.error(error);
    }
  };

  const filteredMovies = search
    ? movies.filter((movie) =>
        movie?.Name?.toLowerCase().includes(search.toLowerCase())
      )
    : movies;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {isLoading ? (
        <Spinner text={"movies"} />
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "58%",
              marginBottom: "1em",
            }}
          >
            <TextField
              label="Find Movie"
              variant="outlined"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => setSearch(term)}
              startIcon={<SearchIcon />}
            >
              Find
            </Button>
          </Box>
          {filteredMovies.length > 0 && (
            <div>
              <strong>Total Movies:</strong> {filteredMovies.length}
            </div>
          )}
          {(search || !search) && filteredMovies.length > 0 ? (
            <TableContainer style={{ width: "200%" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{ border: "1px solid #000", textAlign: "center" }}
                    >
                      <strong>Movie Name</strong>
                    </TableCell>
                    <TableCell
                      style={{ border: "1px solid #000", textAlign: "center" }}
                    >
                      <strong>Image</strong>
                    </TableCell>
                    <TableCell
                      style={{ border: "1px solid #000", textAlign: "center" }}
                    >
                      <strong>Genres</strong>
                    </TableCell>

                    <TableCell
                      style={{ border: "1px solid #000", textAlign: "center" }}
                    >
                      <strong>Year</strong>
                    </TableCell>
                    <TableCell
                      style={{ border: "1px solid #000", textAlign: "center" }}
                    >
                      <strong>Subscriptions</strong>
                    </TableCell>
                    <TableCell
                      style={{ border: "1px solid #000", textAlign: "center" }}
                    >
                      <strong>Actions</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredMovies
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((movie) => (
                      <TableRow key={movie?._id}>
                        <TableCell
                          style={{
                            border: "1px solid #000",
                            textAlign: "center",
                          }}
                        >
                          <strong>{movie?.Name}</strong>
                        </TableCell>
                        <TableCell
                          style={{
                            border: "1px solid #000",
                            textAlign: "center",
                          }}
                        >
                          <img src={movie?.Image} style={{ width: 50 }} />
                        </TableCell>
                        <TableCell
                          style={{
                            border: "1px solid #000",
                            textAlign: "center",
                          }}
                        >
                          <strong>{movie?.Genres?.join(", ")}</strong>
                        </TableCell>

                        <TableCell
                          style={{
                            border: "1px solid #000",
                            textAlign: "center",
                          }}
                        >
                          <strong>
                            {
                              new Date(movie?.Premiered)
                                .toLocaleDateString()
                                .split(".")[2]
                            }
                          </strong>
                        </TableCell>
                        <TableCell
                          style={{
                            border: "1px solid #000",
                            textAlign: "center",
                          }}
                        >
                          <strong>
                            <ul>
                              {movie?.membersWithDates?.map((item) => (
                                <li>
                                  <Link to={`/editMember/${item.member._id}`}>
                                    {" "}
                                    <strong>{item.member.Name}</strong>
                                  </Link>

                                  {" , "}
                                  <strong>
                                    {new Date(
                                      item.dateWatched
                                    ).toLocaleDateString()}
                                  </strong>
                                </li>
                              ))}
                            </ul>
                          </strong>
                        </TableCell>
                        <TableCell
                          style={{
                            border: "1px solid #000",
                            textAlign: "center",
                          }}
                        >
                          {permissions?.includes("Update Movies") && (
                            <Button
                              color="primary"
                              variant="contained"
                              style={{
                                marginRight: "10px",
                                backgroundColor: "purple",
                                color: "white",
                              }}
                              onClick={() => navigateToEditMovie(movie?._id)}
                              endIcon={<EditIcon />}
                            >
                              Edit
                            </Button>
                          )}
                          {permissions?.includes("Delete Movies") && (
                            <Button
                              style={{ backgroundColor: "red", color: "white" }}
                              variant="contained"
                              onClick={() => handleDelete(movie._id)}
                              endIcon={<DeleteIcon />}
                            >
                              Delete
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={filteredMovies.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                  setRowsPerPage(parseInt(event.target.value, 10));
                  setPage(0);
                }}
              />
            </TableContainer>
          ) : search || filteredMovies.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <NoMoviesToShow type={"movies"} />
            </Box>
          ) : null}
        </>
      )}
    </Box>
  );
};

export default Movies;
