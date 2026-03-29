import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import avengerData from '../data/avengers.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json(avengerData)
});

router.get('/:avengerId', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../../client/avenger.html'))
});


export default router