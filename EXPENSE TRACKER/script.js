// 1. SELECT DOM ELEMENTS
const balance = document.getElementById('balance');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// 2. INITIALIZE STATE (The Data)
// This is our "database" for now. Just an empty list.
// Check if data exists in LocalStorage. If yes, parse it. If no, start empty.
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];;

/* Example of what data will look like inside this array:
[
  { id: 1, text: 'Flower', amount: -20 },
  { id: 2, text: 'Salary', amount: 300 }
]
*/
// 3. ADD TRANSACTION FUNCTION
function addTransaction(e) {
  e.preventDefault(); // STOP the page from reloading!

  // Check if inputs are empty
  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
    return;
  }

  // Create the transaction object
  const transaction = {
    id: generateID(), // We need a unique ID to find it later
    text: text.value,
    amount: +amount.value // The '+' turns the string "20" into the number 20
  };

  // Update the State (The Truth)
  transactions.push(transaction);

  // Update the View (The Screen)
  addTransactionDOM(transaction);
  updateValues(); updateLocalStorage();

  // Clear inputs
  text.value = '';
  amount.value = '';
}

// Helper function to generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Event Listener: Listen for the submit click
form.addEventListener('submit', addTransaction);
// 4. UPDATE THE VIEW (DOM)
function addTransactionDOM(transaction) {
  // Get sign ( is it - or + ?)
  const sign = transaction.amount < 0 ? '-' : '+';
  
  // Determine class (red or green border?)
  const itemClass = transaction.amount < 0 ? 'minus' : 'plus';

  // Create a new List Item (<li>)
  const item = document.createElement('li');

  // Add the class for styling
  item.classList.add(itemClass);

  // set the HTML inside the li
  // Math.abs removes the negative sign so we can control it manually
  item.innerHTML = `
    ${transaction.text} 
    <span>${sign}$${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;

  // Add it to the list in the DOM
  list.appendChild(item);
}
// 5. UPDATE BALANCE
function updateValues() {
  // 1. Extract just the amounts from the transactions array
  const amounts = transactions.map(transaction => transaction.amount);

  // 2. Sum them all up (reduce is a fancy loop)
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  // 3. Update the HTML
  balance.innerText = `$${total}`;
}
// 6. REMOVE TRANSACTION BY ID
function removeTransaction(id) {
  // Filter out the item with the ID we clicked
  transactions = transactions.filter(transaction => transaction.id !== id);

  // Re-initialize the app to update the screen
  init(); updateLocalStorage();
}

// 7. INIT APP (Reload the list)
function init() {
  list.innerHTML = ''; // Clear the current HTML list
  
  // Re-run the 'addTransactionDOM' for every item left in our array
  transactions.forEach(addTransactionDOM);
  updateValues();
}
init();
// 8. UPDATE LOCAL STORAGE
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}