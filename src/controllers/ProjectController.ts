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
    res.send("Todos los Proyectos");
  };
}
