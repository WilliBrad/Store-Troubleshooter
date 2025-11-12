// screens/IssueDetailScreen.js

import React, { useMemo } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { categories } from "../data/itIssues";
import ScreenBackground from "../components/ScreenBackground";
import PressableScale from "../components/PressableScale";
import { ArrowLeft, AlertTriangle } from "lucide-react-native";

export default function IssueDetailScreen({ route, navigation }) {
  const { categoryId, issueId, issueTitle } = route.params || {};

  const issue = useMemo(() => {
    const category = categories.find((c) => c.id === categoryId);
    return category?.issues?.find((i) => i.id === issueId);
  }, [categoryId, issueId]);

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
                {issue?.title || issueTitle || "Issue Steps"}
              </Text>
              <Text style={styles.subheading}>
                Follow these steps in order before escalating.
              </Text>
            </View>
          </View>

          {!issue ? (
            <Text style={styles.empty}>Issue details not found.</Text>
          ) : (
            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.scrollContent}
            >
              {/* Symptoms */}
              {issue.symptoms?.length > 0 && (
                <View style={styles.block}>
                  <Text style={styles.blockLabel}>You might see:</Text>
                  {issue.symptoms.map((s, idx) => (
                    <Text key={idx} style={styles.bulletText}>
                      • {s}
                    </Text>
                  ))}
                </View>
              )}

              {/* Steps */}
              {issue.steps?.length > 0 && (
                <View style={styles.block}>
                  <Text style={styles.blockLabel}>Step-by-step:</Text>
                  <FlatList
                    data={issue.steps}
                    keyExtractor={(_, i) => String(i)}
                    scrollEnabled={false}
                    renderItem={({ item, index }) => (
                      <View style={styles.stepRow}>
                        <View style={styles.stepBadge}>
                          <Text style={styles.stepBadgeText}>
                            {index + 1}
                          </Text>
                        </View>
                        <Text style={styles.stepText}>{item}</Text>
                      </View>
                    )}
                  />
                </View>
              )}

              {/* Escalation */}
              {issue.escalation && (
                <View style={styles.block}>
                  <View style={styles.escalationHeader}>
                    <AlertTriangle size={15} color="#ffcc66" />
                    <Text style={styles.blockLabel}>When to escalate:</Text>
                  </View>
                  <Text style={styles.escalationText}>
                    {issue.escalation}
                  </Text>
                </View>
              )}
            </ScrollView>
          )}
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
    marginBottom: 6,
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 18,
  },
  block: {
    padding: 10,
    backgroundColor: "rgba(8,8,8,0.92)",
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  blockLabel: {
    color: "#ffcc66",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 4,
  },
  bulletText: {
    color: "#eee",
    fontSize: 12,
    marginBottom: 2,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  stepBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#ffcc66",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
    marginTop: 2,
  },
  stepBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#000",
  },
  stepText: {
    flex: 1,
    color: "#fff",
    fontSize: 12,
  },
  escalationHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 2,
  },
  escalationText: {
    color: "#f6e3b4",
    fontSize: 12,
  },
  empty: {
    color: "#ddd",
    fontSize: 12,
    marginTop: 20,
    textAlign: "center",
  },
});