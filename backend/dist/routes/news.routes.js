"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// Get all news updates
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const news = yield prisma.newsUpdate.findMany({
            orderBy: { publishDate: 'desc' }
        });
        res.json(news);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch news' });
    }
}));
// Create a news update
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const news = yield prisma.newsUpdate.create({
            data: req.body
        });
        res.status(201).json(news);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create news update' });
    }
}));
// Update a news update
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const news = yield prisma.newsUpdate.update({
            where: { id: Number(req.params.id) },
            data: req.body
        });
        res.json(news);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update news' });
    }
}));
// Delete a news update
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.newsUpdate.delete({
            where: { id: Number(req.params.id) }
        });
        res.json({ message: 'News deleted successfully' });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to delete news' });
    }
}));
exports.default = router;
