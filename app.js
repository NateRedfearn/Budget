let expenses = [];
let income = 0;

function updateIncome() {
  income = parseFloat(document.getElementById('income').value) || 0;
  renderSummary();
}

function addExpense() {
  const date = document.getElementById('expenseDate').value;
  const desc = document.getElementById('expenseDesc').value;
  const amount = parseFloat(document.getElementById('expenseAmount').value);
  const category = document.getElementById('expenseCategory').value;

  if (!date || !desc || isNaN(amount) || !category) return;

  expenses.push([date, desc, amount.toFixed(2), category]);
  renderTable();
  renderSummary();

  // clear fields
  document.getElementById('expenseDate').value = '';
  document.getElementById('expenseDesc').value = '';
  document.getElementById('expenseAmount').value = '';
  document.getElementById('expenseCategory').value = '';
}

function renderTable() {
  const tbody = document.getElementById('expenseTableBody');
  tbody.innerHTML = '';
  expenses.forEach(row => {
    const tr = document.createElement('tr');
    row.forEach(cell => {
      const td = document.createElement('td');
      td.textContent = cell;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

function renderSummary() {
  const total = expenses.reduce((sum, row) => sum + parseFloat(row[2]), 0);
  document.getElementById('totalIncome').textContent = income.toFixed(2);
  document.getElementById('totalExpenses').textContent = total.toFixed(2);
  document.getElementById('remaining').textContent = (income - total).toFixed(2);
}

document.getElementById('csvFileInput').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const text = e.target.result;
    const rows = text.trim().split('\n').map(row => row.split(','));
    expenses = rows.slice(1); // skip header
    renderTable();
    renderSummary();
  };
  reader.readAsText(file);
});

function downloadCSV() {
  let csv = "Date,Description,Amount,Category\n";
  expenses.forEach(row => {
    csv += row.join(",") + "\n";
  });

  const link = document.createElement("a");
  link.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(csv));
  link.setAttribute("download", "expenses.csv");
  link.click();
}
