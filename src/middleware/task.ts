import type { Request, Response, NextFunction } from "express";
import Task, { ITask } from "../models/Task";


declare global {
  namespace Express {
    interface Request {
      task: ITask;
    }
  }
}

export async function taskExist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    req.task = task;
    next();
  } catch (error) {
    res.status(500).json({
      status: "Error",
      error: "Hubo un Error",
    });
  }
}

export async function taskBelongsToProject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
      if (req.task.project._id.toString() !== req.project.id.toString()) {
        return res
          .status(403)
          .json({ message: "You don't have permission to access this task" });
      }
       next();
  } catch (error) {
       res.status(500).json({
         status: "Error",
         error: "Hubo un Error",
       });
  }
}