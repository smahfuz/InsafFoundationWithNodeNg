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
  console.log('POST /api/members request body:', req.body);
  try {
    const { name, email, phone, address, joinDate } = req.body;
    
    // Normalize string fields to null if empty
    const data = {
      name,
      email: email === '' ? null : email,
      phone: phone === '' ? null : phone,
      address: address === '' ? null : address,
      joinDate: joinDate ? new Date(joinDate) : undefined
    };

    console.log('Prisma create data:', data);
    const member = await prisma.member.create({ data });
    console.log('Member created successfully:', member.id);
    res.status(201).json(member);
  } catch (error) {
    console.error('CREATE MEMBER ERROR:', error);
    res.status(500).json({ 
      error: 'Failed to create member',
      details: error instanceof Error ? error.message : 'Unknown error',
      code: (error as any).code // Prisma error code if available
    });
  }
});

// Update a member
router.put('/:id', async (req, res) => {
  try {
    const { id, donations, committeeMembers, createdAt, updatedAt, ...updateData } = req.body;
    
    // Normalize optional fields: convert empty strings to null
    if (updateData.email === '') updateData.email = null;
    if (updateData.phone === '') updateData.phone = null;
    if (updateData.address === '') updateData.address = null;
    
    // Handle joinDate parsing
    if (updateData.joinDate) {
      updateData.joinDate = new Date(updateData.joinDate);
    }

    const member = await prisma.member.update({
      where: { id: Number(req.params.id) },
      data: updateData
    });
    res.json(member);
  } catch (error) {
    console.error('Update member error:', error);
    res.status(400).json({ 
      error: 'Failed to update member',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
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
