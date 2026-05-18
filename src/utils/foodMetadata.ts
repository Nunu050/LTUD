const foodDictionary = [
  {
    emoji: "🍕",

    category: "Fast Food",

    keywords: [
      "pizza",
      "pepperoni",
      "cheese pizza",
      "hawaii pizza",
      "bánh pizza",
    ],
  },

  {
    emoji: "🍔",

    category: "Fast Food",

    keywords: [
      "burger",
      "hamburger",
      "cheeseburger",
      "big mac",
    ],
  },

  {
    emoji: "🍗",

    category: "Chicken",

    keywords: [
      "gà",
      "gà rán",
      "fried chicken",
      "kfc",
      "chicken",
    ],
  },

  {
    emoji: "🍜",

    category: "Noodles",

    keywords: [
      "mì",
      "ramen",
      "udon",
      "phở",
      "bún",
      "hủ tiếu",
    ],
  },

  {
    emoji: "🍚",

    category: "Rice",

    keywords: [
      "cơm",
      "fried rice",
      "rice",
      "cơm tấm",
      "cơm chiên",
    ],
  },

  {
    emoji: "🍨",

    category: "Dessert",

    keywords: [
      "chè",
      "chè thái",
      "chè đậu",
      "dessert",
      "sweet soup",
    ],
  },

  {
    emoji: "🍦",

    category: "Ice Cream",

    keywords: [
      "kem",
      "ice cream",
      "gelato",
    ],
  },

  {
    emoji: "🧋",

    category: "Drink",

    keywords: [
      "trà sữa",
      "milk tea",
      "boba",
      "matcha latte",
    ],
  },

  {
    emoji: "☕",

    category: "Drink",

    keywords: [
      "coffee",
      "cafe",
      "espresso",
      "latte",
      "capuchino",
    ],
  },

  {
    emoji: "🥗",

    category: "Healthy",

    keywords: [
      "salad",
      "vegetable",
      "healthy",
      "rau",
    ],
  },

  {
    emoji: "🍣",

    category: "Japanese",

    keywords: [
      "sushi",
      "sashimi",
      "maki",
    ],
  },

  {
    emoji: "🌮",

    category: "Mexican",

    keywords: [
      "taco",
      "burrito",
      "mexican",
    ],
  },

  {
    emoji: "🥩",

    category: "BBQ",

    keywords: [
      "steak",
      "bbq",
      "beef",
      "thịt nướng",
    ],
  },
];

export const getFoodMetadata = (
  foodName: string
) => {
  const lower =
    foodName.toLowerCase();

  for (const item of foodDictionary) {
    for (const keyword of item.keywords) {
      if (
        lower.includes(keyword)
      ) {
        return {
          emoji: item.emoji,

          category:
            item.category,
        };
      }
    }
  }

  return {
    emoji: "🍽️",

    category: "Other",
  };
};