
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../constants/colors";
import { MOODS, allFoods } from "../../constants/moods";
import { Food } from "../../types";

export default function HomeScreen() {
  const navigation: any = useNavigation();
  const [selectedMood, setSelectedMood] = useState(MOODS[0]);
  const [randomFoods, setRandomFoods] = useState<Food[]>([]);

  // Generator for "I Don't Know" mood
  useEffect(() => {
    if (selectedMood.title === "I Don't Know") {
      const shuffled = [...allFoods].sort(() => 0.5 - Math.random());
      setRandomFoods(shuffled.slice(0, 8)); // 8 random foods
    }
  }, [selectedMood]);

  const currentFoods =
    selectedMood.title === "I Don't Know" ? randomFoods : selectedMood.foods;

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.logo}>FoodMood 🍽️</Text>
      <Text style={styles.subtitle}>Comfort food for every emotion</Text>

      {/* MOODS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.moodContainer}
      >
        {MOODS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.moodCard,
              selectedMood.title === item.title && {
                borderColor: item.color,
                borderWidth: 2,
              },
            ]}
            onPress={() => {
              if (item.title === "I Don't Know") {
                navigation.navigate("IDontKnow");
              } else {
                setSelectedMood(item);
              }
            }}
          >
            <Text style={styles.moodEmoji}>{item.emoji}</Text>
            <Text style={styles.moodText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* PSYCHOLOGY BOX */}
      <View style={[styles.psychologyBox, { borderLeftColor: selectedMood.color }]}>
        <Text style={styles.psychologyTitle}>Why these foods?</Text>
        <Text style={styles.psychologyText}>{selectedMood.psychology}</Text>
      </View>

      <Text style={styles.sectionTitle}>Recommended for you 🍴</Text>

      {/* FOODS */}
      {currentFoods.map((food) => (
        <TouchableOpacity
          key={food.id}
          style={styles.foodCard}
          onPress={() =>
            navigation.navigate("Map", {
              selectedFood: food.category,
              selectedMood: selectedMood.title,
            })
          }
        >
          <Image
            source={{ uri: food.imageUrl }}
            style={styles.foodImage}
          />
          <View style={styles.foodInfo}>
            <View style={styles.foodHeader}>
              <Text style={styles.foodName}>
                {food.name} {food.emoji}
              </Text>
              <Text style={styles.rating}>⭐ 4.8</Text>
            </View>
            <Text style={styles.foodDesc}>{food.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  logo: {
    color: COLORS.primary,
    fontSize: 36,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#aaa",
    fontSize: 16,
    marginTop: 10,
    marginBottom: 25,
  },
  moodContainer: {
    marginBottom: 20,
  },
  moodCard: {
    backgroundColor: COLORS.card,
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderRadius: 20,
    marginRight: 15,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  moodEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  moodText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  psychologyBox: {
    backgroundColor: COLORS.card,
    padding: 18,
    borderRadius: 16,
    borderLeftWidth: 4,
    marginBottom: 25,
  },
  psychologyTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  psychologyText: {
    color: "#cbd5e1",
    fontSize: 15,
    lineHeight: 22,
  },
  sectionTitle: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  foodCard: {
    backgroundColor: COLORS.card,
    borderRadius: 25,
    overflow: "hidden",
    marginBottom: 25,
  },
  foodImage: {
    width: "100%",
    height: 220,
  },
  foodInfo: {
    padding: 18,
  },
  foodHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  foodName: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  foodDesc: {
    color: "#bbb",
    marginTop: 8,
    fontSize: 16,
  },
  rating: {
    color: "#FFD700",
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomPadding: {
    height: 100,
  },
});