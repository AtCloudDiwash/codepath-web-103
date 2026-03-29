import express from 'express';
import {
  getAllLamps,
  getLampById,
  createLamp,
  updateLamp,
  deleteLamp,
} from '../controller/controller.js';

const router = express.Router();

router.get('/', getAllLamps);
router.get('/:id', getLampById);
router.post('/', createLamp);
router.put('/:id', updateLamp);
router.delete('/:id', deleteLamp);

export default router;
