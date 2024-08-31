import type { Request, Response } from "express";
import Project from "../models/Projects";
export class ProjectController {
  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body);

    try {
      await project.save();
      res.status(201).json({ message: "Project created successfully" });
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  };
  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find({});
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
      const project = await Project.findById(id);

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

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
