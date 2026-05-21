import { Restaurant } from "../types";

export const restaurants: Restaurant[] = [
  // 1. BBQ
  { id: "r1", name: "Gogi House BBQ", address: "Vincom Biên Hòa", latitude: 10.9543, longitude: 106.8428, category: "BBQ", image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd" },
  { id: "r2", name: "King BBQ Buffet", address: "Pegasus Plaza", latitude: 10.9535, longitude: 106.8375, category: "BBQ", image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd" },

  // 2. Pizza
  { id: "r3", name: "Pizza Hut", address: "Vincom Biên Hòa", latitude: 10.9542, longitude: 106.8429, category: "Pizza", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" },
  { id: "r4", name: "Domino's Pizza", address: "Phan Trung", latitude: 10.9585, longitude: 106.8460, category: "Pizza", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" },

  // 3. Gà Rán
  { id: "r5", name: "KFC Vincom", address: "Tầng 4 Vincom Biên Hòa", latitude: 10.9544, longitude: 106.8424, category: "Gà Rán", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec" },
  { id: "r6", name: "Lotteria", address: "Co.opmart Biên Hòa", latitude: 10.9565, longitude: 106.8455, category: "Gà Rán", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec" },
  { id: "r7", name: "Jollibee", address: "Big C Tân Hiệp", latitude: 10.9632, longitude: 106.8621, category: "Gà Rán", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec" },

  // 4. Trà Sữa
  { id: "r8", name: "Gong Cha", address: "Vincom Biên Hòa", latitude: 10.9540, longitude: 106.8426, category: "Trà Sữa", image: "https://images.unsplash.com/photo-1558138838-7629396cb726" },
  { id: "r9", name: "Phúc Long Coffee & Tea", address: "Pegasus Plaza", latitude: 10.9536, longitude: 106.8376, category: "Trà Sữa", image: "https://images.unsplash.com/photo-1558138838-7629396cb726" },
  { id: "r10", name: "KOI Thé", address: "Vincom Biên Hòa", latitude: 10.9541, longitude: 106.8427, category: "Trà Sữa", image: "https://images.unsplash.com/photo-1558138838-7629396cb726" },

  // 5. Buffet
  { id: "r11", name: "Dookki Biên Hòa", address: "Vincom Biên Hòa", latitude: 10.9545, longitude: 106.8425, category: "Buffet", image: "https://images.unsplash.com/photo-1576867757603-05b134ebc379" },
  { id: "r12", name: "Hoàng Yến Buffet", address: "Pegasus Plaza", latitude: 10.9537, longitude: 106.8374, category: "Buffet", image: "https://images.unsplash.com/photo-1576867757603-05b134ebc379" },

  // 6. Lẩu Thái
  { id: "r13", name: "Kichi Kichi", address: "Vincom Biên Hòa", latitude: 10.9545, longitude: 106.8425, category: "Lẩu Thái", image: "https://images.unsplash.com/photo-1552611052-33e04de081de" },
  { id: "r14", name: "Hutong", address: "Pegasus Plaza", latitude: 10.9538, longitude: 106.8378, category: "Lẩu Thái", image: "https://images.unsplash.com/photo-1552611052-33e04de081de" },

  // 7. Bánh Ngọt
  { id: "r15", name: "Đồng Tiến Bakery", address: "Nguyễn Ái Quốc", latitude: 10.9615, longitude: 106.8415, category: "Bánh Ngọt", image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b" },
  { id: "r16", name: "Tous Les Jours", address: "Vincom Biên Hòa", latitude: 10.9542, longitude: 106.8427, category: "Bánh Ngọt", image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b" },

  // 8. Phở
  { id: "r17", name: "Phở Hữu Tín", address: "Võ Thị Sáu", latitude: 10.9510, longitude: 106.8350, category: "Phở", image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43" },
  { id: "r18", name: "Phở Trộn 24", address: "Nguyễn Ái Quốc", latitude: 10.9632, longitude: 106.8501, category: "Phở", image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43" },

  // 9. Cháo
  { id: "r19", name: "Cháo Lòng Bé Ba", address: "Nguyễn Ái Quốc", latitude: 10.9632, longitude: 106.8501, category: "Cháo", image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252" },
  { id: "r20", name: "Cháo Ếch Singapore", address: "Phan Đình Phùng", latitude: 10.9501, longitude: 106.8288, category: "Cháo", image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252" },

  // 10. Bún Bò
  { id: "r21", name: "Bún Bò Nam Giao", address: "Cách Mạng Tháng 8", latitude: 10.9455, longitude: 106.8210, category: "Bún Bò", image: "https://images.unsplash.com/photo-1555126634-323283e090fa" },
  { id: "r22", name: "Bún Bò Huế Ngọc Hương", address: "Đồng Khởi", latitude: 10.9710, longitude: 106.8550, category: "Bún Bò", image: "https://images.unsplash.com/photo-1555126634-323283e090fa" },

  // 11. Chocolate
  { id: "r23", name: "D'Art Chocolate", address: "Võ Thị Sáu", latitude: 10.9525, longitude: 106.8380, category: "Chocolate", image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b" },
  { id: "r24", name: "Nama Chocolate Shop", address: "Phan Trung", latitude: 10.9590, longitude: 106.8465, category: "Chocolate", image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b" },

  // 12. Soup
  { id: "r25", name: "Soup Cua Nhà Thờ", address: "Khu Chợ Đêm", latitude: 10.9520, longitude: 106.8300, category: "Soup", image: "https://images.unsplash.com/photo-1569562211093-4ed0d0758f12" },
  { id: "r26", name: "Soup Bong Bóng Cá", address: "Phạm Văn Thuận", latitude: 10.9560, longitude: 106.8450, category: "Soup", image: "https://images.unsplash.com/photo-1569562211093-4ed0d0758f12" },

  // 13. Bánh Mì
  { id: "r27", name: "Bánh Mì Đồng Nai", address: "Phan Đình Phùng", latitude: 10.9501, longitude: 106.8288, category: "Bánh Mì", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba" },
  { id: "r28", name: "Bánh Mì Tuấn Mập", address: "Cách Mạng Tháng 8", latitude: 10.9455, longitude: 106.8210, category: "Bánh Mì", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba" },

  // 14. Matcha
  { id: "r29", name: "Morico", address: "Vincom Biên Hòa", latitude: 10.9547, longitude: 106.8422, category: "Matcha", image: "https://images.unsplash.com/photo-1582787031154-8e1f56a59ec1" },
  { id: "r30", name: "TocoToco", address: "Phan Trung", latitude: 10.9585, longitude: 106.8465, category: "Matcha", image: "https://images.unsplash.com/photo-1582787031154-8e1f56a59ec1" },

  // 15. Sushi
  { id: "r31", name: "Sushi Kei", address: "Vincom Biên Hòa", latitude: 10.9546, longitude: 106.8429, category: "Sushi", image: "https://images.unsplash.com/photo-1553621042-f6e147245754" },
  { id: "r32", name: "Tokyo Deli", address: "Võ Thị Sáu", latitude: 10.9522, longitude: 106.8365, category: "Sushi", image: "https://images.unsplash.com/photo-1553621042-f6e147245754" },

  // 16. Healthy bowl
  { id: "r33", name: "Poke Saigon", address: "Đường D9", latitude: 10.9610, longitude: 106.8350, category: "Healthy bowl", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd" },
  { id: "r34", name: "Let's Eat Healthy", address: "Võ Thị Sáu", latitude: 10.9515, longitude: 106.8390, category: "Healthy bowl", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd" },

  // 17. Coffee
  { id: "r35", name: "Highlands Coffee", address: "Vincom Biên Hòa", latitude: 10.9542, longitude: 106.8427, category: "Coffee", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93" },
  { id: "r36", name: "The Coffee House", address: "Võ Thị Sáu", latitude: 10.9525, longitude: 106.8385, category: "Coffee", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93" },

  // 18. Tea
  { id: "r37", name: "KATINAT", address: "Võ Thị Sáu", latitude: 10.9535, longitude: 106.8395, category: "Tea", image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9" },
  { id: "r38", name: "Phê La", address: "Phan Trung", latitude: 10.9580, longitude: 106.8460, category: "Tea", image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9" },

  // 19. Steak
  { id: "r39", name: "Le Monde Steak", address: "Vincom Biên Hòa", latitude: 10.9545, longitude: 106.8420, category: "Steak", image: "https://images.unsplash.com/photo-1600891964092-4316c288032e" },
  { id: "r40", name: "El Gaucho (Demo)", address: "Trung tâm Biên Hòa", latitude: 10.9555, longitude: 106.8440, category: "Steak", image: "https://images.unsplash.com/photo-1600891964092-4316c288032e" },

  // 20. Pasta
  { id: "r41", name: "The Pizza Company", address: "Pegasus Plaza", latitude: 10.9533, longitude: 106.8373, category: "Pasta", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141" },
  { id: "r42", name: "Pizza 4P's (Demo)", address: "Biên Hòa City", latitude: 10.9570, longitude: 106.8435, category: "Pasta", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141" },

  // 21. Wine
  { id: "r43", name: "Hầm Rượu Vang Đệ Nhất", address: "Đường D7", latitude: 10.9605, longitude: 106.8385, category: "Wine", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3" },
  { id: "r44", name: "Cheer House", address: "Võ Thị Sáu", latitude: 10.9520, longitude: 106.8360, category: "Wine", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3" },

  // 22. Fine dining
  { id: "r45", name: "The River House", address: "Bờ Sông Đồng Nai", latitude: 10.9480, longitude: 106.8200, category: "Fine dining", image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c" },
  { id: "r46", name: "Villa Restaurant", address: "KDL Bửu Long", latitude: 10.9680, longitude: 106.8150, category: "Fine dining", image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c" },

  // 23. Ăn Vặt
  { id: "r47", name: "Bánh Tráng Trộn Cô Út", address: "Cổng 2 Biên Hòa", latitude: 10.9550, longitude: 106.8370, category: "Ăn Vặt", image: "https://images.unsplash.com/photo-1525648199074-cee30ba79a4a" },
  { id: "r48", name: "Cá Viên Chiên", address: "Quảng trường Tỉnh", latitude: 10.9600, longitude: 106.8400, category: "Ăn Vặt", image: "https://images.unsplash.com/photo-1525648199074-cee30ba79a4a" },

  // 24. Xiên Que
  { id: "r49", name: "Xiên Que Tự Chọn", address: "Đường 5", latitude: 10.9515, longitude: 106.8410, category: "Xiên Que", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1" },
  { id: "r50", name: "Hồ Khô Mực", address: "Gần Ga Biên Hòa", latitude: 10.9450, longitude: 106.8285, category: "Xiên Que", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1" },

  // 25. Ốc Đêm
  { id: "r51", name: "Ốc Mập Biên Hòa", address: "Đường 5 nối dài", latitude: 10.9601, longitude: 106.8395, category: "Ốc Đêm", image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027" },
  { id: "r52", name: "Ốc Loan", address: "Cách Mạng Tháng 8", latitude: 10.9470, longitude: 106.8230, category: "Ốc Đêm", image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027" },

  // 26. Bia Craft
  { id: "r53", name: "C-Brewmaster Biên Hòa", address: "Đường số 7", latitude: 10.9515, longitude: 106.8410, category: "Bia Craft", image: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7" },
  { id: "r54", name: "East West Brewing Co.", address: "Phạm Văn Thuận", latitude: 10.9540, longitude: 106.8400, category: "Bia Craft", image: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7" },
  
  // 27. Salad
  { id: "r55", name: "Salad Cá Hồi The Leaf", address: "Võ Thị Sáu", latitude: 10.9515, longitude: 106.8360, category: "Salad", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe" },
  { id: "r56", name: "Green Box", address: "Phan Trung", latitude: 10.9585, longitude: 106.8450, category: "Salad", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe" },
];