// const { MongooseConnection } = require("./db/mongooseConnection");
import {MongooseConnection} from "./db/mongooseConnection";
import { getRecords } from "./helpers/helperFunc";
// const { getRecords } = require("./helpers/helperFunc");

async function testDb() {
    const db = new MongooseConnection("InhouzTodoApp");
    const myDb = await db.connect();

    const tasks = getRecords(myDb, "todoTasks", {})
    console.log(tasks);
}
