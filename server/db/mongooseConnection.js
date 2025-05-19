import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

class MongooseConnection {
  constructor(dbName, dbUri = process.env.MONGO_URI) {
    this.dbName = dbName;
    this.dbUri = dbUri;
    this.connection = null;
  }

  async connect() {
    try {
      this.connection = await mongoose.connect(this.dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: this.dbName,
      });
      console.log(`Connected to database: ${this.dbName}`);
    } catch (error) {
      console.error(`Error connecting to database: ${error.message}`);
    }
  }

  getModel(name, schemaDefinition) {
    if (!this.connection) {
      throw new Error("Database connection not established");
    }
    const schema = new MongooseConnection.Schema(schemaDefinition);
    return this.connection.model(name, schema);
  }

  async getcollections() {
    if (!this.connection) {
      throw new Error("Database connection not established");
    }
    console.log(`Connected to database: ${this.dbName}`);
    console.log(await this.connection.connection.db.listCollections().toArray());
  }

  async close() {
    if (this.connection) {
      await this.connection.disconnect();
      console.log(`Disconnected from database: ${this.dbName}`);
    }
  }
}

export default MongooseConnection;  