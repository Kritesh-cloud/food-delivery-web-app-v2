import HomeIcon from "@mui/icons-material/Home";
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ViewListIcon from '@mui/icons-material/ViewList';
import SegmentIcon from '@mui/icons-material/Segment';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

export const dashboardAuthority = [
  "owner",
  "staff",
  "delivery",
  "admin",
  "moderator",
];

export const navigation = [
  { title: "Home", link: "/", loggedIn: false, display: true },
  { title: "About", link: "/about", loggedIn: false, display: true },
  { title: "Service", link: "/service", loggedIn: false, display: true },
  { title: "Contact Us", link: "/contact", loggedIn: false, display: true },
  { title: "Dashboard", link: "/dashboard", loggedIn: true, display: true },
];

//import { sideBarData } from "../../constant";
export const sideBarData = [
  {
    for: ["owner", "staff", "delivery", "admin", "moderator"],
    title: "Home",
    link: "/",
    mainItem: true,
    open: false,
    selected: false,
    display: true,
    icon: <HomeIcon />,
    subList: [],
  },
  {
    for: ["admin"],
    title: "Category",
    link: "",
    mainItem: true,
    open: false,
    selected: false,
    display: true,
    icon: <FastfoodIcon />,
    subList: [
      { title: "Add", link: "category/add", mainItem: false, selected: false },
      {
        title: "List",
        link: "category/list",
        mainItem: false,
        selected: false,
        display: true,
        icon: <NotInterestedIcon />,
      },
    ],
  },
  {
    for: ["admin", "moderator"],
    title: "List Restaurant",
    link: "restaurant/list",
    mainItem: true,
    open: false,
    selected: false,
    display: true,
    icon: <ViewListIcon />,
    subList: [],
  },
  {
    for: ["admin", "moderator"],
    title: "Browse Content",
    link: "browse-content/list",
    mainItem: true,
    open: false,
    selected: false,
    display: true,
    icon: <SegmentIcon />,
    subList: [],
  },
  {
    for: ["admin"],
    title: "Assign Authority",
    link: "assign-authority/moderator",
    mainItem: true,
    open: false,
    selected: false,
    display: false,
    icon: <AssignmentIndIcon />,
    subList: [
      {
        title: "Moderator",
        link: "assign-authority/moderator",
        mainItem: false,
        selected: false,
        display: true,
        icon: <NotInterestedIcon />,
      },
      {
        title: "Delivery",
        link: "assign-authority/delivery",
        mainItem: false,
        selected: false,
        display: true,
        icon: <NotInterestedIcon />,
      },
    ],
  },
  {
    for: ["moderator"],
    title: "Assign Authority",
    link: "assign-authority/moderator",
    mainItem: true,
    open: false,
    selected: false,
    display: false,
    icon: <AssignmentIndIcon />,
    subList: [
      {
        title: "Delivery",
        link: "assign-authority/delivery",
        mainItem: false,
        selected: false,
        display: true,
        icon: <NotInterestedIcon />,
      },
    ],
  },
  {
    for: ["owner"],
    title: "Update Restaurant",
    link: "restaurant/update",
    mainItem: true,
    open: false,
    selected: false,
    display: true,
    icon: <TableRestaurantIcon />,
    subList: [],
  },
  {
    for: ["owner"],
    title: "View Restaurant",
    link: "restaurant/view",
    mainItem: true,
    open: false,
    selected: false,
    display: false,
    icon: <TableRestaurantIcon />,
    subList: [],
  },
  {
    for: ["owner"],
    title: "Menu",
    link: "menu",
    mainItem: true,
    open: false,
    selected: false,
    display: true,
    icon: <MenuBookIcon />,
    subList: [
      // { title: "Add Category", link: "menu/add/category", mainItem: false, selected: false },
      // { title: "Add Item", link: "menu/add/item", mainItem: false, selected: false },
      // { title: "List Menu", link: "menu/list", mainItem: false, selected: false },
    ],
  },
];
