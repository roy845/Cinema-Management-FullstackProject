import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { createMember } from "../Api/serverAPI";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

const AddMember = () => {
  const [member, setMember] = useState({
    Name: "",
    Email: "",
    City: "",
  });

  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();

      await createMember(member);
      toast.success(`Member ${member.Name}  is added successfully!`);
      navigate("/members/allMembers");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setMember({ ...member, [name]: value });
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
      <h1 style={{ textAlign: "center" }}>Add new Member</h1>

      <form
        onSubmit={handleFormSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "center",
          width: "100%",
          alignItems: "center",
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
            label="Name"
            name="Name"
            value={member.Name}
            onChange={handleInputChange}
            style={{ width: "300px" }}
          />
          <TextField
            label="Email"
            type="email"
            name="Email"
            value={member.Email}
            onChange={handleInputChange}
            style={{ width: "300px" }}
          />
          <TextField
            label="City"
            name="City"
            value={member.City}
            onChange={handleInputChange}
            style={{ width: "300px" }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "red", color: "white" }}
            onClick={() => navigate("/members/allMembers")}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddMember;
