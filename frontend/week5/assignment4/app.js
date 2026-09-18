
function calcBMI(){
    const weight = document.getElementById("weight").value
    const height = document.getElementById("height").value
    const heading = document.getElementById("heading")
    const bmi = (weight/(height*height)).toFixed(1)
    if(bmi < 18.5){
        heading.innerHTML = `<span class="text-xl">Underweight:</span> <span class="text-red-400">${bmi}</span>`
    }else if(bmi < 25){
        heading.innerHTML = `<span class="text-xl">Normal weight:</span> <span class="text-green-500">${bmi}</span>`
    }else if(bmi < 30){
        heading.innerHTML = `<span class="text-xl">Overweight:</span> <span class="text-orange-500">${bmi}</span>`
    }else{
        heading.innerHTML = `<span class="text-xl">Obesity:</span> <span class="text-red-600">${bmi}</span>`
    }
}