import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ToDoListModel } from "../models/ToDoListModel";

type ToDOListItemProps ={
    todo: ToDoListModel;
    onDelete: (id: number) => void;
}

export default function ToDoListItem({todo, onDelete}: ToDOListItemProps){
    return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {todo.todo}
        </Text>
        <Pressable
          style={styles.deleteButton}
          onPress={() => onDelete(todo.id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </Pressable>
      </View>
    </View>
    );
}

const styles = StyleSheet.create({
    card: {
      flexDirection: "row",
      width: "100%",
      padding: 12,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 10,
      backgroundColor: "#fff",
    },
    image: {
      width: 70,
      height: 70,
      marginRight: 12,
    },
    content: {
      flex: 1,
      justifyContent: "center",
      gap: 3,
    },
    title: {
      fontSize: 15,
      fontWeight: "600",
    },
    price: {
      fontSize: 16,
      fontWeight: "700",
    },
    meta: {
      fontSize: 12,
      color: "#666",
    },
    deleteButton: {
      alignSelf: "flex-start",
      marginTop: 6,
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 6,
      backgroundColor: "#dc2626",
    },
    deleteButtonText: {
      color: "#fff",
      fontSize: 12,
      fontWeight: "600",
    },
  });