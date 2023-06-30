const wheel = document.getElementById("wheel");
const spinButton = document.getElementById("spin-button");
const finalValue = document.getElementById("final-value");
const wheelArrow = document.getElementById("wheel-arrow");
const myAudio = new Audio('./Assets/Background/wheel-spin.mp3');
const myAudioEnding = new Audio('./Assets/Background/wheel-spin-ending.mp3');
const winAudio = new Audio('./Assets/Background/win.mp3');
const muteIcon = document.getElementById("mute-icon");
const page1 = document.getElementById("wheel-description1");
const page2 = document.getElementById("wheel-description2");
const page3 = document.getElementById("wheel-description3");
const pageButton1 = document.getElementsByClassName("page-button-1");
const pageButton2 = document.getElementsByClassName("page-button-2");
const volumeSlider = document.getElementById("volume-slider");
const popup = document.getElementById("popup-result");
const spinResult = document.getElementById("spin-results")

let rotationValues = [
];

//Data of the segments
let wheelSegment = document.getElementById("wheel-segments-table");
const segmentCount = document.getElementById("segment-count")
let pElements = wheelSegment.querySelectorAll("p");
let numOfElements = pElements.length;

// let audioContext = new (window.AudioContext || window.webkitAudioContext)();
// let isFadingOut = false;

// function startFadeOut(){
//   if (!isFadingOut){
//     audioSource = audioContext.createMediaElementSource(audioElement);
//     audioSource.connect(audioContext.destination);
//     audioElement.play();
//     fadeOut();
//     isFadingOut = true;
//   }
// }

// function fadeOut() {
//   var fadeDuration = 2; // Fade duration in seconds
//   var currentTime = audioContext.currentTime;
//   var gainNode = audioContext.createGain();
//   audioSource.connect(gainNode);
//   gainNode.connect(audioContext.destination);

//   gainNode.gain.setValueAtTime(1, currentTime);
//   gainNode.gain.linearRampToValueAtTime(0, currentTime + fadeDuration);
//   setTimeout(function() {
//     audioElement.pause();
//     audioElement.currentTime = 0;
//     isFadingOut = false;
//   }, fadeDuration * 1000);
// }

function wheelChange(){
  pElements = wheelSegment.querySelectorAll("p");
  numOfElements = pElements.length;
  segmentCount.innerHTML = `<p>Wheel Segments: ${numOfElements}</p>`;
  if (numOfElements == 0){
    wheelSegment.innerHTML = `<p>&nbsp</p>`;
  };
  // console.log('The number of p tags are ' + pElements.length);
  // console.log(pElements[0].textContent);
  // console.log(pElements[1].textContent);


  if (data.length < numOfElements){
    for(let i = data.length+1; i <= numOfElements; i++){
        data.push(16);
        // chartData.labels[i-1] = pElements[i-1].textContent;
    };
  };

  if (data.length > numOfElements){
    for(let i = data.length; i > numOfElements; i--){
      data.pop();
      chartData.labels.splice(i-1,1);
    }
  };

  for(let i = 0; i < numOfElements; i++){
    chartData.labels[i] = pElements[i].textContent;
  }
  // pElements.forEach((p) =>{
  //   console.log(p);
  //   console.log(chartData.labels);
  //   let i = 0
  //   chartData.labels[i] = (p.textContent);
  //   i += 1
  //   console.log(chartData.labels);
  // })
  myChart.update();
};

//Size of pieces
const data = [16, 16, 16, 16, 16, 16];
// const dataLabels = ["Annie","Blitzcrank","Camille","Draven","Elise","Fiora"];

//Background colour of pieces
let pieColors = [
    "#1565c0",
    "#ADD8E6",
    "#1565c0",
    "#ADD8E6",
    "#1565c0",
    "#ADD8E6",
];

//using a pie chart for wheel

const chartData = {
  labels: ["Annie","Blitzcrank","Camille","Draven","Elise","Fiora"],
  datasets: [
    {
      backgroundColor: pieColors,
      data: data
    }
  ]
};

const chartConfig = {
    plugins: [ChartDataLabels],
    type: "pie",
    data: chartData,
    options: {
      //Responsive chart design
      // maintainAspectRatio: false,
      responsive: true,
      animation: { duration: 0 },
      rotation: 0,
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
};

let myChart = new Chart(wheel, chartConfig)

function removeItem(){
  const string = popup.innerHTML;
  const find = string.indexOf(":");
  const newString = string.substring(find+1).trim();
  const findString = newString.substring(0, newString.length-5)
  console.log(findString);
  for(let pElement of pElements){
    if (findString === pElement.textContent){
      console.log('found item');
      pElement.remove();
      wheelChange();
      break;
    }
  }
}

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

function colourPicker(){
  const selectPage = document.getElementById("wheel-description1");
  const selectColor = document.getElementById("colour-picker");
  console.log(selectColor.value);
  selectPage.style.background = `${selectColor.value}`;
}

function colourPicker2(){
  const selectColor = document.getElementById("color-picker");
  const selectColor2 = document.getElementById("color-picker2")
  myChart.data.datasets[0].backgroundColor = [
    `${selectColor.value}`,
    `${selectColor2.value}`,
  ];
  myChart.update();
}


const bgTheme = document.getElementsByClassName('wrapper');
const inputFile = document.getElementById('input-theme');
let uploadedImage = "";

function firstTheme(){
  bgTheme[0].style.background = 'url("./Assets/Background/theme-1.jpg")'
}

function secondTheme(){
  bgTheme[0].style.background = 'url("./Assets/Background/theme-2.jpg")'
}

function thirdTheme(){
  bgTheme[0].style.background = 'url("./Assets/Background/theme-3.jpg")'
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
  myAudioEnding.muted = true;
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
  myAudioEnding.muted = false;
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
    }, 1000); // 3000 milliseconds = 3 seconds
  }
}

function pageOne(){
  page1.style.display = 'block';
  page2.style.display = 'none';
  pageButton1[0].style.background = 'rgb(172, 134, 134)'
  pageButton2[0].style.background = 'rgb(43, 40, 40)';
}

function pageTwo(){
  page1.style.display = 'none';
  page2.style.display = 'block';
  pageButton1[0].style.background = 'rgb(43, 40, 40)';
  pageButton2[0].style.background = 'rgb(172, 134, 134)';
}

function pageThree(){
  page1.style.display = 'none';
  page2.style.display = 'none';
  pageButton1[0].style.background = 'rgb(43, 40, 40)';
  pageButton2[0].style.background = 'rgb(43, 40, 40)';
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
let resultValue = 21;
// Start spinning wheel
spinButton.addEventListener("click", () =>{
  rotationValues = [];
  for(let i = 0; i < numOfElements; i++){
    rotationValues[i]=({minDegree: (360/numOfElements)*(i)+1, maxDegree: (360/numOfElements)*(i+1), value: chartData.labels[numOfElements-1-i]});
  };

  myAudio.play();
  spinButton.disabled = true;
  finalValue.innerHTML = '<p>Good Luck!</p>';

  //Generate random degree to stop at - between 0 to 360
  // const min = 1;
  // const max = 10;
  // const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  let randomDegree = Math.floor(Math.random()*361);
  // Interval for rotation animation
  let rotationInterval = window.setInterval(() =>{
    if (resultValue === 7){
      console.log("The wheel is stopping soon");
      myAudio.pause();
      myAudio.currentTime = 0;
      myAudioEnding.play();
    }
    myChart.options.rotation = myChart.options.rotation + resultValue;
    myChart.update();
    // console.log('Result value is ' + resultValue)
    // console.log('Random degree is ' + randomDegree)
    // console.log('Chart rotation value is ' + myChart.options.rotation)
    //If the rotation > 360, reset it back to 0
    if(myChart.options.rotation >= 360){
      count += 1;
      resultValue -= 2;
      myChart.options.rotation = 0;
    } else if (count > 9 && myChart.options.rotation == randomDegree){
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 21;
      // console.log("The wheel stops now")
      myAudioEnding.pause();
      myAudioEnding.currentTime = 0;
      popupOpen();
    }
  }, 10);
  
});
