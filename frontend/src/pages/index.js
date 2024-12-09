export default function Home() {
  return (
    <div className="max-w-2xl mx-auto mt-12 text-center">
      <h1 className="text-3xl font-bold mb-6">ToDo List</h1>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Ajouter une tâche"
          className="w-3/4 p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button className="px-4 py-3 bg-blue-600 text-white font-semibold rounded-r-md hover:bg-blue-700 transition">
          Ajouter
        </button>
      </div>

      <ul className="space-y-4">
        <li className="flex justify-between items-center p-4 bg-gray-100 rounded-md shadow-sm">
          <button className="px-3 py-1 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition">
            Supprimer
          </button>
        </li>
      </ul>
    </div>
  );
}
