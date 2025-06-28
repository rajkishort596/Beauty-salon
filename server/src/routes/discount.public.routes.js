import { Router } from "express";
import { getAllDiscounts } from "../controllers/discount.controller.js";

const router = Router();
//Public route
router.route("/").get(getAllDiscounts);

export default router;
