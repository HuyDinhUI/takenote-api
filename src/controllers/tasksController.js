import {Tasks} from "../modules/tasks.js";

// Get all Tasks
export const getAllTasksByUser = async (req, res) => {

  const userId = req.params.id

  try {
    const tasks = await Tasks.find({userId});

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single Tasks by ID
export const getTasksById = async (req, res) => {
  try {
    const Tasks = await Tasks.findById(req.params.id);
    if (!Tasks) return res.status(404).json({ message: "Task not found" });
    res.json(Tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new Tasks
export const createTask = async (req, res) => {
  try {
    const newTasks = new Tasks(req.body);
    const saved = await newTasks.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update Tasks
export const updateTask = async (req, res) => {
  try {
    const updated = await Tasks.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Tasks not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Tasks
export const deleteTask = async (req, res) => {
  try {
    const deleted = await Tasks.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Tasks not found" });
    res.json({ message: "Tasks deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
