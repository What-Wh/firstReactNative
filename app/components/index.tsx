import { Link } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Database from "./ToDoSquiel";

export default function Index() {

  return (
    <SafeAreaView style={styles.container}>
      <Link href="./about" style={{ marginTop: 20 }}>
        Go to About
      </Link>
      <Database/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});