// screens/IssueListScreen.js

import React, { useMemo } from "react";
import {
  Text,
  StyleSheet,
  FlatList,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { categories } from "../data/itIssues";
import ScreenBackground from "../components/ScreenBackground";
import PressableScale from "../components/PressableScale";
import { ArrowLeft, Monitor } from "lucide-react-native";

export default function IssueListScreen({ route, navigation }) {
  const { categoryId, categoryName } = route.params || {};

  const category = useMemo(
    () => categories.find((c) => c.id === categoryId),
    [categoryId]
  );

  const issues = category?.issues || [];

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
        <View style={styles.container}>
          {/* Back + Title */}
          <View style={styles.headerRow}>
            <PressableScale
              style={styles.backButton}
              scaleTo={0.9}
              onPress={() => navigation.goBack()}
            >
              <View style={styles.backIconWrap}>
                <ArrowLeft size={18} color="#ffcc66" />
              </View>
            </PressableScale>

            <View style={styles.headerTextWrap}>
              <Text style={styles.heading}>
                {categoryName || "Issues"}
              </Text>
              <Text style={styles.subheading}>
                Select an issue to view quick steps.
              </Text>
            </View>
          </View>

          {/* Issues list */}
          <FlatList
            data={issues}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <PressableScale
                style={styles.card}
                onPress={() =>
                  navigation.navigate("IssueDetail", {
                    categoryId,
                    issueId: item.id,
                    issueTitle: item.title,
                  })
                }
              >
                <View style={styles.cardRow}>
                  <Monitor size={18} color="#ffcc66" />
                  <View style={styles.cardTextWrap}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    {item.symptoms?.[0] && (
                      <Text
                        style={styles.cardHint}
                        numberOfLines={1}
                      >
                        {item.symptoms[0]}
                      </Text>
                    )}
                  </View>
                </View>
              </PressableScale>
            )}
            ListEmptyComponent={
              <Text style={styles.empty}>
                No issues defined yet for this area.
              </Text>
            }
          />
        </View>
      </SafeAreaView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,204,102,0.6)",
    backgroundColor: "rgba(0,0,0,0.75)",
    marginRight: 8,
  },
  backIconWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTextWrap: {
    flexShrink: 1,
  },
  heading: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
  subheading: {
    color: "#ccc",
    fontSize: 11,
    marginTop: 2,
  },
  listContent: {
    paddingBottom: 10,
  },
  card: {
    padding: 10,
    backgroundColor: "rgba(10,10,10,0.9)",
    borderRadius: 10,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardTextWrap: {
    flexShrink: 1,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  cardHint: {
    color: "#aaa",
    fontSize: 11,
    marginTop: 1,
  },
  empty: {
    color: "#ddd",
    fontSize: 12,
    marginTop: 16,
    textAlign: "center",
  },
});