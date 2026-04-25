import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
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
            
        }
    }
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