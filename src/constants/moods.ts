import { Mood, Food } from "../types";

export const allFoods: Food[] = [
  // Happy Foods
  { id: "h1", name: "Thịt Nướng BBQ", emoji: "🍖", category: "Thịt Nướng BBQ", imageUrl: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd", description: "Ăn mừng thả ga", moodMatch: ["Happy"] },
  { id: "h2", name: "Gà Rán", emoji: "🍗", category: "Gà Rán", imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd", description: "Niềm vui giòn tan", moodMatch: ["Happy"] },
  { id: "h3", name: "Trà Sữa", emoji: "🧋", category: "Trà Sữa", imageUrl: "https://images.unsplash.com/photo-1558857563-b371033873b8", description: "Ngọt ngào như tâm trạng bạn", moodMatch: ["Happy", "Chill"] },
  { id: "h4", name: "Lẩu Thái", emoji: "🍲", category: "Lẩu Thái", imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1", description: "Cay nồng, sôi động", moodMatch: ["Happy"] },
  { id: "h5", name: "Ốc Đêm", emoji: "🐌", category: "Ốc Đêm", imageUrl: "https://images.unsplash.com/photo-1559058789-672da06263d8", description: "Tụ tập bạn bè", moodMatch: ["Happy", "Chill"] },
  { id: "h6", name: "Bún Đậu Mắm Tôm", emoji: "🥢", category: "Bún Đậu Mắm Tôm", imageUrl: "https://images.unsplash.com/photo-1596645371131-0361fb239c08", description: "Vui vẻ dân dã", moodMatch: ["Happy"] },
  { id: "h7", name: "Kem", emoji: "🍦", category: "Kem", imageUrl: "https://images.unsplash.com/photo-1570197781417-0c7f7634f19b", description: "Mát lạnh sảng khoái", moodMatch: ["Happy"] },
  
  // Sad Foods
  { id: "s1", name: "Phở Gà", emoji: "🍜", category: "Phở Gà", imageUrl: "https://images.unsplash.com/photo-1582878826629-29b7ad1cb438", description: "Hương vị chữa lành", moodMatch: ["Sad"] },
  { id: "s2", name: "Cháo Lòng", emoji: "🥣", category: "Cháo Lòng", imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19", description: "Ấm áp cõi lòng", moodMatch: ["Sad"] },
  { id: "s3", name: "Bánh Mì", emoji: "🥖", category: "Bánh Mì", imageUrl: "https://images.unsplash.com/photo-1612203985729-70726954388c", description: "Đơn giản mà chắc bụng", moodMatch: ["Sad"] },
  { id: "s4", name: "Trà Đào", emoji: "🍹", category: "Trà Đào", imageUrl: "https://images.unsplash.com/photo-1556881286-fc6915169721", description: "Thanh mát, nhẹ nhàng", moodMatch: ["Sad", "Chill"] },
  { id: "s5", name: "Chè Thái", emoji: "🍧", category: "Chè Thái", imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb", description: "Vị ngọt xoa dịu nỗi buồn", moodMatch: ["Sad"] },
  { id: "s6", name: "Bánh Tráng Nướng", emoji: "🍕", category: "Bánh Tráng Nướng", imageUrl: "https://images.unsplash.com/photo-1627308595229-7830f5c9c66e", description: "Gợi nhớ kỷ niệm", moodMatch: ["Sad", "Chill"] },
  { id: "s7", name: "Soup Cua", emoji: "🍲", category: "Soup Cua", imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554", description: "Sự ấm áp nhỏ nhoi", moodMatch: ["Sad"] },

  // Stressed Foods
  { id: "st1", name: "Mì Cay", emoji: "🌶️", category: "Mì Cay", imageUrl: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841", description: "Đánh thức mọi giác quan", moodMatch: ["Stressed"] },
  { id: "st2", name: "Trà Đen Macchiato", emoji: "☕", category: "Trà Đen Macchiato", imageUrl: "https://images.unsplash.com/photo-1557142046-c704a3adf364", description: "Đậm đà, béo ngậy", moodMatch: ["Stressed"] },
  { id: "st3", name: "Gà Cay Phô Mai", emoji: "🧀", category: "Gà Cay Phô Mai", imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38", description: "Giải tỏa áp lực", moodMatch: ["Stressed"] },
  { id: "st4", name: "Bánh Tiramisu", emoji: "🍰", category: "Bánh Tiramisu", imageUrl: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d", description: "Kéo mood lên ngay lập tức", moodMatch: ["Stressed"] },
  { id: "st5", name: "Sữa Tươi Trân Châu", emoji: "🥤", category: "Sữa Tươi Trân Châu", imageUrl: "https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd", description: "Nhai trân châu xả stress", moodMatch: ["Stressed"] },
  { id: "st6", name: "Trà Gừng Mật Ong", emoji: "🫖", category: "Trà Gừng Mật Ong", imageUrl: "https://images.unsplash.com/photo-1576092762791-dd9e2220abd4", description: "Trấn an tinh thần", moodMatch: ["Stressed"] },

  // Chill Foods
  { id: "c1", name: "Cà Phê Sữa Đá", emoji: "☕", category: "Cà Phê Sữa Đá", imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085", description: "Thảnh thơi ngắm phố", moodMatch: ["Chill"] },
  { id: "c2", name: "Bia Craft", emoji: "🍺", category: "Bia Craft", imageUrl: "https://images.unsplash.com/photo-1535958636474-b021ee887b13", description: "Chilling out", moodMatch: ["Chill"] },
  { id: "c3", name: "Mực Khô Nướng", emoji: "🦑", category: "Mực Khô Nướng", imageUrl: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6", description: "Nhâm nhi cùng bạn bè", moodMatch: ["Chill"] },
  { id: "c4", name: "Bánh Tráng Trộn", emoji: "🥡", category: "Bánh Tráng Trộn", imageUrl: "https://images.unsplash.com/photo-1626202456456-e9185a815779", description: "Đậm vị đường phố", moodMatch: ["Chill"] },
  { id: "c5", name: "Cơm Tấm Sườn Bì", emoji: "🍛", category: "Cơm Tấm Sườn Bì", imageUrl: "https://images.unsplash.com/photo-1626804475297-41609ea064eb", description: "No bụng, thong dong", moodMatch: ["Chill"] },
  { id: "c6", name: "Sữa Chua Trân Châu", emoji: "🍨", category: "Sữa Chua Trân Châu", imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b", description: "Nhẹ nhàng khoan khoái", moodMatch: ["Chill"] },

  // Romantic Foods
  { id: "r1", name: "Bít Tết (Steak)", emoji: "🥩", category: "Bít Tết (Steak)", imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947", description: "Bữa tối lãng mạn", moodMatch: ["Romantic"] },
  { id: "r2", name: "Rượu Vang", emoji: "🍷", category: "Rượu Vang", imageUrl: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb", description: "Men say tình yêu", moodMatch: ["Romantic"] },
  { id: "r3", name: "Sushi", emoji: "🍣", category: "Sushi", imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c", description: "Tinh tế và nghệ thuật", moodMatch: ["Romantic"] },
  { id: "r4", name: "Mì Ý (Pasta)", emoji: "🍝", category: "Mì Ý (Pasta)", imageUrl: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601", description: "Hương vị châu Âu", moodMatch: ["Romantic"] },
  { id: "r5", name: "Salad Cá Hồi", emoji: "🥗", category: "Salad Cá Hồi", imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c", description: "Nhẹ nhàng, thanh lịch", moodMatch: ["Romantic"] },
  { id: "r6", name: "Bánh Kem Dâu", emoji: "🍓", category: "Bánh Kem Dâu", imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587", description: "Ngọt ngào kết thúc", moodMatch: ["Romantic"] },
];

export const MOODS: Mood[] = [
  {
    id: "m1",
    title: "Happy",
    emoji: "😊",
    color: "#FFD166",
    psychology: "Ăn mừng bằng sự bùng nổ hương vị! Cảm xúc vui vẻ thường kích thích thèm đồ nướng, lẩu, hoặc vị giòn tan.",
    foods: allFoods.filter(f => f.moodMatch.includes("Happy")),
  },
  {
    id: "m2",
    title: "Sad",
    emoji: "🥺",
    color: "#60A5FA",
    psychology: "Những món ăn nóng, dạng nước như phở, cháo sẽ tạo cảm giác được ôm ấp và an ủi về mặt tâm lý.",
    foods: allFoods.filter(f => f.moodMatch.includes("Sad")),
  },
  {
    id: "m3",
    title: "Stressed",
    emoji: "😩",
    color: "#F87171",
    psychology: "Đồ cay hoặc đồ ngọt sẽ kích thích não tiết dopamine, giúp giải tỏa áp lực tức thì.",
    foods: allFoods.filter(f => f.moodMatch.includes("Stressed")),
  },
  {
    id: "m4",
    title: "Chill",
    emoji: "😌",
    color: "#34D399",
    psychology: "Chỉ cần nhâm nhi một chút gì đó, ngắm nhìn phố phường. Đồ ăn vặt hoặc thức uống nhẹ là lý tưởng.",
    foods: allFoods.filter(f => f.moodMatch.includes("Chill")),
  },
  {
    id: "m5",
    title: "Romantic",
    emoji: "❤️",
    color: "#F472B6",
    psychology: "Không gian, ánh sáng và sự tinh tế trong món ăn (như Steak, Sushi, Rượu vang) sẽ hâm nóng tình cảm.",
    foods: allFoods.filter(f => f.moodMatch.includes("Romantic")),
  },
  {
    id: "m6",
    title: "I Don't Know",
    emoji: "🎡",
    color: "#A78BFA",
    psychology: "Không biết ăn gì? Hãy để bánh xe số phận chọn ngẫu nhiên giúp bạn một bữa ăn tuyệt vời nhé!",
    foods: [], // Will be handled dynamically to return random foods
  }
];