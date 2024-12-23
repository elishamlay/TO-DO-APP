import { useState } from "react";

export default function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() !== "") {
      const newTasks = [
        ...tasks,
        { id: Date.now(), task: task, completed: false },
      ];
      setTasks(newTasks);
      setTask(""); // Clear the input field
    }
  };

  const deleteTask = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks); // Update the task list after deletion
  };

  const toggleTaskCompletion = (taskId) => {
    const newTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks); // Update the task list with the toggled completion status
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          To-Do List App
        </h1>

        {/* Input Section */}
        <div className="flex mb-6">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            className="ml-3 bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition"
            onClick={addTask}
          >
            Add
          </button>
        </div>

        {/* Tasks List */}
        <div>
          {tasks.length > 0 ? (
            <ul className="space-y-4">
              {tasks.map((taskItem) => (
                <li
                  key={taskItem.id}
                  className={`py-3 px-4 bg-gray-50 rounded-md flex justify-between items-center border ${
                    taskItem.completed
                      ? "line-through text-gray-400 bg-gray-200"
                      : "text-gray-700"
                  }`}
                >
                  <span
                    className="cursor-pointer"
                    onClick={() => toggleTaskCompletion(taskItem.id)}
                  >
                    {taskItem.task}
                  </span>
                  <button
                    className="text-red-500 hover:text-red-700 transition"
                    onClick={() => deleteTask(taskItem.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No tasks yet. Add one!</p>
          )}
        </div>
      </div>
    </div>
  );
}
