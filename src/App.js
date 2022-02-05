import { useMemo, useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import TodoList from './TodoList';
import RandomButton from './RandomButton';
import './App.css';

const LOCAL_STORAGE_KEY = 'be-cypress-todos';

function App() {
  const cache = useLocalStorage(LOCAL_STORAGE_KEY);
  const setCache = (items) => cache.set(JSON.stringify(items));
  const initialItems = useMemo(() => {
    if (cache.isSet()) {
      try {
        const parsed = JSON.parse(cache.get());
        if (parsed && Array.isArray(parsed)) {
          return parsed;
        }
      } catch (error) {
        // pass
      }
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [items, setItems] = useState(initialItems);

  // Form handlers
  const [input, setInput] = useState('');
  const _addNewItem = (value) => {
    const newItems = [
      ...items,
      {
        id: Math.max(0, ...items.map((v) => v.id)) + 1,
        name: value,
      },
    ];
    setItems(newItems);
    setCache(newItems);
  };
  const handleChange = (e) => setInput(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    _addNewItem(input);
    setInput('');
  };
  const handleRandom = _addNewItem;

  const handleDelete = (id) => {
    if (window.confirm('Delete?')) {
      const newItems = items.filter((item) => item.id !== id);
      setItems(newItems);
      setCache(newItems);
    }
  };

  const handleEdit = (item) => {
    const prompt = window.prompt('Update to-do item', item.name);
    if (prompt && prompt !== item.name) {
      const newItems = items.map((i) =>
        i.id === item.id
          ? {
              id: item.id,
              name: prompt,
            }
          : i
      );
      setItems(newItems);
      setCache(newItems);
    }
  };

  return (
    <main className="App">
      <h1>My To-Do List</h1>
      <form className="App-form" onSubmit={handleSubmit}>
        <input maxLength="250" onChange={handleChange} value={input} />
        <button disabled={!input} type="submit">
          Add
        </button>
        <RandomButton onSuccess={handleRandom} />
      </form>

      <TodoList items={items} onEdit={handleEdit} onDelete={handleDelete} />
    </main>
  );
}

export default App;
