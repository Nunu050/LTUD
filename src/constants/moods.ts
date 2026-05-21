import { Food, Mood } from "../types";

export const allFoods: Food[] = [
  // HAPPY (7)
  { id: "f1", name: "Thịt Nướng BBQ", emoji: "🍖", category: "BBQ", imageUrl: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd", description: "Ăn mừng thả ga, tiếng xèo xèo nịnh tai", moodMatch: ["Happy"] },
  { id: "f2", name: "Pizza", emoji: "🍕", category: "Pizza", imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38", description: "Cheese ngập tràn, chia sẻ niềm vui", moodMatch: ["Happy"] },
  { id: "f3", name: "Gà Rán", emoji: "🍗", category: "Gà Rán", imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec", description: "Giòn rụm béo ngậy, niềm vui bùng nổ", moodMatch: ["Happy"] },
  { id: "f4", name: "Trà Sữa", emoji: "🧋", category: "Trà Sữa", imageUrl: "https://image.pollinations.ai/prompt/colorful%20Vietnamese%20bubble%20tea%20with%20visible%20tapioca%20pearls%20toppings%20cafe%20aesthetic?width=800&height=600&nologo=true", description: "Ngọt ngào, nhai trân châu vui miệng", moodMatch: ["Happy", "Chill"] },
  { id: "f5", name: "Buffet", emoji: "🍽️", category: "Buffet", imageUrl: "https://images.unsplash.com/photo-1576867757603-05b134ebc379", description: "Ăn không giới hạn, trọn vẹn niềm vui", moodMatch: ["Happy"] },
  { id: "f6", name: "Lẩu Thái", emoji: "🍲", category: "Lẩu Thái", imageUrl: "https://image.pollinations.ai/prompt/delicious%20Thai%20seafood%20hotpot%20with%20shrimp%20mushrooms%20noodles%20spicy%20soup%20realistic%20food%20photography?width=800&height=600&nologo=true", description: "Cay nồng, sôi động, tụ tập là chuẩn", moodMatch: ["Happy", "Chill"] },
  { id: "f7", name: "Bánh Ngọt", emoji: "🍰", category: "Bánh Ngọt", imageUrl: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b", description: "Mừng ngày đặc biệt, ngọt ngào trọn vẹn", moodMatch: ["Happy", "Stressed"] },

  // SAD (6)
  { id: "f8", name: "Phở", emoji: "🍜", category: "Phở", imageUrl: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43", description: "Nước dùng nóng hổi xoa dịu tâm hồn", moodMatch: ["Sad"] },
  { id: "f9", name: "Cháo", emoji: "🥣", category: "Cháo", imageUrl: "https://image.pollinations.ai/prompt/warm%20comforting%20Vietnamese%20congee%20porridge%20bowl%20with%20garnish%20realistic%20food?width=800&height=600&nologo=true", description: "Nhẹ bụng, ấm áp cõi lòng", moodMatch: ["Sad"] },
  { id: "f10", name: "Bún Bò", emoji: "🥢", category: "Bún Bò", imageUrl: "https://images.unsplash.com/photo-1555126634-323283e090fa", description: "Đậm đà hương vị quê hương", moodMatch: ["Sad"] },
  { id: "f11", name: "Chocolate", emoji: "🍫", category: "Chocolate", imageUrl: "https://images.unsplash.com/photo-1549007994-cb92caebd54b", description: "Chút ngọt đắng cân bằng cảm xúc", moodMatch: ["Sad"] },
  { id: "f12", name: "Soup", emoji: "🍲", category: "Soup", imageUrl: "https://image.pollinations.ai/prompt/creamy%20Asian%20style%20warm%20soup%20in%20a%20bowl%20light%20aesthetic%20food%20photography?width=800&height=600&nologo=true", description: "Sự an ủi nhẹ nhàng", moodMatch: ["Sad"] },
  { id: "f13", name: "Bánh Mì", emoji: "🥖", category: "Bánh Mì", imageUrl: "https://image.pollinations.ai/prompt/authentic%20Vietnamese%20banh%20mi%20sandwich%20crispy%20baguette%20with%20meat%20filling%20and%20herbs?width=800&height=600&nologo=true", description: "Giòn rụm, thân thuộc, nhanh gọn", moodMatch: ["Sad", "Chill"] },

  // STRESS (6)
  { id: "f14", name: "Matcha", emoji: "🍵", category: "Matcha", imageUrl: "https://image.pollinations.ai/prompt/iced%20green%20matcha%20latte%20in%20a%20glass%20cafe%20aesthetic?width=800&height=600&nologo=true", description: "Thư giãn tinh thần, dịu cơn stress", moodMatch: ["Stressed"] },
  { id: "f15", name: "Sushi", emoji: "🍣", category: "Sushi", imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754", description: "Thanh mát, nhẹ nhàng, tinh tế", moodMatch: ["Stressed", "Romantic"] },
  { id: "f16", name: "Healthy Bowl", emoji: "🥗", category: "Healthy bowl", imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd", description: "Thanh lọc cơ thể, tĩnh tâm", moodMatch: ["Stressed"] },
  { id: "f17", name: "Coffee", emoji: "☕", category: "Coffee", imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93", description: "Khoảng lặng để tái tạo năng lượng", moodMatch: ["Stressed", "Chill"] },
  { id: "f18", name: "Tea", emoji: "🫖", category: "Tea", imageUrl: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9", description: "Nhấp ngụm trà, buông bỏ muộn phiền", moodMatch: ["Stressed"] },

  // ROMANTIC (6)
  { id: "f19", name: "Steak", emoji: "🥩", category: "Steak", imageUrl: "https://images.unsplash.com/photo-1600891964092-4316c288032e", description: "Bữa tối lãng mạn dưới ánh nến", moodMatch: ["Romantic"] },
  { id: "f20", name: "Pasta", emoji: "🍝", category: "Pasta", imageUrl: "https://images.unsplash.com/photo-1551183053-bf91a1d81141", description: "Hương vị châu Âu lãng mạn", moodMatch: ["Romantic"] },
  { id: "f21", name: "Wine", emoji: "🍷", category: "Wine", imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3", description: "Men say tình yêu", moodMatch: ["Romantic"] },
  { id: "f22", name: "Fine dining", emoji: "🥂", category: "Fine dining", imageUrl: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c", description: "Trải nghiệm sang trọng, đáng nhớ", moodMatch: ["Romantic"] },
  { id: "f23", name: "Salad", emoji: "🥗", category: "Salad", imageUrl: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe", description: "Tươi mới, tinh tế cho buổi hẹn hò", moodMatch: ["Romantic"] },

  // CHILL (5 exclusive, + Trà Sữa, Lẩu Thái, Coffee, Bánh Mì = 9)
  { id: "f24", name: "Ăn Vặt", emoji: "🥡", category: "Ăn Vặt", imageUrl: "https://image.pollinations.ai/prompt/mixed%20Vietnamese%20street%20snacks%20fries%20fish%20balls%20fried%20food?width=800&height=600&nologo=true", description: "Chút mặn ngọt đậm đà đường phố", moodMatch: ["Chill"] },
  { id: "f25", name: "Xiên Que", emoji: "🍢", category: "Xiên Que", imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1", description: "Thong dong nhâm nhi buổi tối", moodMatch: ["Chill"] },
  { id: "f26", name: "Ốc Đêm", emoji: "🐌", category: "Ốc Đêm", imageUrl: "https://image.pollinations.ai/prompt/Vietnamese%20street%20seafood%20snails%20night%20eating%20vibe%20street%20food?width=800&height=600&nologo=true", description: "Tụ tập chém gió quên ngày tháng", moodMatch: ["Chill"] },
  { id: "f27", name: "Bia Craft", emoji: "🍺", category: "Bia Craft", imageUrl: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7", description: "Uống bia ngắm phố, chuyện trò nhẹ nhàng", moodMatch: ["Chill"] },
];

export const MOODS: Mood[] = [
  {
    id: "m1",
    title: "Happy",
    emoji: "😊",
    color: "#FFD166",
    psychology: "Ăn mừng bằng sự bùng nổ! Cảm xúc vui vẻ thường kích thích thèm các món ăn mang tính chia sẻ, sôi động.",
    foods: allFoods.filter(f => f.moodMatch?.includes("Happy")), // 7 foods
  },
  {
    id: "m2",
    title: "Sad",
    emoji: "🥺",
    color: "#60A5FA",
    psychology: "Những món ăn nóng, ấm áp như Phở, Cháo sẽ tạo cảm giác được ôm ấp và an ủi về mặt tâm lý.",
    foods: allFoods.filter(f => f.moodMatch?.includes("Sad")), // 6 foods
  },
  {
    id: "m3",
    title: "Stressed",
    emoji: "😩",
    color: "#F87171",
    psychology: "Những món thanh đạm, ít dầu mỡ, hoặc chứa caffeine giúp làm dịu thần kinh và mang lại sự bình yên.",
    foods: allFoods.filter(f => f.moodMatch?.includes("Stressed")), // 6 foods
  },
  {
    id: "m4",
    title: "Chill",
    emoji: "😌",
    color: "#34D399",
    psychology: "Không vội vã. Đồ ăn vặt, xiên que hay lẩu đêm là lựa chọn hoàn hảo để lai rai cùng bạn bè.",
    foods: allFoods.filter(f => f.moodMatch?.includes("Chill")), // 9 foods
  },
  {
    id: "m5",
    title: "Romantic",
    emoji: "❤️",
    color: "#F472B6",
    psychology: "Không gian, ánh sáng và sự tinh tế trong các món Âu, Sushi sẽ hâm nóng tình cảm đôi lứa.",
    foods: allFoods.filter(f => f.moodMatch?.includes("Romantic")), // 6 foods
  },
  {
    id: "m6",
    title: "I Don't Know",
    emoji: "🎡",
    color: "#A78BFA",
    psychology: "Không biết ăn gì? Hãy để bánh xe số phận chọn ngẫu nhiên giúp bạn một bữa ăn tuyệt vời nhé!",
    foods: [],
  }
];