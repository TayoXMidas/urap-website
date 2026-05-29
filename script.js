// ===========================
// GLOBAL VARIABLES
// ===========================

let currentPriceFilter = 52;

// ===========================
// PAGE INITIALIZATION
// ===========================

document.addEventListener('DOMContentLoaded', function() {
  initializeEventListeners();
  initializeProductCards();
});

// ===========================
// EVENT LISTENERS
// ===========================

function initializeEventListeners() {
  // Price filter slider
  const priceSlider = document.getElementById('priceSlider');
  if (priceSlider) {
    priceSlider.addEventListener('input', handlePriceFilter);
  }

  // Sort dropdown
  const sortSelect = document.querySelector('.sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', handleSortChange);
  }

  // Category buttons
  const categoryButtons = document.querySelectorAll('.category-btn');
  categoryButtons.forEach(btn => {
    btn.addEventListener('click', handleCategoryFilter);
  });

  // Product cards - Buy Now buttons
  const buyButtons = document.querySelectorAll('.buy-btn');
  buyButtons.forEach(btn => {
    btn.addEventListener('click', handleBuyClick);
  });

  // Product detail page - Payment buttons
  const paymentBtns = document.querySelectorAll('.payment-btn');
  paymentBtns.forEach(btn => {
    btn.addEventListener('click', handlePaymentMethodClick);
  });

  // Modal handlers
  const creditsBtn = document.querySelector('.credits-btn');
  if (creditsBtn) {
    creditsBtn.addEventListener('click', openPaymentModal);
  }

  const closeBtn = document.querySelector('.close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closePaymentModal);
  }

  const paymentForm = document.getElementById('paymentForm');
  if (paymentForm) {
    paymentForm.addEventListener('submit', handleFormSubmit);
  }

  // Credits page form
  const creditsForm = document.getElementById('creditsForm');
  if (creditsForm) {
    creditsForm.addEventListener('submit', handleCreditsFormSubmit);
  }

  const openFormBtn = document.getElementById('openFormBtn');
  if (openFormBtn) {
    openFormBtn.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector('.credits-form').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Navigation arrows on product detail page
  const prevArrow = document.querySelector('.nav-arrow.prev');
  const nextArrow = document.querySelector('.nav-arrow.next');
  if (prevArrow) prevArrow.addEventListener('click', handlePrevProduct);
  if (nextArrow) nextArrow.addEventListener('click', handleNextProduct);
}

// ===========================
// PRICE FILTER
// ===========================

function handlePriceFilter(e) {
  currentPriceFilter = e.target.value;
  
  // Update displayed price range
  const priceMax = document.querySelector('.price-max');
  if (priceMax) {
    priceMax.textContent = `€ ${currentPriceFilter},00`;
  }

  // Here you would filter products based on price
  filterProducts();
}

// ===========================
// CATEGORY FILTER
// ===========================

function handleCategoryFilter(e) {
  // Remove active class from all buttons
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  // Add active class to clicked button
  e.target.classList.add('active');

  // Here you would filter products by category
  const category = e.target.getAttribute('data-category');
  console.log('Filter by category:', category);
  filterProducts();
}

// ===========================
// SORT PRODUCTS
// ===========================

function handleSortChange(e) {
  const sortValue = e.target.value;
  console.log('Sort by:', sortValue);
  
  // Here you would sort products
  // This would typically be handled by backend
}

// ===========================
// PRODUCT FILTERING
// ===========================

function filterProducts() {
  // Get active category
  const activeCategory = document.querySelector('.category-btn.active');
  const category = activeCategory ? activeCategory.getAttribute('data-category') : 'all';

  // Here you would filter the product grid
  console.log('Filtering products - Category:', category, 'Max Price:', currentPriceFilter);

  // Example: You could disable/enable product cards based on filters
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    // Show/hide logic would go here
    card.style.display = 'flex';
  });
}

// ===========================
// PRODUCT CARD INITIALIZATION
// ===========================

function initializeProductCards() {
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach((card, index) => {
    // Add hover effect
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
}

// ===========================
// BUY BUTTON CLICK HANDLER
// ===========================

function handleBuyClick(e) {
  const productCard = e.target.closest('.product-card');
  const productName = productCard.querySelector('h3').textContent;
  const productPrice = productCard.querySelector('.product-price').textContent;

  console.log('Buy clicked:', productName, productPrice);

  // Redirect to product detail page
  // In a real application, you'd navigate to the product page
  // window.location.href = `/product/${productId}`;

  // Show feedback
  showNotification(`Added ${productName} to cart!`, 'success');
}

// ===========================
// PAYMENT METHOD HANDLERS
// ===========================

function handlePaymentMethodClick(e) {
  const btn = e.target.closest('.payment-btn');
  const paymentMethod = btn.classList.contains('paypal-btn') ? 'PayPal' 
                      : btn.classList.contains('giftcards-btn') ? 'Gift Cards'
                      : 'Shop Credits';

  console.log('Payment method selected:', paymentMethod);

  if (paymentMethod === 'Shop Credits') {
    openPaymentModal();
  } else {
    showNotification(`Redirecting to ${paymentMethod}...`, 'info');
    // Redirect to payment gateway
  }
}

// ===========================
// MODAL HANDLERS
// ===========================

function openPaymentModal() {
  const modal = document.getElementById('paymentModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closePaymentModal() {
  const modal = document.getElementById('paymentModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
  const modal = document.getElementById('paymentModal');
  if (modal && e.target === modal) {
    closePaymentModal();
  }
});

// ===========================
// FORM SUBMISSION
// ===========================

function handleFormSubmit(e) {
  e.preventDefault();

  const discordUsername = document.getElementById('discord').value;
  const minecraftUsername = document.getElementById('minecraft').value;

  console.log('Form submitted:', {
    discord: discordUsername,
    minecraft: minecraftUsername
  });

  // Here you would send this to your backend
  showNotification('Payment information submitted successfully!', 'success');

  // Reset form
  e.target.reset();

  // Close modal
  setTimeout(closePaymentModal, 500);
}

function handleCreditsFormSubmit(e) {
  e.preventDefault();

  const discordUsername = document.getElementById('discord').value;
  const minecraftUsername = document.getElementById('minecraft').value;

  console.log('Credits form submitted:', {
    discord: discordUsername,
    minecraft: minecraftUsername
  });

  // Here you would send this to your backend
  showNotification('Shop Credits payment submitted! Please check your DMs for confirmation.', 'success');

  // Reset form
  e.target.reset();
}

// ===========================
// PRODUCT NAVIGATION
// ===========================

function handlePrevProduct() {
  console.log('Navigate to previous product');
  // Implement navigation logic
  showNotification('Loading previous product...', 'info');
}

function handleNextProduct() {
  console.log('Navigate to next product');
  // Implement navigation logic
  showNotification('Loading next product...', 'info');
}

// ===========================
// NOTIFICATION SYSTEM
// ===========================

function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Add styles
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: ${type === 'success' ? '#7fff00' : type === 'error' ? '#ff4444' : '#ff9500'};
    color: ${type === 'success' || type === 'error' ? '#000' : '#fff'};
    padding: 15px 25px;
    border-radius: 6px;
    font-weight: 600;
    z-index: 9999;
    animation: slideIn 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  `;

  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ===========================
// LOAD MORE FUNCTIONALITY
// ===========================

const loadMoreBtn = document.querySelector('.load-more-btn');
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', function() {
    console.log('Loading more products...');
    showNotification('Loading more products...', 'info');
    
    // Simulate loading
    this.disabled = true;
    this.textContent = 'Loading...';

    setTimeout(() => {
      this.disabled = false;
      this.textContent = 'Load More Products';
      showNotification('Products loaded!', 'success');
    }, 1000);
  });
}

// ===========================
// UTILITY FUNCTIONS
// ===========================

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ===========================
// SMOOTH SCROLL
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

console.log('Tropical Minecraft Server - Shop Script Loaded');
