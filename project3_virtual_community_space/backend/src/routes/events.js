import express from "express";
import {getAllEventsController, getEventDetail, getFilteredEvents} from "../controller/controller.js";

const router = express.Router();

router.get("/", getAllEventsController);
router.get("/filter", getFilteredEvents);
router.get("/:eventName", getEventDetail);

export default router;