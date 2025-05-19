import express from "express";
import authRoutes from "./routes/authRoute.js";
import taskRoute from "./routes/taskRoute.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// create auth routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoute);


app.get("/", (req, res) => {
    res.send("Welcome to Permian Pro API");
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
