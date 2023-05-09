const rotationValues = [

];
const numOfElements = 8

console.log(rotationValues);
for(let i = 1; i <= numOfElements; i++){
    console.log(i);
    rotationValues.push({ minDegree: (360/numOfElements)*(i-1)+1, maxDegree: (360/numOfElements)*i, value: pElements[i].textContent);
}

console.log(rotationValues);