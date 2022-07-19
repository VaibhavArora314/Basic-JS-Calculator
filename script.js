class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
    }
    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    };

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    };

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (number === '.' && this.currentOperand === '') this.currentOperand = '0.'; 
        else this.currentOperand = this.currentOperand.toString() + number.toString();
    };

    chooseOperation(operation) {
        if (this.currentOperand === '')
            return;
        if (this.previousOperand !== '')
            this.compute();
        this.previousOperand = this.currentOperand;
        this.operation = operation;
        this.currentOperand = '';
    };

    compute() {
        let result;
        let prev = parseFloat(this.previousOperand);
        let curr = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(curr))
            return;
        switch (this.operation) {
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '*':
                result = prev * curr;
                break;
            case '÷':
                result = prev / curr;
                break;
            default:
                return;
        }
        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = '';
    };

    getNumberDisplay(number) {
        // const stringNum = number.toString();
        // if (!stringNum.includes('.')) {
        //     const integerDigits = parseFloat(stringNum);
        //     if (isNaN(integerDigits)) return '';
        //     return `${integerDigits.toLocaleString('en')}`;
        // }
        // const integerDigits = parseFloat(stringNum.split('.')[0]);
        // const decimalDigits = parseFloat(stringNum.split('.')[1]);
        // if (isNaN(integerDigits)) return '';
        // let integerNum = integerDigits.toLocaleString('en',{minimumFractionDigits: 0})
        // if (isNaN(decimalDigits)) return `${integerNum}.`;
        // return `${integerNum}.${decimalDigits}`;
        return number;
    }

    updateDisplay() {
        this.currentOperandText.innerText = this.getNumberDisplay(this.currentOperand);
        if (this.operation != undefined)
            this.previousOperandText.innerText = `${this.getNumberDisplay(this.previousOperand)} ${this.operation}`;
        else
            this.previousOperandText.innerText = ``;
    };
}

const numberBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');
const equalBtn = document.querySelector('[data-equal]');
const clearBtn = document.querySelector('[data-all-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');

const calc = new Calculator(previousOperandText,currentOperandText);
calc.clear();

numberBtns.forEach(button => {
    button.addEventListener('click', () => {
        calc.appendNumber(button.innerText);
        calc.updateDisplay();
    })
});

operationBtns.forEach(button => {
    button.addEventListener('click', () => {
        calc.chooseOperation(button.innerText);
        calc.updateDisplay();
    })
});

equalBtn.addEventListener('click',() => {
    calc.compute();
    calc.updateDisplay();
});

clearBtn.addEventListener('click', () => {
    calc.clear();
    calc.updateDisplay();
});

deleteBtn.addEventListener('click', () => {
    calc.delete();
    calc.updateDisplay();
});