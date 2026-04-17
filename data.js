const menuItems = [
    // Petit déjeuner
    {
        id: 1,
        name: "Omelette & pain",
        description: "Omelette aux herbes, pain frais, café ou thé",
        price: 10000,
        category: "breakfast-pack",
        image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        name: "Koba & café",
        description: "Koba traditionnel, café vanille",
        price: 7000,
        category: "breakfast",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        name: "Petit déjeuner continental",
        description: "Croissant, pain au chocolat, jus de fruit, café",
        price: 15000,
        category: "breakfast",
        image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        name: "Pancakes",
        description: "Pancakes maison, sirop d'érable, fruits frais",
        price: 12000,
        category: "breakfast",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        name: "Mofo gasy",
        description: "Mofo gasy traditionnel, confiture, beurre, café",
        price: 10000,
        category: "breakfast",
        image: "Photo/MofoGasy.jpeg"
    },
    {
        id: 6,
        name: "Mofo Menakely",
        description: "Mofo gasy traditionnel, confiture, beurre, café",
        price: 500,
        category: "breakfast",
        image: "Photo/Menakely.jpeg"
    },
    {
        id: 7,
        name: "Pain",
        description: "Farine, blé",
        price: 800,
        category: "breakfast",
        image: "Photo/Pain.jpeg"
    },
    {
        id: 8,
        name: "Thé",
        description: "Veromanitra, Feuille d'oliva",
        price: 800,
        category: "breakfast",
        image: "Photo/The.jpeg"
    },
    {
        id: 9,
        name: "Cafe",
        description: "Café au lait, Café noir",
        price: 1000,
        category: "breakfast",
        image: "Photo/Cafe.jpeg"
    },
    {
        id: 10,
        name: "Vary sosoa sy Kitoza",
        description: "Vary gasy, kitoza omby",
        price: 3000,
        category: "breakfast",
        image: "Photo/VaryKitoza.jpeg"
    },
    // Déjeuner
    {
        id: 11,
        name: "Riz & Ravitoto sy hena kisoa",
        description: "Riz blanc, ravitoto (feuilles de manioc pilées) avec viande de porc",
        price: 18000,
        category: "lunch",
        image: "Photo/Ravitoto.jpeg"
    },
    {
        id: 12,
        name: "Riz & Crevette sauce",
        description: "Riz parfumé, crevettes sautées à la sauce créole",
        price: 22000,
        category: "lunch",
        image: "Photo/CrevetteSauce.jpeg"
    },
    {
        id: 13,
        name: "Riz & Poisson grillé & frite",
        description: "Poisson grillé, riz blanc, frites maison",
        price: 20000,
        category: "lunch",
        image: "Photo/PoissonFritte.jpeg"
    },
    {
        id: 14,
        name: "Riz & Voanjobory sy hena kisoa",
        description: "Riz, voanjobory (pois de terre) avec viande de porc",
        price: 19000,
        category: "lunch",
        image: "Photo/Voanjobory.jpeg"
    },
    {
        id: 15,
        name: "Riz cantonais",
        description: "Riz sauté aux légumes, porc, œuf et crevettes",
        price: 17000,
        category: "lunch",
        image: "Photo/RizCantonnais.jpeg"
    },
    {
        id: 16,
        name: "Riz & Crabe",
        description: "Riz blanc, crabe à la sauce tomate épicée",
        price: 25000,
        category: "lunch",
        image: "Photo/Crabe.jpeg"
    },
    {
        id: 17,
        name: "Riz & Steak frite",
        description: "Steak de zébu, frites maison, riz blanc",
        price: 21000,
        category: "lunch",
        image: "Photo/SteakFrite.jpeg"
    },
    {
        id: 18,
        name: "Riz & Petit poids",
        description: "Riz blanc, petits pois à la tomate",
        price: 16000,
        category: "lunch",
        image: "Photo/PetitPoids.jpeg"
    },
    {
        id: 19,
        name: "Riz & Poulet au coco",
        description: "Poulet mijoté au lait de coco, riz parfumé",
        price: 20000,
        category: "lunch",
        image: "Photo/PouletSauce.jpeg"
    },
    {
        id: 20,
        name: "Riz & Viande sauce",
        description: "Riz blanc, viande de zébu en sauce",
        price: 19000,
        category: "lunch",
        image: "Photo/ViandeSauce.jpeg"
    },
    {
        id: 21,
        name: "Riz & Poisson au coco",
        description: "Poisson mijoté au lait de coco, riz blanc",
        price: 21000,
        category: "lunch",
        image: "Photo/PoissonCoco.jpeg"
    },
    {
        id: 22,
        name: "Brochette & frite",
        description: "Brochettes de zébu grillées, frites maison",
        price: 18000,
        category: "lunch",
        image: "Photo/BrochetteFritte.jpeg"
    },

    // DÎNER - Nouveaux plats
    {
        id: 23,
        name: "Vary @anana sy hena baolina",
        description: "Riz aux légumes et boulettes de viande",
        price: 17000,
        category: "dinner",
        image: "Photo/VaryHenabaolina.jpeg"
    },
    {
        id: 24,
        name: "Hamburger",
        description: "Steak haché, salade, tomate, oignon, sauce maison",
        price: 15000,
        category: "dinner",
        image: "Photo/Hamburger.jpeg"
    },
    {
        id: 25,
        name: "Spaghetti au boulette",
        description: "Spaghetti, boulettes de viande, sauce tomate",
        price: 16000,
        category: "dinner",
        image: "Photo/SpaghettiPoulet.jpeg"
    },
    {
        id: 26,
        name: "Pizza",
        description: "Pizza garnie au choix (margherita, reine, pepperoni)",
        price: 22000,
        category: "dinner",
        image: "Photo/Pizza.jpeg"
    },
    {
        id: 25,
        name: "Mac & cheese",
        description: "Pâtes macaronis au fromage gratiné",
        price: 14000,
        category: "dinner",
        image: "Photo/MacCheese.jpeg"
    },
    {
        id: 27,
        name: "Sushi",
        description: "Assortiment de sushi et maki (8 pièces)",
        price: 24000,
        category: "dinner",
        image: "Photo/Sushi.jpeg"
    },
    {
        id: 28,
        name: "Poulet fritte",
        description: "Morceaux de poulet frits, sauce, frites",
        price: 18000,
        category: "dinner",
        image: "Photo/PouletFritte.jpeg"
    },
    {
        id: 29,
        name: "Salade de patte",
        description: "Salade de pâtes, légumes, thon, mayonnaise",
        price: 13000,
        category: "dinner",
        image: "Photo/SaladePatte.jpeg"
    },
    {
        id: 30,
        name: "Soupe légume",
        description: "Potage de légumes frais de saison",
        price: 10000,
        category: "dinner",
        image: "Photo/SoupeLegume.jpeg"
    },
    {
        id: 31,
        name: "Pakopako",
        description: "Beignets malgaches farcis à la viande",
        price: 12000,
        category: "dinner",
        image: "Photo/Pakopako.jpeg"
    },
    {
        id: 32,
        name: "Ramen",
        description: "Soupe de nouilles japonaise, porc, œuf",
        price: 17000,
        category: "dinner",
        image: "Photo/Ramen.jpeg"
    },
    {
        id: 33,
        name: "Tacos",
        description: "Tacos mexicains, viande, salade, sauce",
        price: 16000,
        category: "dinner",
        image: "Photo/Tacos.jpeg"
    },

    // RAFRAÎCHISSEMENTS - Nouveaux
    {
        id: 34,
        name: "XXL",
        description: "Boisson gazeuse XXL 1.5L",
        price: 4000,
        category: "drinks",
        image: "Photo/XXL.jpeg"
    },
    {
        id: 35,
        name: "Eau vive",
        description: "Eau minérale naturelle 1.5L",
        price: 2000,
        category: "drinks",
        image: "Photo/EauVive.jpeg"
    },
    {
        id: 36,
        name: "Jus naturel",
        description: "Jus de fruit frais du jour",
        price: 5000,
        category: "drinks",
        image: "Photo/JusNaturel.jpeg"
    },
    {
        id: 37,
        name: "Coca",
        description: "Coca-Cola 33cl",
        price: 3000,
        category: "drinks",
        image: "Photo/Coca.jpeg"
    },
    {
        id: 38,
        name: "Sprite",
        description: "Sprite 33cl",
        price: 3000,
        category: "drinks",
        image: "Photo/Sprite.jpeg"
    },
    {
        id: 39,
        name: "Fanta",
        description: "Fanta 33cl",
        price: 3000,
        category: "drinks",
        image: "Photo/Fanta.jpeg"
    },
    {
        id: 40,
        name: "Bonbon Anglais",
        description: "Soda bonbon anglais",
        price: 3000,
        category: "drinks",
        image: "Photo/BonbonAnglais.jpeg"
    },

    // DESSERTS - Nouveaux fruits
    {
        id: 41,
        name: "Avocat",
        description: "Avocat frais, prêt à déguster",
        price: 4000,
        category: "dessert",
        image: "Photo/Avocat.jpeg"
    },
    {
        id: 42,
        name: "Orange",
        description: "Orange fraîche et juteuse",
        price: 3000,
        category: "dessert",
        image: "Photo/Orange.jpeg"
    },
    {
        id: 43,
        name: "Banane",
        description: "Banane fraîche de Madagascar",
        price: 2500,
        category: "dessert",
        image: "Photo/Banane.jpeg"
    },
    {
        id: 44,
        name: "Poire",
        description: "Poire juteuse et sucrée",
        price: 3500,
        category: "dessert",
        image: "Photo/Poire.jpeg"
    },
    {
        id: 45,
        name: "Ananas",
        description: "Ananas frais de Madagascar",
        price: 5000,
        category: "dessert",
        image: "Photo/Ananas.jpeg"
    },
    {
        id: 46,
        name: "PACK PETIT DÉJEUNER EXPRESS",
        description: "Menu complet à 10 000 Ar seulement ! Café/Thé + Viennoiserie + Jus de fruit + Fruit frais",
        price: 10000,
        category: "breakfast-pack",
        image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        isSpecial: true,
        badge: "PROMO"
    },
];