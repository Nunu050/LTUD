import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
  Easing,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants/colors";
import { allFoods } from "../../constants/moods";
import { Food } from "../../types";

export default function IDontKnowScreen() {
  const navigation: any = useNavigation();
  const [mode, setMode] = useState<"time" | "wheel">("time");

  // Mode 1: Time-based Recommendations
  const [timeCategory, setTimeCategory] = useState("");
  const [timeFoods, setTimeFoods] = useState<Food[]>([]);

  useEffect(() => {
    const hour = new Date().getHours();
    let timeLabel = "";
    let keywords: string[] = [];

    if (hour >= 5 && hour < 10) {
      timeLabel = "Morning (Sáng) 🌅";
      keywords = ["Phở", "Bún Bò", "Cháo", "Coffee"];
    } else if (hour >= 10 && hour < 14) {
      timeLabel = "Lunch (Trưa) ☀️";
      keywords = ["Healthy bowl", "Sushi", "Pasta", "Gà Rán"];
    } else if (hour >= 14 && hour < 17) {
      timeLabel = "Afternoon (Xế chiều) ☕";
      keywords = ["Trà Sữa", "Matcha", "Tea", "Chocolate", "Ăn Vặt"];
    } else {
      timeLabel = "Night (Tối) 🌙";
      keywords = ["BBQ", "Lẩu", "Ốc Đêm", "Pizza", "Steak", "Xiên Que", "Buffet"];
    }

    setTimeCategory(timeLabel);
    
    // Lọc thức ăn theo time (dựa vào từ khóa trong category hoặc name)
    const suggested = allFoods.filter(f => 
      keywords.some(k => f.category.toLowerCase().includes(k.toLowerCase()) || f.name.toLowerCase().includes(k.toLowerCase()))
    );

    // Shuffle and pick 6
    const shuffled = [...suggested].sort(() => 0.5 - Math.random());
    // Nếu filter ra ít hơn 6, mượn tạm đồ ăn khác bù vào cho đủ (lọc trùng)
    let finalFoods = shuffled.slice(0, 8);
    if (finalFoods.length < 6) {
      const remaining = allFoods.filter(f => !finalFoods.some(s => s.id === f.id));
      finalFoods = [...finalFoods, ...remaining].slice(0, 6);
    }
    setTimeFoods(finalFoods);
  }, []);

  // Mode 2: Food Wheel
  const [wheelFoods, setWheelFoods] = useState<string[]>(["Lẩu Thái", "BBQ", "Sushi", "Ốc Đêm", "Bún Bò", "Gà Rán", "Pizza", "Trà Sữa"]);
  const [newFood, setNewFood] = useState("");
  const spinValue = useRef(new Animated.Value(0)).current;
  const [spinning, setSpinning] = useState(false);
  const [selectedWheelFood, setSelectedWheelFood] = useState("");

  const addWheelFood = () => {
    if (newFood.trim() && wheelFoods.length < 12) {
      setWheelFoods([...wheelFoods, newFood.trim()]);
      setNewFood("");
      setSelectedWheelFood(""); // Reset result
    }
  };

  const removeWheelFood = (index: number) => {
    const updated = [...wheelFoods];
    updated.splice(index, 1);
    setWheelFoods(updated);
  };

  const spinWheel = () => {
    if (wheelFoods.length < 2) return;
    setSpinning(true);
    setSelectedWheelFood("");
    
    // Reset spin
    spinValue.setValue(0);
    
    // Tính toán góc dừng ngẫu nhiên
    const randomExtraSpins = Math.floor(Math.random() * 5) + 5; // 5 to 9 spins
    const randomIndex = Math.floor(Math.random() * wheelFoods.length);
    const degreesPerItem = 360 / wheelFoods.length;
    
    // Logic vòng quay: Để item rơi vào con trỏ ở trên cùng (0 độ)
    const targetDegree = (randomExtraSpins * 360) + (360 - (randomIndex * degreesPerItem));

    Animated.timing(spinValue, {
      toValue: targetDegree,
      duration: 4000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setSpinning(false);
      setSelectedWheelFood(wheelFoods[randomIndex]);
    });
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>I Don't Know 🎡</Text>
      
      {/* Mode Switcher */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, mode === "time" && styles.activeTab]}
          onPress={() => setMode("time")}
        >
          <Text style={[styles.tabText, mode === "time" && styles.activeTabText]}>Time-based</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, mode === "wheel" && styles.activeTab]}
          onPress={() => setMode("wheel")}
        >
          <Text style={[styles.tabText, mode === "wheel" && styles.activeTabText]}>Food Wheel</Text>
        </TouchableOpacity>
      </View>

      {/* MODE 1: TIME-BASED */}
      {mode === "time" && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>It's {timeCategory}</Text>
            <Text style={styles.infoDesc}>Here are some realistic comfort foods perfectly matched for this time of the day in Vietnam!</Text>
          </View>

          {timeFoods.map((food) => (
            <TouchableOpacity
              key={food.id}
              style={styles.foodCard}
              onPress={() =>
                navigation.navigate("Main", {
                  screen: "Map",
                  params: {
                    selectedFood: food.category,
                    selectedMood: "I Don't Know",
                  },
                })
              }
            >
              <Image source={{ uri: food.imageUrl }} style={styles.foodImage} />
              <View style={styles.foodInfo}>
                <Text style={styles.foodName}>{food.name} {food.emoji}</Text>
                <Text style={styles.foodDesc}>{food.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <View style={{height: 100}} />
        </ScrollView>
      )}

      {/* MODE 2: FOOD WHEEL */}
      {mode === "wheel" && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.wheelSubtitle}>Can't decide with your partner? Spin the wheel to let fate decide!</Text>
          
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Add food (e.g. Bún Bò)..."
              placeholderTextColor="#888"
              value={newFood}
              onChangeText={setNewFood}
              maxLength={20}
            />
            <TouchableOpacity style={styles.addButton} onPress={addWheelFood}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
          
          {/* Tags */}
          <View style={styles.tagContainer}>
            {wheelFoods.map((item, index) => (
              <TouchableOpacity key={index} style={styles.tag} onPress={() => removeWheelFood(index)}>
                <Text style={styles.tagText}>{item} ✕</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Wheel Display */}
          <View style={styles.wheelContainer}>
            <View style={styles.pointer} />
            <Animated.View style={[styles.wheel, { transform: [{ rotate: spin }] }]}>
              {wheelFoods.map((item, index) => {
                const angle = (index * 360) / wheelFoods.length;
                return (
                  <View 
                    key={index} 
                    style={[
                      styles.wheelSegment,
                      { transform: [{ rotate: `${angle}deg` }] }
                    ]}
                  >
                    <Text style={styles.segmentText}>{item}</Text>
                  </View>
                );
              })}
            </Animated.View>
          </View>

          {/* Spin Button */}
          <TouchableOpacity 
            style={[styles.spinButton, spinning && { opacity: 0.5 }]} 
            onPress={spinWheel}
            disabled={spinning}
          >
            <Text style={styles.spinButtonText}>{spinning ? "Spinning..." : "SPIN 🎡"}</Text>
          </TouchableOpacity>

          {/* Result Card */}
          {selectedWheelFood !== "" && (
            <View style={styles.resultBox}>
              <Text style={styles.resultLabel}>Fate has chosen:</Text>
              <Text style={styles.resultText}>🎉 {selectedWheelFood} 🎉</Text>
              <TouchableOpacity
                style={styles.findButton}
                onPress={() =>
                  navigation.navigate("Main", {
                    screen: "Map",
                    params: {
                      selectedFood: selectedWheelFood,
                      selectedMood: "I Don't Know",
                    },
                  })
                }
              >
                <Text style={styles.findButtonText}>Find Nearby 📍</Text>
              </TouchableOpacity>
            </View>
          )}
          
          <View style={{height: 100}} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    color: COLORS.primary,
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: 20,
    marginBottom: 25,
    padding: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 15,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    color: "#888",
    fontWeight: "bold",
    fontSize: 16,
  },
  activeTabText: {
    color: "white",
  },
  infoBox: {
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#a78bfa",
  },
  infoTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  infoDesc: {
    color: "#cbd5e1",
    fontSize: 16,
    lineHeight: 24,
  },
  foodCard: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: 20,
    marginBottom: 15,
    overflow: "hidden",
    alignItems: "center",
  },
  foodImage: {
    width: 100,
    height: 100,
  },
  foodInfo: {
    flex: 1,
    padding: 15,
  },
  foodName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  foodDesc: {
    color: "#aaa",
    marginTop: 5,
    fontSize: 14,
  },
  wheelSubtitle: {
    color: "#cbd5e1",
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.card,
    color: "white",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    fontSize: 16,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#10b981",
    paddingHorizontal: 25,
    justifyContent: "center",
    borderRadius: 15,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 30,
  },
  tag: {
    backgroundColor: "#334155",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  tagText: {
    color: "white",
    fontSize: 14,
  },
  wheelContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 280,
    marginBottom: 20,
  },
  pointer: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 25,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#ef4444",
    position: "absolute",
    top: -10,
    zIndex: 10,
    transform: [{ rotate: "180deg" }],
  },
  wheel: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "#1e293b",
    borderWidth: 4,
    borderColor: COLORS.primary,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  wheelSegment: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 15,
  },
  segmentText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  spinButton: {
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  spinButtonText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  resultBox: {
    backgroundColor: "#10b981",
    padding: 25,
    borderRadius: 20,
    alignItems: "center",
  },
  resultLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 16,
    marginBottom: 5,
  },
  resultText: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  findButton: {
    backgroundColor: "white",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 15,
  },
  findButtonText: {
    color: "#10b981",
    fontWeight: "bold",
    fontSize: 18,
  },
});
