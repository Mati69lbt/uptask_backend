import type { Request, Response, NextFunction } from "express";
import Project, { IProject } from "../models/Projects";

declare global {
  namespace Express {
    interface Request {
      project: IProject
    }
  }
}

export async function validateProjectExist(
  req: Request,
  res: Response,
  next: NextFunction
) {  
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    req.project = project;
    next()
  } catch (error) {
    res.status(500).json({
      status: "Error",
      error: "Hubo un Error",
    });
  }
}
