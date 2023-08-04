import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { addUser } from "../Api/serverAPI";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { PERMISSIONS } from "../permissions/permissions";

const AddUser = () => {
  const [user, setUser] = useState({
    FirstName: "",
    LastName: "",
    Password: "",
    SessionTimeOut: 0,
    UserName: "",
  });

  const [permissions, setPermissions] = useState(PERMISSIONS);

  console.log(user);

  const navigate = useNavigate();

  const handleFormSubmit = async () => {
    try {
      await addUser(user, permissions);
      toast.success(
        `User ${user.FirstName} ${user.LastName} is added successfully!`
      );
    } catch (error) {
      toast.error(error);
    }

    toast.success(
      `User${user.FirstName} ${user.LastName} is added successfully`
    );
    navigate("/users");
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

    setPermissions((prevPermissions) => {
      const updatedPermissions = prevPermissions.map((permission) => {
        if (permission.name === permissionName) {
          return { ...permission, checked: isChecked };
        }

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

      return updatedPermissions;
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Add User</h1>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "50px",
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
            required
            onChange={handleInputChange}
            style={{ width: "250px" }}
          />
          <TextField
            label="Last Name"
            name="LastName"
            required
            onChange={handleInputChange}
            style={{ width: "250px" }}
          />
          <TextField
            variant="outlined"
            required
            name="Password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            onChange={handleInputChange}
            style={{ width: "250px" }}
          />
          <TextField
            label="User Name"
            name="UserName"
            required
            onChange={handleInputChange}
            style={{ width: "250px" }}
          />
          <TextField
            label="Session TimeOut (Minutes)"
            name="SessionTimeOut"
            required
            type="number"
            onChange={handleInputChange}
            style={{ width: "250px" }}
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
          {permissions.map((permission) => (
            <FormControlLabel
              key={permission.name}
              control={
                <Checkbox
                  checked={permission.checked}
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
              marginBottom: "20px",
            }}
          >
            <Button
              type="button"
              onClick={handleFormSubmit}
              variant="contained"
              color="primary"
              disabled={
                !user.FirstName ||
                !user.LastName ||
                !user.Password ||
                !user.UserName ||
                user.SessionTimeOut <= 0
              }
            >
              Save
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
      </Box>
    </Box>
  );
};

export default AddUser;
