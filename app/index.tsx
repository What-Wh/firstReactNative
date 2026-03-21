import { useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [count, setCount] = useState(0);
  
  const showAlert = () =>{
    Alert.alert("Button is pressed!")
  };
  
  const listOfQ = [
    "Ти, як правило, завжди буваєш всім задоволений?",
    "Тобі іноді заважають заснути різні думки?"
  ];

  const testOnTemper = () =>{
    listOfQ.forEach(element => {
      Alert.alert(
        `${element}`,
        "", // message (можна залишити пустим)
        [
          { text: "Yes", onPress: () => setCount(count + 1) },
          { text: "Sometimes", onPress: () => setCount(count + 0.5) },
          { text: "No", onPress: () => setCount(count + 0) },
        ],
        { cancelable: true }
      );
    });

  };

  const showResult = () =>{
    Alert.alert(`${count}`);
  }

  return (
    <View style={styles.container}>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button title="Press me" onPress={showAlert}/>
      <Button title="Start" onPress={testOnTemper}/>
      <Button title="Show result" onPress={showResult}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});