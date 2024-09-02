import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExist } from "../middleware/project";

const router = Router();

router.post(
  "/",
  body("projectName")
    .notEmpty()
    .withMessage("El campo Nombre del Proyecto es Obligatorio"),
  body("clientName")
    .notEmpty()
    .withMessage("El campo Cliente del Proyecto es Obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("El campo Descripción del Proyecto es Obligatorio"),
  handleInputErrors,
  ProjectController.createProject
);
router.get("/", ProjectController.getAllProjects);

router.get(
  "/:id",
  param("id").isMongoId().withMessage("ID no válido"),
  handleInputErrors,
  ProjectController.getProjectById
);
router.put(
  "/:id",
  param("id").isMongoId().withMessage("ID no válido"),
  body("projectName")
    .notEmpty()
    .withMessage("El campo Nombre del Proyecto es Obligatorio"),
  body("clientName")
    .notEmpty()
    .withMessage("El campo Cliente del Proyecto es Obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("El campo Descripción del Proyecto es Obligatorio"),
  handleInputErrors,
  ProjectController.updateProject
);

router.delete(
  "/:id",
  param("id").isMongoId().withMessage("ID no válido"),
  handleInputErrors,
  ProjectController.deleteProject
);

// Routes for Task
router.post(
  "/:projectId/tasks",
  validateProjectExist,
  body("name")
    .notEmpty()
    .withMessage("El campo Nombre de la Tarea del Proyecto es Obligatorio"),
  body("description")
    .notEmpty()
    .withMessage(
      "El campo Descripción de la Tarea del Proyecto es Obligatorio"
    ),
  handleInputErrors,
  TaskController.createTask
);

export default router;
