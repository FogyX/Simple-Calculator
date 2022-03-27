/**@type {HTMLInputElement} */
let inputField = document.getElementById('inp');

/**@type {HTMLElement} */
let outputField = document.getElementById('out');

const buttons = document.querySelectorAll('.ui_button');

const validSymbols = ['+', '-', '*', '/'];

const options = {
    'button7': buttonAddSymbol,
    'button8': buttonAddSymbol,
    'button9': buttonAddSymbol,
    'buttonPLus': buttonAddSymbol,
    'button4': buttonAddSymbol,
    'button5': buttonAddSymbol,
    'button6': buttonAddSymbol,
    'buttonMinus': buttonAddSymbol,
    'button1': buttonAddSymbol,
    'button2': buttonAddSymbol,
    'button3': buttonAddSymbol,
    'buttonMultiply': buttonAddSymbol,
    'buttonDelete': buttonDelete,
    'button0': buttonAddSymbol,
    'buttonEquals': buttonEquals,
    'buttonDivide': buttonAddSymbol,
    'buttonClear': buttonClear,
    'buttonPower': buttonPower,
    'buttonBracketOpen': buttonAddSymbol,
    'buttonBracketClose': buttonAddSymbol
}

buttons.forEach(element => {
    element.addEventListener('click', onButtonDown)
});

/**
 * @param {Event} event
 */
function onButtonDown(event) {

    /** @type {Function} */
    let funcToExec = options[event.currentTarget.id];

    let symbol = event.currentTarget.firstChild.textContent;

    funcToExec(symbol);
    checkLength();

}

function checkLength() {
    if (inputField.value.length > inputField.maxLength) {
        inputField.value =  inputField.value.slice(0, -1);
    }
}

/*
* Вот тут идут все функции кнопок
*/

/**
 * 
 * @param {String} symbol 
 */
function buttonAddSymbol(symbol) {
    inputField.value += symbol;
}

function buttonDelete() {
    inputField.value =  inputField.value.slice(0, -1);
}

function buttonClear() {
    inputField.value = '';
}

function buttonPower() {
    inputField.value += '^';
}

function buttonEquals() {

    let isValid = true;
    let value = inputField.value.replace('^', '**');

    for (let i = 0; i < value.length; i++) {
        if (isNaN(value[i]) && !(validSymbols.includes(value[i]))) {

            isValid = false;
            break;
        }
    }

    if (!isValid) {
        outputField.textContent = 'Invalid input!';
        inputField.value = '';
        return;
    }
    try {
        outputField.textContent = eval(value);
        inputField.value = '';
    } catch (error) {
        outputField.textContent = 'Invalid input!'
        inputField.value = '';
    }
    
}