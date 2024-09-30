import { StyleSheet } from "react-native";

export const colors = {
  primary: "#007AFF",
  secondary: "#4630EB",
  background: "#f5f5f5",
  text: "#333333",
  error: "#d32f2f",
  success: "#4CAF50",
  white: "#FFFFFF",
  black: "#000000",
  gray: "#DDDDDD",
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
  },
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginBottom: 10,
  },
});
