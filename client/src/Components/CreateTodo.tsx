import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';

interface CreateTodoProps {
  roomId: string;
  onTodoCreated: (todo: any) => void;
}

const CreateTodo = ({ roomId, onTodoCreated }: CreateTodoProps) => {
  const { token } = useAuth();
  const [title, setTitle] = useState('');

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/todos/create`,
        { title, roomId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onTodoCreated(response.data);
      setTitle('');
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  return (
    <div className="flex gap-2 items-center justify-center mt-14">
      <input
        type="text"
        className="border p-2"
        placeholder="New Todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="bg-green-500 text-white px-4 py-2" onClick={handleCreate}>
        Add
      </button>
    </div>
  );
};

export default CreateTodo;
