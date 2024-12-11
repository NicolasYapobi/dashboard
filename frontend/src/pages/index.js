import { useState, useEffect } from "react";
import TaskForm from "../components/taskForm";
import TaskItem from "../components/taskItem";



const API_URL = process.env.NEXT_PUBLIC_API_URL;
const listStatus = ["A faire", "En cours", "Terminée"];

export default function Home() {
  const [taskList, setList] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "A faire",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(API_URL+"tasks");
  
        if (!response.ok) {
          throw new Error(`Erreur réseau : ${response.status} ${response.statusText}`);
        }
  
        const data = await response.json();
        setList(data);
      } catch (error) {
        console.error("Erreur:", error);
        alert("Une erreur est survenue côté serveur.")
      }
    };
  
    fetchTasks();
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

  const addTask = async () => {
    const newTask = { ...formData };
    
    if (newTask.title.length === 0) {
      alert("Veuillez rajouter un titre pour votre tâche");
      return
    }
    try {
      const response = await fetch(API_URL+"tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      
      if (!response.ok) {
        throw new Error(`Erreur du serveur : ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setList((prev) => [...prev, data])
    } catch (error) {
      console.log("Erreur: ", + error)
      alert("Une erreur est survenue côté serveur.")
    }
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
    .catch((error) => {
      console.error("Erreur :", error)
      alert("Une erreur est survenue côté serveur.")
    });
  };

  const editStatus = (task) => {
    let indexStatus = listStatus.indexOf(task.status);
    let updateStatus = listStatus[(indexStatus + 1) % listStatus.length]

    fetch(API_URL+"tasks/"+task.id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({status: updateStatus})
    })
    .then((response) => response.json())
    .then((updatedTask) => {
      console.log(updatedTask)
      setList((prev) =>
        prev.map((task) => ({ ...task, ...updatedTask }))
      )}
    )
    .catch((error) => {
      console.error("Erreur :", error)
      alert("Une erreur est survenue côté serveur.")
    });
  }

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
            editStatus={editStatus}
          />
        ))}
      </ul>
    </div>
  );
}
