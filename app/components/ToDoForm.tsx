import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, ScrollView, StyleSheet, Text, TextInput } from "react-native";
import { ToDoListModel } from "../models/ToDoListModel";


type Props ={
    onCreate: (todo : ToDoListModel) => void;
};

const ToDoForm: React.FC<Props> = ({ onCreate }) =>{
  const {
      control,
      handleSubmit,
      formState: { errors },
  } = useForm<ToDoListModel>();

  const onSubmit: SubmitHandler<ToDoListModel> = (data) =>{
    data ={
      ...data,
        id: Number(data.id),
      userId: Number(data.userId),
      completed:
        String(data.completed).toLowerCase() === "true" ||
        String(data.completed) === "1",
    };
    console.log(data);
    onCreate(data);
  }

   return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Create New Todo</Text>

      <Text style={styles.label}>ID</Text>
      <Controller
        control={control}
        name="id"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter ID"
            onChangeText={onChange}
            value={value?.toString() ?? ""}
          />
        )}
      />
      {errors.id && <Text>This is required.</Text>}

      <Text style={styles.label}>Todo</Text>
      <Controller
        control={control}
        name="todo"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter todo"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.todo && <Text>This is required.</Text>}

      <Text style={styles.label}>Completed</Text>
      <Controller
        control={control}
        name="completed"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="true / false"
            onChangeText={onChange}
            value={value?.toString() ?? ""}
          />
        )}
      />
      {errors.completed && <Text>This is required.</Text>}

      <Text style={styles.label}>User ID</Text>
      <Controller
        control={control}
        name="userId"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter User ID"
            onChangeText={onChange}
            value={value?.toString() ?? ""}
          />
        )}
      />
      {errors.userId && <Text>This is required.</Text>}

      <Button title="Create Todo" onPress={handleSubmit(onSubmit)} />
    </ScrollView>
  );
}

export default ToDoForm;

const styles = StyleSheet.create({
    container: {
      minHeight: 500,
      height: 1500,
      padding: 20,
    },
    heading: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 16,
    },
    label: {
      marginTop: 10,
      fontWeight: "600",
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      padding: 10,
      marginTop: 5,
    },
    textArea: {
      height: 80,
      textAlignVertical: "top",
    },
  });