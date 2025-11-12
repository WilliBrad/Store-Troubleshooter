// screens/HomeScreen.js

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  View,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { categories } from "../data/itIssues";
import ScreenBackground from "../components/ScreenBackground";
import PressableScale from "../components/PressableScale";

import {
  Monitor,
  Printer,
  Wifi,
  Headphones,
  TabletSmartphone,
  Store,
  Cpu,
  CreditCard,
} from "lucide-react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const categoryIcons = {
  pos: TabletSmartphone,
  card: CreditCard, // Card Readers / PEDs
  kiosk: Store,
  printer: Printer,
  headset: Headphones,
  network: Wifi,
  monitors: Monitor,
  kvs: Cpu,
};

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");

  // simple intro animation for logo + title
  const logoFade = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.95)).current;
  const titleFade = useRef(new Animated.Value(0)).current;
  const titleSlide = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoFade, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: 1.03,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(titleFade, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(titleSlide, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [logoFade, logoScale, titleFade, titleSlide]);

  // flatten all issues for search + top quick issues
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

  // mark some issues in itIssues.js with isCommon: true to show here
  const topIssues = useMemo(
    () => allIssues.filter((issue) => issue.isCommon).slice(0, 8),
    [allIssues]
  );

  // search filter
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
      <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
        <View style={styles.container}>
          {/* Header / Branding */}
          <View style={styles.header}>
            <Animated.Image
              source={require("../assets/johnson-logo.jpeg")}
              style={[
                styles.logo,
                { opacity: logoFade, transform: [{ scale: logoScale }] },
              ]}
              resizeMode="contain"
            />
            <Animated.View
              style={{
                opacity: titleFade,
                transform: [{ translateY: titleSlide }],
              }}
            >
              <Text style={styles.title}>Store IT Troubleshooting</Text>
              <Text style={styles.subtitle}>
                For store &amp; shift leaders. Quick checks before escalating.
              </Text>
            </Animated.View>
          </View>

          {/* Search */}
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search: 'POS frozen', 'card reader', 'no audio'..."
            placeholderTextColor="#999"
            style={styles.searchInput}
          />

          {/* Content */}
          <View style={styles.content}>
            {showSearchResults ? (
              <>
                <Text style={styles.sectionLabel}>
                  Results for “{search.trim()}”
                </Text>
                {filteredIssues.length === 0 ? (
                  <Text style={styles.empty}>
                    No matching issues yet. Try a different keyword.
                  </Text>
                ) : (
                  <FlatList
                    data={filteredIssues}
                    keyExtractor={(item) => item.categoryId + "-" + item.id}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item }) => {
                      const Icon = categoryIcons[item.categoryId] || Monitor;
                      return (
                        <PressableScale
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
                            <Icon size={16} color="#ffcc66" />
                            <View style={styles.searchTextWrap}>
                              <Text style={styles.searchTitle}>
                                {item.title}
                              </Text>
                              <Text style={styles.searchCategory}>
                                {item.categoryName}
                              </Text>
                            </View>
                          </View>
                        </PressableScale>
                      );
                    }}
                  />
                )}
              </>
            ) : (
              <>
                {/* Top quick issues */}
                {topIssues.length > 0 && (
                  <>
                    <Text style={styles.sectionLabel}>Top quick issues</Text>
                    <FlatList
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      data={topIssues}
                      keyExtractor={(item) => item.categoryId + "-" + item.id}
                      contentContainerStyle={styles.topIssuesContent}
                      renderItem={({ item }) => {
                        const Icon =
                          categoryIcons[item.categoryId] || Monitor;
                        return (
                          <PressableScale
                            style={styles.pill}
                            scaleTo={0.93}
                            onPress={() =>
                              navigation.navigate("IssueDetail", {
                                categoryId: item.categoryId,
                                issueId: item.id,
                                issueTitle: item.title,
                              })
                            }
                          >
                            <Icon size={14} color="#ffcc66" />
                            <Text style={styles.pillText}>
                              {item.title}
                            </Text>
                          </PressableScale>
                        );
                      }}
                    />
                  </>
                )}

                {/* Categories */}
                <Text style={styles.sectionLabel}>Browse by area</Text>
                <FlatList
                  data={categories}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={styles.listContent}
                  renderItem={({ item }) => {
                    const Icon = categoryIcons[item.id] || Monitor;
                    return (
                      <PressableScale
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
                      </PressableScale>
                    );
                  }}
                />
              </>
            )}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Internal helper tool • v0.2 • Built by William Bradshaw
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: 6,
  },
  header: {
    marginTop: 4,
    marginBottom: 4,
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 80,
    marginBottom: 6,
    marginTop: -14,
    opacity: 0.98,
    alignSelf: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "900",
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 11,
    marginTop: 2,
    color: "#ccc",
    textAlign: "center",
  },
  searchInput: {
    backgroundColor: "rgba(15,15,15,0.98)",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    color: "#fff",
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    fontSize: 12,
  },
  content: { flex: 1 },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#ffcc66",
    marginBottom: 4,
    marginTop: 4,
  },
  listContent: { paddingBottom: 6 },
  topIssuesContent: {
    paddingBottom: 6,
    paddingLeft: 4,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(10,10,10,0.98)",
    paddingHorizontal: 14,
    paddingVertical: 40,
    borderRadius: 999,
    marginRight: 10,
    // responsive: looks good on small + big screens
    minWidth: SCREEN_WIDTH * 0.45,
    maxWidth: SCREEN_WIDTH * 0.82,
  },
  pillText: {
    color: "#fff",
    fontSize: 11,
    marginLeft: 8,
    flexShrink: 1,
  },
  card: {
    padding: 18,
    backgroundColor: "rgba(30,30,30,0.98)",
    borderRadius: 12,
    marginBottom: 6,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  searchCard: {
    padding: 9,
    backgroundColor: "rgba(30,30,30,0.98)",
    borderRadius: 10,
    marginBottom: 5,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  searchTextWrap: {
    flexDirection: "column",
    flexShrink: 1,
  },
  searchTitle: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  searchCategory: {
    color: "#aaa",
    fontSize: 10,
    marginTop: 1,
  },
  empty: {
    color: "#ddd",
    fontSize: 12,
    marginTop: 4,
  },
  footer: {
    paddingTop: 2,
    paddingBottom: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    color: "#777",
    fontSize: 9,
  },
});