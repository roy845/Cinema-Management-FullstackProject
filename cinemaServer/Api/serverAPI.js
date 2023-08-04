const axios = require("axios");

const SUBSCRIPTIONS_BASE_URL = "http://localhost:8800/";

const API_URLS = {
  getAllMovies: `${SUBSCRIPTIONS_BASE_URL}api/movies/getAllMovies`,
  getMovie: `${SUBSCRIPTIONS_BASE_URL}api/movies/getMovie/`,
  getMovie: `${SUBSCRIPTIONS_BASE_URL}api/movies/getMovie/`,
  createMovie: `${SUBSCRIPTIONS_BASE_URL}api/movies/createMovie`,
  updateMovie: `${SUBSCRIPTIONS_BASE_URL}api/movies/updateMovie/`,
  deleteMovie: `${SUBSCRIPTIONS_BASE_URL}api/movies/deleteMovie/`,
  subscribeToMovie: `${SUBSCRIPTIONS_BASE_URL}api/members/subscribeToMovie`,
  getAllMembers: `${SUBSCRIPTIONS_BASE_URL}api/members/getAllMembers`,
  getMember: `${SUBSCRIPTIONS_BASE_URL}api/members/getMember/`,
  deleteMember: `${SUBSCRIPTIONS_BASE_URL}api/members/deleteMember/`,
  createMember: `${SUBSCRIPTIONS_BASE_URL}api/members/createMember`,
  updateMember: `${SUBSCRIPTIONS_BASE_URL}api/members/updateMember/`,
  getAllSubscriptions: `${SUBSCRIPTIONS_BASE_URL}api/subscriptions/getAllSubscriptions`,
};

const getAllMovies = () => {
  try {
    return axios.get(API_URLS.getAllMovies);
  } catch (error) {
    throw error;
  }
};

const getMovie = (id) => {
  try {
    return axios.get(`${API_URLS.getMovie}${id}`);
  } catch (error) {
    throw error;
  }
};

const createMovie = (movie) => {
  try {
    return axios.post(`${API_URLS.createMovie}`, { movie });
  } catch (error) {
    throw error;
  }
};

const updateMovie = (id, updatedMovie) => {
  try {
    return axios.put(`${API_URLS.updateMovie}${id}`, { updatedMovie });
  } catch (error) {
    throw error;
  }
};

const deleteMovie = (id) => {
  try {
    return axios.delete(`${API_URLS.deleteMovie}${id}`);
  } catch (error) {
    throw error;
  }
};

const subscribeToMovie = (subscription) => {
  try {
    return axios.post(`${API_URLS.subscribeToMovie}`, { subscription });
  } catch (error) {
    throw error;
  }
};

const getAllMembers = () => {
  try {
    return axios.get(`${API_URLS.getAllMembers}`);
  } catch (error) {
    throw error;
  }
};

const getMember = (id) => {
  try {
    return axios.get(`${API_URLS.getMember}${id}`);
  } catch (error) {
    throw error;
  }
};

const deleteMember = (id) => {
  try {
    return axios.delete(`${API_URLS.deleteMember}${id}`);
  } catch (error) {
    throw error;
  }
};

const createMember = (member) => {
  try {
    return axios.post(`${API_URLS.createMember}`, { member });
  } catch (error) {
    throw error;
  }
};

const updateMember = (id, member) => {
  try {
    return axios.put(`${API_URLS.updateMember}${id}`, { member });
  } catch (error) {
    throw error;
  }
};

const getAllSubscriptions = () => {
  try {
    return axios.get(`${API_URLS.getAllSubscriptions}`);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  subscribeToMovie,
  getAllMembers,
  getMember,
  deleteMember,
  createMember,
  updateMember,
  getAllSubscriptions,
};
