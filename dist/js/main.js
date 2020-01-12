// DOM elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolstEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// Generate event Listen
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbols = symbolstEl.checked;

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbols, length);
});

// Copy password to clipboard

clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password) {
        return;
    }
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard!');

})

// Generate Password function 

function generatePassword(lower, upper, number, symbol, length) {
    // Init pw var
    // Filter out unchecked types
    // Loop over length call generator function for each type
    // Add final pw to the pw var and return
    let generatedPassword = '';

    const typesCount = lower + upper + number + symbol;

    //console.log('typesCount:', typesCount);

    const typesArr = [{
        lower
    }, {
        upper
    }, {
        number
    }, {
        symbol
    }].filter
    (
        item => Object.values(item)[0]
    );


    //console.log('typesArr:', typesArr);
    
    if (typesCount === 0) {
        return '';
    }
    
    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const FuncName = Object.keys(type)[0];
            //console.log('funcName:', FuncName);

            generatedPassword += randomFunc[FuncName]();
        });
    }
    const finalPassword = generatedPassword.slice(0,length);

    return finalPassword;
}


// Generate functions
// http://net-comber.com/charset.html

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!?@#$^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}