import Alarm from "@material-ui/icons/Alarm";
import Appointments from "views/Appointments/Appointments.js";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Dashboard from "@material-ui/icons/Dashboard";
import DashboardPage from "views/Dashboard/Dashboard.js";
import Emergency from "views/Emergency/Emergency.js";
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import MedRecords from "views/MedRecords/MedRecords.js";
import Notifications from "@material-ui/icons/Notifications";
import NotificationsPage from "views/Notifications/Notifications.js";
import Share from "views/Share/Share.js";
import ShareIcon from "@material-ui/icons/Share";
import SmartDoc from "views/SmartDoc/SmartDoc.js";
import SmartDocIcon from "@material-ui/icons/TabletMac";
import TodayIcon from '@material-ui/icons/Today';
import UserProfile from "views/UserProfile/UserProfile.js";
import Vaccination from "views/Vaccination/Vaccination.js";
// npm install --save-dev @iconify/react @iconify-icons/fa-solid
// import { Icon, InlineIcon } from '@iconify/react';
// import syringeIcon from '@iconify-icons/fa-solid/syringe';
// import React from "react";



// function SyringeIcon() {
//   return <Icon icon={syringeIcon} />;
// };


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
    icon: AssignmentIndIcon,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/medRecords",
    name: "Befunde",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: MedRecords,
    layout: "/admin"
  }, 
  {
    path: "/appointments",
    name: "Termine",
    rtlName: "طباعة",
    icon: TodayIcon,
    component: Appointments,
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
