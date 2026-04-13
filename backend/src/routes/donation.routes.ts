import { Router } from 'express';
import prisma from '../prismaClient';

const router = Router();

// Get all donations
router.get('/', async (req, res) => {
  try {
    const donations = await prisma.donation.findMany({
      include: { member: { select: { name: true, email: true } } },
      orderBy: { date: 'desc' }
    });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
});

// Create a donation
router.post('/', async (req, res) => {
  try {
    // req.body expects amount and memberId
    const donation = await prisma.donation.create({
      data: {
        amount: Number(req.body.amount),
        memberId: Number(req.body.memberId),
        date: req.body.date ? new Date(req.body.date) : undefined
      }
    });
    res.status(201).json(donation);
  } catch (error) {
    console.error('CREATE DONATION ERROR:', error);
    res.status(500).json({ 
      error: 'Failed to record donation',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Delete a donation
router.delete('/:id', async (req, res) => {
  try {
    await prisma.donation.delete({
      where: { id: Number(req.params.id) }
    });
    res.json({ message: 'Donation deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete donation' });
  }
});

export default router;
