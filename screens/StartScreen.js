import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import Checkbox from "expo-checkbox";
import { colors, commonStyles } from "../utils/styles";

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

  const handleReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setIsChecked(false);
    setNameError("");
    setEmailError("");
    setPhoneError("");
  };

  const handleRegister = () => {
    if (name && email && phone && !nameError && !emailError && !phoneError) {
      navigation.navigate("Confirm", { name, email, phone });
    } else {
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
        <Text style={styles.title}>Welcome</Text>

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

        <View style={styles.checkboxContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? "#4630EB" : undefined}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxLabel}>I am not a robot</Text>
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <Button 
              title="Reset" 
              onPress={handleReset} 
              color={colors.red} 
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              title="Register"
              onPress={handleRegister}
              disabled={!isChecked}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ...commonStyles,
  card: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    width: "100%",
    maxWidth: 400,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 8,
  },
  checkboxLabel: {
    fontSize: 16,
    color: colors.text,
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
});

export default StartScreen;
