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
// Get all committees
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const committees = yield prisma.committee.findMany({
            include: {
                committeeMembers: {
                    include: { member: { select: { name: true, email: true, phone: true } } }
                }
            },
            orderBy: { year: 'desc' }
        });
        res.json(committees);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch committees' });
    }
}));
// Create a new committee year
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const committee = yield prisma.committee.create({
            data: { year: Number(req.body.year), isActive: req.body.isActive || false }
        });
        res.status(201).json(committee);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create committee' });
    }
}));
// Add member to committee
router.post('/members', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const committeeMember = yield prisma.committeeMember.create({
            data: {
                role: req.body.role,
                memberId: Number(req.body.memberId),
                committeeId: Number(req.body.committeeId)
            }
        });
        res.status(201).json(committeeMember);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to assign member to committee' });
    }
}));
// Remove member from committee
router.delete('/members/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.committeeMember.delete({
            where: { id: Number(req.params.id) }
        });
        res.json({ message: 'Member removed from committee' });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to remove member' });
    }
}));
exports.default = router;
