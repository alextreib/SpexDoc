import { firebase, firestore, auth } from "components/Internal/Firebase.js";


// Interal functions/structs

// we need to return [{Today}, {Yesterday} .... {7 days back}]
// Each object has : {"Calories" : value, "Heart": value ... , "Date": }
const baseObj = {
  Calories: 0,
  Heart: 0,
  Move: 0,
  Steps: 0,
  Sleep: 0,
  Weight: 0,
  Blood_Pressure: 0,
};

// Blood pressure
const dataValues = [
  {
    title: "Calories",
    type: "com.google.calories.expended",
  },
  {
    title: "Heart",
    type: "com.google.heart_minutes",
  },
  {
    title: "Move",
    type: "com.google.active_minutes",
  },
  {
    title: "Steps",
    type: "com.google.step_count.delta",
  },
  {
    // Not working - why?
    title: "Sleep",
    type: "com.google.sleep.segment",
  },
  {
    title: "Weight",
    type: "com.google.weight",
  },
  {
    title: "Blood_Pressure",
    type: "com.google.blood_pressure",
  },
];


  // Provide request headers to be attached with each function call
  getRequestHeaders = (accessToken) => {
    const requestHeaderBody = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    };
    return requestHeaderBody;
  };

  getAggregatedDataBody = (dataType, endTime) => {
    console.log(endTime);
    const requestBody = {
      aggregateBy: [
        {
          dataTypeName: dataType,
        },
      ],
      bucketByTime: {
        durationMillis: 86400000,
      },
      endTimeMillis: endTime,
      startTimeMillis: endTime - 7 * 86400000,
    };
    return requestBody;
  };


// Public functions/structs
export const getDataPerWeek = (type, healthData) => {
  console.log(healthData);
  console.log(type);
  console.log(healthData[type]);
  var HealthTypeArray = [];
  // Returns array in the form [TypeDay1,TypeDay2,TypeDay3]
  healthData.forEach((element) => {
    HealthTypeArray.push(element[type]);
  });
  console.log(HealthTypeArray);
  return HealthTypeArray;
};




export const loadHealthData = async (access_token) => {
  var endTime = new Date().getTime();

  let healthData = [];
  let promises = [];
  for (var i = 6; i >= 0; i--) {
    var currTime = new Date(endTime - i * 86400000);
    healthData.push({
      ...baseObj,
      Date: currTime,
    });
  }
  dataValues.forEach((element) => {
    let body = this.getAggregatedDataBody(element.type, endTime);
    promises.push(
      axios
        .post(
          "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
          body,
          this.getRequestHeaders(access_token)
        )
        .then((resp) => {
          // now, each data bucket represents exactly one day
          for (let idx = 0; idx < 7; idx++) {
            resp.data.bucket[idx].dataset[0].point.forEach((point) => {
              point.value.forEach((val) => {
                let extract = val["intVal"] || Math.ceil(val["fpVal"]) || 0;
                healthData[idx][element.title] += extract;
              });
            });
          }
        })
    );
  });
  // promises to call callback
  console.log(healthData);
  // this.setState({ healthData: healthData });
  return healthData;
};


