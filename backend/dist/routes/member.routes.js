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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prismaClient_1 = __importDefault(require("../prismaClient"));
const router = (0, express_1.Router)();
// Get all members with their donations
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const members = yield prismaClient_1.default.member.findMany({
            include: { donations: true, committeeMembers: { include: { committee: true } } }
        });
        res.json(members);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch members' });
    }
}));
// Get a single member
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const member = yield prismaClient_1.default.member.findUnique({
            where: { id: Number(req.params.id) },
            include: { donations: true }
        });
        if (member)
            res.json(member);
        else
            res.status(404).json({ error: 'Member not found' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch member' });
    }
}));
// Create a member
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const member = yield prismaClient_1.default.member.create({
            data: req.body
        });
        res.status(201).json(member);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create member' });
    }
}));
// Update a member
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const member = yield prismaClient_1.default.member.update({
            where: { id: Number(req.params.id) },
            data: req.body
        });
        res.json(member);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update member' });
    }
}));
// Delete a member
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prismaClient_1.default.member.delete({
            where: { id: Number(req.params.id) }
        });
        res.json({ message: 'Member deleted successfully' });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to delete member' });
    }
}));
exports.default = router;
