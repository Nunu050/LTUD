# Implementation Plan - Redesign & Fix Diary + Share Post

This plan outlines the systematic redesign and bug fixes for the **Diary + Share Post** feature in the React Native **FoodMood** application, transforming it from a basic placeholder UI into a high-end social food check-in experience.

---

## User Review Required

> [!IMPORTANT]
> - **Unified Coordinates System**: Tapping "Navigate" or the location badge will open Google Maps utilizing the exact `latitude,longitude` coordinates stored in the database.
> - **Premium Image Fallbacks**: If the user does not take/upload a photo, the app will automatically lookup a matching high-quality category food image from the `allFoods` constant, or fall back to the restaurant's image. No more empty or broken images.
> - **High-End Dark UI**: We are replacing all pink debug-style blocks in the Diary feed with rounded card structures, translucent badges, and elegant quote blocks matching the primary dark color palette (`#111827`).

---

## Open Questions

None. The specifications are highly precise, and the unified data constants are fully available.

---

## Proposed Changes

### 1. Restaurant Detail Screen (Review Submission)

We will modify the review submission logic so that every logged memory captures accurate coordinates and the exact category images right at the time of creation.

#### [MODIFY] [RestaurantDetailScreen.tsx](file:///c:/foodmood/src/screens/restaurant/RestaurantDetailScreen.tsx)
- Import `allFoods` from `../../constants/moods` to perform an automatic look-up of the food category image.
- Inside `saveReview()`, if no custom photo was captured, automatically assign `imageUrl` based on:
  1. The category food image from `allFoods` (matching `food.name`).
  2. The restaurant cover image (`restaurant.image`) if no category match is found.
- Explicitly save the direct Google Maps coordinate-based search link in the Firestore review document under `mapsUrl` (`https://www.google.com/maps/search/?api=1&query=${restaurant.latitude},${restaurant.longitude}`).
- Save `restaurantName: restaurant.name` and explicitly duplicate the coordinates to ensure complete data integrity.

---

### 2. Diary Feed Screen & Visual Overhaul

We will rebuild the Diary layout, feed list, card items, sharing payload, and coordinate maps links.

#### [MODIFY] [DiaryScreen.tsx](file:///c:/foodmood/src/screens/diary/DiaryScreen.tsx)
- **Safe Date Formatter**: Implement a helper function `formatDate(createdAt)` to parse Firestore Timestamps or generic date objects into a highly readable check-in timestamp (`🕒 DD/MM/YYYY hh:mm AM/PM`).
- **Robust Fallback Images**: Add a helper `getFallbackImage(foodName, restaurantName)` to dynamically resolve high-quality visual thumbnails for older database records without custom photos.
- **Card UI Redesign**:
  - Rebuild the `renderItem` card into a premium card container:
    - **Hero Image Section**: Large image banner spanning the top with proper rounded corners and cover scaling.
    - **Overlay Badges**: Beautiful glass-morphic absolute positioning tags for both the **Mood Badge** (e.g. `😊 Happy`) and **Category Badge** overlayed directly on the hero image.
    - **Body Content**: 
      - Large white food title.
      - **Check-in Location**: A red accent `📍 restaurantName` badge.
      - **Check-in Timestamp**: A grey `🕒 date/time` label.
      - **Rating Row**: Yellow star repeaters (`⭐⭐⭐⭐⭐`) side-by-side with a pastel green "Loved it" badge if favorited.
      - **Review Text**: Elegant italic quote block (`"Awesome!"`) with a left border using `COLORS.primary`.
    - **Action Row Buttons**: Modern pill-shaped horizontal action buttons for **Share Post ↗️**, **Navigate 🗺️**, and **Delete 🗑️** with colored glass backgrounds and sleek icons.
- **Google Maps Integration**:
  - Update `openNavigation` to use exact `latitude,longitude` coordinates query (`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`) rather than text name to ensure precision.
- **Share Post Details**:
  - Format the textual message payload in `shareReview` to include:
    - 🍜 Food category/emoji
    - 📍 Restaurant name
    - 🕒 Date & time
    - ⭐ Rating stars
    - 😊 Mood description
    - 💬 Review text
    - 🗺️ Precise Google Maps coordinate-based URL.

---

## Verification Plan

### Automated Tests
- Build and compile validation: Run typescript compile/pack checks to ensure there are no syntax or type errors in the modified screens.

### Manual Verification
- **Create Check-in Post**: Navigating from a restaurant map marker to "Details", selecting rating, writing a review, and saving it.
- **Verify Default Image**: Check the Diary tab to ensure a beautiful food category hero image appears if no custom photo is taken.
- **Verify Coordinate Coordinates mapping**: Click "Navigate 🗺️" on the diary card and verify it opens Google Maps centered exactly on the coordinates.
- **Verify Social Sharing**: Tap "Share ↗️" on a post, verify the output matches a modern recommendation post with full coordinates and check-in details.
- **Delete Post**: Tap "Delete 🗑️" and ensure the post is removed instantly.
