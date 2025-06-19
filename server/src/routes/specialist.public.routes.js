import { Router } from "express";
import { getAllSpecialists } from "../controllers/specialist.controller.js";
const router = Router();
//Public route
router.route("/").get(getAllSpecialists);

export default router;
