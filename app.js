// Get form element and add submit event listener
const form = document.getElementById('food-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form inputs
  const foodName = form.foodName.value;
  const foodType = form.foodType.value;
  const maxDeliveryTime = form.maxDeliveryTime.value;
  
  // Create food item object
  const foodItem = { foodName, foodType, maxDeliveryTime };
  
  // Get stored food items or initialize array
  let foodItems = JSON.parse(localStorage.getItem('foodItems')) || [];
  
  // Add new food item to array and store in local storage
  foodItems.push(foodItem);
  localStorage.setItem('foodItems', JSON.stringify(foodItems));
  
  // Clear form inputs
  form.foodName.value = '';
  form.foodType.value = '';
  form.maxDeliveryTime.value = '';
});

// Get filter form elements and add input event listeners
const filterForm = document.getElementById('filter-form');
const filterFoodType = document.getElementById('filter-food-type');
const filterDeliveryTime = document.getElementById('filter-delivery-time');

filterFoodType.addEventListener('input', updateFilteredItems);
filterDeliveryTime.addEventListener('input', updateFilteredItems);

// Function to update filtered items based on filter form inputs
function updateFilteredItems() {
  // Get stored food items or initialize array
  let foodItems = JSON.parse(localStorage.getItem('foodItems')) || [];
  
  // Filter food items based on filter form inputs
  const filteredItems = foodItems.filter((item) => {
    if (filterFoodType.value !== '' && item.foodType !== filterFoodType.value) {
      return false;
    }
    if (filterDeliveryTime.value !== '' && item.maxDeliveryTime > filterDeliveryTime.value) {
      return false;
    }
    return true;
  });
  
  // Update displayed food items
  displayFoodItems(filteredItems);
}

// Function to display all food items
function displayAllFoodItems() {
  // Get stored food items or initialize empty array
  let foodItems = JSON.parse(localStorage.getItem('foodItems')) || [];
  
  // Update displayed food items
  displayFoodItems(foodItems);
}


function displayFoodItems(foodItems) {
  
  const container = document.getElementById('food-container');
  
  
  container.innerHTML = '';
  
  
  foodItems.forEach((item) => {
    const card = document.createElement('div');
    card.classList.add('card');
    
    const name = document.createElement('h3');
    name.textContent = item.foodName;
    
    const type = document.createElement('p');
    type.textContent = `Type: ${item.foodType}`;
    
    const deliveryTime = document.createElement('p');
    deliveryTime.textContent = `Max Delivery Time: ${item.maxDeliveryTime} minutes`;
    
    card.appendChild(name);
    card.appendChild(type);
    card.appendChild(deliveryTime);
    
    container.appendChild(card);
  });
}


displayAllFoodItems();
