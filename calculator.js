let currentValue = '0';
let previousValue = '';
let operator = null;
let shouldResetScreen = false;

const currentDisplay = document.getElementById('current');
const previousDisplay = document.getElementById('previous');

function updateDisplay() {
    currentDisplay.textContent = currentValue;
    if (operator && previousValue) {
        const opSymbol = operator === '*' ? '×' : operator === '/' ? '÷' : operator === '-' ? '−' : operator;
        previousDisplay.textContent = `${previousValue} ${opSymbol}`;
    } else {
        previousDisplay.textContent = '';
    }
}

function appendNumber(number) {
    if (shouldResetScreen) {
        currentValue = '';
        shouldResetScreen = false;
    }
    
    if (number === '.' && currentValue.includes('.')) return;
    if (currentValue === '0' && number !== '.') {
        currentValue = number;
    } else {
        currentValue += number;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operator !== null) {
        calculate();
    }
    operator = op;
    previousValue = currentValue;
    shouldResetScreen = true;
    updateDisplay();
}

function calculate() {
    if (operator === null || shouldResetScreen) return;
    
    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                result = 'Error';
            } else {
                result = prev / current;
            }
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }
    
    if (typeof result === 'number') {
        result = Math.round(result * 1000000) / 1000000;
    }
    
    currentValue = result.toString();
    operator = null;
    previousValue = '';
    shouldResetScreen = true;
    updateDisplay();
}

function clearAll() {
    currentValue = '0';
    previousValue = '';
    operator = null;
    shouldResetScreen = false;
    updateDisplay();
}

function deleteLast() {
    if (currentValue.length === 1 || currentValue === 'Error') {
        currentValue = '0';
    } else {
        currentValue = currentValue.slice(0, -1);
    }
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    if (e.key === '.') appendNumber('.');
    if (e.key === '+') appendOperator('+');
    if (e.key === '-') appendOperator('-');
    if (e.key === '*') appendOperator('*');
    if (e.key === '/') appendOperator('/');
    if (e.key === '%') appendOperator('%');
    if (e.key === 'Enter' || e.key === '=') calculate();
    if (e.key === 'Escape') clearAll();
    if (e.key === 'Backspace') deleteLast();
});
