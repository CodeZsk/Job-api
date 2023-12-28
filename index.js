const authRoutes=require("./src/routes/authRoutes")
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// config
const connectDB = require("./src/configs/mongo.config");
require("express-async-errors");

// middleware
const notFoundMiddleware = require("./src/middlewares/not-found.middleware");
const errorHandlerMiddleware = require("./src/middlewares/error-handler.middleware");
const authMiddleware = require("./src/middlewares/auth.middleware");

// Route
// const userRoute = require("./src/routes/user.route")

// app
const app = express();

// app/server config
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/v1/", (req, res) => {
    res.json({
        success: true,
        data: { name: "timepass" },
    });
});

// routes
// app.use("/api/v1/user", userRoute);
// app.use('/api/v1/usercontent', authMiddleware, usercontentRoute);
// app.use('/api/v1/collaboration', authMiddleware, collaborationRoute);
// app.use('/api/v1/movie', authMiddleware, movieRoute);
// app.use('/api/v1/trailer', authMiddleware, trailerRoute);
// app.use('/api/v1/circuit', authMiddleware, circuitRoute);
app.use("/api/v1/auth",authRoutes);

// error middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// start
const port = process.env.PORT || 3000;

const start = async () => {
    try {
        // connectDB
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () =>
            console.log(`Server is listening port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
