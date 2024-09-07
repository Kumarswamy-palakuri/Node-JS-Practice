const form = document.getElementById('item-form');
const itemsList = document.getElementById('items-list');
const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description');
const itemIdInput = document.getElementById('item-id');

// Fetch and display items on page load
window.onload = () => {
  fetchItems();
};

// Function to fetch all items (GET)
async function fetchItems() {
  const response = await fetch('/api/items');
  const items = await response.json();
  displayItems(items);
}

// Function to display items
function displayItems(items) {
  itemsList.innerHTML = '';
  items.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${item.name}</strong>: ${item.description}
      <button onclick="editItem('${item._id}', '${item.name}', '${item.description}')">Edit</button>
      <button onclick="deleteItem('${item._id}')">Delete</button>
    `;
    itemsList.appendChild(li);
  });
}

// Handle form submit for Create/Update
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const itemId = itemIdInput.value;
  const name = nameInput.value;
  const description = descriptionInput.value;
  
  const method = itemId ? 'PUT' : 'POST';
  const url = itemId ? `/api/items/${itemId}` : '/api/items';
  
  await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, description }),
  });
  
  form.reset();
  itemIdInput.value = '';
  fetchItems();
});

// Edit an item
function editItem(id, name, description) {
  itemIdInput.value = id;
  nameInput.value = name;
  descriptionInput.value = description;
}

// Delete an item (DELETE)
async function deleteItem(id) {
  await fetch(`/api/items/${id}`, {
    method: 'DELETE',
  });
  fetchItems();
}
