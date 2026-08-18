import express from 'express';
import db from '../services/db.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Book Saver - Home' });
});

router.get('/books', async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM items ORDER BY created_at DESC');
    res.render('books/book-list', { 
      title: 'My Books', 
      books: result.rows 
    });
  } catch (err) {
    next(err);
  }
});

router.get('/books/new', (req, res) => {
  res.render('books/new', { title: 'Add Book' });
});

router.post('/books', async (req, res, next) => {
  try {
    const { title, author, rating, status, notes } = req.body;
    const result = await db.query(
      'INSERT INTO items (title, author, rating, status, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, author, rating, status, notes]
    );
    res.redirect('/books');
  } catch (err) {
    next(err);
  }
});

router.get('/books/:id/edit', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM items WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      const error = new Error('Book not found');
      error.status = 404;
      return next(error);
    }
    res.render('books/edit', { title: 'Edit Book', book: result.rows[0] });
  } catch (err) {
    next(err);
  }
});

router.put('/books/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, author, rating, status, notes } = req.body;
    const result = await db.query(
      'UPDATE items SET title = $1, author = $2, rating = $3, status = $4, notes = $5 WHERE id = $6 RETURNING *',
      [title, author, rating, status, notes, id]
    );
    res.redirect('/books');
  } catch (err) {
    next(err);
  }
});

router.delete('/books/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM items WHERE id = $1', [id]);
    res.redirect('/books');
  } catch (err) {
    next(err);
  }
});

export default router;