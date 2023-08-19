const screen = document.querySelector('.screen');

const numButtons = document.querySelectorAll('.number');

let buffer = '';

numButtons.forEach(number => number.addEventListener('click', () => {

  if (screen.textContent.includes('.') && number.textContent === '.') return;

  buffer += number.textContent;

  screen.textContent = buffer;
}))

let operation = '';
let firstNumber = null;
let secondNumber = null;

const functionButtons = document.querySelectorAll('.functionButtons');

functionButtons.forEach(operator => operator.addEventListener('click', () => {

  console.log(operator);

  switch (operator.textContent) {
    case '+':
      if (firstNumber != null) {
        continiousOperation(operation, firstNumber);
      }
      firstNumber = Number(screen.textContent);
      buffer = '';
      operation = '+';
      break;
    case '-':
      if (firstNumber != null) {
        secondNumber = Number(screen.textContent);
        screen.textContent = operate(operation, firstNumber, secondNumber);
      }
      firstNumber = Number(screen.textContent);
      buffer = '';
      operation = '-';
      break;
    case '*':
      if (firstNumber != null) {
        secondNumber = Number(screen.textContent);
        screen.textContent = operate(operation, firstNumber, secondNumber);
      }
      firstNumber = Number(screen.textContent);
      buffer = '';
      operation = '*';
      break;
    case '/':
      if (firstNumber != null) {
        secondNumber = Number(screen.textContent);
        screen.textContent = operate(operation, firstNumber, secondNumber);
      }
      firstNumber = Number(screen.textContent);
      buffer = '';
      operation = '/';
      break;
    case '=':
      secondNumber = Number(screen.textContent);
      if(firstNumber == null || secondNumber == null) return;
      screen.textContent = operate(operation, firstNumber, secondNumber);
      operation = '';
      firstNumber = null;
      secondNumber = null;
      break;
  }

}));

function operate(operator, firstNumber, secondNumber) {
  switch (operator) {
    case '+':
      return firstNumber + secondNumber;
    case '-':
      return firstNumber - secondNumber;
    case '*':
      return firstNumber * secondNumber;
    case '/':
      if (secondNumber == 0) return `Can't divide by zero`;
      let sum = Math.round(firstNumber / secondNumber);
      return sum % 2 ? sum.toFixed(2) : sum;

  }
}

function continiousOperation(operator, firstNumber) {
  secondNumber = Number(screen.textContent);
  screen.textContent = operate(operator, firstNumber, secondNumber);
}

const removeButtons = document.querySelectorAll('.removeNumberButtons');

removeButtons.forEach(button => button.addEventListener('click', () => {

  switch (button.id) {
    case 'clear':
      screen.textContent = '0';
      firstNumber = null;
      secondNumber = null;
      buffer = '';
      break;
    case 'back':
      let currentInput = screen.textContent;

      if (currentInput.length == 1) {
        screen.textContent = '0';
        buffer = '';
        return;
      };
      screen.textContent = currentInput.slice(0, (currentInput.length - 1));
      buffer = screen.textContent;
      break;
  }
}));

function toggleKey(e) {
  const key = document.querySelector(`button[data-key="${e.key}"]`);

  if (key == null) return;

  if (key.textContent == 'C') {
    screen.textContent = '0';
    firstNumber = null;
    secondNumber = null;
    buffer = '';
    return;
  }

  buffer += key.textContent;

  screen.textContent = buffer;
}

window.addEventListener('keydown', toggleKey);