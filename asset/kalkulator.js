const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false,
    result : false
 };

 function updateDisplay(){
     document.querySelector('.displayNum').innerText = calculator.displayNumber;
 }

 function clearCalculator(){
     calculator.displayNumber = "0";
     calculator.operator = null;
     calculator.firstNumber = null;
     calculator.waitingForSecondNumber = false;
     calculator.result = false;
 }

 function inputDigit(digit){
    //  cek apakah sudah ada firstnumber dan operator
    if( (calculator.waitingForSecondNumber && calculator.firstNumber) === calculator.displayNumber ){
        calculator.displayNumber = digit;
    }else {
        if( calculator.displayNumber === "0" ){
            calculator.displayNumber = digit;
        }else {
            calculator.displayNumber += digit;
        }
    }
 }

// fungsi operator
function negativeNum(){
    if( calculator.displayNumber === "0" ){
        return;
    }
    calculator.displayNumber *= -1;
}

// fungsi menghitung kalkulasi
function performCalculation(){
   
    let resultNum;
    if( (calculator.firstNumber && calculator.operator) == null ){
        alert("Anda belum menetapkan angka/operator");
        return;
    }
    else if(calculator.result == true){
        clearCalculator();
        return;
    }
    else {
        if( calculator.operator == "+" ){
            resultNum = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
            // calculator.displayNumber = resultNum;
            calculator.result = true;
        }else if( calculator.operator == "-" ){
            resultNum = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
            // calculator.displayNumber = resultNum;
            calculator.result = true;
        }
    } 

    // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
    const historyCalc = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: resultNum
    }

    putHistory(historyCalc);
    calculator.displayNumber = resultNum;
    renderHistory();
}

// fungsi handle operator
function handleOperator(operator){
    if(calculator.displayNumber == "0"){
        alert("Masukan angka terlebih dahulu");
        return;
    } else if(!calculator.waitingForSecondNumber){
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;
    }else {
        alert("Operator sudah diterapkan")
    }
}

const buttons = document.querySelectorAll(".button");

buttons.forEach(button => {
    button.addEventListener("click", event => {
        // mendapatkan objek elemen yang di klik
        const targetBtn = event.target;

        // fungsi clear calculator
        if( targetBtn.classList.contains("clear") ){
            clearCalculator();
            updateDisplay();
            return;
        }

        // panggil function negativeNum
        if( targetBtn.classList.contains("negative") ){
            negativeNum();
            updateDisplay();
            return;
        }

        if( targetBtn.classList.contains("operator") ){
            handleOperator(targetBtn.innerText);
            updateDisplay();
            return;
        }

        if( targetBtn.classList.contains("equals") ){
            performCalculation();
            updateDisplay();
            return;
        }


        inputDigit(targetBtn.innerText)
        updateDisplay()
    })
});