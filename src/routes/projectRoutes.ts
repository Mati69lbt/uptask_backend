import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExist } from "../middleware/project";
import { taskBelongsToProject, taskExist } from "../middleware/task";
import { authenticate } from "../middleware/auth";

const router = Router();

router.use(authenticate);

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

router.param("projectId", validateProjectExist);

router.post(
  "/:projectId/tasks",
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

router.get("/:projectId/tasks", TaskController.getProjectTasks);

router.param("taskId", taskExist);
router.param("taskId", taskBelongsToProject);

router.get(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("ID no válido"),
  handleInputErrors,
  TaskController.getTaskById
);

router.put(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("ID no válido"),
  body("name")
    .notEmpty()
    .withMessage("El campo Nombre de la Tarea del Proyecto es Obligatorio"),
  body("description")
    .notEmpty()
    .withMessage(
      "El campo Descripción de la Tarea del Proyecto es Obligatorio"
    ),
  handleInputErrors,
  TaskController.updateTask
);

router.delete(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("ID no válido"),
  handleInputErrors,
  TaskController.deleteTask
);
router.post(
  "/:projectId/tasks/:taskId/status",
  param("taskId").isMongoId().withMessage("ID no válido"),
  body("status").notEmpty().withMessage("El campo Estado es Obligatorio"),
  handleInputErrors,
  TaskController.updateStatus
);

export default router;
