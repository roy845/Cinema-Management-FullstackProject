import React from "react";
import Layout from "../components/Layout";
import { Box } from "@material-ui/core";

const Subscriptions = () => {
  return (
    <Layout title="Subscriptions">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Subscriptions</h1>
      </Box>
    </Layout>
  );
};

export default Subscriptions;
