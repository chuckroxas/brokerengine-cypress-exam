import { useState } from 'react';
import './TodoList.css';

function TodoList({ items, onEdit, onDelete }) {
  const [editItem, setEditItem] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(editItem);
    setEditItem();
  };
  const handleEdit = (item) => {
    setEditItem(item);
  };
  const handleEditChange = (e) =>
    setEditItem((i) => ({ ...i, name: e.target.value }));

  if (!items?.length) {
    return <p className="App-listEmpty">No items available</p>;
  }

  return (
    <ul className="App-list">
      {items.map((item) => (
        <li className="App-listItem" key={item.id}>
          {editItem?.id === item.id ? (
            <form className="inline-form" onSubmit={handleSubmit}>
              <input
                autoFocus
                onChange={handleEditChange}
                value={editItem.name}
              />
              <button disabled={editItem.name === item.name} type="submit">
                Save
              </button>
              <button data-type="danger" onClick={() => setEditItem()}>
                Cancel
              </button>
            </form>
          ) : (
            <>
              <span onClick={() => handleEdit(item)}>{item.name}</span>
              <button
                className="App-listDelete"
                data-type="danger"
                onClick={() => onDelete(item.id)}
              >
                x
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
