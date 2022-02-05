import { useState } from 'react';
import { RANDOM_API } from './constants';
import './RandomButton.css';

export default function RandomButton({ children, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    return fetch(RANDOM_API)
      .then((r) => r.json())
      .then(({ dish }) => {
        onSuccess(`Cook ${dish}`);
      })
      .catch((e) => alert(`Failed to fetch a random item`))
      .finally(() => setLoading(false));
  };
  return (
    <button
      aria-busy={loading}
      className="RandomButton"
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? 'Fetching...' : children || 'Random'}
    </button>
  );
}
