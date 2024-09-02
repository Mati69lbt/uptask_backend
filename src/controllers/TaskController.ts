import type { Request, Response } from "express";
import Project from "../models/Projects";
import Task from "../models/Task";

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    try {
      const task = new Task(req.body);
      task.project = req.project.id;
      req.project.tasks.push(task.id);
      await Promise.allSettled([task.save(), req.project.save()]);
      res.status(200).json({
        status: "success",
        task,
        pre: req.project,
      });
    } catch (error) {
      console.error(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
}
