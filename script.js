// Toggle Hamburger Menu
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// To-Do List with Local Storage
const todoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('add-todo');
const todoListUl = document.getElementById('todo-list-ul');

// Function to update the to-do list in local storage
function updateTodoList() {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todoListUl.innerHTML = '';
  todos.forEach((todo, index) => {
      const todoItem = document.createElement('li');
      todoItem.innerHTML = `
          <span onclick="removeTodo(${index})">X</span> ${todo}
      `;
      todoListUl.appendChild(todoItem);
  });
}

// Function to add a new to-do item
addTodoButton.addEventListener('click', () => {
  const todoText = todoInput.value.trim();
  if (todoText) {
      const todos = JSON.parse(localStorage.getItem('todos')) || [];
      todos.push(todoText);
      localStorage.setItem('todos', JSON.stringify(todos));
      todoInput.value = ''; // Clear input field
      updateTodoList(); // Update the list display
  }
});

// Function to remove a to-do item
function removeTodo(index) {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.splice(index, 1); // Remove the selected item
  localStorage.setItem('todos', JSON.stringify(todos));
  updateTodoList(); // Update the list display
}

// Initial load of to-do list
updateTodoList();

// Product Listing with Filtering and Sorting
const categoryFilter = document.getElementById('category-filter');
const priceSort = document.getElementById('price-sort');
const productContainer = document.getElementById('product-container');

// Sample product data
const products = [
  { name: 'Laptop', category: 'electronics', price: 999.99, image: 'laptop.jpg' },
  { name: 'Shirt', category: 'clothing', price: 29.99, image: 'shirt.jpg' },
  { name: 'Novel', category: 'books', price: 15.99, image: 'novel.jpg' },
  // Add more products here
];

// Function to display products
function displayProducts() {
  const category = categoryFilter.value;
  const sortOrder = priceSort.value;
  let filteredProducts = products.filter(product => category === 'all' || product.category === category);

  if (sortOrder === 'asc') {
      filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'desc') {
      filteredProducts.sort((a, b) => b.price - a.price);
  }

  productContainer.innerHTML = '';
  filteredProducts.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
      productCard.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>$${product.price}</p>
      `;
      productContainer.appendChild(productCard);
  });
}

// Event listeners for filtering and sorting
categoryFilter.addEventListener('change', displayProducts);
priceSort.addEventListener('change', displayProducts);

// Initial display of products
displayProducts();
