import express from "express";
import PointsController from "./controllers/pointsController";
import ItemsController from "./controllers/itemsController";
import multer from "multer";
import multerConfig from "./config/multer";

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.post("/points", upload.single("image"), pointsController.create);

routes.get("/items", itemsController.index);

routes.get("/points", pointsController.index);
routes.get("/points/:id", pointsController.show);

export default routes;
