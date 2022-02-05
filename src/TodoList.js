import './TodoList.css';

function TodoList({ items, onEdit, onDelete }) {
  if (!items?.length) {
    return <p className="App-listEmpty">No items available</p>;
  }

  return (
    <ul className="App-list">
      {items.map((item) => (
        <li className="App-listItem" key={item.id}>
          <span onClick={() => onEdit(item)}>{item.name}</span>
          <button onClick={() => onDelete(item.id)}>x</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
