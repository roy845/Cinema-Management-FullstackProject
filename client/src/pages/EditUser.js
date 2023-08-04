import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { getUser, updateUser } from "../Api/serverAPI";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import Spinner from "../components/Spinner";

const EditUser = () => {
  const [user, setUser] = useState({
    FirstName: "",
    LastName: "",
    Password: "",
    SessionTimeOut: 0,
    UserName: "",
    createdAt: "",
    permissions: [],
  });

  const { userId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUser({ ...data, Password: "" });
        setIsLoading(false);
      } catch (error) {
        toast.error(error);
        setIsLoading(false);
      }
    };
    getUserData(userId);
  }, [userId]);

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      const { permissions, ...userData } = user;
      await updateUser(userId, userData, user.permissions);
      toast.success(
        `User ${user.FirstName} ${user.LastName} is updated successfully!`
      );
      navigate("/users/allUsers");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = name === "SessionTimeOut" ? +e.target.value : e.target.value;

    if (name === "SessionTimeOut" && value < 0) {
      toast.error("Session Timeout cannot be negative.");
    }

    setUser({ ...user, [name]: value });
  };

  const handlePermissionChange = (e) => {
    const permissionName = e.target.name;
    const isChecked = e.target.checked;

    setUser((prevUser) => {
      const updatedPermissions = prevUser.permissions.map((permission) => {
        // If a permission is clicked on
        if (permission.name === permissionName) {
          return { ...permission, checked: isChecked };
        }

        // If a 'Create', 'Update' or 'Delete' option is checked, also check 'View' option for the same category
        if (
          isChecked &&
          (permissionName.includes("Create") ||
            permissionName.includes("Update") ||
            permissionName.includes("Delete")) &&
          permission.name === `View ${permissionName.split(" ")[1]}`
        ) {
          return { ...permission, checked: true };
        }

        return permission;
      });

      return { ...prevUser, permissions: updatedPermissions };
    });
  };

  return (
    <Layout title="Edit User">
      {isLoading ? (
        <Spinner text={"Edit User"} />
      ) : (
        <>
          {" "}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h1 style={{ textAlign: "center" }}>
              Edit User - {user.FirstName} {user.LastName}
            </h1>
            {user && (
              <form
                onSubmit={handleFormSubmit}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  justifyContent: "center",
                  width: "100%",
                  alignItems: "start",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <TextField
                    label="First Name"
                    name="FirstName"
                    value={user.FirstName}
                    onChange={handleInputChange}
                  />
                  <TextField
                    label="Last Name"
                    name="LastName"
                    value={user.LastName}
                    onChange={handleInputChange}
                  />
                  <TextField
                    label="User Name"
                    name="UserName"
                    value={user.UserName}
                    onChange={handleInputChange}
                  />
                  <TextField
                    label="Password"
                    name="Password"
                    type="password"
                    value={user.Password}
                    onChange={handleInputChange}
                  />
                  <TextField
                    label="Session TimeOut"
                    name="SessionTimeOut"
                    type="number"
                    value={user.SessionTimeOut}
                    onChange={handleInputChange}
                  />
                  <TextField
                    label="Created At"
                    value={new Date(user.createdAt).toLocaleDateString()}
                    disabled
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <h3>Permissions:</h3>
                  {user?.permissions?.map((permission) => (
                    <FormControlLabel
                      key={permission.name}
                      control={
                        <Checkbox
                          checked={permission?.checked}
                          onChange={handlePermissionChange}
                          name={permission?.name}
                        />
                      }
                      label={permission?.name}
                    />
                  ))}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "10px",
                    }}
                  >
                    {" "}
                    <Button type="submit" variant="contained" color="primary">
                      Update
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      style={{ backgroundColor: "red", color: "white" }}
                      onClick={() => navigate("/users/allUsers")}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </form>
            )}
          </Box>
        </>
      )}
    </Layout>
  );
};

export default EditUser;
