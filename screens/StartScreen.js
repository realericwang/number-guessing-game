import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { CheckBox } from "react-native-elements";

const StartScreen = ({ navigation, route }) => {
  const {
    name: routeName,
    email: routeEmail,
    phone: routePhone,
  } = route.params || {};
  const [name, setName] = useState(routeName || "");
  const [email, setEmail] = useState(routeEmail || "");
  const [phone, setPhone] = useState(routePhone || "");
  const [isChecked, setIsChecked] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setIsChecked(false);
    setNameError("");
    setEmailError("");
    setPhoneError("");
  };

  const handleRegister = async () => {
    setIsLoading(true);

    if (name && email && phone && !nameError && !emailError && !phoneError) {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
      navigation.navigate("Confirm", { name, email, phone });
    } else {
      setIsLoading(false);
      Alert.alert("Invalid Input", "Please fill in all fields correctly.");
    }
  };

  const validateName = (text) => {
    if (text.length <= 1) {
      setNameError("Name must be more than 1 character");
    } else if (/\d/.test(text)) {
      setNameError("Name cannot contain numbers");
    } else {
      setNameError("");
    }
  };

  const validateEmail = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePhone = (text) => {
    if (
      text.length !== 10 ||
      !/^\d+$/.test(text) ||
      ["0", "1"].includes(text.charAt(9))
    ) {
      setPhoneError(
        "Please enter a valid 10-digit phone number (last digit cannot be 0 or 1)"
      );
    } else {
      setPhoneError("");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Registration</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => {
            setName(text);
            validateName(text);
          }}
        />
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Email address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            validateEmail(text);
          }}
          keyboardType="email-address"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phone}
          onChangeText={(text) => {
            setPhone(text);
            validatePhone(text);
          }}
          keyboardType="phone-pad"
        />
        {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}

        <CheckBox
          title="I am not a robot"
          checked={isChecked}
          onPress={() => setIsChecked(!isChecked)}
          containerStyle={styles.checkbox}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleReset}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              (!isChecked || isLoading) && styles.disabledButton,
            ]}
            onPress={handleRegister}
            disabled={!isChecked || isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Loading..." : "Register"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  checkbox: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    marginLeft: 0,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
});

export default StartScreen;
