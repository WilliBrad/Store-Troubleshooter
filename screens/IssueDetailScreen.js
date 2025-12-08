// screens/IssueDetailScreen.js

import React, { useMemo, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  Modal,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { categories } from "../data/itIssues";
import ScreenBackground from "../components/ScreenBackground";
import PressableScale from "../components/PressableScale";
import { ArrowLeft, AlertTriangle, Phone } from "lucide-react-native";

export default function IssueDetailScreen({ route, navigation }) {
  const { categoryId, issueId, issueTitle } = route.params || {};
  const [showModal, setShowModal] = useState(false);

  // Categories that should show the OTP contact button
  const otpEnabled = ["pos", "card", "network", "monitors", "kvs"];

  const issue = useMemo(() => {
    const category = categories.find((c) => c.id === categoryId);
    return category?.issues?.find((i) => i.id === issueId);
  }, [categoryId, issueId]);

  const callNumber = (num) => {
    Linking.openURL(`tel:${num}`);
    setShowModal(false);
  };

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
        <View style={styles.container}>
          {/* Back & Title */}
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
            <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
              {/* Symptoms */}
              {issue.symptoms?.length > 0 && (
                <View style={styles.block}>
                  <Text style={styles.blockLabel}>You might see:</Text>
                  {issue.symptoms.map((s, idx) => (
                    <Text key={idx} style={styles.bulletText}>• {s}</Text>
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
                          <Text style={styles.stepBadgeText}>{index + 1}</Text>
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
                  <Text style={styles.escalationText}>{issue.escalation}</Text>
                </View>
              )}

              {/* Contact OTP Button (only for selected categories) */}
              {otpEnabled.includes(categoryId) && (
                <TouchableOpacity
                  style={styles.otpButton}
                  onPress={() => setShowModal(true)}
                >
                  <Phone size={16} color="#000" style={{ marginRight: 6 }} />
                  <Text style={styles.otpButtonText}>Contact OTP</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          )}
        </View>
      </SafeAreaView>

      {/* OTP Modal */}
      <Modal transparent visible={showModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Select Contact</Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => callNumber("2569601032")}
            >
              <Text style={styles.modalButtonText}>East – Gage Bradshaw</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => callNumber("2565800642")}
            >
              <Text style={styles.modalButtonText}>West – AJ Crisler</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: "#ccc" }]}
              onPress={() => setShowModal(false)}
            >
              <Text style={[styles.modalButtonText, { color: "#000" }]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
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
    justifyContent: "center",
    alignItems: "center",
  },
  headerTextWrap: { flexShrink: 1 },
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
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 28 },
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
    marginBottom: 4,
  },
  stepBadge: {
    width: 18,
    height: 18,
    backgroundColor: "#ffcc66",
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
    marginTop: 2,
  },
  stepBadgeText: {
    color: "#000",
    fontSize: 10,
    fontWeight: "800",
  },
  stepText: { color: "#fff", fontSize: 12, flex: 1 },
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

  /** OTP BUTTON */
  otpButton: {
    backgroundColor: "#ffcc66",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 40,
  },
  otpButtonText: {
    fontWeight: "700",
    fontSize: 14,
    color: "#000",
  },

  /** MODAL */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 12,
    color: "#000",
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#ffcc66",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  modalButtonText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "700",
  },
});