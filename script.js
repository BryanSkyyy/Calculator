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

const result = document.querySelector('#results');

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
                secondDouble = false;
                secondNumString = "";
                equalsPressed = false;
            }
            button.style.backgroundColor = 'rgb(88, 88, 88)';
            if (firstNumChoice) {
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
    }
    else if (op == 'subtract') {
        let temp = subtract(a, b);
        result.textContent = temp;
        firstNumString = temp;
    }
    else if (op == 'multiply') {
        let temp = multiply(a, b);
        result.textContent = temp;
        firstNumString = temp;
    }
    else if (op == 'divide') {
        let temp = divide(a, b);
        result.textContent = temp;
        firstNumString = temp;
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
    result.textContent = 0;
    allOps.forEach(function(op) {
        op.style.backgroundColor = 'orange';
        op.style.color = 'white';
    });
}

//Need to fix decimal logic when it's inputted before a number
//Especially after performing an operation.