import { ToDoListModel } from "@/app/models/ToDoListModel";
import * as SQLite from "expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";

const db = SQLite.openDatabaseSync("todos.db");

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 2;

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
        userId INTEGER NOT NULL,
        dueDate TEXT
      );

      INSERT INTO todos (todo, completed, userId, dueDate)
      VALUES ('Buy milk', 0, 1, NULL);

      INSERT INTO todos (todo, completed, userId, dueDate)
      VALUES ('Learn React Native', 1, 1, NULL);

      INSERT INTO todos (todo, completed, userId, dueDate)
      VALUES ('Go to gym', 0, 2, NULL);
    `);

    currentDbVersion = 1;
  }

  if (currentDbVersion === 1) {
    await db.execAsync(`
      ALTER TABLE todos ADD COLUMN dueDate TEXT;
    `);

    currentDbVersion = 2;
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

export async function addItem(
  todo: string,
  completed: boolean = false,
  userId: number = 1,
  dueDate: string | null = null,
): Promise<ToDoListModel> {
  const result = await db.runAsync(
    `INSERT INTO todos (todo, completed, userId, dueDate) VALUES (?, ?, ?, ?);`,
    [todo, completed ? 1 : 0, userId, dueDate],
  );

  return {
    id: result.lastInsertRowId,
    todo,
    completed,
    userId,
    dueDate,
  };
}

export async function deleteItem(id: number): Promise<void> {
  await db.runAsync(`DELETE FROM todos WHERE id = ?;`, [id]);
}

export async function updateItem(item: ToDoListModel): Promise<void> {
  await db.runAsync(
    `UPDATE todos
     SET todo = ?, completed = ?, userId = ?, dueDate = ?
     WHERE id = ?;`,
    [
      item.todo,
      item.completed ? 1 : 0,
      item.userId,
      item.dueDate ?? null,
      item.id,
    ],
  );
}

export async function getItems(): Promise<ToDoListModel[]> {
  const result = await db.getAllAsync<any>(`SELECT * FROM todos;`);

  return result;
}