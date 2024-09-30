import React from "react";
import { View, Text, StyleSheet, Button, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ConfirmScreen = ({ route, navigation }) => {
  const { name, email, phone } = route.params;

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleContinue = () => {
    navigation.goBack(); // Close the modal
    navigation.navigate("Game", { phone });
  };

  return (
    <Modal transparent={true} visible={true} animationType="fade">
      <LinearGradient
        colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.8)"]}
        style={styles.container}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Confirm Your Information</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{name}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{email}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{phone}</Text>
          </View>
          <Text style={styles.instructionText}>
            If it is not correct, please go back and edit them.
          </Text>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonWrapper}>
              <Button title="Go Back" onPress={handleGoBack} />
            </View>
            <View style={styles.buttonWrapper}>
              <Button title="Continue" onPress={handleContinue} />
            </View>
          </View>
        </View>
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    marginRight: 10,
    flex: 1,
  },
  value: {
    flex: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  instructionText: {
    marginTop: 10,
    marginBottom: 10,
    fontStyle: "italic",
    color: "#555",
  },
});

export default ConfirmScreen;
