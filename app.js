const rElement = document.getElementById("r");
const gElement = document.getElementById("g");
const bElement = document.getElementById("b");
const colorDisplayElement = document.getElementById("color-display");

const levels = Array. from(document.getElementsByClassName("mode"));
const squares= Array. from(document.getElementsByClassName("square"));

//select game level
let selectedLevelButton = levels.find((level)=> {
    const classList=Array.from(level.classList);
    return classList.includes("selected");
});

let gameLevel =selectedLevelButton;

levels.forEach((level) => {
    level.addEventListener("click", function () {
     levels.forEach((mode) => mode.classList.remove("selected"));  
     this.classList.add("selelcted"); 

     gameLevel = this.innerHTML;
    });
});

//Assign background colors to squares
const startButton= document.getElementById("reset");

startButton.addEventListener("click", function (){
    this.innerHTML="New Colors";
    for (let i=0; i<squares.length; i++){
        const red= Math.floor(Math.random() * 256);
        const green= Math.floor(Math.random() * 256);
        const blue= Math.floor(Math.random() * 256);

        const rgbString ="rgb(" + red + "," + green + "," + blue + ")"

        const square= squares[i];
        
        square.dataset.rgb_value=JSON.stringify([red, green, blue]);
        square.style.backgroundColor=rgbString;
    }

// assign the header random rgb values
    const randomSquareIndex = Math.floor(Math.random() * 6);
    const headerColorSquare=squares[randomSquareIndex];
    setHeaderRgbBackgroundColor(headerColorSquare);
});



function setHeaderRgbBackgroundColor(squareElement){
    const setHeaderElementsBackgroundColor = (rgbValues, element) => {
        const [r,g,b]= rgbValues;
        const rgbString = 'rgb $(r), $(g), $(b)';
        element.style.backgroundColor= rgbString;
        element.innerHTML = rgbValues.find((rgbValue) => {
            return rgbValue > 0;
        });
    };

    const rgbString = squareElement.dataset.rgb_value;
    colorDisplayElement.dataset.rgb_value = rgbString;
    const [red, green, blue]=JSON.parse(rgbString);

    const redBackground= [red, 0, 0]
    const greenBackground=[0, green, 0]
    const blueBackground=[0, 0, blue]

    setHeaderElementsBackgroundColor(redBackground, rElement);
    setHeaderElementsBackgroundColor(greenBackground, gElement);
    setHeaderElementsBackgroundColor(blueBackground, bElement);
}

//add event listener to square so that it either disappears or changes every square to the right color
squares.forEach((square) => {
    square.addEventListener("click", function (){
        const headerRgbValue= colorDisplayElement.dataset.rgb_value;
        const squareRgbValue= this.dataset.rgb_value;

        if (headerRgbValue==squareRgbValue){
            setSquareBackgroundAfterWin(headerRgbValue);
        }else{
            this.classList.add("hidden");
        }
    });
});

function setSquareBackgroundAfterWin(headerRgbString){
    const [r, g, b] = JSON.parse(headerRgbString);
    const rgbString = 'rgb $(r), $(g), $(b)';

    squares.forEach((square)=> {
        square.classList.remove("hidden");
        square.style.backgroundColor = rgbString;
    });
};