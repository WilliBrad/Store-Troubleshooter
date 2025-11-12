// screens/IssueListScreen.js
import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  View,
} from "react-native";
import { categories } from "../data/itIssues";
import ScreenBackground from "../components/ScreenBackground";
import {
  Monitor,
  Printer,
  Wifi,
  Headphones,
  TabletSmartphone,
  Store,
  Cpu,
} from "lucide-react-native";

const categoryIcons = {
  pos: TabletSmartphone,
  kiosk: Store,
  printer: Printer,
  headset: Headphones,
  network: Wifi,
  monitors: Monitor,
  kvs: Cpu,
};

export default function IssueListScreen({ route, navigation }) {
  const { categoryId, categoryName } = route.params;
  const category = categories.find((c) => c.id === categoryId);
  const issues = category ? category.issues : [];
  const Icon = categoryIcons[categoryId] || Monitor;

  return (
    <ScreenBackground>
      <View style={styles.headerRow}>
        <Icon size={22} color="#ffcc66" />
        <Text style={styles.title}>{categoryName}</Text>
      </View>

      {(!category || issues.length === 0) ? (
        <Text style={styles.empty}>No issues added yet for this area.</Text>
      ) : (
        <FlatList
          data={issues}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate("IssueDetail", {
                  categoryId,
                  issueId: item.id,
                  issueTitle: item.title,
                })
              }
            >
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text
                numberOfLines={2}
                style={styles.cardSubtitle}
              >
                {(item.symptoms && item.symptoms[0]) ||
                  "View troubleshooting steps"}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
  },
  card: {
    padding: 12,
    backgroundColor: "rgba(30,30,30,0.95)",
    borderRadius: 10,
    marginBottom: 8,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  cardSubtitle: {
    color: "#aaa",
    fontSize: 12,
  },
  empty: {
    color: "#ddd",
    fontSize: 14,
  },
});
