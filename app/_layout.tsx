import { migrateDbIfNeeded } from "@/services/db";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

const DATABASE_NAME = "todos.db";

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName={DATABASE_NAME} onInit={migrateDbIfNeeded}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ title: "Home", headerShown: false }}
        ></Stack.Screen>
      </Stack>
    </SQLiteProvider>
  );
}
