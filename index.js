const wheel = document.getElementById("wheel");
const spinButton = document.getElementById("spin-button");
const finalValue = document.getElementById("final-value");
const wheelArrow = document.getElementById("wheel-arrow");
const myAudio = new Audio('/Assets/Background/wheel-spin.mp3');
const winAudio = new Audio('/Assets/Background/win.mp3');
const muteIcon = document.getElementById("mute-icon");
const page1 = document.getElementById("wheel-description1");
const page2 = document.getElementById("wheel-description2");
const page3 = document.getElementById("wheel-description3");
const pageButton1 = document.getElementsByClassName("page-button-1");
const pageButton2 = document.getElementsByClassName("page-button-2");
const pageButton3 = document.getElementsByClassName("page-button-3");
const volumeSlider = document.getElementById("volume-slider");


const rotationValues = [
    { minDegree: 0, maxDegree: 30, value: 2},
    { minDegree: 31, maxDegree: 90, value: 1},
    { minDegree: 91, maxDegree: 150, value: 6},
    { minDegree: 151, maxDegree: 210, value: 5},
    { minDegree: 211, maxDegree: 270, value: 4},
    { minDegree: 271, maxDegree: 330, value: 3},
    { minDegree: 331, maxDegree: 360, value: 2},
];

//Data of the segments
const wheelSegment = document.getElementById("wheel-segments-table");
const segmentCount = document.getElementById("segment-count")
const pElements = wheelSegment.querySelectorAll("p");
const numOfElments = pElements.length;
wheelSegment.oninput = function(){
  const pElements = wheelSegment.querySelectorAll("p");
  const numOfElments = pElements.length;
  segmentCount.innerHTML = `<p>Wheel Segments: ${numOfElments}</p>`
}
//Size of pieces
const data = [25, 25, 25, 25, 25, 25];

//Background colour of pieces
let pieColors = [
    "#1565c0",
    "#ADD8E6",
    "#1565c0",
    "#ADD8E6",
    "#1565c0",
    "#ADD8E6",
]

//using a pie chart for wheel

const chartData = {
  labels: ['hello', 2, 3, 4, 5, 6],
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
      // maintainAspectRatio: false,
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

function redTheme(){
  myChart.data.datasets[0].backgroundColor = [
    "#D7100D",
    "#D65A58",
    "#D7100D",
    "#D65A58",
    "#D7100D",
    "#D65A58",
  ];
  const spinTheme = document.getElementById('spin-button');
  spinTheme.style.background = 'radial-gradient(rgb(255, 251, 0) 20%, rgb(133, 133, 187))';
  spinTheme.style.color = 'black';
  myChart.options.plugins.datalabels.color = '#ffffff';
  myChart.update();
}

function blueTheme(){
  myChart.data.datasets[0].backgroundColor = [
    "#1565c0",
    "#ADD8E6",
    "#1565c0",
    "#ADD8E6",
    "#1565c0",
    "#ADD8E6",
  ];
  const spinTheme = document.getElementById('spin-button');
  spinTheme.style.background = 'radial-gradient(rgb(255, 251, 0) 20%, rgb(133, 133, 187))';
  spinTheme.style.color = 'black';
  myChart.options.plugins.datalabels.color = '#ffffff';
  myChart.update();
}

function yellowTheme(){
  myChart.data.datasets[0].backgroundColor = [
    "#D8E511",
    "#E6EE6A",
    "#D8E511",
    "#E6EE6A",
    "#D8E511",
    "#E6EE6A",
  ];
  const spinTheme = document.getElementById('spin-button');
  spinTheme.style.background = 'radial-gradient(rgb(172, 103, 166) 20%, rgb(133, 133, 187))';
  spinTheme.style.color = '#fff';
  myChart.options.plugins.datalabels.color = 'black';
  myChart.update();
}


const bgTheme = document.getElementsByClassName('wrapper');
const inputFile = document.getElementById('input-theme');
let uploadedImage = "";

function firstTheme(){
  bgTheme[0].style.background = 'url("Assets/Background/theme-1.jpg")'
}

function secondTheme(){
  bgTheme[0].style.background = 'url("Assets/Background/theme-2.jpg")'
}

function thirdTheme(){
  bgTheme[0].style.background = 'url("Assets/Background/theme-3.jpg")'
}

inputFile.onchange = function (){
  const reader = new FileReader();
  reader.onload = function(){
    uploadedImage = reader.result;
    bgTheme[0].style.background = `url(${uploadedImage})`;
    const masterAudio = document.getElementById("master-audio");
  }
  // bgTheme[0].style.background = URL.createObjectURL(inputFile.files[0]);
  // console.log(URL.createObjectURL(inputFile.files[0]));
  reader.readAsDataURL(this.files[0]);
  console.log("The background image has been changed");
}

const musicInput = document.getElementById("music-input");

musicInput.onchange = function (){
  const masterAudio = document.getElementById("master-audio");
  const reader = new FileReader();
  const musicVolume = document.getElementById("music-volume");
  musicVolume.style.display = "block";
  reader.onload = function (){
    const musicFile = reader.result;
    masterAudio.innerHTML += `<audio id="custom-audio" src="${musicFile}" autoplay controls</audio>`
  }
  reader.readAsDataURL(this.files[0]);
  // const customMusic = document.getElementById("custom-audio")
  // customMusic.play();

  // volumeSlider.addEventListener("input", () => {
  //     // customMusic.volume = volumeSlider.value / 100;
  //     console.log(customMusic.value)
  //     console.log("New Volume:" + volumeSlider.value);
  //     console.log("Music Volume:" + customMusic.volume);
  //   }
  // );
}

function SetVolume(value){
  const customMusic = document.getElementById("custom-audio");
  customMusic.volume = value/100;
}



function showSettings(){
  const settings = document.getElementsByClassName('wheel-settings');
  settings[0].style.display = 'block';
  settings[0].style.animation = 'slide-in 0.25s ease-in';
  // settings[0].classList.add('fadeIn');
  const button = document.getElementById('settings-btn');
  button.style.display = 'none';
}

function hideSettings(){
  const settings = document.getElementsByClassName('wheel-settings');
  settings[0].style.animation = 'slide-out 0.25s ease-in';
  setTimeout(function() {
    const settings = document.getElementsByClassName('wheel-settings');
    settings[0].style.display = 'none';
    const button = document.getElementById('settings-btn');
    button.style.display = 'block';
    // const wrapper = document.getElementsByClassName('wrapper');
    // wrapper[0].style.animation = 'slide-in 0.25s';
  }, 240);
}



function mute(){
  const muteVolume = document.getElementById('mute-icon');
  // muteVolume.style.zIndex = '-10';
  muteVolume.style.display = 'block';
  const unmuteVolume = document.getElementById('unmute-icon');
  // muteVolume.style.zIndex = '-10';
  unmuteVolume.style.display = 'none';
  myAudio.muted = true;
  winAudio.muted = true;
  try{
  const customMusic = document.getElementById("custom-audio")
  customMusic.muted = true;
  customMusic.pause();
  }
  catch(err){
    // console.log("No Custom Music")
  };
}

function unmute(){
  const muteVolume = document.getElementById('mute-icon');
  // muteVolume.style.zIndex = '-10';
  muteVolume.style.display = 'none';
  const unmuteVolume = document.getElementById('unmute-icon');
  // muteVolume.style.zIndex = '-10';
  unmuteVolume.style.display = 'block';
  myAudio.muted = false;
  winAudio.muted = false;
  try{
    const customMusic = document.getElementById("custom-audio");
    customMusic.muted = false;
    customMusic.play();
    }
    catch(err){
      // console.log("No Custom Music")
    };
}

function popupClose(){
  const popup = document.getElementById("popup-container")
  popup.style.display = 'none';
  const mainWrapper = document.getElementsByClassName("main-wrapper");
  mainWrapper[0].style.opacity = "1.0";
}

function popupOpen(){
  if (document.getElementById("popup-checkbox").checked){
    setTimeout(function() {
      const popupButton = document.getElementById("popup-container");
      popupButton.style.display = "block";
      const mainWrapper = document.getElementsByClassName("main-wrapper");
      mainWrapper[0].style.opacity = "0.3";
      winAudio.play();
    }, 5000); // 3000 milliseconds = 3 seconds
  }
}

function pageOne(){
  page1.style.display = 'block';
  page2.style.display = 'none';
  page3.style.display = 'none';
  pageButton1[0].style.background = 'rgb(172, 134, 134)'
  pageButton2[0].style.background = 'rgb(43, 40, 40)';
  pageButton3[0].style.background = 'rgb(43, 40, 40)';
}

function pageTwo(){
  page1.style.display = 'none';
  page2.style.display = 'block';
  page3.style.display = 'none';
  pageButton1[0].style.background = 'rgb(43, 40, 40)';
  pageButton2[0].style.background = 'rgb(172, 134, 134)';
  pageButton3[0].style.background = 'rgb(43, 40, 40)';
}

function pageThree(){
  page1.style.display = 'none';
  page2.style.display = 'none';
  page3.style.display = 'block';
  pageButton1[0].style.background = 'rgb(43, 40, 40)';
  pageButton2[0].style.background = 'rgb(43, 40, 40)';
  pageButton3[0].style.background = 'rgb(172, 134, 134)';
}


//Display value based on random angle

const valueGenerator = (angleValue) =>{
    for(let i of rotationValues){
      if(angleValue >= i.minDegree && angleValue <= i.maxDegree){
        finalValue.innerHTML = `<p>The winner is: ${i.value}! Congratulations!</p>`;
        spinButton.disabled = false;
        const addText = document.getElementById("spin-results");
        addText.innerHTML += `<p>${i.value} was rolled.</p>`
        const popup = document.getElementById("popup-result");
        popup.innerHTML = `<p>The winner is: ${i.value}!</p>`;
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
  myAudio.play();
  // const muteVolume = document.getElementById('mute-icon');
  // if(muteVolume.style.display == 'block'){
  //   myAudio.muted = true;
  // }
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
  popupOpen();
});
