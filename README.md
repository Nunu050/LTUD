# 🍽️ FoodMood — Emotional Food Recommendation App

**FoodMood** là một ứng dụng di động độc đáo giúp gợi ý món ăn dựa trên cảm xúc và tâm lý người dùng. Thay vì hỏi "Bạn muốn ăn gì?", ứng dụng hỏi "Hôm nay bạn cảm thấy thế nào?" để đưa ra những gợi ý "comfort food" (thức ăn chữa lành) mang đậm văn hóa ẩm thực Việt Nam.

Ứng dụng là sự kết hợp hoàn hảo giữa ẩm thực, tâm lý học và trải nghiệm xã hội (Social Diary).

---

## 🌟 Các tính năng nổi bật (Core Features)

- **🎭 Mood-Based Recommendation:** Gợi ý thức ăn dựa trên 6 cung bậc cảm xúc (Happy, Sad, Stressed, Chill, Romantic, I Don't Know).
- **🎡 I Don't Know Wheel:** Tính năng vòng quay thức ăn ngẫu nhiên siêu mượt mà dành cho người dùng mắc "hội chứng không biết ăn gì".
- **🗺️ Interactive Map:** Tích hợp bản đồ tìm kiếm quán ăn thật xung quanh khu vực Biên Hòa / Đồng Nai với tọa độ chính xác, hỗ trợ chuyển hướng sang Google Maps.
- **📔 Emotional Food Diary:** Viết nhật ký ăn uống cảm xúc, chia sẻ kỷ niệm cực "cozy" với bạn bè kèm theo hình ảnh, đánh giá và vị trí.

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

- **Frontend:** React Native, Expo, TypeScript.
- **Backend/Database:** Firebase (Firestore, Cloud Storage, Authentication).
- **Navigation:** React Navigation.
- **Maps:** `react-native-maps`, `expo-location`.

---

## 🚀 Hướng dẫn Cài đặt & Chạy dự án (Installation & Setup)

### 1. Yêu cầu hệ thống (Prerequisites)
- Đã cài đặt [Node.js](https://nodejs.org/) (Khuyên dùng bản LTS).
- Đã cài đặt `npm` hoặc `yarn`.
- Tải ứng dụng **Expo Go** trên điện thoại di động (iOS / Android) để test app.

### 2. Cài đặt (Installation)
Mở terminal/command prompt và thực hiện các bước sau:

```bash
# Clone source code về máy (hoặc giải nén thư mục project)
git clone <đường-dẫn-repo-của-bạn>
cd foodmood

# Cài đặt các thư viện phụ thuộc
npm install
# hoặc nếu dùng yarn
yarn install
```

### 3. Cấu hình Firebase (Firebase Setup)
Dự án sử dụng Firebase làm backend. Bạn cần đảm bảo cấu hình Firebase đã được thiết lập đúng:
- Mở file `src/firebase/config.ts`
- Cập nhật thông tin `firebaseConfig` bằng thông tin từ Project Firebase của riêng bạn (API Key, Project ID, Database URL...).

### 4. Chạy ứng dụng (Running the App)

Khởi động Expo server bằng một trong các lệnh sau:

```bash
# Khởi động bình thường
npx expo start

# Khởi động và xóa cache (sử dụng khi ứng dụng bị lỗi cache)
npx expo start -c
```

- Màn hình terminal sẽ hiện ra một mã **QR Code**.
- Dùng camera (trên iOS) hoặc quét qua app **Expo Go** (trên Android) để mở ứng dụng ngay trên điện thoại thật của bạn.
- Nhấn phím `a` trên terminal để mở máy ảo Android (cần cài đặt Android Studio).
- Nhấn phím `i` trên terminal để mở máy ảo iOS (cần macOS và Xcode).
- Nhấn phím `w` trên terminal để chạy phiên bản Web trực tiếp trên trình duyệt.

---

## 📁 Cấu trúc thư mục chính

```text
foodmood/
├── src/
│   ├── components/       # Các UI Component dùng chung (MoodCard, FoodCard, Tabs)
│   ├── constants/        # Các hằng số cấu hình (colors, moods, danh sách đồ ăn)
│   ├── data/             # CSDL Local (Ví dụ: danh sách nhà hàng có tọa độ thật)
│   ├── firebase/         # Khởi tạo và cấu hình Firebase
│   ├── navigation/       # Cấu hình chuyển màn hình (Stack, BottomTabs)
│   ├── screens/          # Các màn hình (Home, Map, Diary, IDontKnow, RestaurantDetail, Auth)
│   ├── types/            # Định nghĩa các Interface TypeScript
│   └── ...
├── App.tsx               # Entry point của ứng dụng
└── app.json              # Cấu hình Expo Project
```

---



*Đồ án mang tính chất demo và sử dụng dữ liệu quán ăn thật tại khu vực Biên Hòa nhằm đảm bảo tính thực tế. Chúc bạn có trải nghiệm tuyệt vời cùng FoodMood!* 💖
