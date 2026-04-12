import { Router } from 'express';
import prisma from '../prismaClient';

const router = Router();

// Get all news updates
router.get('/', async (req, res) => {
  try {
    const news = await prisma.newsUpdate.findMany({
      orderBy: { publishDate: 'desc' }
    });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Create a news update
router.post('/', async (req, res) => {
  try {
    const news = await prisma.newsUpdate.create({
      data: req.body
    });
    res.status(201).json(news);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create news update' });
  }
});

// Update a news update
router.put('/:id', async (req, res) => {
  try {
    const news = await prisma.newsUpdate.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });
    res.json(news);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update news' });
  }
});

// Delete a news update
router.delete('/:id', async (req, res) => {
  try {
    await prisma.newsUpdate.delete({
      where: { id: Number(req.params.id) }
    });
    res.json({ message: 'News deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete news' });
  }
});

export default router;
