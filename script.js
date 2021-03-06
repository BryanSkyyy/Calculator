let firstNumString = "";
let secondNumString = "";
let currOperator = "";
let firstNum = 0;
let secondNum = 0;
let firstNumChoice = true;
let double = false;
let firstDouble = false;
let secondDouble = false;
let equalsPressed = false;
let lastInputFirst = [""];
let lastInputSecond = [""];
let inputPosFirst = 0;
let inputPosSecond = 0;
let lastResult = 0;

const result = document.querySelector('#results');
result.addEventListener('click', function() {
    if (equalsPressed) {
        result.textContent = lastResult;
    }
    else {
        if (firstNumChoice) {
            if (inputPosFirst > 0) {
                inputPosFirst--;
            }
            firstNumString = lastInputFirst[inputPosFirst];
            if (firstNumString == "") {
                inputPosFirst = 0;
                result.textContent = 0;
            }
            else {
                result.textContent = firstNumString;
            }
        }
        else {
            if (inputPosSecond > 0) {
                inputPosSecond--;
            }
            secondNumString = lastInputSecond[inputPosSecond];
            if (secondNumString == "") {
                inputPosSecond = 0;
                result.textContent = 0;
            }
            else {
                result.textContent = secondNumString;
            }
        }
    }
});

const allOps = document.querySelectorAll('.ops');

const buttons = document.querySelectorAll("button");
buttons.forEach(function(button) {
    button.addEventListener('mousedown', function() {
        if (button.className == 'nums') {
            button.style.backgroundColor = 'grey';
        }
        else if (button.className == 'ops') {
            button.style.backgroundColor = '#ffd588';
        }
        else if (button.className == 'special') {
            button.style.backgroundColor = 'ivory';
        }
    });
    button.addEventListener('mouseup', function() {
        if (button.className == 'nums') {
            allOps.forEach(function(op) {
                op.style.backgroundColor = 'orange';
                op.style.color = 'white';
            });
            if (equalsPressed) {
                equalsPressed = false;
                inputPosFirst = 0;
                inputPosSecond = 0;
                firstNumChoice = true;
                firstNumString = "";
            }
            button.style.backgroundColor = 'rgb(88, 88, 88)';
            if (firstNumChoice) {
                lastInputFirst[inputPosFirst] = firstNumString;
                inputPosFirst++;
                if (button.textContent == ".") {
                    if (!firstDouble) {
                        firstNumString += button.textContent;
                        result.textContent = firstNumString;
                        firstDouble = true;
                    }
                    double = true;
                }
                else {
                    firstNumString += button.textContent;
                    result.textContent = firstNumString;
                }
            }
            else {
                lastInputSecond[inputPosSecond] = secondNumString;
                inputPosSecond++;
                if (button.textContent == ".") {
                    if (!secondDouble) {
                        secondNumString += button.textContent;
                        result.textContent = secondNumString;
                        secondDouble = true;
                    }
                    double = true;
                }
                else {
                    secondNumString += button.textContent;
                    result.textContent = secondNumString;
                }
            }
        }
        else if (button.className == 'ops') {
            firstNumChoice = false;
            if (equalsPressed && button.id != 'equals') {
                secondDouble = false;
                secondNumString = "";
                equalsPressed = false;
                inputPosFirst = 0;
                inputPosSecond = 0;
            }
            if (button.id != 'equals') {
                button.style.backgroundColor = 'white';
                button.style.color = 'orange';
            }
            allOps.forEach(function(op) {
                if (op.id != button.id) {
                    op.style.backgroundColor = 'orange';
                    op.style.color = 'white';
                }
            });
            if (button.id == 'add') {
                currOperator = button.id;
            }
            else if (button.id == 'subtract') {
                currOperator = button.id;
            }
            else if (button.id == 'multiply') {
                currOperator = button.id;
            }
            else if (button.id == 'divide') {
                currOperator = button.id;
            }
            else if (button.id == 'equals') {
                allOps.forEach(function(op) {
                    op.style.backgroundColor = 'orange';
                    op.style.color = 'white';
                });
                if (firstNumString == "" || firstNumString == ".") {
                    firstNumString += 0;
                }
                if (secondNumString == "" || secondNumString == ".") {
                    secondNumString += 0;
                }
                if (double) {
                    firstNum = parseFloat(firstNumString);
                    secondNum = parseFloat(secondNumString);
                }
                else {
                    firstNum = parseInt(firstNumString);
                    secondNum = parseInt(secondNumString);
                }
                operate(currOperator, firstNum, secondNum);
            }
        }
        else if (button.className == 'special') {
            button.style.backgroundColor = 'gainsboro';
            if (equalsPressed) {
                secondNumString = lastResult;
            }
            if (button.id == 'clear') {
                clear();
            }
            else if (button.id == 'negative') {
                let tempNum = 0;
                if (firstNumChoice) {
                    if (firstNumString == "") {
                        
                    }
                    else {
                        if (double) {
                            tempNum = parseFloat(firstNumString);
                        }
                        else {
                            tempNum = parseInt(firstNumString);
                        }
                        tempNum *= -1;
                        firstNumString = tempNum;
                        result.textContent = tempNum;
                        lastResult = tempNum;
                    }
                }
                else {
                    if (secondNumString == "") {
                        
                    }
                    else {
                        if (double) {
                            tempNum = parseFloat(secondNumString);
                        }
                        else {
                            tempNum = parseInt(secondNumString);
                        }
                        tempNum *= -1;
                        secondNumString = tempNum;
                        result.textContent = tempNum;
                        lastResult = tempNum;
                    }
                }
            }
            else if (button.id == 'percent') {
                if (firstNumChoice) {
                    if (firstNumString == "") {
                        
                    }
                    else {
                        let tempNum = parseFloat(firstNumString);
                        tempNum = tempNum / 100;
                        firstNumString = tempNum;
                        result.textContent = tempNum;
                        lastResult = tempNum;
                        double = true;
                    }
                }
                else {
                    if (secondNumString == "") {
                        
                    }
                    else {
                        let tempNum = parseFloat(secondNumString);
                        tempNum = tempNum / 100;
                        secondNumString = tempNum;
                        result.textContent = tempNum;
                        lastResult = tempNum;
                        double = true;
                    }
                }
            }
        }
    });
});

function add (a, b) {
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    if (b == 0) {
        return "Nope";
    }
    return a / b;
}

function operate(op, a, b) {
    if (op == 'add') {
        let temp = add(a, b);
        result.textContent = temp;
        firstNumString = temp;
        lastResult = temp;
    }
    else if (op == 'subtract') {
        let temp = subtract(a, b);
        result.textContent = temp;
        firstNumString = temp;
        lastResult = temp;
    }
    else if (op == 'multiply') {
        let temp = multiply(a, b);
        result.textContent = temp;
        firstNumString = temp;
        lastResult = temp;
    }
    else if (op == 'divide') {
        let temp = divide(a, b);
        result.textContent = temp;
        firstNumString = temp;
        lastResult = temp;
    }
    equalsPressed = true;
}

function clear() {
    firstNumString = "";
    secondNumString = "";
    currOperator = "";
    firstNum = 0;
    secondNum = 0;
    firstNumChoice = true;
    double = false;
    firstDouble = false;
    secondDouble = false;
    lastInputFirst = [""];
    lastInputSecond = [""];
    inputPosFirst = 0;
    inputPosSecond = 0;
    lastResult = 0;
    result.textContent = 0;
    allOps.forEach(function(op) {
        op.style.backgroundColor = 'orange';
        op.style.color = 'white';
    });
}

//Need to fix decimal logic when it's inputted before a number
//Especially after performing an operation.