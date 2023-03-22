"use strict";
const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
let num = display === null || display === void 0 ? void 0 : display.value;
let trignometry_clicked = false;
let func_clicked = false;
let yroot_clicked = false;
let logbase_clicked = false;
buttons.forEach((item) => {
    item.addEventListener('click', (e) => {
        var _a;
        let val = e.target.value;
        const clearElement = document.getElementById("clear");
        if (item.id === "clear") {
            clearElement.innerText = "C";
        }
        else {
            clearElement.innerText = "CE";
        }
        if ((display === null || display === void 0 ? void 0 : display.value) === "0") {
            display.value = val;
        }
        else {
            // restricts clicking multiple operator
            let lastChar = (_a = display === null || display === void 0 ? void 0 : display.value.charAt(display.value.length - 1)) !== null && _a !== void 0 ? _a : ""; //Nullish Coalescence
            let opr_arr = ["+", "-", "*", "/", "%", "."];
            if (opr_arr.includes(val) && opr_arr.includes(lastChar)) {
                display.value += "";
            }
            else {
                display.value += val;
            }
        }
        num = Number(display === null || display === void 0 ? void 0 : display.value);
    });
});
function deg_rad() {
    let mode = document.getElementById("deg_rad");
    let val = display === null || display === void 0 ? void 0 : display.value;
    let calculatedVal = 0;
    if ((mode === null || mode === void 0 ? void 0 : mode.innerText) === "DEG") {
        mode.innerText = "RAD";
        calculatedVal = val * 0.0175;
        display.value = calculatedVal;
    }
    else if ((mode === null || mode === void 0 ? void 0 : mode.innerText) === "RAD") {
        mode.innerText = "GRAD";
        calculatedVal = val * 63.662;
        display.value = calculatedVal;
    }
    else {
        mode.innerText = "DEG";
        calculatedVal = val * 0.9;
        display.value = calculatedVal;
    }
}
function fixedToExp() {
    display.value = Number(display === null || display === void 0 ? void 0 : display.value).toExponential();
}
;
// function to change set of operations when 2nd clicked
function toggleOperations() {
    const col1 = Array.from(document.getElementsByClassName("option1"));
    const col2 = Array.from(document.getElementsByClassName("option2"));
    if (col2[0].style.display === "inline-block") {
        for (let i = 0; i < 6; i++) {
            col1[i].style.display = "inline-block";
        }
        for (let i = 0; i < 6; i++) {
            col2[i].style.display = "none";
        }
    }
    else {
        for (let i = 0; i < 6; i++) {
            col2[i].style.display = "inline-block";
        }
        for (let i = 0; i < 6; i++) {
            col1[i].style.display = "none";
        }
    }
}
;
// flag to show trignometry clicked
function trignometry() {
    trignometry_clicked = true;
}
// flag to show y root x, log x to base y clicked
function func() {
    func_clicked = true;
}
function pi() {
    const pi = 3.14159265359;
    if ((display === null || display === void 0 ? void 0 : display.value) === "") {
        display.value = pi;
    }
    else {
        let dispVal = display === null || display === void 0 ? void 0 : display.value;
        dispVal *= pi;
        display.value = dispVal;
    }
}
function eValue() {
    const e = 2.71828182846;
    if ((display === null || display === void 0 ? void 0 : display.value) === "") {
        display.value = e;
    }
    else {
        let dispVal = display === null || display === void 0 ? void 0 : display.value;
        dispVal *= e;
        display.value = dispVal;
    }
}
function clr() {
    display.value = "";
    document.getElementById("trig_dropdown").selected = true;
    document.getElementById("func_dropdown").selected = true;
}
function backspace() {
    var _a;
    let displayExpression = display === null || display === void 0 ? void 0 : display.value.toString();
    display.value = (_a = displayExpression === null || displayExpression === void 0 ? void 0 : displayExpression.substr(0, displayExpression.length - 1)) !== null && _a !== void 0 ? _a : '';
}
function xsq() {
    display.value = (num * num);
}
function xcube() {
    display.value = Math.pow(num, 3);
}
function oneByX() {
    display.value = (1 / num);
}
function modulus() {
    display.value = Math.abs(Number(display === null || display === void 0 ? void 0 : display.value)).toString();
}
function exp() {
    display.value = Math.exp(Number(display === null || display === void 0 ? void 0 : display.value)).toString();
}
function sqroot() {
    display.value = Math.sqrt(num).toString();
}
function cuberoot() {
    display.value = Math.cbrt(num).toString();
}
function fact() {
    let fact = 1;
    for (let i = 1; i <= parseInt(display.value); i++) {
        fact *= i;
    }
    display.value = fact.toString();
}
function tenPowX() {
    display.value = Math.pow(10, num).toString();
}
function twoPowX() {
    display.value = Math.pow(2, num).toString();
}
function log() {
    display.value = Math.log10(num).toString();
}
function ln() {
    display.value = Math.log(num).toString();
}
function toggleSign() {
    display.value = (num * (-1)).toString();
}
function equal() {
    try {
        display.value = eval(display.value);
    }
    catch (err) {
        adv_eval();
    }
}
// function for trignometry, y root x, log x to base y
function adv_eval() {
    let expression = display.value;
    if (trignometry_clicked || func_clicked) {
        const func = expression.split("(");
        const number = func[1].split(")");
        const numRad = Number(number[0]) * Math.PI / 180;
        switch (func[0]) {
            case 'sin':
                display.value = Math.sin(numRad).toFixed(2);
                break;
            case 'cos':
                display.value = Math.cos(numRad).toFixed(2);
                break;
            case 'tan':
                display.value = Math.tan(numRad).toFixed(2);
                break;
            case 'cosec':
                let sine = Number(Math.sin(numRad).toFixed(2));
                display.value = (1 / sine).toString();
                break;
            case 'sec':
                let cosine = Number(Math.cos(numRad).toFixed(2));
                display.value = (1 / cosine).toString();
                break;
            case 'cot':
                let tangent = Number(Math.cos(numRad).toFixed(2));
                display.value = (1 / tangent).toString();
                break;
            case 'abs':
                display.value = Math.abs(eval(number[0])).toString();
                break;
            case 'floor':
                display.value = Math.floor(eval(number[0])).toString();
                break;
            case 'ceil':
                display.value = Math.ceil(eval(number[0])).toString();
                break;
            default:
                return "Invalid";
        }
        trignometry_clicked = false;
        func_clicked = false;
    }
    else {
        const func = expression.split(" ");
        let x = parseInt(func[0]);
        let y = parseInt(func[3]);
        if (func[1] === "log") {
            var a = Math.log(x);
            var b = Math.log(y);
            if (a === 0 && b === 0) {
                display.value = "0";
            }
            else {
                display.value = (a / b).toString();
            }
        }
        else {
            display.value = Math.round(Math.pow(x, 1 / y)).toString();
        }
    }
}
// Memory functions
function mc() {
    display.value = "";
    localStorage.removeItem("memory");
    var mc_element = document.getElementById("mc");
    mc_element === null || mc_element === void 0 ? void 0 : mc_element.classList.remove("fontWt");
    mc_element === null || mc_element === void 0 ? void 0 : mc_element.classList.add("btnDark");
    var mr_element = document.getElementById("mr");
    mr_element === null || mr_element === void 0 ? void 0 : mr_element.classList.remove("fontWt");
    mr_element === null || mr_element === void 0 ? void 0 : mr_element.classList.add("btnDark");
}
function mr() {
    var _a;
    display.value = (_a = localStorage.getItem("memory")) !== null && _a !== void 0 ? _a : "";
}
function m_plus() {
    let memory = localStorage.getItem("memory");
    memory = Number(memory) + eval(display.value);
    localStorage.setItem("memory", memory !== null && memory !== void 0 ? memory : "");
    var mc_element = document.getElementById("mc");
    mc_element.classList.add("fontWt");
    mc_element.classList.remove("btnDark");
    var mr_element = document.getElementById("mr");
    mr_element.classList.add("fontWt");
    mr_element.classList.remove("btnDark");
}
function m_minus() {
    let memory = localStorage.getItem("memory");
    memory = (Number(memory) - eval(display.value)).toString();
    localStorage.setItem("memory", memory);
    var mc_element = document.getElementById("mc");
    mc_element.classList.add("fontWt");
    mc_element.classList.remove("btnDark");
    var mr_element = document.getElementById("mr");
    mr_element.classList.add("fontWt");
    mr_element.classList.remove("btnDark");
}
function ms() {
    let memory = eval(display.value);
    localStorage.setItem("memory", memory);
    var mc_element = document.getElementById("mc");
    mc_element.classList.add("fontWt");
    mc_element.classList.remove("btnDark");
    var mr_element = document.getElementById("mr");
    mr_element.classList.add("fontWt");
    mr_element.classList.remove("btnDark");
}
