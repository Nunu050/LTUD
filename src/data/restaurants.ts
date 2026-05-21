import { Restaurant } from "../types";

export const restaurants: Restaurant[] = [
  // 1. BBQ
  { id: "r1", name: "Gogi House BBQ", address: "Vincom Biên Hòa", latitude: 10.9453, longitude: 106.8402, category: "BBQ", image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd" },
  { id: "r2", name: "King BBQ Buffet", address: "Pegasus Plaza", latitude: 10.9525, longitude: 106.8215, category: "BBQ", image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd" },

  // 2. Pizza
  { id: "r3", name: "Pizza Hut", address: "Vincom Biên Hòa", latitude: 10.9448, longitude: 106.8400, category: "Pizza", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" },
  { id: "r4", name: "Domino's Pizza", address: "Phan Trung", latitude: 10.9582, longitude: 106.8465, category: "Pizza", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" },

  // 3. Gà Rán
  { id: "r5", name: "KFC Vincom", address: "Tầng 4 Vincom Biên Hòa", latitude: 10.9452, longitude: 106.8408, category: "Gà Rán", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec" },
  { id: "r6", name: "Lotteria", address: "Co.opmart Biên Hòa", latitude: 10.9525, longitude: 106.8330, category: "Gà Rán", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec" },
  { id: "r7", name: "Jollibee", address: "Big C Tân Hiệp", latitude: 10.9635, longitude: 106.8625, category: "Gà Rán", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec" },

  // 4. Trà Sữa
  { id: "r8", name: "Gong Cha", address: "Võ Thị Sáu", latitude: 10.9520, longitude: 106.8360, category: "Trà Sữa", image: "https://image.pollinations.ai/prompt/colorful%20Vietnamese%20bubble%20tea%20with%20visible%20tapioca%20pearls%20toppings%20cafe%20aesthetic?width=800&height=600&nologo=true" },
  { id: "r9", name: "Phúc Long Coffee & Tea", address: "Pegasus Plaza", latitude: 10.9523, longitude: 106.8212, category: "Trà Sữa", image: "https://image.pollinations.ai/prompt/colorful%20Vietnamese%20bubble%20tea%20with%20visible%20tapioca%20pearls%20toppings%20cafe%20aesthetic?width=800&height=600&nologo=true" },
  { id: "r10", name: "KOI Thé", address: "Vincom Biên Hòa", latitude: 10.9450, longitude: 106.8405, category: "Trà Sữa", image: "https://image.pollinations.ai/prompt/colorful%20Vietnamese%20bubble%20tea%20with%20visible%20tapioca%20pearls%20toppings%20cafe%20aesthetic?width=800&height=600&nologo=true" },

  // 5. Buffet
  { id: "r11", name: "Dookki Biên Hòa", address: "Vincom Biên Hòa", latitude: 10.9449, longitude: 106.8406, category: "Buffet", image: "https://images.unsplash.com/photo-1576867757603-05b134ebc379" },
  { id: "r12", name: "Hoàng Yến Buffet", address: "Pegasus Plaza", latitude: 10.9524, longitude: 106.8218, category: "Buffet", image: "https://images.unsplash.com/photo-1576867757603-05b134ebc379" },

  // 6. Lẩu Thái
  { id: "r13", name: "Kichi Kichi", address: "Vincom Biên Hòa", latitude: 10.9451, longitude: 106.8401, category: "Lẩu Thái", image: "https://image.pollinations.ai/prompt/delicious%20Thai%20seafood%20hotpot%20with%20shrimp%20mushrooms%20noodles%20spicy%20soup%20realistic%20food%20photography?width=800&height=600&nologo=true" },
  { id: "r14", name: "Hutong", address: "Pegasus Plaza", latitude: 10.9526, longitude: 106.8210, category: "Lẩu Thái", image: "https://image.pollinations.ai/prompt/delicious%20Thai%20seafood%20hotpot%20with%20shrimp%20mushrooms%20noodles%20spicy%20soup%20realistic%20food%20photography?width=800&height=600&nologo=true" },

  // 7. Bánh Ngọt
  { id: "r15", name: "Đồng Tiến Bakery", address: "Nguyễn Ái Quốc", latitude: 10.9602, longitude: 106.8398, category: "Bánh Ngọt", image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b" },
  { id: "r16", name: "Tous Les Jours", address: "Vincom Biên Hòa", latitude: 10.9447, longitude: 106.8403, category: "Bánh Ngọt", image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b" },

  // 8. Phở
  { id: "r17", name: "Phở Hữu Tín", address: "Võ Thị Sáu", latitude: 10.9512, longitude: 106.8345, category: "Phở", image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43" },
  { id: "r18", name: "Phở Trộn 24", address: "Nguyễn Ái Quốc", latitude: 10.9625, longitude: 106.8495, category: "Phở", image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43" },

  // 9. Cháo
  { id: "r19", name: "Cháo Lòng Bé Ba", address: "Nguyễn Ái Quốc", latitude: 10.9615, longitude: 106.8475, category: "Cháo", image: "https://image.pollinations.ai/prompt/warm%20comforting%20Vietnamese%20congee%20porridge%20bowl%20with%20garnish%20realistic%20food?width=800&height=600&nologo=true" },
  { id: "r20", name: "Cháo Ếch Singapore", address: "Phan Đình Phùng", latitude: 10.9495, longitude: 106.8280, category: "Cháo", image: "https://image.pollinations.ai/prompt/warm%20comforting%20Vietnamese%20congee%20porridge%20bowl%20with%20garnish%20realistic%20food?width=800&height=600&nologo=true" },

  // 10. Bún Bò
  { id: "r21", name: "Bún Bò Nam Giao", address: "Cách Mạng Tháng 8", latitude: 10.9450, longitude: 106.8205, category: "Bún Bò", image: "https://images.unsplash.com/photo-1555126634-323283e090fa" },
  { id: "r22", name: "Bún Bò Huế Ngọc Hương", address: "Đồng Khởi", latitude: 10.9702, longitude: 106.8542, category: "Bún Bò", image: "https://images.unsplash.com/photo-1555126634-323283e090fa" },

  // 11. Chocolate
  { id: "r23", name: "D'Art Chocolate", address: "Võ Thị Sáu", latitude: 10.9518, longitude: 106.8372, category: "Chocolate", image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b" },
  { id: "r24", name: "Nama Chocolate Shop", address: "Phan Trung", latitude: 10.9588, longitude: 106.8462, category: "Chocolate", image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b" },

  // 12. Soup
  { id: "r25", name: "Soup Cua Nhà Thờ", address: "Cách Mạng Tháng Tám", latitude: 10.9460, longitude: 106.8175, category: "Soup", image: "https://image.pollinations.ai/prompt/creamy%20Asian%20style%20warm%20soup%20in%20a%20bowl%20light%20aesthetic%20food%20photography?width=800&height=600&nologo=true" },
  { id: "r26", name: "Soup Bong Bóng Cá", address: "Phạm Văn Thuận", latitude: 10.9555, longitude: 106.8445, category: "Soup", image: "https://image.pollinations.ai/prompt/creamy%20Asian%20style%20warm%20soup%20in%20a%20bowl%20light%20aesthetic%20food%20photography?width=800&height=600&nologo=true" },

  // 13. Bánh Mì
  { id: "r27", name: "Bánh Mì Đồng Nai", address: "Phan Đình Phùng", latitude: 10.9490, longitude: 106.8270, category: "Bánh Mì", image: "https://image.pollinations.ai/prompt/authentic%20Vietnamese%20banh%20mi%20sandwich%20crispy%20baguette%20with%20meat%20filling%20and%20herbs?width=800&height=600&nologo=true" },
  { id: "r28", name: "Bánh Mì Tuấn Mập", address: "Cách Mạng Tháng 8", latitude: 10.9458, longitude: 106.8218, category: "Bánh Mì", image: "https://image.pollinations.ai/prompt/authentic%20Vietnamese%20banh%20mi%20sandwich%20crispy%20baguette%20with%20meat%20filling%20and%20herbs?width=800&height=600&nologo=true" },

  // 14. Matcha
  { id: "r29", name: "Zen Tea Matcha & Tea", address: "Võ Thị Sáu", latitude: 10.9515, longitude: 106.8355, category: "Matcha", image: "https://image.pollinations.ai/prompt/iced%20green%20matcha%20latte%20in%20a%20glass%20cafe%20aesthetic?width=800&height=600&nologo=true" },
  { id: "r30", name: "TocoToco", address: "Phan Trung", latitude: 10.9580, longitude: 106.8455, category: "Matcha", image: "https://image.pollinations.ai/prompt/iced%20green%20matcha%20latte%20in%20a%20glass%20cafe%20aesthetic?width=800&height=600&nologo=true" },

  // 15. Sushi
  { id: "r31", name: "Sushi Kei", address: "Vincom Biên Hòa", latitude: 10.9454, longitude: 106.8409, category: "Sushi", image: "https://images.unsplash.com/photo-1553621042-f6e147245754" },
  { id: "r32", name: "Tokyo Deli", address: "Võ Thị Sáu", latitude: 10.9520, longitude: 106.8362, category: "Sushi", image: "https://images.unsplash.com/photo-1553621042-f6e147245754" },

  // 16. Healthy bowl
  { id: "r33", name: "Poke Saigon", address: "Đường D9", latitude: 10.9605, longitude: 106.8345, category: "Healthy bowl", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd" },
  { id: "r34", name: "Let's Eat Healthy", address: "Võ Thị Sáu", latitude: 10.9512, longitude: 106.8385, category: "Healthy bowl", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd" },

  // 17. Coffee
  { id: "r35", name: "Highlands Coffee", address: "Vincom Biên Hòa", latitude: 10.9446, longitude: 106.8404, category: "Coffee", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93" },
  { id: "r36", name: "The Coffee House", address: "Võ Thị Sáu", latitude: 10.9522, longitude: 106.8380, category: "Coffee", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93" },

  // 18. Tea
  { id: "r37", name: "KATINAT", address: "Võ Thị Sáu", latitude: 10.9530, longitude: 106.8392, category: "Tea", image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9" },
  { id: "r38", name: "Phê La", address: "Phan Trung", latitude: 10.9572, longitude: 106.8448, category: "Tea", image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9" },

  // 19. Steak
  { id: "r39", name: "Le Monde Steak", address: "Vincom Biên Hòa", latitude: 10.9453, longitude: 106.8398, category: "Steak", image: "https://images.unsplash.com/photo-1600891964092-4316c288032e" },
  { id: "r40", name: "Cowboy Steakhouse", address: "Võ Thị Sáu", latitude: 10.9528, longitude: 106.8388, category: "Steak", image: "https://images.unsplash.com/photo-1600891964092-4316c288032e" },

  // 20. Pasta
  { id: "r41", name: "The Pizza Company", address: "Pegasus Plaza", latitude: 10.9523, longitude: 106.8213, category: "Pasta", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141" },
  { id: "r42", name: "Al Fresco's Biên Hòa", address: "Võ Thị Sáu", latitude: 10.9532, longitude: 106.8390, category: "Pasta", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141" },

  // 21. Wine
  { id: "r43", name: "Hầm Rượu Vang Đệ Nhất", address: "Đường D7", latitude: 10.9602, longitude: 106.8380, category: "Wine", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3" },
  { id: "r44", name: "Cheer House", address: "Võ Thị Sáu", latitude: 10.9517, longitude: 106.8358, category: "Wine", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3" },

  // 22. Fine dining
  { id: "r45", name: "The River House", address: "Bờ Sông Đồng Nai", latitude: 10.9475, longitude: 106.8192, category: "Fine dining", image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c" },
  { id: "r46", name: "Villa Restaurant", address: "KDL Bửu Long", latitude: 10.9675, longitude: 106.8142, category: "Fine dining", image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c" },

  // 23. Ăn Vặt
  { id: "r47", name: "Bánh Tráng Trộn Cô Út", address: "Cổng 2 Biên Hòa", latitude: 10.9545, longitude: 106.8365, category: "Ăn Vặt", image: "https://image.pollinations.ai/prompt/mixed%20Vietnamese%20street%20snacks%20fries%20fish%20balls%20fried%20food?width=800&height=600&nologo=true" },
  { id: "r48", name: "Cá Viên Chiên", address: "Quảng trường Tỉnh", latitude: 10.9595, longitude: 106.8392, category: "Ăn Vặt", image: "https://image.pollinations.ai/prompt/mixed%20Vietnamese%20street%20snacks%20fries%20fish%20balls%20fried%20food?width=800&height=600&nologo=true" },

  // 24. Xiên Que
  { id: "r49", name: "Xiên Que Tự Chọn", address: "Đường số 5", latitude: 10.9512, longitude: 106.8405, category: "Xiên Que", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1" },
  { id: "r50", name: "Hồ Khô Mực", address: "Gần Ga Biên Hòa", latitude: 10.9445, longitude: 106.8280, category: "Xiên Que", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1" },

  // 25. Ốc Đêm
  { id: "r51", name: "Ốc Mập Biên Hòa", address: "Đường 5 nối dài", latitude: 10.9598, longitude: 106.8390, category: "Ốc Đêm", image: "https://image.pollinations.ai/prompt/Vietnamese%20street%20seafood%20snails%20night%20eating%20vibe%20street%20food?width=800&height=600&nologo=true" },
  { id: "r52", name: "Ốc Loan", address: "Cách Mạng Tháng 8", latitude: 10.9465, longitude: 106.8225, category: "Ốc Đêm", image: "https://image.pollinations.ai/prompt/Vietnamese%20street%20seafood%20snails%20night%20eating%20vibe%20street%20food?width=800&height=600&nologo=true" },

  // 26. Bia Craft
  { id: "r53", name: "C-Brewmaster Biên Hòa", address: "Đường số 7", latitude: 10.9510, longitude: 106.8400, category: "Bia Craft", image: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7" },
  { id: "r54", name: "Bia Tươi Đức Biên Hòa", address: "Võ Thị Sáu", latitude: 10.9535, longitude: 106.8385, category: "Bia Craft", image: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7" },
  
  // 27. Salad
  { id: "r55", name: "Salad Cá Hồi The Leaf", address: "Võ Thị Sáu", latitude: 10.9514, longitude: 106.8352, category: "Salad", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe" },
  { id: "r56", name: "Green Box", address: "Phan Trung", latitude: 10.9582, longitude: 106.8445, category: "Salad", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe" },
];