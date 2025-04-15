// Firebase setup
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Update battery info
const tempSpan = document.getElementById("temp");
const batterySpan = document.getElementById("battery");
const voltageValue = document.getElementById("voltage-value");
const currentDate = document.getElementById("currentDate");
const currentTime = document.getElementById("currentTime");

setInterval(() => {
  const now = new Date();
  currentDate.textContent = now.toLocaleDateString();
  currentTime.textContent = now.toLocaleTimeString();
}, 1000);

// Dummy Chart.js Setup
const batteryCtx = document.getElementById("batteryPerformanceChart").getContext("2d");
const voltageCtx = document.getElementById("voltageGraph").getContext("2d");
const tempCtx = document.getElementById("temperatureGraph").getContext("2d");

const batteryChart = new Chart(batteryCtx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Battery %',
      data: [],
      borderColor: 'green',
      borderWidth: 2
    }]
  }
});

const voltageChart = new Chart(voltageCtx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Voltage (V)',
      data: [],
      borderColor: 'blue',
      borderWidth: 2
    }]
  }
});

const tempChart = new Chart(tempCtx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Temperature (°C)',
      data: [],
      borderColor: 'red',
      borderWidth: 2
    }]
  }
});

// Firebase Realtime Updates (Mock Logic)
db.ref('batteryData').on('value', snapshot => {
  const data = snapshot.val();
  if (data) {
    tempSpan.textContent = data.temperature;
    batterySpan.textContent = data.batteryPercentage;
    voltageValue.textContent = data.voltage;

    // Update Charts
    const now = new Date().toLocaleTimeString();
    batteryChart.data.labels.push(now);
    batteryChart.data.datasets[0].data.push(data.batteryPercentage);
    batteryChart.update();

    voltageChart.data.labels.push(now);
    voltageChart.data.datasets[0].data.push(data.voltage);
    voltageChart.update();

    tempChart.data.labels.push(now);
    tempChart.data.datasets[0].data.push(data.temperature);
    tempChart.update();

    if (data.temperature > 60) {
      document.getElementById("error-symbol").style.display = "block";
    } else {
      document.getElementById("error-symbol").style.display = "none";
    }
  }
});

function changeGraphView(value) {
  console.log("Switched graph view to:", value);
}

function changeVoltageGraphView(value) {
  console.log("Switched voltage graph view to:", value);
}

function changeTempGraphView(value) {
  console.log("Switched temperature graph view to:", value);
}

