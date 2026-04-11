
import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import cookieParser from 'cookie-parser';
import connectDB from "./lib/db";
import authRouter from "./routes/auth.routes";
import studentRouter from "./routes/student.route";
import taskRouter from "./routes/tasks.route";

dotenv.config({ path: ['.env.local', '.env'] });



const app = express();

app.use(cors(
    {
        origin: ["https://gridedu.netlify.app/"], 
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    }
))


// Connect To Database 
connectDB()


app.use(cookieParser());

app.use(express.json());


// Example route: http://localhost:8080/api/v1
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/admin", studentRouter)
app.use("/api/v1/student", taskRouter)


// --- SERVER CONFIGURATION ---
const PORT = process.env.PORT || 5000;


// Basic route to check if the server is working
app.get("/", (_, res) => {
    res.send("School management Server is Running! 🚀");
});



const startServer = () => {
    try {
        if (!process.env.PORT) {
            console.warn('⚠️  Warning: PORT missing in .env, using default: 5000');
        }

        app.listen(PORT, () => {
            console.log(`
✅ Server is live!
📡 URL: http://localhost:${PORT}
📂 API Base: http://localhost:${PORT}/api
            `);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();