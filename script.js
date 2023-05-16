document.getElementById('expense-form').addEventListener('submit', addExpense);

function addExpense(event) {
  event.preventDefault();

  const nameInput = document.getElementById('name');
  const amountInput = document.getElementById('amount');
  const expenseTableBody = document.getElementById('expense-table-body');
  const totalDiv = document.getElementById('total');

  const name = nameInput.value;
  const amount = parseFloat(amountInput.value);

  if (name && !isNaN(amount)) {
    const expense = {
      name: name,
      amount: amount
    };
    saveExpense(expense);
    renderExpense(expense);
    nameInput.value = '';
    amountInput.value = '';
    calculateTotal();
  }
}

function saveExpense(expense) {
  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  expenses.push(expense);
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

function renderExpense(expense) {
  const expenseTableBody = document.getElementById('expense-table-body');

  const row = document.createElement('tr');
  const nameCell = document.createElement('td');
  const amountCell = document.createElement('td');
  const actionCell = document.createElement('td');
  const deleteButton = document.createElement('button');

  nameCell.textContent = expense.name;
  amountCell.textContent = expense.amount.toFixed(2);
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete-button');
  deleteButton.dataset.index = expenseTableBody.children.length;

  actionCell.appendChild(deleteButton);

  row.appendChild(nameCell);
  row.appendChild(amountCell);
  row.appendChild(actionCell);

  expenseTableBody.appendChild(row);
}

function calculateTotal() {
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  let total = 0;

  for (let i = 0; i < expenses.length; i++) {
    total += expenses[i].amount;
  }

  const totalDiv = document.getElementById('total');
  totalDiv.textContent = 'Total: ' + total.toFixed(2);
}

function deleteExpense(index) {
  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

  if (index >= 0 && index < expenses.length) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
    calculateTotal();
  }
}

function renderExpenses() {
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  const expenseTableBody = document.getElementById('expense-table-body');
  expenseTableBody.innerHTML = '';

  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i];

    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const amountCell = document.createElement('td');
    const actionCell = document.createElement('td');
    const deleteButton = document.createElement('button');

    nameCell.textContent = expense.name;
    amountCell.textContent = expense.amount.toFixed(2);
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.dataset.index = i;
    deleteButton.addEventListener('click', function() {
      deleteExpense(i);
    });

    actionCell.appendChild(deleteButton);

    row.appendChild(nameCell);
    row.appendChild(amountCell);
    row.appendChild(actionCell);

    expenseTableBody.appendChild(row);
  }
}

renderExpenses();
calculateTotal();
