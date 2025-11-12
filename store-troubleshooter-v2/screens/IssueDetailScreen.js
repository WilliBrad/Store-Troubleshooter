// screens/IssueDetailScreen.js

import React from "react";
import { Text, StyleSheet, FlatList, View } from "react-native";
import { categories } from "../data/itIssues";
import ScreenBackground from "../components/ScreenBackground";

export default function IssueDetailScreen({ route }) {
  const { categoryId, issueId, issueTitle } = route.params;

  const category = categories.find((c) => c.id === categoryId);
  const issue = category?.issues.find((i) => i.id === issueId);

  if (!issue) {
    return (
      <ScreenBackground>
        <Text style={styles.error}>Issue not found.</Text>
      </ScreenBackground>
    );
  }

  return (
    <ScreenBackground>
      <Text style={styles.title}>{issue.title || issueTitle}</Text>

      {/* What you'll see */}
      {issue.symptoms?.length > 0 && (
        <View style={styles.block}>
          <Text style={styles.sectionTitle}>What you'll see</Text>
          {issue.symptoms.map((symptom, index) => (
            <Text key={index} style={styles.bullet}>
              • {symptom}
            </Text>
          ))}
        </View>
      )}

      {/* Try this */}
      {issue.steps?.length > 0 && (
        <View style={styles.block}>
          <Text style={styles.sectionTitle}>Try this</Text>
          <FlatList
            data={issue.steps}
            keyExtractor={(_, index) => String(index)}
            renderItem={({ item, index }) => (
              <Text style={styles.step}>
                {index + 1}. {item}
              </Text>
            )}
          />
        </View>
      )}

      {/* If that doesn't fix it */}
      {issue.escalation && (
        <View style={[styles.block, styles.escalationBlock]}>
          <Text style={styles.sectionTitle}>If that doesn’t fix it</Text>
          <Text style={styles.escalationText}>{issue.escalation}</Text>
        </View>
      )}
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 12,
    color: "#fff",
  },
  block: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffcc66",
    marginBottom: 4,
  },
  bullet: {
    color: "#eee",
    fontSize: 14,
    marginBottom: 2,
  },
  step: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 4,
  },
  escalationBlock: {
    backgroundColor: "rgba(40,40,40,0.95)",
    padding: 10,
    borderRadius: 8,
  },
  escalationText: {
    color: "#ffd27f",
    fontSize: 14,
    marginTop: 2,
  },
  error: {
    color: "#ff8080",
    fontSize: 16,
  },
});
