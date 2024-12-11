import { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useSocket } from '../Context/socketContext';
import CreateTodo from '../Components/CreateTodo';
import TodoList from '../Components/TodoList';

const Dashboard = () => {
  const { token } = useAuth();
  const socket = useSocket();
  const [roomId, setRoomId] = useState('');
  const [todos, setTodos] = useState<any[]>([]);
  const [roomName, setRoomName] = useState('');

  const fetchTodos = async () => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${roomId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const deleteTodo = async (todoId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${todoId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setTodos((prev) => prev.filter((todo) => todo._id !== todoId));
      } else {
        console.error('Failed to delete todo');
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const createRoom = async () => {
    try {
      const response = await fetch('http://localhost:3000/room/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: roomName }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'Failed to create room');
      }

      const { room, defaultTodo } = await response.json();
      setRoomId(room.roomId); // Automatically join the created room
      setTodos([defaultTodo]); // Set default todo for the new room
      setRoomName('');
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  const handleTodoCreated = (newTodo: any) => {
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleToggleIsDone = async (id: string, isDone: boolean) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isDone }),
      });
      const updatedTodo = await response.json();

      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? { ...todo, isDone: updatedTodo.isDone } : todo))
      );
    } catch (error) {
      console.error('Error updating isDone:', error);
    }
  };

  useEffect(() => {
    if (roomId) {
      socket.emit('joinRoom', roomId);
      fetchTodos();
    }
  }, [roomId, socket]);

  return (
    <div className="p-4 bg-gray-950 min-h-screen">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className='flex  gap-8 justify-center'>
      <div className="my-4">
        <input
          type="text"
          className="border p-2 mr-2"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => socket.emit('joinRoom', roomId)}
          >
          Join Room
        </button>
      </div>
      <div className='text-white translate-y-6'>Or</div>
      <div className="my-4">
        <input
          type="text"
          className="border p-2 mr-2"
          placeholder="Enter Room Name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={createRoom}
          >
          Create Room
        </button>
      </div>
      </div>

      {roomId && (
        <>
          <CreateTodo roomId={roomId} onTodoCreated={handleTodoCreated} />
          <TodoList todos={todos} onDelete={deleteTodo} onToggleIsDone={handleToggleIsDone} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
