import { Router } from "express";
import { getAllServices } from "../controllers/service.controller.js";

const router = Router();
//Public route
router.route("/").get(getAllServices);

export default router;
