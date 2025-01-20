const expenseForm = document.getElementById('expense-form');
const expenseTable = document.getElementById('expense-table');
const downloadButton = document.getElementById('download-csv');

const categories = `
Transport
Extra curricular activities
`.trim().split('\n'); // Convert the string into an array

// Populate the category dropdown
const categoryDropdown = document.getElementById('category');

  // Populate the category dropdown
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryDropdown.appendChild(option);
  });

console.log(categories);

  let expenses = []; // Array to hold expense data

  // Add expense to the table and array
  expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form values
  const date = document.getElementById('date').value;
  const category = document.getElementById('category').value;
  const amount = parseFloat(document.getElementById('amount').value).toFixed(2);
  const notes = document.getElementById('notes').value;

  // Add expense to array
  expenses.push({ date, category, amount, notes });

  // Add expense to the table
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${date}</td>
    <td>${category}</td>
    <td>${amount}</td>
    <td>${notes}</td>
  `;
  expenseTable.appendChild(row);

  // Reset the form
  expenseForm.reset();
});

// Download CSV file
downloadButton.addEventListener('click', () => {
  const csvContent = [
    ['Date', 'Category', 'Amount', 'Notes'], // CSV header
    ...expenses.map(exp => [exp.date, exp.category, exp.amount, exp.notes]) // Rows
  ]
    .map(e => e.join(',')) // Join each row with commas
    .join('\n'); // Join all rows with newlines

  // Create a Blob and URL for the file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  // Create a download link
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'expenses.csv');
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
