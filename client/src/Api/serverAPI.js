import axios from "axios";
const CINEMA_BASE_URL = "http://localhost:8801/";
// const SUBSCRIPTIONS_BASE_URL = "http://localhost:8800/";

const API_URLS = {
  login: `${CINEMA_BASE_URL}api/auth/login`,
  register: `${CINEMA_BASE_URL}api/auth/register`,
  getAllUsers: `${CINEMA_BASE_URL}api/users/getAllUsers`,
  getUser: `${CINEMA_BASE_URL}api/users/getUser/`,
  addUser: `${CINEMA_BASE_URL}api/users/addUser`,
  updateUser: `${CINEMA_BASE_URL}api/users/updateUser/`,
  deleteUser: `${CINEMA_BASE_URL}api/users/deleteUser/`,
  getTimeout: `${CINEMA_BASE_URL}api/users/getTimeoutSession/`,
  updateTimeout: `${CINEMA_BASE_URL}api/users/updateTimeoutSession/`,
  getAllMovies: `${CINEMA_BASE_URL}api/movies/getAllMovies`,
  getMovie: `${CINEMA_BASE_URL}api/movies/getMovie/`,
  createMovie: `${CINEMA_BASE_URL}api/movies/createMovie`,
  updateMovie: `${CINEMA_BASE_URL}api/movies/updateMovie/`,
  deleteMovie: `${CINEMA_BASE_URL}api/movies/deleteMovie/`,
  deleteMember: `${CINEMA_BASE_URL}api/members/deleteMember/`,
  getAllMembers: `${CINEMA_BASE_URL}api/members/getAllMembers`,
  getMember: `${CINEMA_BASE_URL}api/members/getMember/`,
  createMember: `${CINEMA_BASE_URL}api/members/createMember`,
  updateMember: `${CINEMA_BASE_URL}api/members/updateMember/`,
  subscribeToMovie: `${CINEMA_BASE_URL}api/members/subscribeToMovie`,
  getAllSubscriptions: `${CINEMA_BASE_URL}api/subscriptions/getAllSubscriptions`,
  getPermissions: `${CINEMA_BASE_URL}api/users/getPermissions/`,
};

export const login = (UserName, Password) => {
  try {
    return axios.post(API_URLS.login, { UserName, Password });
  } catch (error) {
    throw error;
  }
};

export const register = (FirstName, LastName, UserName, Password) => {
  try {
    return axios.post(API_URLS.register, {
      FirstName,
      LastName,
      UserName,
      Password,
    });
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = () => {
  try {
    return axios.get(API_URLS.getAllUsers);
  } catch (error) {
    throw error;
  }
};

export const getUser = (id) => {
  try {
    return axios.get(`${API_URLS.getUser}${id}`);
  } catch (error) {
    throw error;
  }
};

export const deleteUser = (id) => {
  try {
    return axios.delete(`${API_URLS.deleteUser}${id}`);
  } catch (error) {
    throw error;
  }
};

export const addUser = (user, permissions) => {
  try {
    return axios.post(`${API_URLS.addUser}`, { user, permissions });
  } catch (error) {
    throw error;
  }
};

export const updateUser = (id, updatedUser, permissions) => {
  try {
    return axios.put(`${API_URLS.updateUser}${id}`, {
      updatedUser,
      permissions,
    });
  } catch (error) {
    throw error;
  }
};

export const getTimeout = (id) => {
  try {
    return axios.get(`${API_URLS.getTimeout}${id}`);
  } catch (error) {
    throw error;
  }
};

export const updateTimeout = (id, updatedSeconds) => {
  try {
    return axios.put(`${API_URLS.updateTimeout}${id}`, { updatedSeconds });
  } catch (error) {
    throw error;
  }
};

export const getPermissions = (id) => {
  try {
    return axios.get(`${API_URLS.getPermissions}${id}`);
  } catch (error) {
    throw error;
  }
};

export const getAllMovies = () => {
  try {
    return axios.get(API_URLS.getAllMovies);
  } catch (error) {
    throw error;
  }
};

export const getMovie = (id) => {
  try {
    return axios.get(`${API_URLS.getMovie}${id}`);
  } catch (error) {
    throw error;
  }
};

export const createMovie = (movie) => {
  try {
    return axios.post(`${API_URLS.createMovie}`, { movie });
  } catch (error) {
    throw error;
  }
};

export const updateMovie = (id, updatedMovie) => {
  try {
    return axios.put(`${API_URLS.updateMovie}${id}`, { updatedMovie });
  } catch (error) {
    throw error;
  }
};

export const deleteMovie = (id) => {
  try {
    return axios.delete(`${API_URLS.deleteMovie}${id}`);
  } catch (error) {
    throw error;
  }
};

export const deleteMember = (id) => {
  try {
    return axios.delete(`${API_URLS.deleteMember}${id}`);
  } catch (error) {
    throw error;
  }
};

export const subscribeToMovie = (subscription) => {
  try {
    return axios.post(`${API_URLS.subscribeToMovie}`, { subscription });
  } catch (error) {
    throw error;
  }
};

export const getAllMembers = () => {
  try {
    return axios.get(`${API_URLS.getAllMembers}`);
  } catch (error) {
    throw error;
  }
};

export const getMember = (id) => {
  try {
    return axios.get(`${API_URLS.getMember}${id}`);
  } catch (error) {
    throw error;
  }
};

export const createMember = (member) => {
  try {
    return axios.post(`${API_URLS.createMember}`, { member });
  } catch (error) {
    throw error;
  }
};

export const updateMember = (id, member) => {
  try {
    return axios.put(`${API_URLS.updateMember}${id}`, { member });
  } catch (error) {
    throw error;
  }
};

export const getAllSubscriptions = () => {
  try {
    return axios.get(`${API_URLS.getAllSubscriptions}`);
  } catch (error) {
    throw error;
  }
};

export default API_URLS;
