"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_1 = __importDefault(require("../lib/db"));
const auth_routes_1 = __importDefault(require("../routes/auth.routes"));
const student_route_1 = __importDefault(require("../routes/student.route"));
const tasks_route_1 = __importDefault(require("../routes/tasks.route"));
dotenv_1.default.config({ path: ['.env.local', '.env'] });
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["https://scholarsync-admin.netlify.app/"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
// Connect To Database 
(0, db_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
// Example route: http://localhost:8080/api/v1
app.use("/api/v1/auth", auth_routes_1.default);
app.use("/api/v1/admin", student_route_1.default);
app.use("/api/v1/student", tasks_route_1.default);
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
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=app.js.map