// src/components/TaskForm.tsx
import React, { useState } from "react";
import { Api } from "../../services/Api";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await Api.post("/tasks", { title, description });
    if (response.statusCode === 201) {
      setTitle("");
      setDescription("");
      window.location.reload();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border w-full"
        placeholder="Task title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 border w-full mt-2"
        placeholder="Task description"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white mt-4">Create Task</button>
    </form>
  );
};

export default TaskForm;
