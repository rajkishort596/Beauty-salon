import { Router } from "express";
import { getContactInfo } from "../controllers/public.controller.js";
const router = Router();

router.route("/").get(getContactInfo);

export default router;
