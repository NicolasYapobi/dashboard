import { useState } from "react";
import { getDate } from "./function.js"

export default function Home() {

  const [taskList, setList] = useState([]);
  const [count, setCounter] = useState(0);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    state: ""
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addTask = () => {
    const newTask = {
      id: count, 
      ...formData 
    };
    setList((prev) => [...prev, newTask]);
    setFormData({title: "", description: "", state: "à faire"})
    setCounter(count + 1)
  };



  return (
    <div className="max-w-2xl mx-auto mt-12 text-center">
      <h1 className="text-3xl font-bold mb-6">ToDo List</h1>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Ajouter une tâche"
          className="w-3/4 p-3 border border-black rounded-l-md focus:outline-none focus:ring text-black"
        />
        <br></br>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-3/4 p-3 border border-black rounded-l-md focus:outline-none focus:ring text-black"
        />
        <br></br>
        <button onClick={addTask} className="px-4 py-3 bg-blue-600 text-white font-semibold rounded-r-md hover:bg-blue-700 transition">
          Ajouter
        </button>
      </div>
      <div>
      {taskList.length > 0 ? (
        <ul className="space-y-4">
          {taskList.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center p-4 bg-gray-100 rounded-md shadow-sm"
          >
            <div>
              <h3 className="font-bold text-lg text-black">{task.title}</h3>
              <p className="text-black">{task.description}</p>
              <span className="text-sm text-black">Statut : {task.state}</span>
            </div>
            <button
              className="px-3 py-1 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition"
            >
              Supprimer
            </button>
          </li>
          ))}
        </ul>
        ) : (
          <div>
            <h1>Ajoutez des tâches !</h1>
          </div>
        )}
      </div>
    </div>
  );
}
