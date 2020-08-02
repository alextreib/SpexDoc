/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Alarm from "@material-ui/icons/Alarm";
import Notifications from "@material-ui/icons/Notifications";
import SmartDocIcon from "@material-ui/icons/TabletMac";
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import ShareIcon from "@material-ui/icons/Share";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import ReportOverview from "views/ReportOverview/ReportOverview.js";
import Emergency from "views/Emergency/Emergency.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import Vaccination from "views/Vaccination/Vaccination.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import SmartDoc from "views/SmartDoc/SmartDoc.js";
import Share from "views/Share/Share.js";
import Test from "views/Test/Test.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "Dein Profil",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Befunde",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: ReportOverview,
    layout: "/admin"
  }, 
  {
    path: "/typography",
    name: "Termine",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/share",
    name: "Freigabe",
    rtlName: "إخطارات",
    icon: ShareIcon,
    component: Share,
    layout: "/admin"
  },
 
  {
    path: "/vaccination",
    name: "Impfpass",
    rtlName: "خرائط",
    icon: Alarm,
    component: Vaccination,
    layout: "/admin"
  },
  {
    path: "/emergency",
    name: "Notfalldaten",
    rtlName: "إخطارات",
    icon: LocalHospitalIcon,
    component: Emergency,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Benachrichtigungen",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  },
  {
    path: "/smartDoc",
    name: "Smart Doc",
    rtlName: "إخطارات",
    icon: SmartDocIcon,
    component: SmartDoc,
    layout: "/admin"
  },
];

export default dashboardRoutes;
