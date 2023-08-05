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
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import { toast } from "react-hot-toast";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import {
  getAllMembers,
  deleteMember,
  getAllMovies,
  getAllSubscriptions,
  getPermissions,
  subscribeToMovie,
} from "../Api/serverAPI";
import Spinner from "../components/Spinner";
import NoMoviesToShow from "../components/NoMoviesToShow";
import { useNavigate } from "react-router";
import { useAuth } from "../contex/auth";
import { DatePicker } from "@mui/x-date-pickers";
import { Link } from "react-router-dom";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [term, setTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [permissions, setPermissions] = useState([]);
  const [showSubscribeForm, setShowSubscribeForm] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [subscription, setSubscription] = useState({
    MemberId: "",
    movieId: "",
    date: "",
  });

  const [selectedMember, setSelectedMember] = useState("");

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
        { data: membersData },
        { data: moviesData },
        { data: subscriptionsData },
      ] = await Promise.all([
        getAllMembers(),
        getAllMovies(),
        getAllSubscriptions(),
      ]);

      const moviesById = moviesData.reduce((acc, movie) => {
        acc[movie._id] = movie;
        return acc;
      }, {});

      const membersWithMoviesAndDates = membersData.map((member) => {
        const relatedSubscriptions = subscriptionsData.filter(
          (subscription) => subscription.MemberId._id === member._id
        );

        const moviesWithDates = relatedSubscriptions.flatMap((subscription) =>
          subscription.Movies.map((movieObj) => {
            const movie = moviesById[movieObj.movieId._id];
            const dateWatched = movieObj.date;
            return { movie, dateWatched };
          })
        );

        const watchedMovieIds = new Set(
          moviesWithDates.map((movieObj) => movieObj.movie._id)
        );
        const moviesNotWatched = Object.values(moviesById).filter(
          (movie) => !watchedMovieIds.has(movie._id)
        );

        return {
          ...member,
          moviesWithDates,
          moviesNotWatched,
        };
      });

      setMembers(membersWithMoviesAndDates);
      setIsLoading(false);
    } catch (error) {
      toast.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const navigateToEditMember = (id) => {
    navigate(`/editMember/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteMember(id);
      await fetchAllData();
      toast.success("Member deleted successfully!");
    } catch (error) {
      toast.error(error);
    }
  };

  const showSubscribeFormHandler = (id) => {
    if (showSubscribeForm && selectedMember === id) {
      setSubscription((prevSubscription) => ({
        ...prevSubscription,
        MemberId: "",
        movieId: "",
        date: "",
      }));
      setShowSubscribeForm(false);
      setSelectedMember("");
      setSelectedMovieId("");
    } else {
      setSubscription((prevSubscription) => ({
        ...prevSubscription,
        MemberId: id,
      }));
      setShowSubscribeForm(true);
      setSelectedMember(id);
    }
  };

  const handleSubscribe = async () => {
    try {
      await subscribeToMovie(subscription);
      setShowSubscribeForm(false);
      setSelectedMovieId("");
      setSubscription((prevSubscription) => ({
        ...prevSubscription,
        MemberId: "",
        movieId: "",
        date: "",
      }));
      fetchAllData();
      toast.success("Member subscribe to the movie successfully!");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleMovieSelect = (e) => {
    setSelectedMovieId(e.target.value);

    setSubscription({
      ...subscription,
      movieId: e.target.value,
    });
  };

  const filteredMembers = search
    ? members.filter((member) =>
        member?.Name?.toLowerCase().includes(search.toLowerCase())
      )
    : members;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {isLoading ? (
        <Spinner text={"members"} />
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
              label="Find Member"
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
          {filteredMembers.length > 0 && (
            <div>
              <strong>Total Members:</strong> {filteredMembers.length}
            </div>
          )}
          {(search || !search) && filteredMembers.length > 0 ? (
            <TableContainer style={{ width: "200%" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{ border: "1px solid #000", textAlign: "center" }}
                    >
                      <strong>Member Name</strong>
                    </TableCell>
                    <TableCell
                      style={{ border: "1px solid #000", textAlign: "center" }}
                    >
                      <strong>Email</strong>
                    </TableCell>
                    <TableCell
                      style={{ border: "1px solid #000", textAlign: "center" }}
                    >
                      <strong>City</strong>
                    </TableCell>

                    <TableCell
                      style={{ border: "1px solid #000", textAlign: "center" }}
                    >
                      <strong>Movies Watched</strong>
                    </TableCell>

                    <TableCell
                      style={{ border: "1px solid #000", textAlign: "center" }}
                    >
                      <strong>Actions</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredMembers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((member) => (
                      <TableRow key={member?._id}>
                        <TableCell
                          style={{
                            border: "1px solid #000",
                            textAlign: "center",
                          }}
                        >
                          <strong>{member?.Name}</strong>
                        </TableCell>
                        <TableCell
                          style={{
                            border: "1px solid #000",
                            textAlign: "center",
                          }}
                        >
                          <strong>{member?.Email}</strong>
                        </TableCell>
                        <TableCell
                          style={{
                            border: "1px solid #000",
                            textAlign: "center",
                          }}
                        >
                          <strong>{member?.City}</strong>
                        </TableCell>

                        <TableCell
                          style={{
                            border: "1px solid #000",
                            textAlign: "center",
                          }}
                        >
                          <Button
                            color="primary"
                            variant="contained"
                            style={{
                              marginRight: "10px",
                              backgroundColor: "blue",
                              color: "white",
                            }}
                            onClick={() =>
                              showSubscribeFormHandler(member?._id)
                            }
                            endIcon={<AddIcon />}
                          >
                            Subscribe to a new movie
                          </Button>

                          {showSubscribeForm &&
                            selectedMember === member?._id && (
                              <div>
                                <h3>Add a new movie</h3>

                                <FormControl
                                  sx={{
                                    minWidth: 420,

                                    marginRight: "10px",
                                  }}
                                >
                                  <InputLabel id="product-select-label">
                                    Select Movie
                                  </InputLabel>
                                  <Select
                                    labelId="movie-select-label"
                                    variant="outlined"
                                    id="movie-select"
                                    value={selectedMovieId}
                                    onChange={handleMovieSelect}
                                    select
                                    fullWidth
                                  >
                                    {member.moviesNotWatched?.map((movie) => (
                                      <MenuItem
                                        key={movie._id}
                                        value={movie._id}
                                      >
                                        {movie.Name}
                                      </MenuItem>
                                    ))}
                                  </Select>

                                  <DatePicker
                                    sx={{
                                      marginTop: "20px",
                                    }}
                                    value={subscription?.date}
                                    required
                                    onChange={(date) =>
                                      setSubscription({
                                        ...subscription,
                                        date: date,
                                      })
                                    }
                                  />
                                  <Button
                                    color="primary"
                                    variant="contained"
                                    style={{
                                      marginRight: "10px",
                                      backgroundColor: "blue",
                                      color: "white",
                                      marginTop: "10px",
                                    }}
                                    onClick={handleSubscribe}
                                    endIcon={<AddIcon />}
                                    disabled={
                                      !selectedMovieId || !subscription.date
                                    }
                                  >
                                    Subscribe
                                  </Button>
                                </FormControl>
                              </div>
                            )}

                          <ul>
                            {member.moviesWithDates?.map(
                              ({ movie, dateWatched }) => (
                                <li key={movie._id}>
                                  <Link to={`/movies/${movie._id}`}>
                                    <strong>{movie.Name}</strong>
                                  </Link>{" "}
                                  {" , "}
                                  <strong>
                                    {new Date(dateWatched).toLocaleDateString()}
                                  </strong>
                                </li>
                              )
                            )}
                          </ul>

                          <strong>{member?.subscriptions?.join(", ")}</strong>
                        </TableCell>
                        <TableCell
                          style={{
                            border: "1px solid #000",
                            textAlign: "center",
                          }}
                        >
                          {permissions?.includes("Update Subscriptions") && (
                            <Button
                              color="primary"
                              variant="contained"
                              style={{
                                marginRight: "10px",
                                backgroundColor: "purple",
                                color: "white",
                              }}
                              onClick={() => navigateToEditMember(member?._id)}
                              endIcon={<EditIcon />}
                            >
                              Edit
                            </Button>
                          )}
                          {permissions?.includes("Delete Subscriptions") && (
                            <Button
                              style={{ backgroundColor: "red", color: "white" }}
                              variant="contained"
                              onClick={() => handleDelete(member._id)}
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
                count={filteredMembers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                  setRowsPerPage(parseInt(event.target.value, 10));
                  setPage(0);
                }}
              />
            </TableContainer>
          ) : search || filteredMembers.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <NoMoviesToShow type={"members"} />
            </Box>
          ) : null}
        </>
      )}
    </Box>
  );
};

export default Members;
