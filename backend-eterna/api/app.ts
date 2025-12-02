/**
 * This is a API server
 */

import express from 'express'
import cors from 'cors'
import path from 'path'
import { config as dotenvConfig } from 'dotenv'
import { fileURLToPath } from 'url'
import connectDB from './config/database.js'
import authRoutes from './routes/auth.js'
import categoryRoutes from './routes/categories.js'
import productRoutes from './routes/products.js'
import contactRoutes from './routes/contact.js'
import uploadRoutes from './routes/upload.js'
import setupRoutes from './routes/setup.js'

// for esm mode
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// load env from .env.local only for local dev
dotenvConfig({ path: '.env.local' })

// Connect to MongoDB
connectDB()

const app: express.Application = express()

app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Serve static files (uploads)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')))

/**
 * API Routes
 */
app.use('/api/auth', authRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/products', productRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/setup', setupRoutes)
app.use('/api/upload', uploadRoutes)

/**
 * health
 */
app.use(
  '/api/health',
  (req, res, next): void => {
    res.status(200).json({
      success: true,
      message: 'ok',
    })
  },
)

/**
 * error handler middleware
 */
app.use((error: Error, req, res, next) => {
  res.status(500).json({
    success: false,
    error: 'Server internal error',
  })
})

/**
 * 404 handler
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'API not found',
  })
})

export default app
