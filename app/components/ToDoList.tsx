import { storage } from "@/services/storage";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ToDoListModel } from "../models/ToDoListModel";
import ToDoForm from "./ToDoForm";
import ToDoListItem from "./ToDoListItem";

const api = "https://dummyjson.com/todos";

export default function ToDoList(){

    const [tasks, setTask] = useState<ToDoListModel[]>([]);

    useEffect(() => {
        getTasks();
        
    }, []);

    const getTasks = async ()=>{
       let storedToDo = await storage.load<ToDoListModel>("ToDoTasks");
        fetch(api)
            .then((res) => res.json())
            .then((json) => {
              if (storedToDo !== null) {
                setTask([storedToDo, ...json.todos]);
              } else {
                setTask(json.todos);
              }
              
            });
        
    };

    const deleteProduct = (id: number) => {
      setTask((prevToDo) =>
        prevToDo.filter((todo) => todo.id !== id),
      );
    }; 

    const createToDo = (todo: ToDoListModel) => {
    setTask((prevToDo) => [todo, ...prevToDo]);
  };

    return(
        <View style={styles.container}>
            <ToDoForm onCreate={createToDo}/>
            <Text style={styles.title}>To-Do List</Text>
            <FlatList
            data={tasks}
            renderItem={({ item }) => (
              <ToDoListItem todo={item} onDelete={deleteProduct} />
            )}
            initialNumToRender={6}
            contentContainerStyle={styles.listContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      width: "100%",
      flex: 1,
      paddingHorizontal: 12,
      paddingTop: 12,
    },
    title: {
      fontSize: 22,
      textAlign: "center",
      marginVertical: 12,
    },
    listContent: {
      paddingBottom: 20,
    },
  });