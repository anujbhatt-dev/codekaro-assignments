
function changeColor(){
    const currentColor = document.getElementById("currentColor");
    const body = document.getElementById("body");
    const randomColor = "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6,"0")
    currentColor.innerText = randomColor;
    body.style.backgroundColor = randomColor;
}