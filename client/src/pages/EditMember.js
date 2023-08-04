import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { getMember, updateMember } from "../Api/serverAPI";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import Spinner from "../components/Spinner";

const EditMember = () => {
  const [member, setMember] = useState({
    Name: "",
    Email: "",
    City: "",
  });

  const { memberId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMemberData = async () => {
      try {
        const { data } = await getMember(memberId);
        setMember(data);
        setIsLoading(false);
      } catch (error) {
        toast.error(error);
        setIsLoading(false);
      }
    };
    getMemberData();
  }, [memberId]);

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();

      await updateMember(memberId, member);
      toast.success(`Member ${member.Name}  is updated successfully!`);
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
    <Layout title="Edit Member">
      {isLoading ? (
        <Spinner text={"Edit Member"} />
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h1 style={{ textAlign: "center" }}>Edit Member - {member.Name}</h1>
            {member && (
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
                    Update
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
            )}
          </Box>
        </>
      )}
    </Layout>
  );
};

export default EditMember;
