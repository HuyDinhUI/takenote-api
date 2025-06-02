import express from "express";

import {
  getAllTasksByUser,
  getTasksById,
  createTask,
  updateTask,
  deleteTask,
} from '../../controllers/tasksController.js'
const Router = express.Router();

Router.get('/:id',getAllTasksByUser)
Router.post('/',createTask)
Router.put('/:id',updateTask)
Router.delete('/:id', deleteTask)

export const tasksRouter = Router