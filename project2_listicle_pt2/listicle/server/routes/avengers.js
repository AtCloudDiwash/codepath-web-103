import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { fetchAvengers, fetchAvengersByName, fetchAvengerById } from '../config/fetch.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

router.get('/', async (req, res) => {
    const { search } = req.query;
    const fetchData = search ? await fetchAvengersByName(search) : await fetchAvengers();
    res.status(200).json(fetchData);
});

router.get('/api/:avengerId', async (req, res) => {
    const fetchData = await fetchAvengerById(req.params.avengerId);
    res.status(200).json(fetchData.rows);
});

router.get('/api/search/:avengerName', async (req, res) => {
    const fetchData = await fetchAvengersByName(req.params.avengerName);
    if (!fetchData || fetchData.length === 0) {
        return res.status(404).json({ data: "avenger not found" });
    }
    res.status(200).json(fetchData);
});

router.get('/:avengerId', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../../client/avenger.html'))
});


export default router