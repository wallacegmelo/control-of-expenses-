const transactionsUl = document.querySelector('#transactions');
const incomeDisplay = document.querySelector('#money-plus');
const expenseDisplay = document.querySelector('#money-minus');
const balanceDisplay = document.querySelector('#balance');
const form = document.querySelector('#form');
const inputTransactionName = document.querySelector('#text');
const inputTransactionAmount = document.querySelector('#amount');

const localStorageTransactions = JSON.parse(localStorage
  .getItem('transactions'));
let transactions = localStorage
  .getItem('transactions') !== null ? localStorageTransactions : []; 

const removeTransaction = ID => {
  transactions = transactions
    .filter(transaction => transaction.id !== ID);
  updateLocalStorage();
  init();
}

const addTransactionIntoDOM = transaction => {
  const operator = transaction.amount < 0 ? '-' : '+';
  const amountWithoutOperator = Math.abs(transaction.amount);
  const amountWithToFixedAndCurrency = parseFloat(amountWithoutOperator.toFixed(2))
  .toLocaleString('pt-BR', {
    currency: 'BRL',
    minimumFractionDigits: 2
  });
  const CSSClass = transaction.amount < 0 ? 'minus' : 'plus';
  const li = document.createElement('li');

  li.classList.add(CSSClass);
  li.innerHTML = `
    ${transaction.name} 
    <span>${operator} R$${amountWithToFixedAndCurrency}</span>
    <button class="delete-btn" onClick="removeTransaction('${transaction.id}')">
      x
    </button>
  `;

  transactionsUl.prepend(li);
}

const updateBalanceValues = () => {
  const transactionsAmount = transactions
    .map(transaction => transaction.amount);
  const total = transactionsAmount
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2);
  const income = transactionsAmount
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2);
  const expense = Math.abs(transactionsAmount
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0))
    .toFixed(2);

  balanceDisplay.textContent = `R$ ${total}`;
  incomeDisplay.textContent = `R$ ${income}`;
  expenseDisplay.textContent = `R$ ${expense}`;
}

const init = () => {
  transactionsUl.innerHTML = '';
  transactions.forEach(addTransactionIntoDOM);
  updateBalanceValues();
}

init();

const updateLocalStorage = () => {
  localStorage.setItem('transactions', [JSON.stringify(transactions)]);
}

const generateID = () => (Math.random()*0xFFFFFF<<0).toString(16);

const addToTransactionsArray = (transactionName, transactionAmount) => {
  transactions.push({
    id: generateID(),
    name: transactionName,
    amount: +transactionAmount
  });
}

const cleanInputs = () => {
  inputTransactionName.value = '';
  inputTransactionAmount.value = '';
}

const handleFormSubmit = event => {
  event.preventDefault();

  const transactionName = inputTransactionName.value.trim();
  const transactionAmount = inputTransactionAmount.value.trim();
  const isSomeInputEmpty = transactionName === '' || transactionAmount === '';

  if (isSomeInputEmpty) {
    alert('Por favor, informe \"Nome\" e \"Valor\" para adicionar uma nova transação')

    return
  }

  addToTransactionsArray(transactionName, transactionAmount);

  init();
  updateLocalStorage();

  cleanInputs();
}

form.addEventListener('submit', handleFormSubmit);