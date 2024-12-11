function TaskForm({ formData, handleChange, addTask }) {
    return (
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Ajouter une tâche"
          className="w-3/4 p-3 border border-black rounded-l-md focus:outline-none focus:ring text-black"
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-3/4 p-3 border border-black rounded-l-md focus:outline-none focus:ring text-black"
        />
        <button
          onClick={addTask}
          className="px-4 py-3 bg-blue-600 text-white font-semibold rounded-r-md hover:bg-blue-700 transition"
        >
          Ajouter
        </button>
      </div>
    );
  }
  export default TaskForm;
  