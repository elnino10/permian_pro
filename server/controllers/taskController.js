import MongooseConnection from "../db/mongooseConnection.js";
import { getRecords } from "../helpers/helperFunc.js";

export const getTasks = async (req, res) => {
  const db = new MongooseConnection("test");
  const myDb = await db.connect();

  await db.getcollections();

  const tasks = await getRecords(myDb, "todoTasks", {});
  if (tasks.errorCode) {
    return res.status(404).json({
      message: tasks.message,
      errorCode: tasks.errorCode,
    });
  }
  return res.status(200).json({
    message: "Tasks fetched successfully",
    tasks,
  });
};
