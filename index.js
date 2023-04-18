const wheel = document.getElementById("wheel")
const spinButton = document.getElementById("spin-button")
const finalValue = document.getElementById("final-value")
const wheelArrow = document.getElementById("wheel-arrow")



const rotationValues = [
    { minDegree: 0, maxDegree: 30, value: 2},
    { minDegree: 31, maxDegree: 90, value: 1},
    { minDegree: 91, maxDegree: 150, value: 6},
    { minDegree: 151, maxDegree: 210, value: 5},
    { minDegree: 211, maxDegree: 270, value: 4},
    { minDegree: 271, maxDegree: 330, value: 3},
    { minDegree: 331, maxDegree: 360, value: 2},
];

//Size of pieces
const data = [16, 16, 16, 16, 16, 16];

//Background colour of pieces
const pieColors = [
    "#1565c0",
    "#ADD8E6",
    "#1565c0",
    "#ADD8E6",
    "#1565c0",
    "#ADD8E6",
]

//using a pie chart for wheel

const chartData = {
  labels: [1, 2, 3, 4, 5, 6],
  datasets: [
    {
      backgroundColor: pieColors,
      data: data
    }
  ]
}

const chartConfig = {
    plugins: [ChartDataLabels],
    type: "pie",
    data: chartData,
    options: {
      //Responsive chart design
      responsive: true,
      animation: { duration: 0 },
      plugins:{
        tooltip: false,
        legend: {
          display: false,
        },
        //Show labels inside of chart
        datalabels: {
          color: "#ffffff",
          formatter: (_, context) => context.chart.data.labels[context.dataIndex],
          font: { size: 24},
        },
      },
    },
}

let myChart = new Chart(wheel, chartConfig)


//Display value based on random angle

const valueGenerator = (angleValue) =>{
    for(let i of rotationValues){
      if(angleValue >= i.minDegree && angleValue <= i.maxDegree){
        finalValue.innerHTML = `<p>Value: ${i.value}</p>`;
        spinButton.disabled = false;
        break;
      }
    }
};

//Spinner Count

let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
// Start spinning wheel
spinButton.addEventListener("click", () =>{
  spinButton.disabled = true;
  finalValue.innerHTML = '<p>Good Luck!</p>';

  //Generate random degree to stop at - between 0 to 360
  // const min = 1;
  // const max = 10;
  // const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;


  let randomDegree = Math.floor(Math.random()*361);
  // Interval for rotation animation
  let rotationInterval = window.setInterval(() =>{
    myChart.options.rotation = myChart.options.rotation + resultValue;
    myChart.update();
    //If the rotation > 360, reset it back to 0
    if(myChart.options.rotation >= 360){
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree){
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
