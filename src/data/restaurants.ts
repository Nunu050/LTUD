import { Restaurant } from "../types";

export const restaurants: Restaurant[] = [
  // Happy
  { id: "1", name: "Gogi House BBQ", address: "Vincom Biên Hòa", latitude: 10.9543, longitude: 106.8428, category: "Thịt Nướng BBQ", image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd" },
  { id: "2", name: "KFC Vincom", address: "Vincom Biên Hòa", latitude: 10.9544, longitude: 106.8424, category: "Gà Rán", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" },
  { id: "3", name: "Gong Cha", address: "Vincom Biên Hòa", latitude: 10.9540, longitude: 106.8426, category: "Trà Sữa", image: "https://images.unsplash.com/photo-1558857563-b371033873b8" },
  { id: "4", name: "Kichi Kichi Lẩu Băng Chuyền", address: "Vincom Biên Hòa", latitude: 10.9545, longitude: 106.8425, category: "Lẩu Thái", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1" },
  { id: "5", name: "Ốc Mập Biên Hòa", address: "Đường 5 nối dài, Biên Hòa", latitude: 10.9601, longitude: 106.8395, category: "Ốc Đêm", image: "https://images.unsplash.com/photo-1559058789-672da06263d8" },
  { id: "6", name: "Bún Đậu Cô Chanh", address: "Võ Thị Sáu, Biên Hòa", latitude: 10.9530, longitude: 106.8375, category: "Bún Đậu Mắm Tôm", image: "https://images.unsplash.com/photo-1596645371131-0361fb239c08" },
  { id: "7", name: "Kem Baskin Robbins", address: "Vincom Biên Hòa", latitude: 10.9546, longitude: 106.8431, category: "Kem", image: "https://images.unsplash.com/photo-1570197781417-0c7f7634f19b" },

  // Sad
  { id: "8", name: "Phở Gà Hữu Tín", address: "Võ Thị Sáu, Biên Hòa", latitude: 10.9510, longitude: 106.8350, category: "Phở Gà", image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cb438" },
  { id: "9", name: "Cháo Lòng Bé Ba", address: "Nguyễn Ái Quốc, Biên Hòa", latitude: 10.9632, longitude: 106.8501, category: "Cháo Lòng", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19" },
  { id: "10", name: "Bánh Mì Đồng Nai", address: "Phan Đình Phùng, Biên Hòa", latitude: 10.9501, longitude: 106.8288, category: "Bánh Mì", image: "https://images.unsplash.com/photo-1612203985729-70726954388c" },
  { id: "11", name: "The Coffee House", address: "Võ Thị Sáu, Biên Hòa", latitude: 10.9525, longitude: 106.8385, category: "Trà Đào", image: "https://images.unsplash.com/photo-1556881286-fc6915169721" },
  { id: "12", name: "Chè Thái Ý Phương (Chi nhánh)", address: "Phạm Văn Thuận", latitude: 10.9560, longitude: 106.8450, category: "Chè Thái", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb" },
  { id: "13", name: "Bánh Tráng Nướng Cô Bông", address: "Nguyễn Ái Quốc", latitude: 10.9590, longitude: 106.8390, category: "Bánh Tráng Nướng", image: "https://images.unsplash.com/photo-1627308595229-7830f5c9c66e" },
  { id: "14", name: "Soup Cua Chợ Đêm", address: "Khu Chợ Đêm Biên Hùng", latitude: 10.9520, longitude: 106.8300, category: "Soup Cua", image: "https://images.unsplash.com/photo-1547592180-85f173990554" },

  // Stressed
  { id: "15", name: "Mì Cay Sasin", address: "Võ Thị Sáu, Biên Hòa", latitude: 10.9535, longitude: 106.8380, category: "Mì Cay", image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841" },
  { id: "16", name: "Phúc Long Coffee & Tea", address: "Vincom Biên Hòa", latitude: 10.9541, longitude: 106.8426, category: "Trà Đen Macchiato", image: "https://images.unsplash.com/photo-1557142046-c704a3adf364" },
  { id: "17", name: "Don Chicken", address: "Vincom Biên Hòa", latitude: 10.9547, longitude: 106.8422, category: "Gà Cay Phô Mai", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" },
  { id: "18", name: "Tous Les Jours", address: "Vincom Biên Hòa", latitude: 10.9542, longitude: 106.8427, category: "Bánh Tiramisu", image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d" },
  { id: "19", name: "Sữa Tươi Trân Châu Hạ Long", address: "Phan Trung, Biên Hòa", latitude: 10.9585, longitude: 106.8465, category: "Sữa Tươi Trân Châu", image: "https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd" },
  { id: "20", name: "Tiệm Trà Cỏ Tự Nhiên", address: "Đường D9", latitude: 10.9610, longitude: 106.8350, category: "Trà Gừng Mật Ong", image: "https://images.unsplash.com/photo-1576092762791-dd9e2220abd4" },

  // Chill
  { id: "21", name: "Highlands Coffee", address: "Vincom Biên Hòa", latitude: 10.9542, longitude: 106.8427, category: "Cà Phê Sữa Đá", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" },
  { id: "22", name: "Bia Craft C-Brew", address: "Đường số 7, Biên Hòa", latitude: 10.9515, longitude: 106.8410, category: "Bia Craft", image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13" },
  { id: "23", name: "Mực Khô Nướng Ga Biên Hòa", address: "Gần Ga Biên Hòa", latitude: 10.9450, longitude: 106.8285, category: "Mực Khô Nướng", image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6" },
  { id: "24", name: "Bánh Tráng Trộn Cổng 2", address: "Khu cổng 2 Biên Hòa", latitude: 10.9550, longitude: 106.8370, category: "Bánh Tráng Trộn", image: "https://images.unsplash.com/photo-1626202456456-e9185a815779" },
  { id: "25", name: "Cơm Tấm Cây Điệp", address: "Cách Mạng Tháng 8", latitude: 10.9495, longitude: 106.8250, category: "Cơm Tấm Sườn Bì", image: "https://images.unsplash.com/photo-1626804475297-41609ea064eb" },
  { id: "26", name: "Sữa Chua Trân Châu Hoàng Gia", address: "Võ Thị Sáu", latitude: 10.9545, longitude: 106.8390, category: "Sữa Chua Trân Châu", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b" },

  // Romantic
  { id: "27", name: "El Gaucho Steakhouse (Demo)", address: "Trung tâm Biên Hòa", latitude: 10.9555, longitude: 106.8440, category: "Bít Tết (Steak)", image: "https://images.unsplash.com/photo-1544025162-d76694265947" },
  { id: "28", name: "Hầm Rượu Vang Đệ Nhất", address: "Đường D7", latitude: 10.9605, longitude: 106.8385, category: "Rượu Vang", image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb" },
  { id: "29", name: "Sushi Kei", address: "Vincom Biên Hòa", latitude: 10.9546, longitude: 106.8429, category: "Sushi", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c" },
  { id: "30", name: "Pizza 4P's (Demo)", address: "Biên Hòa City", latitude: 10.9570, longitude: 106.8435, category: "Mì Ý (Pasta)", image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601" },
  { id: "31", name: "Nhà Hàng Cọ Dầu", address: "KDL Bửu Long", latitude: 10.9680, longitude: 106.8150, category: "Salad Cá Hồi", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c" },
  { id: "32", name: "Đồng Tiến Bakery", address: "Nguyễn Ái Quốc", latitude: 10.9615, longitude: 106.8415, category: "Bánh Kem Dâu", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587" },
];