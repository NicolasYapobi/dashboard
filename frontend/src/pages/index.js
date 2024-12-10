import { useState, useEffect } from "react";

const API_URL = "http://localhost:4000/Tasks/"

export default function Home() {

  const [taskList, setList] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "A faire"
  });

  useEffect(() => {
      fetch(API_URL)
      .then(response => response.json())
      .then((data) => { 
        console.log(data);
        setList(data);
      })
  }, []);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeTask = (e, id) => {
    const { name, value } = e.target;
    const updateList = [...taskList];

    for (let i = 0; i < updateList.length; i += 1) {
      if (updateList[i].id === id) {
        updateList[i] = {
          ...updateList[i],
          [name]: value,
        }
        break;
      }
    }
    setList(updateList)
  }

  const SaveEditTask = (id) => {
    const taskToUpdate = taskList.find((task) => task.id === id);

    fetch(API_URL+id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: taskToUpdate.title,
        description: taskToUpdate.description,
        status: taskToUpdate.status,
      }),
    })
      .then((response) => response.json())
      .then((updatedTask) => {
        setList((prev) =>
          prev.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task
          )
        );
      })
      .catch((error) => console.error("Erreur lors de la mise à jour de la tâche :", error));
  };



  const addTask = () => {
    const newTask = {
      ...formData 
    };
    setFormData({title: "", description: "", state: ""})
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask)
    })
    .then((response) => 
      response.json()
  )
    .then((data) => {
      setList((prev) => [...prev, data]);
    })
    .catch((error) => console.error("Error: ", error))
  };

  const deleteTask = (id) => {
    console.log(API_URL+id)
    fetch(API_URL+id, {
      method: "DELETE"
    })
    .then(() => {
      setList((prev) =>
        prev.filter((task) => task.id !== id) 
      )
    })
    .catch((error) => console.error("Error: ", error))
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
              <input
                type="text"
                name="title"
                value={task.title}
                onChange={(e) => handleChangeTask(e, task.id)}
                className="w-4/4 p-3 border border-black font-bold text-lg text-black"
              />
              <textarea
                name="description"
                value={task.description}
                onChange={(e) => handleChangeTask(e, task.id)}
                className="border-black text-black"
              />
            </div>
            
            <button
              onClick={() => SaveEditTask(task.id)}
              className="px-3 py-1 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Sauvegarder
            </button>
            <button
              onClick={() => deleteTask(task.id)}
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
