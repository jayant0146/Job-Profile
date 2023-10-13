import express from "express";
import { testPostController } from "../controllers/testController.js";
import userAuth from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routes
//Can have multiple middlewares between the URL and the Function name
router.post("/test-post", userAuth, testPostController);

//export
export default router;
