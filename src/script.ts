const display: HTMLInputElement | null = document.getElementById("display") as HTMLInputElement | null;
const buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll("button");
let num: number = ((display?.value as unknown) as number);
let trignometry_clicked: boolean = false;
let func_clicked: boolean = false;
let yroot_clicked: boolean = false;
let logbase_clicked: boolean = false;

buttons.forEach((item)=>{
    item.addEventListener('click', (e) => {
        let val: string = (e.target as HTMLInputElement).value;
        const clearElement: HTMLInputElement | null = document.getElementById("clear") as HTMLInputElement | null;
        if(item.id === "clear"){
            clearElement!.innerText = "C";
        }else{
            clearElement!.innerText = "CE";
        }
        if(display?.value === "0"){
            display.value = val;
        }else{
            // restricts clicking multiple operator
            let lastChar: string = display?.value.charAt(display.value.length - 1) ?? ""; //Nullish Coalescence
            let opr_arr: string[] = ["+", "-", "*", "/", "%", "."];
            if(opr_arr.includes(val) && opr_arr.includes(lastChar)){
                display!.value += "";
            }else{
                display!.value += val;
            }
        }
        num = Number(display?.value);
    });
});

function deg_rad(): void{
    let mode: HTMLElement | null = document.getElementById("deg_rad");
    let val: string | undefined = display?.value;
    let calculatedVal: number = 0;
    if(mode?.innerText === "DEG"){
        mode.innerText = "RAD";
        calculatedVal = ((val as unknown) as number) * 0.0175;
        display!.value = ((calculatedVal as unknown) as string);
    }else if(mode?.innerText === "RAD"){
        mode.innerText = "GRAD";
        calculatedVal = ((val as unknown) as number) * 63.662;
        display!.value = ((calculatedVal as unknown) as string);
    }else{
        mode!.innerText = "DEG";
        calculatedVal = ((val as unknown) as number) * 0.9;
        display!.value = ((calculatedVal as unknown) as string);
    }
}

function fixedToExp(): void{
    display!.value = Number(display?.value).toExponential();
};

// function to change set of operations when 2nd clicked
function toggleOperations(): void{
    const col1: HTMLElement[] = Array.from(document.getElementsByClassName("option1") as HTMLCollectionOf<HTMLElement>);
    const col2: HTMLElement[] = Array.from(document.getElementsByClassName("option2") as HTMLCollectionOf<HTMLElement>);

    if(col2[0].style.display === "inline-block"){
        for(let i=0;i<6;i++){
            col1[i].style.display = "inline-block";
        }
        for(let i=0;i<6;i++){
            col2[i].style.display = "none";
        }
    }else{
        for(let i=0;i<6;i++){
            col2[i].style.display = "inline-block";
        }
        for(let i=0;i<6;i++){
            col1[i].style.display = "none";
        }
    }
};

// flag to show trignometry clicked
function trignometry(): void{
    trignometry_clicked = true;
}

// flag to show y root x, log x to base y clicked
function func(): void{
    func_clicked = true;
}

function pi(): void{
    const pi: number = 3.14159265359;
    if(display?.value === ""){
        display.value = (pi as unknown) as string;
    }else{
        let dispVal: number = (display?.value as unknown) as number;
        dispVal *= pi;
        display!.value = (dispVal as unknown) as string;
    }
}

function eValue(): void{
    const e: number = 2.71828182846;
    if(display?.value === ""){
        display.value = (e as unknown) as string;
    }else{
      let dispVal: number = (display?.value as unknown) as number;
        dispVal *= e;
        display!.value = (dispVal as unknown) as string;
    }
}

function clr(): void{
    display!.value = "";
    (document.getElementById("trig_dropdown") as HTMLOptionElement)!.selected = true;
    (document.getElementById("func_dropdown") as HTMLOptionElement)!.selected = true;
}

function backspace(): void{
    let displayExpression: string | undefined = display?.value.toString();
    display!.value = displayExpression?.substr(0, displayExpression.length - 1) ?? '';
}

function xsq(): void{
    display!.value = ((num * num) as unknown) as string;
}

function xcube(): void{
    display!.value = (Math.pow(num, 3) as unknown) as string;
}

function oneByX(): void{
    display!.value = ((1 / num) as unknown) as string;
}

function modulus(): void{
    display!.value = Math.abs(Number(display?.value)).toString();
}

function exp(): void{
    display!.value = Math.exp(Number(display?.value)).toString();
}

function sqroot(): void{
    display!.value = Math.sqrt(num).toString();
}

function cuberoot(): void{
    display!.value = Math.cbrt(num).toString();
}

function fact(): void{
    let fact: number = 1;
    for(let i=1; i<=parseInt(display!.value); i++){
        fact *= i;
    }
    display!.value = fact.toString();
}

function tenPowX(): void{
    display!.value = Math.pow(10, num).toString();
}

function twoPowX(): void{
    display!.value = Math.pow(2, num).toString();
}

function log(): void{
    display!.value = Math.log10(num).toString();
}

function ln(): void{
    display!.value = Math.log(num).toString();
}

function toggleSign(): void{
    display!.value = (num * (-1)).toString();
}

function equal(): void{
    try{
        display!.value = eval(display!.value);
    }catch(err){
        adv_eval();
    }
}

// function for trignometry, y root x, log x to base y
function adv_eval(): string | void{
    let expression: string = display!.value;
    if(trignometry_clicked || func_clicked){
        const func: string[] = expression.split("(");
        const number: string[] = func[1].split(")");
        const numRad: number = Number(number[0]) * Math.PI / 180;
        switch(func[0]){
            case 'sin':
                display!.value = Math.sin(numRad).toFixed(2);
                break;
            case 'cos':
                display!.value = Math.cos(numRad).toFixed(2);
                break;
            case 'tan':
                display!.value = Math.tan(numRad).toFixed(2);
                break;
            case 'cosec':
                let sine: number = Number(Math.sin(numRad).toFixed(2));
                display!.value = (1 / sine).toString();
                break;
            case 'sec':
                let cosine: number = Number(Math.cos(numRad).toFixed(2));
                display!.value = (1 / cosine).toString();
                break;
            case 'cot':
                let tangent: number = Number(Math.cos(numRad).toFixed(2));
                display!.value = (1 / tangent).toString();
                break;
            case 'abs':
                display!.value = Math.abs(eval(number[0])).toString();
                break;
            case 'floor':
                display!.value = Math.floor(eval(number[0])).toString();
                break;
            case 'ceil':
                display!.value = Math.ceil(eval(number[0])).toString();
                break;
            default:
                return "Invalid";
        }
        trignometry_clicked = false;
        func_clicked = false;
    }else{
        const func: string[] = expression.split(" ");
        let x: number = parseInt(func[0]);
        let y: number = parseInt(func[3]);
        if(func[1] === "log"){
            var a = Math.log(x);
            var b = Math.log(y);
            if(a === 0 && b === 0){
                display!.value = "0";
            }else{
                display!.value = (a / b).toString();
            }
        }else{
            display!.value = Math.round(Math.pow(x, 1/y)).toString();
        }
    }
}

// Memory functions
function mc(): void{
    display!.value = "";
    localStorage.removeItem("memory");
    var mc_element = document.getElementById("mc");
    mc_element?.classList.remove("fontWt");
    mc_element?.classList.add("btnDark");
    var mr_element = document.getElementById("mr");
    mr_element?.classList.remove("fontWt");
    mr_element?.classList.add("btnDark");
}

function mr(): void{
    display!.value = localStorage.getItem("memory") ?? "";
}

function m_plus(): void{
    let memory: string | null = localStorage.getItem("memory");
    memory = Number(memory) + eval(display!.value);
    localStorage.setItem("memory", memory ?? "");
    var mc_element = document.getElementById("mc");
    mc_element!.classList.add("fontWt");
    mc_element!.classList.remove("btnDark");
    var mr_element = document.getElementById("mr");
    mr_element!.classList.add("fontWt");
    mr_element!.classList.remove("btnDark");
}

function m_minus(): void{
    let memory: string | null = localStorage.getItem("memory");
    memory = (Number(memory) - eval(display!.value)).toString();
    localStorage.setItem("memory", memory);
    var mc_element = document.getElementById("mc");
    mc_element!.classList.add("fontWt");
    mc_element!.classList.remove("btnDark");
    var mr_element = document.getElementById("mr");
    mr_element!.classList.add("fontWt");
    mr_element!.classList.remove("btnDark");
}

function ms(): void{
    let memory: any = eval(display!.value);
    localStorage.setItem("memory", memory);
    var mc_element = document.getElementById("mc");
    mc_element!.classList.add("fontWt");
    mc_element!.classList.remove("btnDark");
    var mr_element = document.getElementById("mr");
    mr_element!.classList.add("fontWt");
    mr_element!.classList.remove("btnDark");
}
