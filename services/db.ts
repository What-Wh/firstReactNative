import { ToDoListModel } from "@/app/models/ToDoListModel";
import * as SQLite from "expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";

const db = SQLite.openDatabaseSync("todos.db");

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;

  let { user_version: currentDbVersion } = await db.getFirstAsync<any>(
    "PRAGMA user_version",
  );

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentDbVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;

      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY NOT NULL,
        todo TEXT NOT NULL,
        completed INTEGER NOT NULL,
        userId INTEGER NOT NULL
      );

      INSERT INTO todos (todo, completed, userId)
      VALUES ('Buy milk', 0, 1);

      INSERT INTO todos (todo, completed, userId)
      VALUES ('Learn React Native', 1, 1);

      INSERT INTO todos (todo, completed, userId)
      VALUES ('Go to gym', 0, 2);
    `);

    currentDbVersion = 1;
  }

  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

export async function addItem(
  todo: string,
  completed: boolean = false,
  userId: number = 1,
): Promise<ToDoListModel> {
  const result = await db.runAsync(
    `INSERT INTO todos (todo, completed, userId) VALUES (?, ?, ?);`,
    [todo, completed ? 1 : 0, userId],
  );

  return {
    id: result.lastInsertRowId,
    todo,
    completed,
    userId,
  } as ToDoListModel;
}

export async function deleteItem(id: number): Promise<void> {
  await db.runAsync(`DELETE FROM todos WHERE id = ?;`, [id]);
}

export async function updateItem(item: ToDoListModel): Promise<void> {
  await db.runAsync(
    `UPDATE todos
     SET todo = ?, completed = ?, userId = ?
     WHERE id = ?;`,
    [item.todo, item.completed ? 1 : 0, item.userId, item.id],
  );
}

export async function getItems(): Promise<ToDoListModel[]> {
  const result = await db.getAllAsync<any>(`SELECT * FROM todos;`);

  return result;
}