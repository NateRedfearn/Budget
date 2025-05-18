let budgetData = [];

document.getElementById('csvFileInput').addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const text = e.target.result;
    const rows = text.split('\n').map(row => row.split(','));
    budgetData = rows.slice(1).filter(r => r.length === 4); // Remove header & empty lines
    updateTable();
  };
  reader.readAsText(file);
}

function updateTable() {
  const tbody = document.querySelector('#budgetTable tbody');
  tbody.innerHTML = '';
  budgetData.forEach(row => {
    const tr = document.createElement('tr');
    row.forEach(cell => {
      const td = document.createElement('td');
      td.textContent = cell;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

function addEntry() {
  const date = document.getElementById('date').value;
  const description = document.getElementById('description').value;
  const amount = document.getElementById('amount').value;
  const category = document.getElementById('category').value;

  if (date && description && amount && category) {
    const newRow = [date, description, amount, category];
    budgetData.push(newRow);
    updateTable();
  }
}

function downloadCSV() {
  let csvContent = "data:text/csv;charset=utf-8,Date,Description,Amount,Category\n";
  budgetData.forEach(row => {
    csvContent += row.join(",") + "\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "budget_data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
