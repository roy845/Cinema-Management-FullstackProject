import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: (props) => ({
    width: props.width || "auto",
    height: props.height || "200px",
    backgroundColor: "#272d38",
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2),
    boxShadow: theme.shadows[3],
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
    marginTop: "10px",
    "&:hover": {
      backgroundColor: "#558dab",
      boxShadow: theme.shadows[5],
    },
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    justifyContent: "center", // Center the content horizontally
    cursor: "pointer",
  }),
  text: {
    color: theme.palette.common.white,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
}));

//color for dark mode #730580

const FancyBox = ({ children, onClick, width, height }) => {
  const classes = useStyles({ width, height });

  return (
    <Box role="button" onClick={onClick} className={classes.container}>
      <div className={classes.text}>{children}</div>
    </Box>
  );
};

export default FancyBox;
