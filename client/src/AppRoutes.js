import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Movies from "./pages/Movies";
import UsersDashboard from "./pages/UsersDashboard";
import Subscriptions from "./pages/Subscriptions";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./contex/auth";
import AddUser from "./pages/AddUser";
import Users from "./pages/Users";
import RequireAuth from "./components/RequireAuth";
import EditUser from "./pages/EditUser";
import MoviesDashboard from "./pages/MoviesDashboard";
import AddMovie from "./pages/AddMovie";
import EditMovie from "./pages/EditMovie";
import MembersDashboard from "./pages/MembersDashboard";
import Members from "./pages/Members";
import AddMember from "./pages/AddMember";
import EditMember from "./pages/EditMember";
import NotFound from "./pages/NotFoundPage";
import Movie from "./pages/Movie";
import Timer from "./components/Timer";

const AppRoutes = () => {
  const { auth } = useAuth();

  return (
    <>
      {auth && <Timer />}
      <Routes>
        <Route path="/" element={!auth ? <Login /> : <Dashboard />} />

        <Route path="/register" element={<Register />} />

        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/subscriptions" element={<Subscriptions />} />

          <Route path="editUser/:userId" element={<EditUser />} />
          <Route path="editMember/:memberId" element={<EditMember />} />
          <Route path="editMovie/:movieId" element={<EditMovie />} />

          <Route path="/users" element={<UsersDashboard />}>
            <Route path="allUsers" element={<Users />} />
            <Route path="addUser" element={<AddUser />} />
          </Route>

          <Route path="/members" element={<MembersDashboard />}>
            <Route path="allMembers" element={<Members />} />
            <Route path="addMember" element={<AddMember />} />
          </Route>

          <Route path="/movies" element={<MoviesDashboard />}>
            <Route path="allMovies" element={<Movies />} />
            <Route path=":movieId" element={<Movie />} />

            <Route path="addMovie" element={<AddMovie />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
