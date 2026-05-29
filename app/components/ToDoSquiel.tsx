import { addItem, deleteItem, getItems } from "@/services/db";
import { service } from "@/services/notifications";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet, Switch, Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ToDoListModel } from "../models/ToDoListModel";


const Database = () => {
  const [items, setItems] = useState<ToDoListModel[]>([]);
  const [todo, setTodo] = useState<string>("");

  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  React.useEffect(() => {
    loadItems();
    service.setup();
  }, []);

  const loadItems = async () => {
    setItems((await getItems()) ?? []);
  };

  const addItemHandle = async () => {
    if (!todo.trim()) return;

    const newTodo: Omit<ToDoListModel, "id"> = {
      todo,
      completed: false,
      userId: 1,
      dueDate: dueDate ? dueDate.toISOString() : null,
    };
    await service.notify(dueDate ?? new Date());


    const createdItem = await addItem(newTodo.todo,
      newTodo.completed,
      newTodo.userId,
      newTodo.dueDate);

    
  };

  const removeItemHandle = async (id: number) => {
    await deleteItem(id);
    setItems(items.filter((item) => item.id !== id));
  };

  const toggleCompleted = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>ToDo Database Screen</Text>

      <Text>Todo:</Text>

      <TextInput
        style={styles.input}
        value={todo}
        onChangeText={setTodo}
        placeholder="Enter todo..."
      />

      <Button
        title="Pick Date & Time"
        onPress={() => setShowDatePicker(true)}
      />

      {dueDate && (
        <Text style={{ color: "gray" }}>
          Selected: {dueDate.toLocaleString()}
        </Text>
      )}

      <Button title="Add Todo" onPress={addItemHandle} />

        {/* DATE PICKER */}
      {showDatePicker && (
        <DateTimePicker
          value={dueDate ?? new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowDatePicker(false);

            if (date) {
              const updated = dueDate ? new Date(dueDate) : new Date();
              updated.setFullYear(
                date.getFullYear(),
                date.getMonth(),
                date.getDate()
              );

              setDueDate(updated);
              setShowTimePicker(true);
            }
          }}
        />
      )}

      {/* TIME PICKER */}
      {showTimePicker && (
        <DateTimePicker
          value={dueDate ?? new Date()}
          mode="time"
          display="default"
          onChange={(event, time) => {
            setShowTimePicker(false);

            if (time) {
              const updated = dueDate ? new Date(dueDate) : new Date();

              updated.setHours(time.getHours());
              updated.setMinutes(time.getMinutes());

              setDueDate(updated);
            }
          }}
        />
      )}

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.todoInfo}>
              <Text
                style={[
                  styles.itemText,
                  item.completed && styles.completedText,
                ]}
              >
                {item.id}. {item.todo}
              </Text>

              <Text style={styles.userText}>
                User ID: {item.userId}
              </Text>
              {item.dueDate && (
                <Text style={styles.dueDateText}>
                  Due: {new Date(item.dueDate).toLocaleString()}
                </Text>
              )}
            </View>

            <Switch
              value={item.completed}
              onValueChange={() => toggleCompleted(item.id)}
            />

            <Button
              title="Remove"
              onPress={() => removeItemHandle(item.id)}
              color="red"
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Database;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
    gap: 10,
  },

  text: {
    color: "black",
    fontSize: 18,
    textAlign: "center",
  },

  input: {
    height: 40,
    fontSize: 18,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: "black",
    minWidth: 300,
  },

  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    minWidth: 300,
    gap: 10,
  },

  todoInfo: {
    flex: 1,
  },

  itemText: {
    color: "black",
    fontSize: 16,
  },

  completedText: {
    textDecorationLine: "line-through",
    color: "gray",
  },

  userText: {
    fontSize: 12,
    color: "gray",
  },
});