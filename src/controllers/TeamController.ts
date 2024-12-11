import { param } from "express-validator";
import type { Request, Response } from "express";
import User from "../models/User";
import Project from "../models/Projects";

export class TeamMemberController {
  static findMemberByEmail = async (req: Request, res: Response) => {
    const { email } = req.body;

    // find user
    const user = await User.findOne({ email }).select("id email name");
    if (!user) {
      const error = new Error("Usuario no encontrado");
      return res.status(404).json({ error: error.message });
    }
    res.json(user);
  };

  static addMemberById = async (req: Request, res: Response) => {
    const { id } = req.body;

    const user = await User.findById(id).select("id");
    if (!user) {
      const error = new Error("Usuario no encontrado");
      return res.status(404).json({ error: error.message });
    }

    if (
      req.project.team.some((team) => team.toString() === user.id.toString())
    ) {
      const error = new Error("El usuario ya está en el equipo");
      return res.status(409).json({ error: error.message });
    }

    req.project.team.push(user.id);
    await req.project.save();
    res.send("Usuario agregado al Team con éxito");
  };

  static getProjectTeam = async (req: Request, res: Response) => {
    const project = await Project.findById(req.project.id).populate({
      path: "team",
      select: "id email name",
    });

    if (!project) {
      const error = new Error("Proyecto no encontrado.");
      return res.status(404).json({ error: error.message });
    }

    res.json(project.team);
  };

  static removeMemberById = async (req: Request, res: Response) => {
    const { userId } = req.params;

    if (!req.project.team.some((team) => team.toString() === userId)) {
      const error = new Error("El usuario no está en el equipo");
      return res.status(409).json({ error: error.message });
    }

    req.project.team = req.project.team.filter(
      (teamMember) => teamMember.toString() !== userId
    );
    await req.project.save();
    res.send("Usuario eliminado del Team con éxito");
  };
}
