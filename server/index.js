const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Welcome to Permian Pro API");
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
