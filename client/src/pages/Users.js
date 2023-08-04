import React, { useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "../Api/serverAPI";
import { toast } from "react-hot-toast";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const noPermissionsAvailable = "No permissions available";
  const navigate = useNavigate();

  const fetchAllUsers = async () => {
    try {
      const { data } = await getAllUsers();
      setUsers(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const navigateToEditUser = (id) => {
    navigate(`/editUser/${id}`);
  };

  const deleteUserHandler = async (id) => {
    try {
      await deleteUser(id);
      fetchAllUsers();
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {isLoading ? (
        <Spinner text={"users"} />
      ) : (
        <>
          <TableContainer style={{ width: "180%" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{ border: "1px solid #000", textAlign: "center" }}
                  >
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell
                    style={{ border: "1px solid #000", textAlign: "center" }}
                  >
                    <strong>User Name</strong>
                  </TableCell>
                  <TableCell
                    style={{ border: "1px solid #000", textAlign: "center" }}
                  >
                    <strong>SessionTimeOut (Minutes)</strong>
                  </TableCell>
                  <TableCell
                    style={{ border: "1px solid #000", textAlign: "center" }}
                  >
                    <strong>Created date</strong>
                  </TableCell>
                  <TableCell
                    style={{ border: "1px solid #000", textAlign: "center" }}
                  >
                    <strong>Permissions</strong>
                  </TableCell>
                  <TableCell
                    style={{ border: "1px solid #000", textAlign: "center" }}
                  >
                    <strong> Actions</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell
                      style={{
                        border: "1px solid #000",
                        textAlign: "center",
                      }}
                    >
                      <strong> {`${user.FirstName} ${user.LastName}`}</strong>
                    </TableCell>
                    <TableCell
                      style={{
                        border: "1px solid #000",
                        textAlign: "center",
                      }}
                    >
                      <strong>{user.UserName}</strong>
                    </TableCell>
                    <TableCell
                      style={{
                        border: "1px solid #000",
                        textAlign: "center",
                      }}
                    >
                      <strong>{user.SessionTimeOut}</strong>
                    </TableCell>
                    <TableCell
                      style={{
                        border: "1px solid #000",
                        textAlign: "center",
                      }}
                    >
                      <strong>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </strong>
                    </TableCell>
                    <TableCell
                      style={{
                        border: "1px solid #000",
                        textAlign: "center",
                      }}
                    >
                      <strong>
                        {user?.permissions &&
                        user?.permissions.some(
                          (permission) => permission.checked
                        )
                          ? user?.permissions.map((permission, index) => (
                              <div key={index}>
                                {permission.checked && permission.name}
                              </div>
                            ))
                          : noPermissionsAvailable}
                      </strong>
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
                          backgroundColor: "purple",
                          color: "white",
                        }}
                        onClick={() => navigateToEditUser(user?._id)}
                        endIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                      {!user.isAdmin && (
                        <Button
                          style={{ backgroundColor: "red", color: "white" }}
                          variant="contained"
                          onClick={() => deleteUserHandler(user?._id)}
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
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default Users;
