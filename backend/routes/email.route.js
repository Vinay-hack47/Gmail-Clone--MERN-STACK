import express from "express"

import { createEmail , deleteEmail, getAllEmailById} from "../controller/email.controller.js"
import isAuthenticated from "../middleware/isAuthenticated.js";
import upload from "../uploadMiddleware.js";

const router = express.Router();

router.route("/create").post(isAuthenticated,  upload.array('attachments'),createEmail);
router.route("/delete/:id").delete(isAuthenticated, deleteEmail);
router.route("/getallemail").get(isAuthenticated, getAllEmailById);

export default router;