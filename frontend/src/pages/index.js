import { useState, useEffect } from "react";
import TaskForm from "../components/taskForm";
import TaskItem from "../components/taskItem";



const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [taskList, setList] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "A faire",
  });

  useEffect(() => {
    fetch(API_URL+"tasks")
      .then((response) => response.json())
      .then((data) => setList(data))
      .catch((error) => console.error("Erreur :", error + response.json));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeTask = (e, id) => {
    const { name, value } = e.target;
    const updatedList = taskList.map((task) =>
      task.id === id ? { ...task, [name]: value } : task
    );
    setList(updatedList);
  };

  const addTask = () => {
    const newTask = { ...formData };
    fetch(API_URL+"tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => setList((prev) => [...prev, data]))
      .catch((error) => console.error("Erreur :", error));
  };

  const deleteTask = (id) => {
    fetch(API_URL+"tasks/"+id, { method: "DELETE" })
      .then(() => setList((prev) => prev.filter((task) => task.id !== id)))
      .catch((error) => console.error("Erreur :", error));
  };

  const SaveEditTask = (id) => {
    const taskToUpdate = taskList.find((task) => task.id === id);
    fetch(API_URL+"tasks/"+id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskToUpdate),
    })
      .then((response) => response.json())
      .then((updatedTask) =>
        setList((prev) =>
          prev.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
        )
      )
      .catch((error) => console.error("Erreur :", error));
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 text-center">
      <h1 className="text-3xl font-bold mb-6">ToDo List</h1>
      <TaskForm formData={formData} handleChange={handleChange} addTask={addTask} />
      <ul className="space-y-4">
        {taskList.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            handleChangeTask={handleChangeTask}
            SaveEditTask={SaveEditTask}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
}
