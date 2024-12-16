import type { Request, Response } from "express";
import Project from "../models/Projects";

export class ProjectController {
  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body);

    // Asignar al creador del proyecto
    project.manager = req.user.id;

    try {
      await project.save();
      res.status(201).json({ message: "Project Created Successfully" });
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  };
  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find({
        $or: [
          { manager: { $in: req.user.id } },
          { team: { $in: req.user.id } },
        ],
      });
      res.status(201).json({
        status: "success",
        cantidad: projects.length,
        projects,
      });
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  };
  static getProjectById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const project = await Project.findById(id).populate("tasks");      

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      if (
        project.manager.toString() !== req.user.id.toString() &&
        !project.team.includes(req.user.id)
      ) {
        const error = new Error("Acción no válida");
        return res.status(403).json({ error: error.message });
      }

      res.status(200).json({
        status: "success",
        cantTasks: project.tasks.length,
        project,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static updateProject = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const project = await Project.findById(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      if (project.manager.toString() !== req.user.id.toString()) {
        const error = new Error("Solo el manager puede actualizar el Proyecto");
        return res.status(403).json({ error: error.message });
      }

      project.projectName = req.body.projectName;
      project.clientName = req.body.clientName;
      project.description = req.body.description;
      await project.save();

      const project_ACT = await Project.findById(id);
      res.status(200).json({
        status: "success",
        project_ACT,
      });
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  };
  static deleteProject = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const project = await Project.findById(id);

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      if (project.manager.toString() !== req.user.id.toString()) {
        const error = new Error("Solo el manager puede eliminar el Proyecto");
        return res.status(403).json({ error: error.message });
      }

      await project.deleteOne();

      res.status(200).json({
        status: "success",
        project,
      });
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  };
}
