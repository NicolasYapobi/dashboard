function TaskItem({ task, handleChangeTask, SaveEditTask, deleteTask, editStatus }) {
    return (
      <li className="flex justify-between items-center p-4 bg-gray-100 rounded-md shadow-sm">
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
          onClick={() => editStatus(task)}
          className={`px-3 py-1 font-semibold rounded-md transition ${
            task.status === "A faire"
            ? "bg-red-200 text-red-800 hover:bg-red-300"
            : task.status === "En cours"
            ? "bg-yellow-200 text-yellow-800 hover:bg-yellow-300"
            : "bg-green-200 text-green-800 hover:bg-green-300"
          }`}
        >
        {task.status}
      </button>
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
    );
  }
export default TaskItem;
  