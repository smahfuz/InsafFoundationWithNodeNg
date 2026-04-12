import { Router } from 'express';
import prisma from '../prismaClient';

const router = Router();

// Get all committees
router.get('/', async (req, res) => {
  try {
    const committees = await prisma.committee.findMany({
      include: {
        committeeMembers: {
          include: { member: { select: { name: true, email: true, phone: true } } }
        }
      },
      orderBy: { year: 'desc' }
    });
    res.json(committees);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch committees' });
  }
});

// Create a new committee year
router.post('/', async (req, res) => {
  try {
    const committee = await prisma.committee.create({
      data: { year: Number(req.body.year), isActive: req.body.isActive || false }
    });
    res.status(201).json(committee);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create committee' });
  }
});

// Add member to committee
router.post('/members', async (req, res) => {
  try {
    const committeeMember = await prisma.committeeMember.create({
      data: {
        role: req.body.role,
        memberId: Number(req.body.memberId),
        committeeId: Number(req.body.committeeId)
      }
    });
    res.status(201).json(committeeMember);
  } catch (error) {
    res.status(400).json({ error: 'Failed to assign member to committee' });
  }
});

// Remove member from committee
router.delete('/members/:id', async (req, res) => {
  try {
    await prisma.committeeMember.delete({
      where: { id: Number(req.params.id) }
    });
    res.json({ message: 'Member removed from committee' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to remove member' });
  }
});

export default router;
