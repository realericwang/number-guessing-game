import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
} from "react-native";

const GameScreen = ({ route, navigation }) => {
  const { phone } = route.params;
  const [chosenNumber, setChosenNumber] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [attemptsLeft, setAttemptsLeft] = useState(4);
  const [guess, setGuess] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [guessedCorrectly, setGuessedCorrectly] = useState(false);
  const [hintText, setHintText] = useState("");
  const [incorrectGuessMessage, setIncorrectGuessMessage] = useState("");
  const [gameOverReason, setGameOverReason] = useState("");

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            endGame("You are out of time");
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameStarted, gameOver]);

  const generateNumber = () => {
    const lastDigit = parseInt(phone.slice(-1));
    const possibleNumbers = [];
    for (let i = lastDigit; i <= 100; i += lastDigit) {
      possibleNumbers.push(i);
    }
    const randomIndex = Math.floor(Math.random() * possibleNumbers.length);
    return possibleNumbers[randomIndex];
  };

  const startGame = () => {
    setChosenNumber(generateNumber());
    setGameStarted(true);
    setTimeLeft(60);
    setAttemptsLeft(4);
    setGuess("");
    setShowHint(false);
    setGameOver(false);
    setGuessedCorrectly(false);
  };

  const handleGuess = () => {
    const guessNumber = parseInt(guess);
    if (isNaN(guessNumber) || guessNumber < 1 || guessNumber > 100) {
      Alert.alert(
        "Invalid number!",
        "Number has to be a multiply of " +
          phone.slice(-1) +
          " between 1 and 100."
      );
      return;
    }

    setAttemptsLeft((prevAttempts) => prevAttempts - 1);

    if (guessNumber === chosenNumber) {
      setGuessedCorrectly(true);
    } else if (attemptsLeft === 1) {
      endGame("You are out of attempts");
    } else {
      setIncorrectGuessMessage(
        guessNumber < chosenNumber
          ? "You should guess higher."
          : "You should guess lower."
      );
      setGuess("");
    }
  };

  const useHint = () => {
    setShowHint(true);
    setHintText(
      chosenNumber <= 50
        ? "The number is between 0 and 50."
        : "The number is between 50 and 100."
    );
  };

  const endGame = (reason) => {
    setGameOver(true);
    setIncorrectGuessMessage("");
    setGameOverReason(reason);
  };

  const restartGame = () => {
    navigation.navigate("Start");
  };

  return (
    <View style={styles.container}>
      <View style={styles.restartButtonContainer}>
        <Button title="Restart" onPress={restartGame} color="#007AFF" />
      </View>

      {!gameStarted ? (
        <>
          <Text style={styles.instructions}>
            Guess a number between 1 & 100 that is multiply of {phone.slice(-1)}
          </Text>
          <Button title="Start" onPress={startGame} />
        </>
      ) : guessedCorrectly ? (
        <>
          <Text style={styles.title}>Congratulations!</Text>
          <Text style={styles.text}>
            You guessed the number in {4 - attemptsLeft} attempts.
          </Text>
          <Image
            source={{ uri: `https://picsum.photos/id/${chosenNumber}/100/100` }}
            style={styles.image}
          />
          <Button title="New Game" onPress={startGame} />
        </>
      ) : incorrectGuessMessage !== "" ? (
        <>
          <Text style={styles.title}>You did not guess correct!</Text>
          <Text style={styles.incorrectGuessMessage}>
            {incorrectGuessMessage}
          </Text>
          <Button
            title="Try again"
            onPress={() => setIncorrectGuessMessage("")}
          />
          <Button title="End the game" onPress={() => endGame("")} />
        </>
      ) : gameOver ? (
        <>
          <Text style={styles.title}>The game is over</Text>
          <Image
            source={require("../assets/sad-smiley.png")}
            style={styles.image}
          />
          <Text style={styles.text}>{gameOverReason}</Text>
          <Button title="New Game" onPress={startGame} />
        </>
      ) : (
        <>
          <Text style={styles.instructions}>
            Guess a number between 1 & 100 that is multiply of {phone.slice(-1)}
          </Text>
          <Text style={styles.text}>Time left: {timeLeft} seconds</Text>
          <Text style={styles.text}>Attempts left: {attemptsLeft}</Text>
          {showHint && <Text style={styles.hint}>Hint: {hintText}</Text>}

          <TextInput
            style={styles.input}
            onChangeText={setGuess}
            value={guess}
            keyboardType="default"
            placeholder="Enter your guess"
          />
          <View style={styles.buttonContainer}>
            <Button title="Use a hint" onPress={useHint} disabled={showHint} />
            <Button title="Submit guess" onPress={handleGuess} />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  restartButtonContainer: {
    position: "absolute",
    top: 150,
    right: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    width: "80%",
    marginBottom: 20,
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  hint: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  incorrectGuessContainer: {
    backgroundColor: "#ffebee",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  incorrectGuessText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d32f2f",
    marginBottom: 5,
  },
  incorrectGuessMessage: {
    fontSize: 16,
    color: "#d32f2f",
    marginBottom: 10,
  },
});

export default GameScreen;
