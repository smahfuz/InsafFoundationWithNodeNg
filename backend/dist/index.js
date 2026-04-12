"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const PORT = process.env.PORT || 5000;
const member_routes_1 = __importDefault(require("./routes/member.routes"));
const donation_routes_1 = __importDefault(require("./routes/donation.routes"));
const news_routes_1 = __importDefault(require("./routes/news.routes"));
const committee_routes_1 = __importDefault(require("./routes/committee.routes"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// API Routes
app.use('/api/members', member_routes_1.default);
app.use('/api/donations', donation_routes_1.default);
app.use('/api/news', news_routes_1.default);
app.use('/api/committees', committee_routes_1.default);
// Basic health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running correctly.' });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
