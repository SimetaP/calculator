class Calculator {
    constructor(displayUp, displayDown) {
        this.displayUpTextEl = displayUpTextEl
        this.displayDownTextEl = displayDownTextEl
        this.clear()
    }

    clear() {
        this.previousOperand = ''
        this.currentOperand = ''
        this.operation = undefined
    }

    updateDisplayDown() {
        this.displayDownTextEl.innerText = this.currentOperand
        if (this.operation != null) {
            this.displayUpTextEl.innerText =
              `${this.previousOperand} ${this.operation}`
          } else {
            this.displayUpTextEl.innerText = ''
          }
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
          case '+':
            computation = prev + current
            break
          case '-':
            computation = prev - current
            break
          case '×':
            computation = prev * current
            break
          case '÷':
            computation = prev / current
            break
          default:
            return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
      }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
}


const numberButtons = document.querySelectorAll('.number')
const operationButtons = document.querySelectorAll('.operation')
const equalsButton = document.querySelector('.equals')
const deleteButton = document.querySelector('.delete')
const allClearButton = document.querySelector('.all-clear')
const displayUpTextEl = document.getElementById('display-up')
const displayDownTextEl = document.getElementById('display-down')

const calculator = new Calculator(displayUpTextEl, displayDownTextEl)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplayDown()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplayDown()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplayDown()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplayDown()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplayDown()
})