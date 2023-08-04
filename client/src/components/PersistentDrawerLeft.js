import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import MovieIcon from "@mui/icons-material/Movie";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { useAuth } from "../contex/auth";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(
    localStorage.getItem("drawerOpen") === "true" || false
  );
  const { auth, setAuth } = useAuth();

  const [selectedItem, setSelectedItem] = React.useState(
    +localStorage.getItem("selectedItem") || 0
  );

  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
    localStorage.setItem("drawerOpen", "true");
  };

  const handleDrawerClose = () => {
    setOpen(false);
    localStorage.setItem("drawerOpen", "false");
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: <DashboardIcon />,
      onClick: (index) => {
        navigate("/");
        setSelectedItem(index);
        localStorage.setItem("selectedItem", index);
      },
    },
    {
      name: "Movies",
      icon: <MovieIcon />,
      onClick: (index) => {
        navigate("/movies");
        setSelectedItem(index);
        localStorage.setItem("selectedItem", index);
      },
    },
    {
      name: "Subscriptions",
      icon: <SubscriptionsIcon />,
      onClick: (index) => {
        navigate("/members");
        setSelectedItem(index);
        localStorage.setItem("selectedItem", index);
      },
    },
    {
      name: "Users Management",
      icon: <PeopleIcon />,
      onClick: (index) => {
        navigate("/users");
        setSelectedItem(index);
        localStorage.setItem("selectedItem", index);
      },
    },
    {
      name: "Logout",
      icon: <LogoutIcon />,
      onClick: (index) => {
        setAuth(null);
        localStorage.removeItem("auth");
        navigate("/");
        toast.success("Logout Successfully");
        setSelectedItem(index);
        document.title = "Cinema Management App";
      },
    },
  ];

  const header = "Cinema Management";

  React.useEffect(() => {
    setSelectedItem(+localStorage.getItem("selectedItem"));
    localStorage.removeItem("selectedItem");
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ height: "64px" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <MovieIcon style={{ marginRight: 15 }} />
          <Typography variant="h6" noWrap component="div">
            {header}
          </Typography>

          <Box
            sx={{ display: "flex", alignItems: "center", marginLeft: "auto" }}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ marginLeft: 1 }}
            >
              {`Hello, ${auth?.user?.firstName} ${auth?.user?.lastName}`}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems
            .filter(
              (mi) => !(mi.name === "Users Management" && !auth?.user?.isAdmin)
            )
            .map((item, index) => {
              return (
                <ListItem
                  key={index}
                  disablePadding
                  style={{
                    backgroundColor: selectedItem === index ? "#2074d4" : "",
                    color: selectedItem === index ? "white" : "",
                  }}
                >
                  <ListItemButton onClick={() => item.onClick(index)}>
                    <ListItemIcon
                      style={{
                        color: selectedItem === index ? "white" : "",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              );
            })}
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
