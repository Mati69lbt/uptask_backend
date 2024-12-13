import type { Request, Response } from "express";
import Note, { INote } from "../models/Note";

// NoteController.createNote

export class NoteController {
  static createNote = async (req: Request<{}, {}, INote>, res: Response) => {
    const { content } = req.body;
    const note = new Note();
    note.content = content;
    note.createdBy = req.user.id;
    note.task = req.task.id;

    req.task.notes.push(note.id);
    try {
      await Promise.allSettled([req.task.save(), note.save()]);
      res.send("Nota Creada Satisfactoriamente");
    } catch (error) {
      res.status(500).json({ error: "Failed to create note" });
    }
  };

  static getTaskNotes = async (req: Request, res: Response) => {
    try {
      const notes = await Note.find({ task: req.task.id });
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: "Failed to get task notes" });
    }
  };
}