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
        project: req.project,
      });
    } catch (error) {
      console.error(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  static getProjectTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await Task.find({ project: req.project.id }).populate(
        "project"
      );
      if (!tasks) {
        return res.status(404).json({ message: "No tasks found" });
      }
      res.status(200).json({
        status: "success",
        cantidad: tasks.length,
        tasks,
      });
    } catch (error) {
      console.error(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  static getTaskById = async (req: Request, res: Response) => {
    try {
      res.status(200).json({
        status: "success",
        task: req.task,
      });
    } catch (error) {
      console.error(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  static updateTask = async (req: Request, res: Response) => {
    try {
      req.task.name = req.body.name;
      req.task.description = req.body.description;
      await req.task.save();

      res.status(200).json({
        status: "success",
      });
    } catch (error) {
      console.error(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  static deleteTask = async (req: Request, res: Response) => {
    try {
      req.project.tasks = req.project.tasks.filter(
        (task) => task._id.toString() !== req.task.id.toString()
      );

      await Promise.allSettled([req.task.deleteOne(), req.project.save()]);

      res.status(200).json({
        status: "success deleted",
        task: req.task,
      });
    } catch (error) {
      console.error(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  static updateStatus = async (req: Request, res: Response) => {
    try {
      const { status } = req.body;

      req.task.status = status;
      await req.task.save();

      res.status(200).json({
        status: "success deleted",
        task: req.task,
      });
    } catch (error) {
      console.error(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
}
