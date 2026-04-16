// Menu items data with prices in Ariary
// Cart state
let cart = [];
let currentItem = null;

// DOM Elements
const menuGrid = document.getElementById('menu-grid');
const categoryBtns = document.querySelectorAll('.category-btn');
const cartCount = document.querySelector('.cart-count');
const orderItems = document.getElementById('order-items');
const subtotalEl = document.getElementById('subtotal');
const totalEl = document.getElementById('total');
const viewCartBtn = document.getElementById('view-cart');
const cartIcon = document.getElementById('cart-icon');
const orderModal = document.getElementById('orderModal');
const successModal = document.getElementById('successModal');
const closeBtn = document.querySelector('.close');
const closeSuccess = document.querySelector('.close-success');
const closeSuccessBtn = document.getElementById('close-success');

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    displayMenuItems('all');
    updateCart();
    
    // Set minimum date for delivery (24h from now)
    setMinDeliveryDate();
});

// Display menu items based on category
function displayMenuItems(category) {
    let filteredItems;
    
    if (category === 'all') {
        filteredItems = menuItems;
    } else {
        filteredItems = menuItems.filter(item => item.category === category);
    }
    
    menuGrid.innerHTML = filteredItems.map(item => `
        <div class="menu-item" data-special="${item.isSpecial || false}">
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <p class="description">${item.description}</p>
                <p class="price ${item.isSpecial ? 'special-price' : ''}">
                    ${formatPrice(item.price)} Ar
                    ${item.isSpecial && item.price === 10000 ? '<span class="original-price">18 000 Ar</span>' : ''}
                </p>
                <button class="add-to-cart" onclick="openOrderModal(${item.id})">
                    <i class="fas fa-cart-plus"></i> Ajouter au panier
                </button>
            </div>
        </div>
    `).join('');
}

// Mettre à jour les event listeners des catégories
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        displayMenuItems(btn.dataset.category);
    });
});

// Format price with spaces for thousands
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Category filter functionality
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        displayMenuItems(btn.dataset.category);
    });
});

// Open order modal for a specific item
window.openOrderModal = function(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    currentItem = item;
    
    // Check if item is already in cart
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    const quantity = existingItem ? existingItem.quantity : 1;
    
    displayOrderModal(item, quantity);
    orderModal.style.display = 'block';
};

// Open cart modal
function openCartModal() {
    if (cart.length === 0) {
        showNotification('Votre panier est vide');
        return;
    }
    displayCartModal();
    orderModal.style.display = 'block';
}

// Display order modal for single item
function displayOrderModal(item, quantity = 1) {
    const total = item.price * quantity;
    const minTotal = total >= 10000 ? total : 10000;
    
    const modalForm = document.getElementById('modal-form-container');
    modalForm.innerHTML = `
        <h3>Formulaire de commande</h3>
        <div class="product-info">
            <p><strong>Produit choisi :</strong> ${item.name}</p>
            <p><strong>Prix unitaire :</strong> ${formatPrice(item.price)} Ar</p>
        </div>
        
        <form id="order-form" onsubmit="submitOrder(event)">
            <div class="form-group">
                <label for="prenom">Prénom :</label>
                <input type="text" id="prenom" name="prenom" placeholder="Votre prénom" required>
            </div>
            
            <div class="form-group">
                <label for="contact">Contact (Téléphone) :</label>
                <input type="tel" id="contact" name="contact" placeholder="Ex: 034..." required>
            </div>
            
            <div class="form-group">
                <label for="quantity">Nombre de produits :</label>
                <input type="number" id="quantity" name="quantity" min="1" value="${quantity}" 
                       onchange="updateItemTotal(${item.price})" required>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="date">Date de livraison :</label>
                    <input type="date" id="date" name="date" required>
                </div>
                
                <div class="form-group">
                    <label for="time">Heure :</label>
                    <input type="time" id="time" name="time" required>
                </div>
            </div>
            
            <div class="form-group">
                <label for="lieu">Lieu :</label>
                <textarea id="lieu" name="lieu" placeholder="Adresse précise" rows="2" required></textarea>
            </div>
            
            <div class="total-modal">
                Total : <span id="modal-total">${formatPrice(total)} Ar</span>
            </div>
            
            <div class="modal-buttons">
                <button type="submit" class="btn btn-order">COMMANDER</button>
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Annuler</button>
            </div>
        </form>
    `;
    
    // Set minimum date (today + 1 day)
    const dateInput = document.getElementById('date');
    const today = new Date();
    today.setDate(today.getDate() + 1);
    dateInput.min = today.toISOString().split('T')[0];
}

// Display cart modal with all items
function displayCartModal() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const delivery = 2000;
    const total = subtotal + delivery;
    
    const cartItemsHtml = cart.map(item => `
        <div class="cart-summary-item">
            <div>
                <span class="item-name">${item.name}</span>
                <span class="item-quantity">x${item.quantity}</span>
            </div>
            <span class="item-price">${formatPrice(item.price * item.quantity)} Ar</span>
        </div>
    `).join('');
    
    const modalForm = document.getElementById('modal-form-container');
    modalForm.innerHTML = `
        <h3>Récapitulatif de votre commande</h3>
        
        <div class="cart-summary">
            ${cartItemsHtml}
        </div>
        
        <div class="product-info">
            <p><strong>Sous-total :</strong> ${formatPrice(subtotal)} Ar</p>
            <p><strong>Livraison :</strong> ${formatPrice(delivery)} Ar</p>
            <p><strong>Total à payer :</strong> ${formatPrice(total)} Ar</p>
            ${subtotal < 10000 ? '<p style="color: #ff4444;">⚠️ Minimum de commande: 10 000 Ar</p>' : ''}
        </div>
        
        <form id="order-form" onsubmit="submitCartOrder(event)">
            <div class="form-group">
                <label for="prenom">Prénom :</label>
                <input type="text" id="prenom" name="prenom" placeholder="Votre prénom" required>
            </div>
            
            <div class="form-group">
                <label for="contact">Contact (Téléphone) :</label>
                <input type="tel" id="contact" name="contact" placeholder="Ex: 034..." required>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="date">Date de livraison :</label>
                    <input type="date" id="date" name="date" required>
                </div>
                
                <div class="form-group">
                    <label for="time">Heure :</label>
                    <input type="time" id="time" name="time" required>
                </div>
            </div>
            
            <div class="form-group">
                <label for="lieu">Lieu :</label>
                <textarea id="lieu" name="lieu" placeholder="Adresse précise" rows="2" required></textarea>
            </div>
            
            <div class="modal-buttons">
                <button type="submit" class="btn btn-order" ${subtotal < 10000 ? 'disabled' : ''}>
                    CONFIRMER LA COMMANDE
                </button>
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Annuler</button>
            </div>
        </form>
    `;
    
    // Set minimum date
    const dateInput = document.getElementById('date');
    const today = new Date();
    today.setDate(today.getDate() + 1);
    dateInput.min = today.toISOString().split('T')[0];
}

// Update item total when quantity changes
window.updateItemTotal = function(price) {
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    const total = price * quantity;
    document.getElementById('modal-total').textContent = formatPrice(total) + ' Ar';
};

// Submit single item order
window.submitOrder = function(event) {
    event.preventDefault();
    
    const formData = {
        prenom: document.getElementById('prenom').value,
        contact: document.getElementById('contact').value,
        quantity: parseInt(document.getElementById('quantity').value),
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        lieu: document.getElementById('lieu').value,
        item: currentItem
    };
    
    const total = currentItem.price * formData.quantity;
    
    if (total < 10000) {
        showNotification('Le montant minimum est de 10 000 Ar');
        return;
    }
    
    // Add to cart
    const existingItem = cart.find(item => item.id === currentItem.id);
    if (existingItem) {
        existingItem.quantity += formData.quantity;
    } else {
        cart.push({
            ...currentItem,
            quantity: formData.quantity
        });
    }
    
    // Close modal and show success
    orderModal.style.display = 'none';
    updateCart();
    showSuccessModal();
    
    // Here you would typically send the data to a server
    console.log('Order submitted:', formData);
};

// Submit cart order
window.submitCartOrder = function(event) {
    event.preventDefault();
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (subtotal < 10000) {
        showNotification('Le montant minimum est de 10 000 Ar');
        return;
    }
    
    const formData = {
        prenom: document.getElementById('prenom').value,
        contact: document.getElementById('contact').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        lieu: document.getElementById('lieu').value,
        items: cart,
        total: subtotal + 2000
    };
    
    // Close modal and show success
    orderModal.style.display = 'none';
    showSuccessModal();
    
    // Clear cart
    cart = [];
    updateCart();
    
    console.log('Cart order submitted:', formData);
};

// Show success modal
function showSuccessModal() {
    successModal.style.display = 'block';
}

// Close modal function
window.closeModal = function() {
    orderModal.style.display = 'none';
};

// Update cart display
function updateCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (cart.length === 0) {
        orderItems.innerHTML = '<p class="empty-cart">Votre panier est vide</p>';
    } else {
        orderItems.innerHTML = cart.map(item => `
            <div class="order-item">
                <div class="order-item-info">
                    <span class="order-item-name">${item.name}</span>
                    <span class="order-item-quantity">x${item.quantity}</span>
                </div>
                <div class="order-item-details">
                    <span class="order-item-price">${formatPrice(item.price * item.quantity)} Ar</span>
                    <span class="remove-item" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-times"></i>
                    </span>
                </div>
            </div>
        `).join('');
    }
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const delivery = subtotal > 0 ? 2000 : 0;
    const total = subtotal + delivery;
    
    subtotalEl.textContent = formatPrice(subtotal) + ' Ar';
    document.getElementById('delivery').textContent = formatPrice(delivery) + ' Ar';
    totalEl.textContent = formatPrice(total) + ' Ar';
}

// Remove from cart
window.removeFromCart = function(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCart();
    showNotification('Article retiré du panier');
};

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Set minimum delivery date (24h in advance)
function setMinDeliveryDate() {
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const minDate = today.toISOString().split('T')[0];
    
    dateInputs.forEach(input => {
        if (input) input.min = minDate;
    });
}

// Event Listeners
viewCartBtn.addEventListener('click', openCartModal);
cartIcon.addEventListener('click', openCartModal);

closeBtn.addEventListener('click', () => {
    orderModal.style.display = 'none';
});

closeSuccess.addEventListener('click', () => {
    successModal.style.display = 'none';
});

closeSuccessBtn.addEventListener('click', () => {
    successModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === orderModal) {
        orderModal.style.display = 'none';
    }
    if (e.target === successModal) {
        successModal.style.display = 'none';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Typing
const element = document.getElementById("typing");
const texts = ["Bienvenue", "Pick&Eat Mafagascar"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type () {
    const currentItem = texts[textIndex];
    if (!isDeleting) {
        element.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentText.length) {
            setTimeout(() => isDeleting = true, 1000);
        }
    } else {
        element.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            textIndex++;
            if (textIndex >= texts.length) textIndex = texts.length - 1;
        }
    }
    const speed = isDeleting ? 50 : 100;
    setTimeout (type, speed);
}

type();