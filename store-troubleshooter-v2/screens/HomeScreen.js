// screens/HomeScreen.js

import React, { useState, useMemo } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
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

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");

  const allIssues = useMemo(
    () =>
      categories.flatMap((category) =>
        (category.issues || []).map((issue) => ({
          ...issue,
          categoryId: category.id,
          categoryName: category.name,
        }))
      ),
    []
  );

  const filteredIssues = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    return allIssues.filter((issue) => {
      const inTitle = issue.title.toLowerCase().includes(q);
      const inSymptoms = (issue.symptoms || []).some((s) =>
        s.toLowerCase().includes(q)
      );
      const inTags = (issue.tags || []).some((t) =>
        t.toLowerCase().includes(q)
      );
      return inTitle || inSymptoms || inTags;
    });
  }, [search, allIssues]);

  const showSearchResults = search.trim().length > 0;

  return (
    <ScreenBackground>
      <Text style={styles.title}>IT Troubleshooting Guide</Text>
      <Text style={styles.subtitle}>Search or choose an area below.</Text>

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search e.g. 'no receipt', 'headset', 'no signal'"
        placeholderTextColor="#999"
        style={styles.searchInput}
      />

      {showSearchResults ? (
        <>
          <Text style={styles.sectionLabel}>
            Results for “{search.trim()}”
          </Text>
          {filteredIssues.length === 0 ? (
            <Text style={styles.empty}>
              No matching issues yet. Try a different word.
            </Text>
          ) : (
            <FlatList
              data={filteredIssues}
              keyExtractor={(item) => item.categoryId + "-" + item.id}
              renderItem={({ item }) => {
                const Icon = categoryIcons[item.categoryId] || Monitor;
                return (
                  <TouchableOpacity
                    style={styles.searchCard}
                    onPress={() =>
                      navigation.navigate("IssueDetail", {
                        categoryId: item.categoryId,
                        issueId: item.id,
                        issueTitle: item.title,
                      })
                    }
                  >
                    <View style={styles.searchRow}>
                      <Icon size={18} color="#ffcc66" />
                      <View style={styles.searchTextWrap}>
                        <Text style={styles.searchTitle}>
                          {item.title}
                        </Text>
                        <Text style={styles.searchCategory}>
                          {item.categoryName}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </>
      ) : (
        <>
          <Text style={styles.sectionLabel}>Browse by Area</Text>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const Icon = categoryIcons[item.id] || Monitor;
              return (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() =>
                    navigation.navigate("IssueList", {
                      categoryId: item.id,
                      categoryName: item.name,
                    })
                  }
                >
                  <View style={styles.cardRow}>
                    <Icon size={22} color="#ffcc66" />
                    <Text style={styles.cardText}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </>
      )}
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: "900",
    marginBottom: 4,
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 12,
    color: "#ddd",
    textAlign: "center",
  },
  searchInput: {
    backgroundColor: "rgba(20,20,20,0.95)",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: "#fff",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    fontSize: 14,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#ffcc66",
    marginBottom: 6,
    marginTop: 4,
  },
  card: {
    padding: 14,
    backgroundColor: "rgba(35,35,35,0.9)",
    borderRadius: 12,
    marginBottom: 10,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
  searchCard: {
    padding: 10,
    backgroundColor: "rgba(30,30,30,0.95)",
    borderRadius: 10,
    marginBottom: 8,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchTextWrap: {
    flexDirection: "column",
    marginLeft: 8,
    flexShrink: 1,
  },
  searchTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  searchCategory: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 1,
  },
  empty: {
    color: "#ddd",
    fontSize: 14,
    marginTop: 4,
  },
});
