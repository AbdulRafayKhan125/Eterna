import express from 'express';
import authenticateToken from '../middleware/auth';
import upload from '../middleware/upload';

const router = express.Router();

// Upload product images (admin only)
router.post('/', authenticateToken, upload.array('images', 3), (req, res) => {
  try {
    const files = (req.files as Express.Multer.File[]) || [];
    const responseFiles = files.map((file) => ({
      filename: file.filename,
      path: `/uploads/products/${file.filename}`,
      mimetype: file.mimetype,
      size: file.size,
    }));

    res.json({ success: true, files: responseFiles });
  } catch {
    res.status(500).json({ success: false, message: 'Upload failed' });
  }
});

export default router;