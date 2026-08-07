export interface MenuItem {
  id: string;
  name: string;
  category: 'Entrees' | 'Vegetarian' | 'Non-Vegetarian' | 'Pizza & Burgers' | 'Chinese & Indian' | 'Desserts' | 'Drinks';
  price: number;
  description: string;
  image: string;
  rating: number;
  reviewsCount: number;
  dietary?: ('VEGAN' | 'GLUTEN-FREE' | 'NUT-FREE' | 'VEGETARIAN' | 'DESSERT' | 'DRINK' | 'BURGER')[];
  isSpecial?: boolean;
  isPopular?: boolean;
  preparationTime?: string;
  calories?: number;
}

export interface Chef {
  id: string;
  name: string;
  title: string;
  bio: string;
  quote: string;
  experienceYears: number;
  specialty: string;
  awards: string[];
  image: string;
  socials?: {
    instagram?: string;
    twitter?: string;
    website?: string;
  };
}

export interface Review {
  id: string;
  author: string;
  role: string;
  publication?: string;
  comment: string;
  rating: number;
  avatar?: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: 'Royal Dum Biryani',
    category: 'Non-Vegetarian',
    price: 34,
    description: 'Fragrant basmati rice slow-cooked with aromatic Indian spices, saffron, and tender chicken/paneer.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    reviewsCount: 128,
    dietary: ['GLUTEN-FREE'],
    isPopular: true,
    calories: 680
  },
  {
    id: 'm2',
    name: 'Heirloom Margherita',
    category: 'Pizza & Burgers',
    price: 28,
    description: 'Stone-fired sourdough topped with San Marzano tomatoes, DOP buffalo mozzarella, and fresh garden basil.',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=1000&q=80',
    rating: 4.8,
    reviewsCount: 94,
    dietary: ['VEGETARIAN'],
    isPopular: true,
    calories: 620
  },
  {
    id: 'm3',
    name: 'Saffron Risotto',
    category: 'Entrees',
    price: 42,
    description: 'Acquerello rice simmered with Persian saffron, pan-seared Hokkaido scallops, and sweet tiger prawns.',
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=1000&q=80',
    rating: 4.95,
    reviewsCount: 156,
    isSpecial: true,
    calories: 540
  },
  {
    id: 'm4',
    name: 'Midnight Fondant',
    category: 'Desserts',
    price: 22,
    description: '70% Valrhona chocolate with a warm molten heart, gold leaf, and artisanal Madagascar vanilla bean gelato.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    reviewsCount: 88,
    dietary: ['DESSERT'],
    isPopular: true,
    calories: 490
  },
  {
    id: 'm5',
    name: 'Elderflower Blush',
    category: 'Drinks',
    price: 18,
    description: 'Artisanal dry gin infused with elderflower liqueur, fresh lychee puree, and botanical lemon bitters.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=80',
    rating: 4.85,
    reviewsCount: 62,
    dietary: ['DRINK'],
    calories: 180
  },
  {
    id: 'm6',
    name: 'The Luxe Prime Burger',
    category: 'Pizza & Burgers',
    price: 34,
    description: 'Grass-fed dry-aged prime beef, aged white cheddar, caramelized onion jam, and house-made black truffle aioli.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    reviewsCount: 210,
    dietary: ['BURGER'],
    isPopular: true,
    calories: 910
  },
  {
    id: 'm7',
    name: 'Pan-Seared Scallops with Saffron Emulsion',
    category: 'Entrees',
    price: 42,
    description: 'Freshly sourced Hokkaido scallops pan-seared to golden perfection. Served on a bed of creamy cauliflower mousseline.',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1000&q=80',
    rating: 4.98,
    reviewsCount: 175,
    dietary: ['GLUTEN-FREE'],
    isSpecial: true,
    calories: 450
  },
  {
    id: 'm8',
    name: 'Black Truffle Tagliatelle',
    category: 'Entrees',
    price: 48,
    description: 'Hand-cut egg pasta, 36-month Parmigiano-Reggiano cream, dark truffle butter, and freshly shaved Italian black truffle.',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281270?auto=format&fit=crop&w=1000&q=80',
    rating: 4.92,
    reviewsCount: 142,
    dietary: ['VEGETARIAN'],
    isPopular: true,
    calories: 680
  },
  {
    id: 'm9',
    name: 'Miso-Glazed Black Cod',
    category: 'Non-Vegetarian',
    price: 52,
    description: 'Sustainably caught wild black cod marinated for 48 hours in Saikyo miso, served with charred baby bok choy and ginger oil.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=80',
    rating: 4.96,
    reviewsCount: 119,
    dietary: ['GLUTEN-FREE'],
    isPopular: true,
    calories: 520
  },
  {
    id: 'm10',
    name: 'Dry-Aged Ribeye',
    category: 'Non-Vegetarian',
    price: 68,
    description: '45-day dry-aged prime beef ribeye, roasted garlic confit, bone marrow jus, and smoked rosemary compound butter.',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1000&q=80',
    rating: 4.97,
    reviewsCount: 184,
    dietary: ['GLUTEN-FREE'],
    isPopular: true,
    calories: 890
  },
  {
    id: 'm11',
    name: 'Truffle Mushroom Arancini',
    category: 'Vegetarian',
    price: 24,
    description: 'Crispy arborio rice spheres filled with wild forest mushrooms, smoked taleggio cheese, served with black garlic aioli.',
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=1000&q=80',
    rating: 4.75,
    reviewsCount: 78,
    dietary: ['VEGETARIAN', 'NUT-FREE'],
    calories: 420
  },
  {
    id: 'm12',
    name: 'Roasted Burrata & Heirloom Beetroot',
    category: 'Vegetarian',
    price: 26,
    description: 'Creamy Apulian burrata, slow-roasted yellow and red beets, crushed pistachio pesto, and 12-year aged Modena balsamic.',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?auto=format&fit=crop&w=1000&q=80',
    rating: 4.88,
    reviewsCount: 92,
    dietary: ['VEGETARIAN', 'GLUTEN-FREE'],
    calories: 380
  },
  {
    id: 'm13',
    name: 'Sichuan Chili Crisp Duck',
    category: 'Chinese & Indian',
    price: 46,
    description: 'Crispy skin duck breast roasted with aromatic star anise, dark soy glaze, Sichuan chili crisp, and scallion flatbread.',
    image: 'https://images.unsplash.com/photo-1514944288352-fffac99f0bdf?auto=format&fit=crop&w=1000&q=80',
    rating: 4.89,
    reviewsCount: 67,
    calories: 720
  },
  {
    id: 'm14',
    name: 'Royal Kashmiri Lamb Rogan Josh',
    category: 'Chinese & Indian',
    price: 44,
    description: 'Slow-braised tender lamb shoulder in ratanjot paprika gravy with green cardamom, saffron pilaf, and garlic butter naan.',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1000&q=80',
    rating: 4.91,
    reviewsCount: 110,
    dietary: ['NUT-FREE'],
    calories: 760
  },
  {
    id: 'm15',
    name: 'Matcha Opera Gateau',
    category: 'Desserts',
    price: 20,
    description: 'Layers of ceremonial Uji matcha sponge cake, dark Valrhona ganache, and espresso buttercream finished with gold leaf.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80',
    rating: 4.84,
    reviewsCount: 54,
    dietary: ['DESSERT', 'VEGETARIAN'],
    calories: 410
  },
  {
    id: 'm16',
    name: 'Smoked Old Fashioned',
    category: 'Drinks',
    price: 22,
    description: 'Small-batch Woodford Reserve bourbon, Demerara sugar, Angostura bitters, hickory smoke infusion, and clear ice block.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=80',
    rating: 4.94,
    reviewsCount: 130,
    dietary: ['DRINK'],
    calories: 210
  }
];

export const CHEFS: Chef[] = [
  {
    id: 'c1',
    name: 'Julian Vane',
    title: 'EXECUTIVE CHEF & FOUNDER',
    bio: 'Pioneering modern French gastronomy through seasonal purity and avant-garde technique. Chef Julian trained at L\'Arpège in Paris before opening Luxe Bistro.',
    quote: 'Ingredients are the ink; the plate is my manuscript.',
    experienceYears: 22,
    specialty: 'Modern French Gastronomy',
    awards: ['3 MICHELIN STARS', 'JAMES BEARD WINNER', 'INNOVATOR OF THE YEAR'],
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80',
    socials: {
      instagram: 'https://instagram.com',
      website: 'https://julianvane.com'
    }
  },
  {
    id: 'c2',
    name: 'Elena Moretti',
    title: 'HEAD PASTRY CHEF',
    bio: 'Mastering the architecture of sweetness for over 12 years. Elena elevates classical patisserie with botanical infusions and unexpected textures.',
    quote: 'Dessert is not the end of a meal, but its poetic climax.',
    experienceYears: 12,
    specialty: 'Botanical Pastry & Sculptural Chocolate',
    awards: ['WORLD PASTRY CUP SILVER', 'TOP DESSERT ARTIST 2023'],
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=80',
    socials: {
      instagram: 'https://instagram.com'
    }
  },
  {
    id: 'c3',
    name: 'Marcus Thorne',
    title: 'GRILL MASTER & SOUS CHEF',
    bio: '15 Years perfecting the elemental dance of fire, charcoal, and smoke. Marcus oversees our dry-aging chamber and live-fire hearth.',
    quote: 'Patience and woodfire transform good cut meat into pure memory.',
    experienceYears: 15,
    specialty: 'Woodfire & Dry-Aging Mastery',
    awards: ['BEST GRILL AWARD 2023', 'PRIME STEAK SPECIALIST'],
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1000&q=80',
    socials: {
      twitter: 'https://twitter.com'
    }
  },
  {
    id: 'c4',
    name: 'Sofia Chen',
    title: 'MASTER SOMMELIER',
    bio: 'Curating an award-winning cellar of over 4,000 labels. Sofia brings 18 years of expertise in pairing rare vintages with our seasonal tasting menus.',
    quote: 'Every bottle holds a climate, a soil, and a human story waiting to be uncorked.',
    experienceYears: 18,
    specialty: 'Biodynamic & Vintage Pairing',
    awards: ['CMS MASTER LEVEL', 'SOMMELIER OF THE YEAR \'22'],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
    socials: {
      instagram: 'https://instagram.com',
      website: 'https://sofiachenwines.com'
    }
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Julianne S. Moore',
    role: 'Food Critic',
    publication: 'The Urban Plate',
    comment: 'An uncompromising dedication to flavor. Luxe Bistro doesn\'t just serve food; they create memories through every course.',
    rating: 5
  },
  {
    id: 'r2',
    author: 'Alexander Wright',
    role: 'Gastronomy Editor',
    publication: 'Michelin Guide Insights',
    comment: 'The Pan-Seared Scallops with Saffron Emulsion is nothing short of a culinary triumph. Flawless execution and elegant service.',
    rating: 5
  },
  {
    id: 'r3',
    author: 'Camilla Dupont',
    role: 'Lifestyle Journalist',
    publication: 'Le Gourmand Digest',
    comment: 'From the warm velvet interior to Sofia\'s wine pairings, Luxe Bistro stands as the pinnacle of modern fine dining.',
    rating: 5
  }
];

export const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=800&q=80'
];

export const RESTAURANT_INFO = {
  name: 'LUXE BISTRO',
  tagline: 'Elevating modern gastronomy with a commitment to local sourcing and seasonal excellence.',
  address: '124 Gastronomy Blvd, Culinary District, NY 10012',
  phone: '+1 (212) 555-0198',
  email: 'concierge@luxebistro.com',
  hours: [
    { days: 'Monday – Thursday', time: '17:00 – 22:00' },
    { days: 'Friday – Saturday', time: '17:00 – 23:30' },
    { days: 'Sunday Brunch', time: '10:00 – 15:00' },
    { days: 'Sunday Dinner', time: '17:00 – 21:00' }
  ]
};
