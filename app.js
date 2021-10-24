const ctx = document.querySelector("#myChart").getContext("2d");

// Gradient Color
let gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, "rgba(58,123,213,1)");
gradient.addColorStop(1, "rgba(0,210,255,.3)");
let delayed;
const labels = [
  "2012",
  "2013",
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
];

let datas = [211, 326, 165, 350, 420, 370, 500, 375, 415]

const data = {
  labels,
  datasets: [
    {
      data: datas,
      label: "Minecraft Sales",
      fill: true,
      backgroundColor: gradient,
      borderColor: "#ffcccc",
      pointBackgroundColor: "rgb(189,195,199)",
      tension: 0.3,
    },
  ],
};

const config = {
  type: "line",
  data: data,
  options: {
    radius: 3,
    hoverRadius: 10,
    hitRadius: 30,
    responsive: true,
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === "data" && context.mode === "default" && !delayed) {
          delay = context.dataIndex * 300 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            if (value == 0) {
              return value;
            } else {
              return `$ ${value}M`;
            }
          },
        },
      },
    },
  },
};

const myChart = new Chart(ctx, config);
