// Shopping cart array to store items
let cart = [];

// Product data with descriptions
const products = [
    { 
        id: 1, 
        name: "White Plan Shirt", 
        price: 1500, 
        image: "./Productss/White plan shirt.Png",
        description: `✨ Minimal Look, Maximum Impact
        White Plain Shirt – Soft fabric, perfect fit.
        Your everyday essential. 👌

`
    },
    { 
        id: 2, 
        name: "Black Aura Watch", 
        price: 1800, 
        image: "./Productss/Black Aura Watch.Png",
        description: `🖤 Black Aura Watch – Style Meets Sophistication!
        Elevate your look with the bold and sleek Black Aura Watch. Perfect for every occasion.`
    },
    { 
        id: 3, 
        name: "Plan jeans black Pant", 
        price: 1700, 
        image: "./Productss/plan jeans black Pant.Png",
        description: `🖤 Black Plain Jeans – Bold, Clean, Everyday Fit
        Match it. Rock it. Wear it anywhere.
        Classic never goes out of style!`
    },
    { 
        id: 4, 
        name: "Pure White Jordans", 
        price: 7000, 
        image: "./Productss/Pure White Jordans.Png",
        description: `👟 Pure White Jordans – Fly in Every Step
        Clean look. Iconic style. Unmatched comfort.
        Level up your sneaker game!`
    },
    { 
        id: 5, 
        name: "Checked Casual Shirt", 
        price: 1800, 
        image: "./Productss/Check shirt.Png",
        description: `✨ Checked Vibes Only
        Classic checks, modern fit.
        Your go-to casual shirt is here!`
    },
    { 
        id: 6, 
        name: "Hawai Black Chappal", 
        price: 1450, 
        image: "./Productss/mens hawai black chappal.Png",
        description: ` Black Hawai Chappal
        Grip, comfort & classic look – All in one!
        "Every Step Matters – Men's Hawai Comfort"`
    },
    { 
        id: 7, 
        name: "Smart Watch", 
        price: 2699, 
        image: "./Productss/Smart Watch.Png",
        description: `⚡ Smart Watch for Smart Living
        Fitness, alerts, music & more – right from your wrist.
        Upgrade your lifestyle today!`
    },
    { 
        id: 8, 
        name: "Navy blue Jeans Pant", 
        price: 1700, 
        image: "./Productss/navy blue jeans pant.Png",
        description: `👖 Navy Blue Jeans – Cool. Clean. Confident.
        Perfect fit for any day, any look.
        Dress it up or keep it casual!`
    },
    { 
        id: 9, 
        name: "Black Glasses", 
        price: 549, 
        image: "./Productss/Black Glasses.Png",
        description: `🕶️ Black Glasses – Bold Look, Clear Vision
        Style that speaks without saying a word.
        Perfect fit for every face.`
    },
    { 
        id: 10, 
        name: "Plain Black Shirt", 
        price: 1699, 
        image: "./Productss/Plain Black Shirt.Png",
        description: `🖤 Plain Black Shirt – Bold, Clean, Timeless
        Perfect for casual or formal wear.
        One shirt, endless style.`
    },
    { 
        id: 11, 
        name: "Black Belt", 
        price: 380, 
        image: "./Productss/Black Belt.Png",
        description: `✨ Black Belt for Men
        Simple design, powerful finish.
        Tie your style together!`
    },
    { 
        id: 12, 
        name: "Half Socks 3 Pcs", 
        price: 449, 
        image: "./Productss/Half Socks 3 Pcs.Png",
        description: `👣 3 Pairs of Half Socks
        Breathable fabric, snug fit – Ideal for all-day use.
        Style + Comfort in one pack!`
    }
];

// Variables for confirmation handling
let pendingConfirmation = null;
let confirmationCallback = null;

// Variables for product details handling
let selectedProduct = null;

// Function to show custom confirmation dialog
function showConfirmation(title, message, callback) {
    document.getElementById('confirmationTitle').textContent = title;
    document.getElementById('confirmationMessage').textContent = message;
    document.getElementById('confirmationModal').style.display = 'block';
    confirmationCallback = callback;
}

// Function to hide confirmation dialog
function hideConfirmation() {
    document.getElementById('confirmationModal').style.display = 'none';
    confirmationCallback = null;
}

// Function to handle confirmation
function confirmAction() {
    if (confirmationCallback) {
        confirmationCallback();
    }
    hideConfirmation();
}

// Function to show product details
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        selectedProduct = product;
        document.getElementById('productTitle').textContent = product.name;
        document.getElementById('productImage').src = product.image;
        document.getElementById('productPrice').textContent = `Rs. ${product.price.toLocaleString()}`;
        document.getElementById('productDescription').textContent = product.description;
        document.getElementById('productDetailsModal').style.display = 'block';
    }
}

// Function to hide product details
function hideProductDetails() {
    document.getElementById('productDetailsModal').style.display = 'none';
    selectedProduct = null;
}

// Function to confirm adding to cart from product details
function confirmAddToCart() {
    if (selectedProduct) {
        if (cart.length >= 9) {
            showNotification('You only buy 9 items', 'error');
            hideProductDetails();
            return;
        }
        cart.push(selectedProduct);
        updateCartUI();
        showNotification('Item added to cart!');
        updateCartCount();
        hideProductDetails();
        // Do NOT show order form automatically
    }
}

// Function to add item to cart
function addToCart(productId) {
    // Check cart limit before showing product details
    if (cart.length >= 9) {
        showNotification('You only buy 9 items', 'error');
        return;
    }
    showProductDetails(productId);
}

// Function to update cart count in header
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Function to update cart UI
function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;">
            <span>${item.name}</span>
            <span>Rs. ${item.price.toLocaleString()}</span>
            <button onclick="removeFromCart(${index})" class="remove-btn">Remove</button>
        `;
        cartItems.appendChild(itemElement);
        total += item.price;
    });

    cartTotal.textContent = `Total: Rs. ${total.toLocaleString()}`;
}

// Function to remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
    updateCartCount();
    showNotification('Item removed from cart!');
}

// Function to show notification with different types
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Add styles for different notification types
    if (type === 'error') {
        notification.style.backgroundColor = '#ff4444';
    } else if (type === 'success') {
        notification.style.backgroundColor = '#4CAF50';
    }

    setTimeout(() => {
        notification.remove();
    }, 5000); // Show for 5 seconds
}

// Function to show cart modal
function showCart() {
    document.getElementById('cartModal').style.display = 'block';
}

// Function to hide cart modal
function hideCart() {
    document.getElementById('cartModal').style.display = 'none';
}

// Function to show order form
function showOrderForm() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    // Update order summary
    const orderSummary = document.getElementById('orderSummary');
    const orderTotal = document.getElementById('orderTotal');
    
    orderSummary.innerHTML = cart.map(item => 
        `<div class=\"flex justify-between py-1\">\n            <span>${item.name}</span>\n            <span>Rs. ${item.price.toLocaleString()}</span>\n        </div>`
    ).join('');
    
    orderTotal.textContent = `Total: Rs. ${total.toLocaleString()}`;
    
    // Add 'show' class for slide-in
    const modal = document.getElementById('orderModal');
    modal.style.display = 'block';
    setTimeout(() => { modal.classList.add('show'); }, 10);
}

// Function to hide order form
function hideOrderForm() {
    const modal = document.getElementById('orderModal');
    modal.classList.remove('show');
    setTimeout(() => { modal.style.display = 'none'; }, 400);
}

// Function to show receipt modal
function showReceipt(formData, cartItems) {
    const receiptModal = document.getElementById('receiptModal');
    const receiptContent = document.getElementById('receiptContent');
    let total = 0;
    // Show only first 9 items, rest as count
    const maxShow = 9;
    let itemsHtml = cartItems.slice(0, maxShow).map(item => {
        total += item.price;
        return `
            <div style="display: flex; flex-direction: column; align-items: center; border: 1px solid #eee; border-radius: 6px; padding: 6px 4px; margin: 2px; min-width: 90px; max-width: 120px; background: #fafafa;">
                <img src="${item.image}" alt="${item.name}" style="width: 38px; height: 38px; object-fit: contain; border-radius: 4px; border: 1px solid #eee; background: #fff; margin-bottom: 2px;" />
                <span style="font-weight: 600; font-size: 0.95em; text-align: center;">${item.name}</span>
                <span style="color: #960002; font-weight: bold; font-size: 0.95em;">Rs. ${item.price.toLocaleString()}</span>
            </div>
        `;
    }).join('');
    let moreMsg = '';
    if (cartItems.length > maxShow) {
        moreMsg = `<div class='text-xs text-gray-500 mt-1' style='text-align:center;'>+${cartItems.length - maxShow} more items...</div>`;
    }
    receiptContent.innerHTML = `
        <div class='text-xs text-center mb-2' style='color:#d90429;font-weight:bold;'>Take a screen shot and send on my WhatsApp number 0370-2789462</div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
            <span class="text-lg font-semibold">Products</span>
            <span style="color: #007bff; font-size: 0.95rem; margin-left: 8px;">IBOnlineStore: http://ibonlinestore.netlify.app/</span>
        </div>
        <div style=\"display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; margin-bottom: 4px;\">${itemsHtml}</div>
        ${moreMsg}
        <div class=\"text-right text-xl font-bold mb-2\">Total: Rs. ${total.toLocaleString()}</div>
        <h3 class=\"text-lg font-semibold mb-1\">Customer Info</h3>
        <div class=\"mb-1\"><b>Name:</b> ${formData.name} &nbsp; | &nbsp; <b>Phone:</b> ${formData.phone}</div>
        <div class=\"mb-1\"><b>Address:</b> ${formData.address}</div>
    `;
    receiptModal.style.display = 'block';
    // Remove responsive 2-column style for mobile (always 3 columns)
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `@media (max-width: 600px) { #receiptModal .modal-content div[style*='grid-template-columns'] { grid-template-columns: repeat(3, 1fr) !important; } }`;
    document.head.appendChild(styleTag);
    // Set personalized name line
    const nameLine = document.getElementById('receiptNameLine');
    if (nameLine) {
        if (formData.name && formData.name.trim().length > 0) {
            nameLine.innerHTML = `${formData.name}, receipt ka screenshot le kar WhatsApp par send kar dein! <br> <span class='text-blue-700'>0370-2789462</span>`;
        } else {
            nameLine.innerHTML = `Receipt ka screenshot le kar WhatsApp par send kar dein! <br> <span class='text-blue-700'>0370-2789462</span>`;
        }
    }
}

function hideReceipt() {
    document.getElementById('receiptModal').style.display = 'none';
}

// Function to submit order
async function submitOrder(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('customerName').value,
        phone: document.getElementById('customerPhone').value,
        address: document.getElementById('customerAddress').value,
        // postalCode: document.getElementById('customerPostalCode').value, // Remove if not in form
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price, 0)
    };

    // Validate form data
    if (!formData.name || !formData.phone || !formData.address) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }

    // Final confirmation before placing order
    showConfirmation(
        'Place Order',
        `Please confirm your order details:\n\n` +
        `Name: ${formData.name}\n` +
        `Phone: ${formData.phone}\n` +
        `Address: ${formData.address}\n\n` +
        `Total Amount: Rs. ${formData.total.toLocaleString()}\n` +
        `Items: ${cart.length}\n\n` +
        `Is this information correct?`,
        async () => {
            // Show loading state
            const submitButton = event.target.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Processing...';
            submitButton.disabled = true;

            try {
                // Simulate order success (skip server call)
                showNotification('Order placed successfully! Receipt ready.');
                // Show receipt modal
                showReceipt(formData, cart);
                cart = [];
                updateCartUI();
                updateCartCount();
                hideOrderForm();
                // Do not reset form yet, let user take screenshot
            } catch (error) {
                console.error('Error:', error);
                showNotification(error.message || 'Error placing order. Please try again.', 'error');
            } finally {
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }
        }
    );
}

// Function to render product cards
function renderProducts(productList) {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';

    productList.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-box';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-contain">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">Rs. ${product.price.toLocaleString()}</p>
                <button onclick="addToCart(${product.id})" class="add-to-cart-btn">
                    Add to Cart
                </button>
            </div>
        `;
        productGrid.appendChild(productElement);
    });
}

// Search functionality
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        const query = this.value.trim().toLowerCase();
        if (!query) {
            renderProducts(products);
            return;
        }
        const filtered = products.filter(p =>
            p.name.toLowerCase().includes(query) ||
            (p.description && p.description.toLowerCase().includes(query))
        );
        renderProducts(filtered);
    });
}

// Initial render
renderProducts(products);

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers to all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('input[value="Add to Cart"]');
    addToCartButtons.forEach((button, index) => {
        button.onclick = () => addToCart(index + 1);
    });

    // Initialize cart count
    updateCartCount();

    // Preloader hide after 1 second
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hide');
            setTimeout(() => preloader.style.display = 'none', 500);
        }, 1000);
    }

    // Enforce phone input always starts with '03', cannot delete/change first two digits, max 11 digits
    const phoneInput = document.getElementById('customerPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            // Remove non-digit chars
            let val = this.value.replace(/[^0-9]/g, '');
            // Always start with '03'
            if (!val.startsWith('03')) {
                val = '03' + val.replace(/^0+/, '').replace(/^3*/, '');
            }
            // Max 11 digits
            if (val.length > 11) val = val.slice(0, 11);
            this.value = val;
        });
        phoneInput.addEventListener('keydown', function(e) {
            // Prevent deleting/changing first two digits
            if ((this.selectionStart <= 2 && (e.key === 'Backspace' || e.key === 'Delete')) ||
                (this.selectionStart < 2 && e.key.length === 1)) {
                e.preventDefault();
            }
        });
        // On focus, if empty, set to '03'
        phoneInput.addEventListener('focus', function() {
            if (!this.value.startsWith('03')) this.value = '03';
        });
    }
}); 