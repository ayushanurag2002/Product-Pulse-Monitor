import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import HighQualityIcon from "@mui/icons-material/HighQuality";
import BiotechIcon from "@mui/icons-material/Biotech";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SpeedIcon from "@mui/icons-material/Speed";
import ConstructionIcon from "@mui/icons-material/Construction";

import def from "./../../assets/def.jpeg";
import "./global.css";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Item = ({ text, name, selected, open, setSelected, Icon }) => {
  const navigate = useNavigate();

  return (
    <>
      {" "}
      <ListItem
        disablePadding
        sx={{
          display: "block",
          backgroundColor: selected === name ? "rgb(255,255,255,0.1)" : "",
        }}
        onClick={() => {
          setSelected(name);
          navigate(`/${name}`);
        }}
      >
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          {" "}
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <Icon />
          </ListItemIcon>
          <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    </>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("dashboard");
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen((data) => !data);
  };

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader className="drawhead">
        <div className="head">
          {open ? <img className="hd" src={def} alt="" /> : <></>}
          <IconButton onClick={toggleDrawer}>
            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
      </DrawerHeader>

      <Item
        name="dashboard"
        text="Product Dashboard"
        open={open}
        selected={selected}
        setSelected={setSelected}
        Icon={DashboardIcon}
      />
      <Item
        name="health"
        text="Product Health"
        open={open}
        selected={selected}
        setSelected={setSelected}
        Icon={HealthAndSafetyIcon}
      />
      <Item
        name="quality"
        text="Product Quality Assurance"
        open={open}
        selected={selected}
        setSelected={setSelected}
        Icon={HighQualityIcon}
      />
      <Item
        name="innovation"
        text="Product Innovation"
        open={open}
        selected={selected}
        setSelected={setSelected}
        Icon={BiotechIcon}
      />
      <Item
        name="sales"
        text="Product Sales"
        open={open}
        selected={selected}
        setSelected={setSelected}
        Icon={MonetizationOnIcon}
      />
      <Item
        name="upgradation"
        text="Speed of Upgradation"
        open={open}
        selected={selected}
        setSelected={setSelected}
        Icon={SpeedIcon}
      />
      <Item
        name="improvement"
        text="Improvement Index"
        open={open}
        selected={selected}
        setSelected={setSelected}
        Icon={ConstructionIcon}
      />

      <Divider />
      <List></List>
    </Drawer>
  );
};

export default Sidebar;
