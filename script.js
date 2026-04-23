// ==================== CONFIGURATION ====================
const DELIVERY_FEE = 5000;
let cart = [];
let selectedItem = null;

// DOM Elements
const menuGrid = document.getElementById('menu-grid');
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
const categorySelect = document.getElementById('category-select');

// ==================== FORMATAGE PRIX ====================
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// ==================== TOUS LES PACKS ====================
const packs = [
    { id: 100, name: "🎁 PACK PETIT DÉJEUNER EXPRESS", description: "Café/Thé + Viennoiserie + Jus de fruit + Fruit frais", price: 10000, category: "packs", image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", isSpecial: true, badge: "PROMO" },
    { id: 200, name: "🎁 PACK PETIT DÉJEUNER FAMILLE", description: "4x Café/Thé + 4x Viennoiseries + 2x Jus + Assortiment fruits", price: 35000, category: "packs", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", isSpecial: true, badge: "FAMILLE" },
    { id: 201, name: "🎁 PACK PETIT DÉJEUNER DELUXE", description: "Omelette + Pancakes + Jus pressé + Café gourmet + Fruits", price: 25000, category: "packs", image: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", isSpecial: true, badge: "DELUXE" },
    { id: 40, name: "🎁 PACK DÉJEUNER EXPRESS", description: "Riz + Viande au choix + Légume + Boisson", price: 10000, category: "packs", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", isSpecial: true, badge: "PROMO" },
    { id: 202, name: "🎁 PACK DÉJEUNER FAMILLE (4 pers)", description: "4x Riz + 4x Viandes assorties + 4x Légumes + 4x Boissons", price: 38000, category: "packs", image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", isSpecial: true, badge: "FAMILLE" },
    { id: 203, name: "🎁 PACK DÉJEUNER TRADITIONNEL", description: "Riz + Ravitoto + Henakisoa + Lasopy + Jus naturel", price: 15000, category: "packs", image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", isSpecial: true, badge: "TRADITION" },
    { id: 204, name: "🎁 PACK DÉJEUNER BUREAU", description: "Riz cantonais + Brochette + Boisson fraîche", price: 18000, category: "packs", image: "https://images.unsplash.com/photo-1642832845159-fb1d891f3e78?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", isSpecial: true, badge: "BUREAU" },
    { id: 205, name: "🎁 PACK DÎNER ROMANTIQUE", description: "Pizza ou Pâtes + Salade + 2 Boissons + Dessert", price: 35000, category: "packs", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", isSpecial: true, badge: "ROMANTIQUE" },
    { id: 206, name: "🎁 PACK DÎNER FAST FOOD", description: "Burger + Frites + Boisson 33cl", price: 18000, category: "packs", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", isSpecial: true, badge: "FAST FOOD" },
    { id: 207, name: "🎁 PACK DÎNER ASIATIQUE", description: "Ramen ou Sushi (8p) + Nems + Thé glacé", price: 30000, category: "packs", image: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", isSpecial: true, badge: "ASIATIQUE" },
    { id: 208, name: "🎁 PACK DÎNER MEXICAIN", description: "2 Tacos + Guacamole + Nachos + Boissons", price: 28000, category: "packs", image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", isSpecial: true, badge: "MEXICAIN" },
    { id: 209, name: "🎁 PACK BOISSON FAMILLE", description: "6x Boissons au choix (Coca, Fanta, Sprite, Eau)", price: 15000, category: "packs", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", isSpecial: true, badge: "FAMILLE" },
    { id: 210, name: "🎁 PACK JUS NATURELS", description: "3x Jus frais (Mangue, Ananas, Litchi)", price: 14000, category: "packs", image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", isSpecial: true, badge: "NATURE" },
    { id: 211, name: "🎁 PACK SOIRÉE", description: "4x Boissons XXL + 2x Jus naturels", price: 22000, category: "packs", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", isSpecial: true, badge: "SOIRÉE" },
    { id: 212, name: "🎁 PACK DESSERT FRUITS", description: "Assortiment de 6 fruits frais", price: 18000, category: "packs", image: "https://images.unsplash.com/photo-1571770095004-6b61b1cf308a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", isSpecial: true, badge: "FRUITS" },
    { id: 213, name: "🎁 PACK DESSERT GOURMAND", description: "Mousse au chocolat + Glace vanille + Coconut balls", price: 15000, category: "packs", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", isSpecial: true, badge: "GOURMAND" },
    { id: 214, name: "🎁 PACK DESSERT TROPICAL", description: "Salade de fruits frais + Sorbet citron + Ananas grillé", price: 16000, category: "packs", image: "https://images.unsplash.com/photo-1567103472667-6898f3a79cf2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", isSpecial: true, badge: "TROPICAL" },
    { id: 215, name: "🎁 PICK&EAT PLATINUM", description: "Menu complet: Entrée + Plat + Dessert + Boisson + Café", price: 45000, category: "packs", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", isSpecial: true, badge: "PLATINUM" },
    { id: 216, name: "🎁 PACK DATE NIGHT", description: "Pour 2: Apéritif + Plat principal + Dessert + 2 Boissons", price: 55000, category: "packs", image: "https://images.unsplash.com/photo-1515442261605-65987783cb6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", isSpecial: true, badge: "DATE NIGHT" },
    { id: 217, name: "🎁 PACK FÊTE (10 pers)", description: "Idéal pour anniversaire: 10 plats + 10 boissons + 10 desserts", price: 120000, category: "packs", image: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", isSpecial: true, badge: "FÊTE" },
    { id: 218, name: "🎁 PACK STUDENT", description: "Étudiant: Repas complet à prix mini (Riz + Viande + Boisson)", price: 12000, category: "packs", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", isSpecial: true, badge: "STUDENT" }
];

// ==================== MENUS NORMAUX ====================
const menuItems = [
    // Petit déjeuner
    { id: 1, name: "Petit déjeuner continental", description: "Croissant, pain au chocolat, jus de fruit, café", price: 15000, category: "breakfast", image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 2, name: "Pancakes", description: "Pancakes maison, sirop d'érable, fruits frais", price: 12000, category: "breakfast", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 3, name: "Mofo gasy", description: "Mofo gasy traditionnel, confiture, beurre, café", price: 8000, category: "breakfast", image: "https://images.unsplash.com/photo-1509785305120-1007e3479676?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 41, name: "Omelette & pain", description: "Omelette aux herbes, pain frais, café ou thé", price: 10000, category: "breakfast", image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 42, name: "Koba & café", description: "Koba traditionnel, café vanille", price: 7000, category: "breakfast", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 101, name: "Gaufres maison", description: "Gaufres chaudes, chantilly, coulis de chocolat", price: 11000, category: "breakfast", image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 102, name: "Tsaramaso & mofo", description: "Haricots blancs cuisinés, pain maison", price: 9000, category: "breakfast", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 103, name: "Porridge à la vanille", description: "Flocons d'avoine, lait, vanille de Madagascar", price: 8500, category: "breakfast", image: "https://images.unsplash.com/photo-1505311329370-47df2b4572a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 104, name: "Eggs Benedict", description: "Oeufs pochés, sauce hollandaise, bacon", price: 14000, category: "breakfast", image: "https://images.unsplash.com/photo-1608039829872-3c2d88f5b668?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    // Déjeuner
    { id: 4, name: "Riz & Ravitoto sy hena kisoa", description: "Riz blanc, ravitoto avec viande de porc", price: 18000, category: "lunch", image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 5, name: "Riz & Crevette sauce", description: "Riz parfumé, crevettes sautées à la sauce créole", price: 22000, category: "lunch", image: "https://images.unsplash.com/photo-1623341214825-9a4f4d8ed1c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 6, name: "Riz & Poisson grillé & frite", description: "Poisson grillé, riz blanc, frites maison", price: 20000, category: "lunch", image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 7, name: "Riz & Voanjobory sy hena kisoa", description: "Riz, voanjobory avec viande de porc", price: 19000, category: "lunch", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 8, name: "Riz cantonais", description: "Riz sauté aux légumes, porc, œuf et crevettes", price: 17000, category: "lunch", image: "https://images.unsplash.com/photo-1642832845159-fb1d891f3e78?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 9, name: "Riz & Crabe", description: "Riz blanc, crabe à la sauce tomate épicée", price: 25000, category: "lunch", image: "https://images.unsplash.com/photo-1580743884739-6b1c00aa4935?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 10, name: "Riz & Steak frite", description: "Steak de zébu, frites maison, riz blanc", price: 21000, category: "lunch", image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 11, name: "Riz & Petit poids", description: "Riz blanc, petits pois à la tomate", price: 16000, category: "lunch", image: "https://images.unsplash.com/photo-1596797038530-2c107aa2c685?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 12, name: "Riz & Poulet au coco", description: "Poulet mijoté au lait de coco, riz parfumé", price: 20000, category: "lunch", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 13, name: "Riz & Viande sauce", description: "Riz blanc, viande de zébu en sauce", price: 19000, category: "lunch", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 14, name: "Riz & Poisson au coco", description: "Poisson mijoté au lait de coco, riz blanc", price: 21000, category: "lunch", image: "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 15, name: "Brochette & frite", description: "Brochettes de zébu grillées, frites maison", price: 18000, category: "lunch", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 105, name: "Riz & Lasopy", description: "Riz blanc, soupe de légumes traditionnelle", price: 14000, category: "lunch", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 106, name: "Riz & Akoho sy sakamalao", description: "Poulet au gingembre, riz parfumé", price: 19500, category: "lunch", image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 107, name: "Riz & Henakisoa sy anana", description: "Porc sauté aux légumes verts", price: 18500, category: "lunch", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 108, name: "Riz & Trondro gasy", description: "Poisson du lac, sauce tomate, riz blanc", price: 20500, category: "lunch", image: "https://images.unsplash.com/photo-1584308666744-24d5c6deabc5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 109, name: "Riz & Mofo anana", description: "Beignets de légumes, riz blanc", price: 13000, category: "lunch", image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    // Dîner
    { id: 16, name: "Vary @anana sy hena baolina", description: "Riz aux légumes et boulettes de viande", price: 17000, category: "dinner", image: "https://images.unsplash.com/photo-1627308595171-d1b5d67135a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 17, name: "Hamburger", description: "Steak haché, salade, tomate, oignon, sauce maison", price: 15000, category: "dinner", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 18, name: "Spaghetti au boulette", description: "Spaghetti, boulettes de viande, sauce tomate", price: 16000, category: "dinner", image: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 19, name: "Pizza", description: "Pizza garnie au choix", price: 22000, category: "dinner", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 20, name: "Mac & cheese", description: "Pâtes macaronis au fromage gratiné", price: 14000, category: "dinner", image: "https://images.unsplash.com/photo-1634917694672-6d841b5c1af7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 21, name: "Sushi", description: "Assortiment de sushi et maki (8 pièces)", price: 24000, category: "dinner", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 22, name: "Poulet fritte", description: "Morceaux de poulet frits, sauce, frites", price: 18000, category: "dinner", image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 23, name: "Salade de patte", description: "Salade de pâtes, légumes, thon, mayonnaise", price: 13000, category: "dinner", image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 24, name: "Soupe légume", description: "Potage de légumes frais de saison", price: 10000, category: "dinner", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 25, name: "Pakopako", description: "Beignets malgaches farcis à la viande", price: 12000, category: "dinner", image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 26, name: "Ramen", description: "Soupe de nouilles japonaise, porc, œuf", price: 17000, category: "dinner", image: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 27, name: "Tacos", description: "Tacos mexicains, viande, salade, sauce", price: 16000, category: "dinner", image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 110, name: "Burger du Chef", description: "Double steak, cheddar, bacon, oignons caramélisés", price: 19000, category: "dinner", image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 111, name: "Pâtes carbonara", description: "Spaghetti, crème, lardons, parmesan", price: 15500, category: "dinner", image: "https://images.unsplash.com/photo-1645112411344-31c6d7259fdd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 112, name: "Fish & Chips", description: "Filet de poisson pané, frites, sauce tartare", price: 17000, category: "dinner", image: "https://images.unsplash.com/photo-1592279645098-2ac7b2526f6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 113, name: "Wraps poulet", description: "Galette, poulet grillé, crudités, sauce blanche", price: 14000, category: "dinner", image: "https://images.unsplash.com/photo-1626700054175-7ebb20b3d495?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 114, name: "Quinoa bowl", description: "Quinoa, avocat, légumes grillés, oeuf poché", price: 16500, category: "dinner", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    // Boissons
    { id: 28, name: "XXL", description: "Boisson gazeuse XXL 1.5L", price: 4000, category: "drinks", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 29, name: "Eau vive", description: "Eau minérale naturelle 1.5L", price: 2000, category: "drinks", image: "https://images.unsplash.com/photo-1582304596386-220cf103a2b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 30, name: "Jus naturel", description: "Jus de fruit frais du jour", price: 5000, category: "drinks", image: "https://images.unsplash.com/photo-1613478227016-7ab8d3f7b5a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 31, name: "Coca", description: "Coca-Cola 33cl", price: 3000, category: "drinks", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 32, name: "Sprite", description: "Sprite 33cl", price: 3000, category: "drinks", image: "https://images.unsplash.com/photo-1624517452488-048692cdb9e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 33, name: "Fanta", description: "Fanta 33cl", price: 3000, category: "drinks", image: "https://images.unsplash.com/photo-1574063785957-646fbaa40085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 34, name: "Bonbon Anglais", description: "Soda bonbon anglais", price: 3000, category: "drinks", image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 115, name: "Jus de mangue", description: "Jus frais de mangue de Madagascar", price: 5500, category: "drinks", image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 116, name: "Jus de litchi", description: "Jus frais de litchi", price: 6000, category: "drinks", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 117, name: "Milkshake vanille", description: "Lait frappé, glace vanille, chantilly", price: 7000, category: "drinks", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 118, name: "Thé glacé maison", description: "Thé noir, citron, menthe, glaçons", price: 4500, category: "drinks", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 119, name: "Café glacé", description: "Café espresso, lait, sirop, glaçons", price: 5000, category: "drinks", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    // Desserts
    { id: 35, name: "Avocat", description: "Avocat frais, prêt à déguster", price: 4000, category: "dessert", image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 36, name: "Orange", description: "Orange fraîche et juteuse", price: 3000, category: "dessert", image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 37, name: "Banane", description: "Banane fraîche de Madagascar", price: 2500, category: "dessert", image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 38, name: "Poire", description: "Poire juteuse et sucrée", price: 3500, category: "dessert", image: "https://images.unsplash.com/photo-1586316474072-de76a3bfacee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 39, name: "Ananas", description: "Ananas frais de Madagascar", price: 5000, category: "dessert", image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 120, name: "Mangue fraîche", description: "Mangue mûre de Madagascar", price: 4500, category: "dessert", image: "https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 121, name: "Fruits de saison", description: "Assortiment de fruits frais locaux", price: 6000, category: "dessert", image: "https://images.unsplash.com/photo-1571770095004-6b61b1cf308a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 122, name: "Yaourt aux fruits", description: "Yaourt nature, coulis de fruits frais", price: 5000, category: "dessert", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 123, name: "Salade de fruits", description: "Dés de fruits frais, sirop léger", price: 5500, category: "dessert", image: "https://images.unsplash.com/photo-1567103472667-6898f3a79cf2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 124, name: "Glace vanille", description: "Glace artisanale à la vanille de Madagascar", price: 4500, category: "dessert", image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 125, name: "Sorbet citron", description: "Sorbet frais au citron vert", price: 4500, category: "dessert", image: "https://images.unsplash.com/photo-1516559828984-fb3b99548b21?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 126, name: "Mousse au chocolat", description: "Mousse légère au chocolat noir", price: 6000, category: "dessert", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 127, name: "Coconut balls", description: "Boules coco, spécialité malgache", price: 4000, category: "dessert", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" }
];

// Ajouter tous les packs
packs.forEach(pack => menuItems.push(pack));

// ==================== FILTRAGE DES MENUS ====================
function filterMenuByCategory(category) {
    let filteredItems;
    if (category === 'all') {
        filteredItems = menuItems;
    } else if (category === 'packs') {
        filteredItems = menuItems.filter(item => item.category === 'packs');
    } else {
        filteredItems = menuItems.filter(item => item.category === category);
    }
    
    menuGrid.innerHTML = filteredItems.map(item => `
        <div class="menu-item" data-special="${item.isSpecial || false}">
            ${item.badge ? `<div class="promo-badge">${item.badge}</div>` : ''}
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <p class="description">${item.description}</p>
                <p class="price ${item.isSpecial ? 'special-price' : ''}">
                    ${formatPrice(item.price)} Ar
                    ${item.isSpecial && item.price === 10000 ? '<span class="original-price">18 000 Ar</span>' : ''}
                </p>
                <button class="add-to-cart" onclick="openQuantityModal(${item.id})">
                    <i class="fas fa-cart-plus"></i> Ajouter au panier
                </button>
            </div>
        </div>
    `).join('');
}

// ==================== MODAL QUANTITÉ ====================
window.openQuantityModal = function(itemId) {
    selectedItem = menuItems.find(item => item.id === itemId);
    displayQuantityModal(selectedItem);
    orderModal.style.display = 'block';
};

function displayQuantityModal(item) {
    const modalForm = document.getElementById('modal-form-container');
    modalForm.innerHTML = `
        <h3>Ajouter au panier</h3>
        <div class="product-info">
            <p><strong>Produit :</strong> ${item.name}</p>
            <p><strong>Prix unitaire :</strong> ${formatPrice(item.price)} Ar</p>
        </div>
        <form id="quantity-form" onsubmit="addToCartWithQuantity(event)">
            <div class="form-group">
                <label for="quantity">Nombre de produits :</label>
                <input type="number" id="quantity" name="quantity" min="1" value="1" required>
            </div>
            <div class="total-modal" style="margin-top: 1rem;">
                Total : <span id="total-quantity">${formatPrice(item.price)} Ar</span>
            </div>
            <div class="modal-buttons">
                <button type="submit" class="btn btn-order"><i class="fas fa-cart-plus"></i> Ajouter au panier</button>
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Annuler</button>
            </div>
        </form>
    `;
    
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        quantityInput.addEventListener('input', function() {
            const qty = parseInt(this.value) || 1;
            const total = selectedItem.price * qty;
            document.getElementById('total-quantity').textContent = formatPrice(total) + ' Ar';
        });
    }
}

window.addToCartWithQuantity = function(event) {
    event.preventDefault();
    const quantity = parseInt(document.getElementById('quantity').value);
    const existingItem = cart.find(item => item.id === selectedItem.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...selectedItem, quantity: quantity });
    }
    
    updateCart();
    showNotification(`${selectedItem.name} (x${quantity}) ajouté au panier`);
    orderModal.style.display = 'none';
};

// ==================== MODAL VALIDATION COMMANDE (CORRIGÉ) ====================
function openCheckoutModal() {
    if (cart.length === 0) {
        showNotification('Votre panier est vide');
        return;
    }
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartItemsHtml = cart.map(item => `
        <div class="cart-summary-item">
            <div><span class="item-name">${item.name}</span> <span class="item-quantity">x${item.quantity}</span></div>
            <div><span class="item-price">${formatPrice(item.price * item.quantity)} Ar</span>
            <button class="remove-item-small" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button></div>
        </div>
    `).join('');
    
    const modalForm = document.getElementById('modal-form-container');
    if (!modalForm) {
        console.error("modal-form-container n'existe pas");
        return;
    }
    
    modalForm.innerHTML = `
        <h3>Validation de la commande - Livraison à domicile</h3>
        <div class="cart-summary">${cartItemsHtml}</div>
        <div class="total-modal">
            <div>Sous-total : <span id="modal-subtotal" data-subtotal="${subtotal}">${formatPrice(subtotal)} Ar</span></div>
            <div>Livraison : ${formatPrice(DELIVERY_FEE)} Ar</div>
            <div class="grand-total">Total : ${formatPrice(subtotal + DELIVERY_FEE)} Ar</div>
        </div>
        <form id="checkout-form" onsubmit="submitFinalOrder(event)">
            <div class="form-group">
                <label>Prénom : <span class="required">*</span></label>
                <input type="text" id="prenom" class="form-control" required>
            </div>
            <div class="form-group">
                <label>Contact (Téléphone) : <span class="required">*</span></label>
                <input type="text" id="contact" class="form-control" placeholder="034..." required>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Date de livraison : <span class="required">*</span></label>
                    <input type="date" id="date" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Heure : <span class="required">*</span></label>
                    <input type="time" id="time" class="form-control" required>
                </div>
            </div>
            <div class="form-group">
                <label>Adresse de livraison : <span class="required">*</span></label>
                <textarea id="lieu" class="form-control" placeholder="Adresse précise (quartier, rue, numéro...)" rows="2" required></textarea>
            </div>
            <div class="info-livraison">
                <i class="fas fa-truck"></i> Frais de livraison : ${formatPrice(DELIVERY_FEE)} Ar (tarif unique)
                <p><strong>Délai :</strong> 30-45 minutes après validation</p>
            </div>
            <div class="modal-buttons">
                <button type="submit" class="btn btn-order">CONFIRMER LA COMMANDE</button>
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Annuler</button>
            </div>
            ${subtotal < 10000 ? '<p class="minimum-warning">⚠️ Montant minimum de commande: 10 000 Ar</p>' : ''}
        </form>
    `;
    
    // Date minimum (24h à l'avance)
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        today.setDate(today.getDate() + 1);
        dateInput.min = today.toISOString().split('T')[0];
    }
    
    orderModal.style.display = 'block';
}

// ==================== SOUMISSION COMMANDE FINALE AVEC WHATSAPP (VERSION SIMPLIFIÉE) ====================
window.submitFinalOrder = function(event) {
    event.preventDefault();
    
    // Récupération des valeurs
    const prenom = document.getElementById('prenom')?.value.trim();
    // const contact = document.getElementById('contact')?.value.trim();
    const date = document.getElementById('date')?.value;
    const time = document.getElementById('time')?.value;
    const adresse = document.getElementById('lieu')?.value.trim();
    
    // Vérifications
    if (!prenom || !contact || !date || !time || !adresse) {
        showNotification('Veuillez remplir tous les champs');
        return;
    }
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (subtotal < 10000) {
        showNotification('Le montant minimum de commande est de 10 000 Ar');
        return;
    }
    
    const total = subtotal + DELIVERY_FEE;
    
    // Construction du message WhatsApp (format simple)
    let message = `🆕 NOUVELLE COMMANDE Pick&Eat 🍽️\n\n`;
    message += `Client: ${prenom}\n`;
    message += `Contact: ${contact}\n`;
    message += `Date: ${date} à ${time}\n`;
    message += `Adresse: ${adresse}\n\n`;
    message += `Détail de la commande:\n`;
    message += `--------------------\n`;
    
    cart.forEach(item => {
        message += `${item.name} x${item.quantity} = ${formatPrice(item.price * item.quantity)} Ar\n`;
    });
    
    message += `--------------------\n`;
    message += `Sous-total: ${formatPrice(subtotal)} Ar\n`;
    message += `Livraison: ${formatPrice(DELIVERY_FEE)} Ar\n`;
    message += `TOTAL: ${formatPrice(total)} Ar\n\n`;
    message += `Paiement MVola: 038 66 242 17\n`;
    message += `Acompte 50%: ${formatPrice(total / 2)} Ar`;
    
    // Encoder le message pour URL
    const encodedMessage = encodeURIComponent(message);
    
    // Numéro WhatsApp (remplacez par le vôtre)
    const phoneNumber = "261386624217";
    
    // Ouvrir WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    
    // Afficher succès
    showNotification('Commande envoyée ! Vous allez être redirigé vers WhatsApp.');
    
    // Fermer le modal et vider le panier
    orderModal.style.display = 'none';
    showSuccessModal();
    cart = [];
    updateCart();
};

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
                    <span class="remove-item" onclick="removeFromCart(${item.id})"><i class="fas fa-times"></i></span>
                </div>
            </div>
        `).join('');
    }
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = subtotal > 0 ? DELIVERY_FEE : 0;
    subtotalEl.textContent = formatPrice(subtotal) + ' Ar';
    document.getElementById('delivery').textContent = formatPrice(deliveryFee) + ' Ar';
    totalEl.textContent = formatPrice(subtotal + deliveryFee) + ' Ar';
}

// ==================== NOTIFICATIONS & MODALES ====================
function showNotification(message) {
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.textContent = message;
    notif.style.cssText = 'position:fixed;bottom:20px;right:20px;background:linear-gradient(135deg,#667eea,#764ba2);color:white;padding:1rem 2rem;border-radius:5px;z-index:2000;animation:slideIn 0.3s ease';
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}

function showSuccessModal() { successModal.style.display = 'block'; }
window.closeModal = function() { orderModal.style.display = 'none'; };

// ==================== INITIALISATION ====================
if (categorySelect) {
    categorySelect.addEventListener('change', (e) => filterMenuByCategory(e.target.value));
}
if (viewCartBtn) viewCartBtn.addEventListener('click', openCheckoutModal);
if (cartIcon) cartIcon.addEventListener('click', openCheckoutModal);
if (closeBtn) closeBtn.addEventListener('click', () => orderModal.style.display = 'none');
if (closeSuccess) closeSuccess.addEventListener('click', () => successModal.style.display = 'none');
if (closeSuccessBtn) closeSuccessBtn.addEventListener('click', () => successModal.style.display = 'none');

window.addEventListener('click', (e) => {
    if (e.target === orderModal) orderModal.style.display = 'none';
    if (e.target === successModal) successModal.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', () => {
    filterMenuByCategory('all');
    updateCart();
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const minDate = today.toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"]').forEach(input => { if (input) input.min = minDate; });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});