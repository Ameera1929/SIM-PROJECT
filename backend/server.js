const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "SIM API Running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.post("/test", (req, res) => {
    console.log(req.body);

    res.json({
        received: req.body
    });
});

const productRoutes =
require("./routes/productRoutes");

app.use(
    "/products",
    productRoutes
);