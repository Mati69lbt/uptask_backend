import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExist } from "../middleware/project";
import {
  hasAuthorization,
  taskBelongsToProject,
  taskExist,
} from "../middleware/task";
import { authenticate } from "../middleware/auth";
import { TeamMemberController } from "../controllers/TeamController";
import { NoteController } from "../controllers/NoteController";

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
  hasAuthorization,
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
  hasAuthorization,
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
  hasAuthorization,
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

// Rutas para Teams
router.post(
  "/:projectId/team/find",
  body("email").isEmail().toLowerCase().withMessage("Email no válido"),
  handleInputErrors,
  TeamMemberController.findMemberByEmail
);

router.get("/:projectId/team", TeamMemberController.getProjectTeam);

router.post(
  "/:projectId/team",
  body("id").isMongoId().withMessage("ID no válido"),
  handleInputErrors,
  TeamMemberController.addMemberById
);

router.delete(
  "/:projectId/team/:userId",
  param("userId").isMongoId().withMessage("ID no válido"),
  handleInputErrors,
  TeamMemberController.removeMemberById
);

// Routes for Notes
router.post(
  "/:projectId/tasks/:taskId/notes",
  body("content").notEmpty().withMessage("El campo Contenido es Obligatorio"),
  handleInputErrors,
  NoteController.createNote
);

router.get(
  "/:projectId/tasks/:taskId/notes",
  param("taskId").isMongoId().withMessage("ID no válido"),
  handleInputErrors,
  NoteController.getTaskNotes
);

router.delete("/:projectId/tasks/:taskId/notes/:noteId",
  param("noteId").isMongoId().withMessage("ID no válido"),
  handleInputErrors,
  NoteController.deleteNote
);

export default router;
