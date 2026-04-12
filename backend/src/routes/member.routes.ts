import { Router } from 'express';
import prisma from '../prismaClient';

const router = Router();

// Get all members with their donations
router.get('/', async (req, res) => {
  try {
    const members = await prisma.member.findMany({
      include: { donations: true, committeeMembers: { include: { committee: true } } }
    });
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch members' });
  }
});

// Get a single member
router.get('/:id', async (req, res) => {
  try {
    const member = await prisma.member.findUnique({
      where: { id: Number(req.params.id) },
      include: { donations: true }
    });
    if (member) res.json(member);
    else res.status(404).json({ error: 'Member not found' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch member' });
  }
});

// Create a member
router.post('/', async (req, res) => {
  try {
    const member = await prisma.member.create({
      data: req.body
    });
    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create member' });
  }
});

// Update a member
router.put('/:id', async (req, res) => {
  try {
    const member = await prisma.member.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });
    res.json(member);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update member' });
  }
});

// Delete a member
router.delete('/:id', async (req, res) => {
  try {
    await prisma.member.delete({
      where: { id: Number(req.params.id) }
    });
    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete member' });
  }
});

export default router;
