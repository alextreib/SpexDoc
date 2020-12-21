export const defaultURL = "app.spexdoc.net";

export const CommonCompsData = {
  loginState: false,
  LoginAlertProps: {
    openLoginRequired: false,
    FuncParams: "test",
  },
  PopUpProps: {
    openPopUp: false,
    message: "Test Message",
    type: "info", //info, success, warning, danger, primary
    FuncParams: "test",
  },
};

export const DefaultCategories = [
  { title: "Kardiologie" },
  { title: "Dermatologie" },
  { title: "Allergologie" },
];

export const EmergencyData = [
  "EmergencyPredisposition",
  "EmergencyMedication",
  "EmergencyContacts",
  "OrganDonationData",
  "MedRecords",
  "CategoryList",
  "Vaccination",
];
