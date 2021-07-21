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
        return "Error. Cannot divide by zero.";
    }
    return a / b;
}

function operate(op, a, b) {
    if (op == 'add') {
        add(a, b);
    }
    else if (op == 'subtract') {
        subtract(a, b);
    }
    else if (op == 'multiplu') {
        multiply(a, b);
    }
    else if (op == 'divide') {
        divide(a, b);
    }
}