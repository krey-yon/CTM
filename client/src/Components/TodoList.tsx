import FloatingDeck from "./FloatingDeck";

interface TodoListProps {
  todos: any[];
  onDelete: (id: string) => void; // Function to handle delete
  onToggleIsDone: (id: string, isDone: boolean) => void; // Function to handle toggle isDone
}

const TodoList = ({ todos, onDelete, onToggleIsDone }: TodoListProps) => {
  return (
    <ul className= "mt-8 flex flex-col items-center">
      {todos.map((todo) => (
        <li key={todo._id} className="border-b py-2 w-1/3 flex justify-between items-center text-white">
          <div className="flex justify-between items-center gap-8">
          <input
            type="checkbox"
            checked={todo.isDone}
            onChange={(e) => onToggleIsDone(todo._id, e.target.checked)}
            />
          <span>{todo.title}</span>
          </div>
          <button
            onClick={() => onDelete(todo._id)} // Trigger delete when clicked
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </li>
      ))}
      <FloatingDeck />
    </ul>
  );
};

export default TodoList;
